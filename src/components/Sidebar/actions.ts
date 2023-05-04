import { router } from '@/main'
import { supabase } from '@/supabase'

export default {
    async getOwner() {
        const user = await supabase.auth.getUser()
        if (!user.data.user?.id) {
            router.navigate('/login')
            throw new Error('No user found')
        }

        const { data: ownerData, error: ownerError } = await supabase
            .from('owner')
            .select('*')
            .eq('id', user.data.user.id)
            .limit(1)

        if (ownerError) {
            router.navigate('/setup/owner')
            throw ownerError
        }
        if (!ownerData[0]?.id) {
            router.navigate('/setup/owner')
            throw new Error('User found but No owner found')
        }

        const { data: storeData, error: storeError } = await supabase
            .from('store')
            .select('*')
            .eq('owner_id', ownerData[0].id)
            .limit(1)

        if (storeError) {
            router.navigate('/setup/store')
            throw storeError
        }

        if (!storeData[0]?.rid) {
            router.navigate('/setup/store')
            throw new Error('No store found')
        }

        return {
            user,
            owner: ownerData[0],
            store: storeData[0],
        }
    },
}
