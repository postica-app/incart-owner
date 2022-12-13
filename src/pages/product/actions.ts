import { supabase } from '@/supabase'

export default {
    async getAllProducts() {
        const result = await supabase.from('product').select('name, info, id')
        if (result.error) throw result.error

        return result.data
    },
}
