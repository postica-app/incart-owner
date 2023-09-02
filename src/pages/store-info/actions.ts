import { supabase } from '@/supabase'
import loader from './loader'

export default {
    async setStoreName(store: Awaited<ReturnType<typeof loader>>) {
        const { error } = await supabase
            .from('store')
            .update(store)
            .eq('rid', store.rid)

        if (error)
            return {
                status: 'error',
                message: error.message,
            } as const

        return {
            status: 'success',
        } as const
    },
}
