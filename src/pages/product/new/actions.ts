import { ProductType } from 'incart-fe-common'

import { getStoreInfo } from '@/functions/getStoreInfo'
import { supabase } from '@/supabase'
import { Doc } from '@/types/utils'

export default {
    async createNewProduct(product: Omit<ProductType, 'store_rid'>) {
        const insertResult = await supabase
            .from('product')
            .insert({
                ...product,
                store_rid: (await getStoreInfo()).rid,
                options: product.options.map((option) => ({
                    ...option,
                    items: option.items.map((item) => ({
                        ...(item.info && { info: item.info }),
                        ...(item.priceDelta && { price: item.priceDelta }),
                        name: item.name,
                    })),
                })),
            })
            .select('id')

        if (insertResult.error) throw insertResult.error

        return insertResult.data[0] as Doc<ProductType>
    },
}
