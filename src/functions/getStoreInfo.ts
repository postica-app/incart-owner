import { StoreType } from 'incart-fe-common'
import { supabase } from '@/supabase'
import { toast } from './toast'
import { memo } from './memo'

export const getStoreInfo = memo('storeInfo', 1000 * 60 * 60, async () => {
    const store = await supabase.from('store').select()
    if (!store.data) {
        toast('상점 정보를 가져올 수 없습니다')
        throw new Error('Cannot fetch store data')
    }

    return store.data[0] as unknown as StoreType
})
