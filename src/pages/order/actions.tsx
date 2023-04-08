import { OrderStage, ProductType } from 'incart-fe-common'
import { supabase } from '@/supabase'
import { z } from 'zod'

const OrderFilter = z.object({
    range_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    range_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    product_id: z.string().uuid().optional(),
    order_status: z
        .enum([
            OrderStage.created,
            OrderStage.paid,
            OrderStage.departed,
            OrderStage.canceled,
        ])
        .optional(),
    order_id: z.string().uuid().optional(),
    orderer_name: z.string().optional(),
    orderer_phone: z.string().optional(),
    orderer_email: z.string().email().optional(),
})

export default {
    async getOrdersWithFilter(_filter: z.infer<typeof OrderFilter> | unknown) {
        const filter = OrderFilter.parse(_filter)

        let query = supabase
            .from('order_sheet')
            .select('rid,id,orderer_name,shipping_info,status')
            .gte('created_at', filter.range_start)
            .lte('created_at', filter.range_end)

        if (filter.order_status) query = query.eq('status', filter.order_status)

        if (filter.order_id) query = query.eq('id', filter.order_id)

        if (filter.orderer_name)
            query = query.eq('orderer_name', filter.orderer_name)

        if (filter.orderer_phone)
            query = query.eq('orderer_phone', filter.orderer_phone)

        if (filter.orderer_email)
            query = query.eq('orderer_email', filter.orderer_email)

        const { data: orders, error: orderError } = await query

        if (orders === null || orderError) {
            console.error(orderError)
            throw new Error(
                orderError?.message || 'Error while fetching orders'
            )
        }

        const orderIds = orders.map((order) => order.id)

        const productIdFilter = filter.product_id

        let orderItemsQuery = supabase
            .from('order_item')
            .select('product_id, order_id, amount, selected_options, product')
            .in('order_id', orderIds)

        if (productIdFilter) {
            orderItemsQuery = orderItemsQuery.eq('product_id', productIdFilter)
        }

        const { data: orderItems, error: orderItemsError } =
            await orderItemsQuery

        if (orderItems === null || orderItemsError) {
            console.error(orderError)
            throw new Error(
                orderItemsError?.message ||
                    'Error while fetching order products'
            )
        }

        type OrderItemType = typeof orderItems[number] & {
            product: ProductType
            selected_options: string[]
        }

        const orderItemsMap = orderItems.reduce((acc, item) => {
            if (!acc[item.order_id]) {
                acc[item.order_id] = []
            }

            acc[item.order_id].push(item as OrderItemType)

            return acc
        }, {} as Record<string, OrderItemType[]>)

        if (!productIdFilter) {
            return orders.map((order) => ({
                ...order,
                items: orderItemsMap[order.id] || [],
            }))
        }

        const filteredOrders = orders.filter((order) =>
            orderItemsMap[order.id]?.some(
                (orderProduct) => orderProduct.product_id === productIdFilter
            )
        )

        return filteredOrders.map((order) => ({
            ...order,
            items: orderItemsMap[order.id] || [],
        }))
    },
}
