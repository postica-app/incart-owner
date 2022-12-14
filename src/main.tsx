import {
    createBrowserRouter,
    LoaderFunction,
    RouterProvider,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ReactDOM from 'react-dom/client'
import React, { ComponentType, lazy, Suspense } from 'react'

import { supabase } from './supabase'
import { Modal } from './components'
import Layout from './pages/layout'
import './App.css'

declare global {
    interface Window {
        supabase: typeof supabase
    }
}

window.supabase = supabase

const main = async () => {
    const loaders = Object.entries(import.meta.glob('/src/pages/**/loader.ts'))

    const pages = await Promise.all(
        Object.entries(import.meta.glob('/src/pages/**/page.tsx')).map(
            async ([pagePath, importPage]) => {
                const Page = lazy(
                    () => importPage() as Promise<{ default: ComponentType }>
                )

                let loader = loaders.find(
                    ([loaderPath]) =>
                        loaderPath.split('/').slice(0, -1).join('/') ==
                        pagePath.split('/').slice(0, -1).join('/')
                )

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

    const router = createBrowserRouter([
        { path: '/', element: <Layout />, children: pages },
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
