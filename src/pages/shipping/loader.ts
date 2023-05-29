import { LoaderFunction } from 'react-router-dom'
import { toast } from '@/functions/toast'
import { getStoreInfo } from '@/functions/getStoreInfo'

export default <LoaderFunction>(async () => {
    try {
        const store = await getStoreInfo.ignoreCache()

        return store.shipping_method
    } catch (e) {
        toast('수령 방법 정보를 가져오지 못했어요', '⚠️')
    }
})
