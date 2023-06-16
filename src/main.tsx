import React, { ComponentType, lazy, Suspense } from 'react'
import 'incart-fe-common/src/fonts/seed.css'
import {
    createBrowserRouter,
    LoaderFunction,
    NonIndexRouteObject,
    Outlet,
    RouteObject,
    RouterProvider,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ReactDOM from 'react-dom/client'

import { PageConfig } from './types'
import { Modal } from './components'
import Layout from './pages/layout'
import './App.css'

export let router: ReturnType<typeof createBrowserRouter>

const main = async () => {
    const loaderPaths = Object.entries(
        import.meta.glob('/src/pages/**/loader.ts')
    )
    const configPaths = Object.entries(
        import.meta.glob('/src/pages/**/config.ts')
    )

    const configs: Record<string, PageConfig> = {}

    let flatPages = await Promise.all(
        Object.entries(import.meta.glob('/src/pages/**/page.tsx')).map(
            async ([pagePath, importPage]) => {
                const Page = lazy(
                    () => importPage() as Promise<{ default: ComponentType }>
                )

                const loader = loaderPaths.find(
                    ([loaderPath]) =>
                        loaderPath.split('/').slice(0, -1).join('/') ==
                        pagePath.split('/').slice(0, -1).join('/')
                )

                const config = configPaths.find(
                    ([configPath]) =>
                        configPath.split('/').slice(0, -1).join('/') ==
                        pagePath.split('/').slice(0, -1).join('/')
                )

                let fetchedConfig: PageConfig | undefined

                if (config) {
                    fetchedConfig = (
                        (await config[1]()) as {
                            default: PageConfig
                        }
                    ).default

                    configs[pagePath.split('/').slice(3, -1).join('/')] =
                        fetchedConfig
                }

                const path = pagePath
                    .split('/')
                    .slice(3, -1)
                    .join('/')
                    .replace('$', ':')
                    .split('/')

                return {
                    path,
                    element: (
                        <Suspense fallback={<></>}>
                            <Page />
                        </Suspense>
                    ),
                    loader:
                        loader &&
                        (
                            (await loader[1]()) as {
                                default: LoaderFunction
                            }
                        ).default,
                    children: [],
                    config: fetchedConfig,
                }
            }
        )
    )

    flatPages = flatPages.sort((a, b) => a.path.length - b.path.length)

    const nestedPages: RouteObject = {
        element: <Layout configs={configs} />,
        children: [],
        path: '/',
    }

    for (const page of flatPages) {
        const paths = page.path.slice(0, -1)
        const name = page.path.slice(-1)[0]

        let node = nestedPages

        for (const part of paths) {
            let child = node.children?.find((child) => child.path == part)

            if (!child) {
                child = {
                    children: [],
                    path: part,
                }
                node.children?.push(child)
            }

            node = child as NonIndexRouteObject
        }

        node.children?.push({
            ...page,
            path: name,
        })
    }

    router = createBrowserRouter([nestedPages])

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <Modal />
            <Toaster />
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

main()
