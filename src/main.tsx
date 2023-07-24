import 'virtual:uno.css'

import React, { ComponentType, lazy, Suspense } from 'react'
import 'incart-fe-common/src/fonts/seed.css'
import {
    createBrowserRouter,
    LoaderFunction,
    RouterProvider,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ReactDOM from 'react-dom/client'

import { PageConfig } from './types'
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
                // .split('/')

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
                    handle: { config: fetchedConfig },
                }
            }
        )
    )

    router = createBrowserRouter([
        {
            element: <Layout />,
            children: flatPages,
            path: '/',
        },
    ])

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <Toaster />
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

main()
