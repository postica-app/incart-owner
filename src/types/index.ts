import { Database } from './gen'
import { dumpedProduct } from './parse'

export * from './gen'
export * from './utils'
export * from './pageConfig'
export * from './parse'

type OrderItem = Database['public']['Tables']['order_item']['Row'] & {
    product: (typeof dumpedProduct)['_type']
    selected_options: string[]
}

type OrderSheet = Database['public']['Tables']['order_sheet']['Row'] & {
    order_item: OrderItem[]
}

export type Table = {
    [key in keyof Database['public']['Tables']]: Database['public']['Tables'][key]['Row']
} & {
    order_item: OrderItem
    order_sheet: OrderSheet
}
