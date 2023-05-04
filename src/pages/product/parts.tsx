import { ReactComponent as Code } from 'incart-fe-common/src/icons/Code.svg'
import { ReactComponent as Cart } from 'incart-fe-common/src/icons/Cart.svg'
import { ReactComponent as Link } from 'incart-fe-common/src/icons/Link.svg'
import emptyHandImage from 'incart-fe-common/src/images/empty-hand.png'
import { Button, Header2, Text1, Text2 } from 'incart-fe-common'
import { Hexile, Vexile } from '@haechi/flexile'

import { ICON_SIZE_24 } from '@/constants'
import { Plink } from '@/components'
import { ListItem } from './styles'
import actions from './actions'

export default {
    EmptyList: () => (
        <ListItem.wrapper padding={15} gap={4} x="center">
            <Text1 grey5>상품을 등록해주세요!</Text1>
            <Plink to={'new'}>
                <Button
                    icon={(props) => <Cart {...props} />}
                    ghost
                    active={true}
                >
                    새 상품 등록
                </Button>
            </Plink>
            <img src={emptyHandImage} />
        </ListItem.wrapper>
    ),
    ProductListItem: (props: {
        product: { name: string; info?: string; id: string }
    }) => {
        return (
            <Plink animation to={props.product.id}>
                <ListItem.wrapper padding={6} gap={3}>
                    <Vexile gap={2}>
                        <Header2>{props.product.name}</Header2>
                        <Text2>{props.product.info}</Text2>
                    </Vexile>
                    <Hexile gap={3} x="right">
                        <Code
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                actions.copyEmbed(props.product.id)
                            }}
                            style={ICON_SIZE_24}
                        />
                        <Link style={ICON_SIZE_24} />
                    </Hexile>
                </ListItem.wrapper>
            </Plink>
        )
    },
}
