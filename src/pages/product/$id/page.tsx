import { Button, Header1, ProductCard, ProductType } from 'incart-fe-common'
import { ReactComponent as Code } from 'incart-fe-common/src/icons/Code.svg'
import { useLoaderData } from 'react-router-dom'

import { Breadcrumb, ControlGroup } from '@/components'
import { Doc } from '@/types/utils'

import { EditProductInfo } from './parts'
import actions from '../actions'

export default () => {
    const product = useLoaderData() as Doc<ProductType>

    return (
        <>
            <Breadcrumb customReadable={['상품', product.name]} />
            <Header1>구매창 미리보기</Header1>
            <ProductCard product={product} />
            <Button
                icon={(props) => <Code {...props} />}
                ghost
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    actions.copyEmbed(product.id)
                }}
            >
                임베드 복사하기
            </Button>
            <ControlGroup
                defaultOpened
                name="상품 정보 수정 (이름, 가격, 상세설명, 옵션)"
            >
                <EditProductInfo product={product} />
            </ControlGroup>
        </>
    )
}
