import { ShippingMethodType } from 'incart-fe-common'
import { supabase } from '@/supabase'
import { toast } from '@/functions'

export default {
    async setShippingMethods(_shippingMethods: ShippingMethodType[]) {
        const me = await supabase.auth.getUser()
        const ownerId = me.data.user?.id
        if (!ownerId) {
            toast('사용자 정보를 불러오지 못했어요', '⚠️')
            return
        }

        const shipping_method = _shippingMethods.map((method) => ({
            ...method,
            info: method.info || null,
        }))

        const action = await supabase
            .from('store')
            .update({
                shipping_method,
            })
            .eq('owner_id', ownerId)

        if (action.error) {
            throw action.error
        }
    },
}
