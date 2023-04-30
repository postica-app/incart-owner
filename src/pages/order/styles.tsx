import { Maximizer } from '@/components'
import { styled } from 'incart-fe-common'

export default {
    GridWrapper: styled(Maximizer, {
        border: '1px solid #eee',
        borderRadius: '2rem',
        animated: true,
        variants: {
            loading: {
                true: {
                    opacity: 0.5,
                },
            },
        },
    }),
}
