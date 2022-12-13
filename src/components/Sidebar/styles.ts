import { Vexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

export default {
    Wrapper: styled(Vexile, {
        width: '60rem',
    }),
    NavSection: styled('div', {
        padding: '3rem',
        borderRadius: '3rem',
        clickAnimation: true,
        '&>p': {
            color: '$grey5',
        },
        variants: {
            selected: {
                true: {
                    backgroundColor: '$grey1',
                    '&>p': {
                        color: 'black',
                    },
                },
            },
        },
    }),
}
