import { ReactComponent as Support } from 'incart-fe-common/src/icons/Support Agent.svg'
import { ReactComponent as Cart } from 'incart-fe-common/src/icons/Cart.svg'
import { Button, Callout, Text1 } from 'incart-fe-common'
import { useLoaderData } from 'react-router-dom'
import { Hexile } from '@haechi/flexile'

import { Breadcrumb, Plink } from '@/components'
import Styles from './styles'
import loader from './loader'
import Parts from './parts'

export default () => {
    const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

    return (
        <>
            <Callout fillx icon={(style) => <Support style={style} />}>
                사용법이 어려울 땐 고민말고 오른쪽 아래의 상담버튼을 눌러주세요
            </Callout>
            <Hexile x="space" y="center">
                <Hexile y="center" gap={3}>
                    <Breadcrumb />
                    <Text1>{data.length}개</Text1>
                </Hexile>
                <Plink to={'new'}>
                    <Button
                        icon={(props) => <Cart {...props} />}
                        ghost
                        active={true}
                    >
                        새 상품 등록
                    </Button>
                </Plink>
            </Hexile>

            {data.length === 0 ? (
                <Parts.EmptyList />
            ) : (
                <Styles.ProductGrid>
                    {data.map((product) => (
                        <Parts.ProductListItem
                            key={product.id}
                            product={product}
                        />
                    ))}
                </Styles.ProductGrid>
            )}
        </>
    )
}
