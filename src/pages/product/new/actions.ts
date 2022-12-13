import { ProductType } from 'incart-fe-common'

import { storeInfo } from '@/functions/getStoreInfo'
import { supabase } from '@/supabase'
import { Doc } from '@/types/utils'

export default {
    async createNewProduct(product: ProductType) {
        const insertResult = await supabase
            .from('product')
            .insert({ ...product, store_id: (await storeInfo()).id })
            .select('id')

        if (insertResult.error) throw insertResult.error

        return insertResult.data[0] as Doc<ProductType>
    },
}
