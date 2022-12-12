import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout'

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
                path: path.split('/').slice(3, -1).join('/'),
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
        <RouterProvider router={router} />
    </React.StrictMode>
)
