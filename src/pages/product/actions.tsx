import { toast } from '@/functions'
import { supabase } from '@/supabase'

export default {
    async getAllProducts() {
        const result = await supabase
            .from('product')
            .select('name, info, id')
            .is('deleted_at', null)
        if (result.error) throw result.error

        return result.data
    },
    async copyEmbed(id: string) {
        // https://embed.incart.me/b928a2e1-bde1-4563-9c5e-9feb653317fd

        const embedUrl = import.meta.env.VITE_EMBED_URL + id
        await navigator.clipboard.writeText(embedUrl)

        toast(
            '임베드 링크가 클립보드에 복사되었습니다',

            '📋'
        )
    },
}
