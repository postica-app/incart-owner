import { Button, Header1, ProductCard, ProductType } from 'incart-fe-common'
import { ReactComponent as Code } from 'incart-fe-common/src/icons/Code.svg'
import { ReactComponent as Trash } from 'incart-fe-common/src/icons/Trash.svg'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { Breadcrumb, ControlGroup } from '@/components'
import { Doc } from '@/types/utils'
import { useModal } from '@/hooks'

import productListActions from '../actions'
import actions from './actions'
import Parts from './parts'

export default () => {
    const product = useLoaderData() as Doc<ProductType>
    const showModal = useModal()
    const goto = useNavigate()

    const deleteProduct = (async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const result = await actions.deleteProduct(product, showModal)

        if (result.status === 'success') {
            goto('..')
            return
        }
    }) satisfies React.MouseEventHandler<HTMLButtonElement>

    const copyEmbed = ((e) => {
        e.preventDefault()
        e.stopPropagation()
        productListActions.copyEmbed(product.id)
    }) satisfies React.MouseEventHandler<HTMLButtonElement>

    return (
        <>
            <Breadcrumb customReadable={['상품', product.name]} />
            <Header1>구매창 미리보기</Header1>
            <ProductCard product={product} />
            <Button
                icon={(props) => <Code {...props} />}
                ghost
                onClick={copyEmbed}
            >
                임베드 복사하기
            </Button>
            <ControlGroup
                defaultOpened
                name="상품 정보 수정 (이름, 가격, 상세설명, 옵션)"
            >
                <Parts.EditProductInfo product={product} />
            </ControlGroup>
            <Button
                icon={(props) => <Trash {...props} />}
                ghost
                danger
                onClick={deleteProduct}
            >
                상품 삭제하기
            </Button>
        </>
    )
}
