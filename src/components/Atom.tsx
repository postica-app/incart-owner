import { styled } from 'incart-fe-common'
import { Link } from 'react-router-dom'

export const Plink = styled(Link, {
    color: 'unset',
    textDecoration: 'none',
    variants: {
        animation: {
            true: {},
        },
    },
})
