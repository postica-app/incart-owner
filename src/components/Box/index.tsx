import { styled } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'

export const Box = styled(Vexile, {
    elevated: true,
    border: '0.5rem solid',
    backgroundColor: 'white',
    borderRadius: '3rem',
    variants: {
        border: {
            grey1: {
                borderColor: '$grey1',
            },
            grey2: {
                borderColor: '$grey2',
            },
        },
    },
    defaultVariants: {
        border: 'grey1',
    },
})

Box.defaultProps = {
    gap: 6,
    padding: 12,
}

export default Box
