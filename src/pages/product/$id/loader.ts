import { LoaderFunction } from 'react-router-dom'
import { toast } from '@/functions/toast'
import actions from './actions'

export default (async (props) => {
    const { id } = props.params as {
        id: string
    }

    try {
        const product = await actions.getProductById(id)
        return product
    } catch (e) {
        toast('상품 정보를 가져오지 못했어요', '⚠️')
    }
}) as LoaderFunction
