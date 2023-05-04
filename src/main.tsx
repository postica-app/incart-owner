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

    const pages = await Promise.all(
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

                if (config) {
                    const { default: fetchedConfig } = (await config[1]()) as {
                        default: PageConfig
                    }
                    configs[pagePath.split('/').slice(3, -1).join('/')] =
                        fetchedConfig
                }

                return {
                    path: pagePath
                        .split('/')
                        .slice(3, -1)
                        .join('/')
                        .replace('$', ':'),
                    element: (
                        <Suspense>
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
                }
            }
        )
    )

    router = createBrowserRouter([
        { path: '/', element: <Layout configs={configs} />, children: pages },
    ])

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <Modal />
            <Toaster />
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

main()
