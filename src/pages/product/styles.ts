import { Vexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

export const ListItem = {
    wrapper: styled(Vexile, {
        elevated: true,
        lightBorder: {
            color: '$grey1',
            withShadow: true,
        },
        borderRadius: '3rem',
    }),
}

export default {
    ProductGrid: styled('div', {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    }),
}
