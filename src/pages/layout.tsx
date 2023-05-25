import { Outlet, useLocation } from 'react-router-dom'
import { styled } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'

import { Sidebar } from '@/components'
import { PageConfig } from '@/types'

const BodyWrapper = styled('div', {
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    padding: '15rem 12rem',
    gap: '8rem',
})

const ContentWrapper = styled(Vexile, {
    margin: '0rem auto',
    maxWidth: '180rem',
    position: 'absolute',
    left: 0,
    right: 0,
    '@tablet': {
        position: 'unset',
        maxWidth: 'unset',
        margin: 'unset',
        flex: 1,
    },
    variants: {
        wide: {
            true: {
                position: 'unset',
                maxWidth: 'unset',
                margin: 'unset',
                flex: 1,
            },
        },
    },
})

export default (props: { configs: Record<string, PageConfig | null> }) => {
    const location = useLocation()
    const config = props.configs[location.pathname.slice(1)]

    return config?.hideLayout ? (
        <Outlet />
    ) : (
        <BodyWrapper>
            <Sidebar
                css={{
                    // position: 'fixed',
                    // left: '15rem',
                    // top: '18rem',
                    // '@tablet': {
                    position: 'initial',
                    left: 'unset',
                    top: 'unset',
                    // },
                }}
            />
            <ContentWrapper gap={6} wide={config?.wide}>
                <Outlet />
            </ContentWrapper>
        </BodyWrapper>
    )
}
