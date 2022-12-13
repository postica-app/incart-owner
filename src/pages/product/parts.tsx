import emptyHandImage from 'incart-fe-common/src/images/empty-hand.png'
import { Text1 } from 'incart-fe-common'

import { EmptyListStyles } from './styles'

export default {
    EmptyList: () => (
        <EmptyListStyles.wrapper padding={15} gap={4} x="center">
            <Text1 grey5>상품 목록이 비어있습니다</Text1>
            <img src={emptyHandImage} />
        </EmptyListStyles.wrapper>
    ),
}
