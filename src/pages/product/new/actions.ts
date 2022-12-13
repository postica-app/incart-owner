import { storeInfo } from '../../../functions/getStoreInfo'
import { supabase } from '../../../supabase'
import { Product } from '../../../types/Product'
import { Doc } from '../../../types/utils'

export default {
    async createNewProduct(product: Product) {
        const insertResult = await supabase
            .from('product')
            .insert({ ...product, store_id: (await storeInfo()).id })
            .select()

        if (insertResult.error) throw insertResult.error

        return insertResult.data[0] as Doc<Product>
    },
}
