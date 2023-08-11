import { supabase } from '@/supabase'

export default {
    async updateStage(rid: string, stage: string) {
        const result = await supabase
            .from('order_sheet')
            .update({
                stage,
            })
            .eq('rid', rid)
            .select()

        if (result.error) {
            return {
                status: 'error',
                message: result.error.message,
            } as const
        }

        return {
            status: 'success',
        } as const
    },
}
