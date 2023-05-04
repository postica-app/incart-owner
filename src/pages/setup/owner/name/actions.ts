import { supabase } from '@/supabase'

export default {
    async createOwner(name: string) {
        const user = await supabase.auth.getUser()
        if (!user || user.error) {
            throw new Error('User not found')
        }

        const { data, error } = await supabase
            .from('owner')
            .insert({
                id: user.data.user.id,
                name,
            })
            .select('*')

        if (error) {
            throw new Error(error.message)
        }

        if (!data || data.length === 0) {
            throw new Error('Owner not found')
        }

        const owner = data[0]
        if (owner.name !== name || owner.id !== user.data.user.id) {
            throw new Error('Owner not created')
        }

        return owner
    },
    async checkIfOwnerExists() {
        const user = await supabase.auth.getUser()
        if (!user || user.error) {
            throw new Error('User not found')
        }

        const { data, error } = await supabase
            .from('owner')
            .select('name, id')
            .eq('id', user.data.user.id)

        if (error) {
            throw new Error(error.message)
        }

        if (!data || data.length === 0) {
            return false
        }

        return true
    },
}
