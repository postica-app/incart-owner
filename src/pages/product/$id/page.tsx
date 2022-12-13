import { LoaderFunction, useLoaderData, useParams } from 'react-router-dom'
import { Header1, ProductCard, ProductType } from 'incart-fe-common'

import { Breadcrumb, ControlGroup } from '@/components'
import { toast } from '@/functions/toast'
import { supabase } from '@/supabase'
import { EditProductInfo } from './parts'

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
    const product = useLoaderData() as ProductType

    return (
        <>
            <Breadcrumb customReadable={['상품', product.name]} />
            <Header1>구매창 미리보기</Header1>
            <ProductCard product={product} />
            <ControlGroup name="상품 정보 수정 (이름, 가격, 상세설명, 옵션)">
                <EditProductInfo product={product} />
            </ControlGroup>
        </>
    )
}
