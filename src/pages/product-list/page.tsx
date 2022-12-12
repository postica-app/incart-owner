import { Hexile } from '@haechi/flexile'
import { Button, Callout, Header1, styled, Text1 } from 'incart-fe-common'
import { ReactComponent as Support } from 'incart-fe-common/src/icons/Support Agent.svg'
import { ReactComponent as Cart } from 'incart-fe-common/src/icons/Cart.svg'
import { useLoaderData } from 'react-router-dom'
import Parts from './parts'

export const info = {
    group: '판매',
    name: '상품 목록',
}

export const dataLoader = async () => {
    return []
}

export default () => {
    const data = useLoaderData() as Awaited<ReturnType<typeof dataLoader>>

    return (
        <>
            <Callout fillx icon={(style) => <Support style={style} />}>
                사용법이 어려울 땐 고민말고 오른쪽 아래의 상담버튼을 눌러주세요
            </Callout>
            <Hexile x="space" y="center">
                <Hexile y="center" gap={3}>
                    <Header1>상품</Header1>
                    <Text1>{data.length}개</Text1>
                </Hexile>
                <Button icon={(style) => <Cart style={style} />} ghost>
                    새 상품 등록
                </Button>
            </Hexile>

            {data.length === 0 ? (
                <Parts.EmptyList />
            ) : (
                <>내가 두 눈으로 똑똑하 봤당께요!!</>
            )}
        </>
    )
}
