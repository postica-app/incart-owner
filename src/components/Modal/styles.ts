import { Vexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

export default {
    Backdrop: styled('div', {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        inset: '0px',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6rem',
        zIndex: 2,
        '&>*:not(:last-child)': {
            filter: 'blur(2px)',
        },
    }),
    Modal: styled(Vexile, {
        borderRadius: '3rem',
        lightBorder: {
            color: '$grey2',
            withShadow: true,
        },
        backgroundColor: 'white',
        width: '180rem',
        position: 'fixed',
    }),
}
