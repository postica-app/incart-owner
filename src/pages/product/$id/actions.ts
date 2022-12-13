import { supabase } from '@/supabase'
import { Doc } from '@/types/utils'
import { ProductType } from 'incart-fe-common'

export default {
    async updateProduct(product: Doc<ProductType>) {
        const result = await supabase
            .from('product')
            .update(product)
            .eq('id', product.id)
            .select()

        if (result.error) throw result.error

        return result.data
    },
}
