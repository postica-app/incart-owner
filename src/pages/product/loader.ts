import { LoaderFunction } from 'react-router-dom'
import actions from './actions'

export default async () => {
    const products = await actions.getAllProducts()
    return products
}
