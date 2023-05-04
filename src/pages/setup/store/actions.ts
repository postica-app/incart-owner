import { supabase } from '@/supabase'
import { redirect } from 'react-router-dom'

export default {
    async createStore(name: string) {
        const user = await supabase.auth.getUser()
        if (!user || user.error) {
            redirect('/')
            throw new Error('User not found')
        }

        const { data, error } = await supabase
            .from('store')
            .insert({
                name,
                owner_id: user.data.user.id,
            })
            .select('*')

        if (error) {
            throw new Error(error.message)
        }

        if (!data || data.length === 0) {
            throw new Error('Store not found')
        }

        const store = data[0]
        if (store.name !== name || store.owner_id !== user.data.user.id) {
            throw new Error('Store not created')
        }

        return store
    },
    async isStoreExist() {
        const user = await supabase.auth.getUser()
        if (!user || user.error) {
            redirect('/')
            throw new Error('User not found')
        }

        const { data, error } = await supabase
            .from('store')
            .select('*')
            .eq('owner_id', user.data.user.id)
            .limit(1)

        if (error) {
            throw new Error(error.message)
        }

        if (!data || data.length === 0) {
            return false
        }

        return true
    },
}
