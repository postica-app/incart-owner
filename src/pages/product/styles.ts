import { Vexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

export const EmptyListStyles = {
    wrapper: styled(Vexile, {
        elevated: true,
        lightBorder: {
            color: '$grey1',
            withShadow: true,
        },
        borderRadius: '3rem',
    }),
}
