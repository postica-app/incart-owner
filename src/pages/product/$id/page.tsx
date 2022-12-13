import { LoaderFunction, useLoaderData, useParams } from 'react-router-dom'
import { ProductCard, ProductType } from 'incart-fe-common'

import { Breadcrumb } from '@/components'
import { toast } from '@/functions/toast'
import { supabase } from '@/supabase'

export const dataLoader: LoaderFunction = async (props) => {
    const { id } = props.params as {
        id: string
    }

    const result = await supabase
        .from('product')
        .select('*')
        .filter('id', 'eq', id)

    if (result.error) {
        toast('상품 정보를 가져오지 못했어요', '⚠️')
        throw result.error
    }

    return result.data[0]
}

export default () => {
    const params = useParams() as {
        id: string
    }
    const product = useLoaderData() as ProductType

    return (
        <>
            <Breadcrumb customReadable={['상품', product.name]} />
            <ProductCard product={product} />
        </>
    )
}
