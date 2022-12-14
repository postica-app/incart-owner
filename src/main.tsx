import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
    const pages = await Promise.all(
        Object.entries(import.meta.glob('/src/pages/**/page.tsx')).map(
            async ([path, importTarget]) => {
                // const target = (await importTarget()) as {
                //     default: React.FC
                //     info: {
                //         group: string
                //         name: string
                //     }
                //     dataLoader: () => unknown
                // }

                const Page = lazy(
                    () => importTarget() as Promise<{ default: ComponentType }>
                )

                const loaderPath = [
                    ...path.split('/').slice(0, -1),
                    'loader.ts',
                ].join('/')
                let loader

                try {
                    loader = (await import(loaderPath)).default
                } catch (e) {
                    console.error(e)
                }

                return {
                    path: path
                        .split('/')
                        .slice(3, -1)
                        .join('/')
                        .replace('$', ':'),
                    element: (
                        <Suspense>
                            <Page />
                        </Suspense>
                    ),
                    // element: <target.default />,
                    loader,
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
