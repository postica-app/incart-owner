import { Vexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const BodyWrapper = styled(Vexile, {})

export default () => (
    <>
        <Sidebar
            css={{
                position: 'fixed',
                left: '15rem',
                top: '18rem',
            }}
        />
        <BodyWrapper gap={6}>
            <Outlet />
        </BodyWrapper>
    </>
)
