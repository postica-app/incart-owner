import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ReactDOM from 'react-dom/client'
import React from 'react'

import { Modal } from './components'
import Layout from './pages/layout'
import './App.css'

const pages = await Promise.all(
    Object.entries(import.meta.glob('/src/pages/**/page.tsx')).map(
        async ([path, importTarget]) => {
            const target = (await importTarget()) as {
                default: React.FC
                info: {
                    group: string
                    name: string
                }
                dataLoader: () => unknown
            }

            return {
                path: path.split('/').slice(3, -1).join('/').replace('$', ':'),
                element: <target.default />,
                loader: target.dataLoader,
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
