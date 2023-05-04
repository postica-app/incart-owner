import { supabase } from '@/supabase'
import { Doc } from '@/types/utils'
import { ProductType } from 'incart-fe-common'

export default {
    async updateProduct(product: Doc<ProductType>) {
        const result = await supabase
            .from('product')
            .update({
                ...product,
                options: product.options.map((option) => ({
                    ...option,
                    items: option.items.map((item) => ({
                        ...(item.info && { info: item.info }),
                        ...(item.priceDelta && { price: item.priceDelta }),
                        name: item.name,
                    })),
                })),
            })
            .eq('id', product.id)
            .select()

        if (result.error) throw result.error

        return result.data
    },
    async getProductById(id: string) {
        const result = await supabase
            .from('product')
            .select('*')
            .filter('id', 'eq', id)

        if (result.error) throw result.error

        return result.data[0] as unknown as Doc<ProductType>
    },
}
