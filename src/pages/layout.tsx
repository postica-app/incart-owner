import { Outlet, useMatches } from 'react-router-dom'
import { styled } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'

import { Modal, Sidebar } from '@/components'
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

export default () => {
    const match = useMatches()
    const handle = match.slice(-1)[0].handle as { config: PageConfig }
    const config = handle?.config as PageConfig

    return config?.hideLayout ? (
        <Outlet />
    ) : (
        <BodyWrapper>
            <Sidebar
                css={{
                    position: 'initial',
                    left: 'unset',
                    top: 'unset',
                }}
            />
            <Modal />
            <ContentWrapper gap={6} wide={config?.wide}>
                <Outlet />
            </ContentWrapper>
        </BodyWrapper>
    )
}
