import { Hexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

const styles = {
    Item: styled(Hexile, {
        border: '1rem solid $grey1',
        borderRadius: '3rem',
    }),
}

styles.Item.defaultProps = {
    padding: 4,
}

export default styles
