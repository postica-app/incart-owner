import { supabase } from '@/supabase'

export default async () => {
    let { data, error } = await supabase.from('store').select('name, rid')
    if (error) throw error
    if (!data) throw new Error('No data')

    return data[0]
}
