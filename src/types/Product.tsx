import { ProductOption } from './ProductOption'

export interface Product {
    name: string
    price: number
    options?: {
        name: string
        items: ProductOption[]
    }[]
}
