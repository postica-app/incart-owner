import { ReactComponent as Storefront } from 'incart-fe-common/src/icons/Storefront.svg'
import { ReactComponent as Logo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import { Button, colors, Header1, Text1 } from 'incart-fe-common'
import { Hexile, Vexile } from '@haechi/flexile'
import { NavLink } from 'react-router-dom'
import { ComponentProps } from 'react'

import { ICON_SIZE_24 } from '../../constants'
import styles from './styles'

// TODO: Replace these linkes with dynamic imports
const PAGE_LINKS = [
    {
        groupName: '판매',
        items: [
            {
                name: '상품 목록',
                link: '/product',
            },
            {
                name: '주문 내역',
                link: '/order',
            },
            {
                name: '여러번 주문한 손님',
                link: '/regular-customer',
            },
        ],
    },
    {
        groupName: '운영',
        items: [
            {
                name: '통계',
                link: '/chart',
            },
            {
                name: '상점 공지',
                link: '/store-notice',
            },
            {
                name: '결제 수단',
                link: '/payment-method',
            },
            {
                name: '테마',
                link: '/appearance',
            },
        ],
    },
]

export const Sidebar: React.FC<ComponentProps<typeof styles['Wrapper']>> = (
    props
) => {
    return (
        <styles.Wrapper gap={12} {...props}>
            <Logo
                style={{ height: '7rem', width: '28rem' }}
                color={colors.purple}
            />
            <Vexile gap={6}>
                <Vexile gap={2}>
                    <Hexile gap={1.5} y="center">
                        <Person style={ICON_SIZE_24} />
                        <Text1>
                            <b>김선달</b> 사장님
                        </Text1>
                    </Hexile>
                    <Hexile gap={1.5} y="center">
                        <Storefront style={ICON_SIZE_24} />
                        <Text1>봉이프레시</Text1>
                    </Hexile>
                </Vexile>
                <Button ghost>상점 정보 수정</Button>
            </Vexile>
            {PAGE_LINKS.map((group) => (
                <Vexile key={group.groupName}>
                    <Hexile padding={3}>
                        <Header1 grey5>{group.groupName}</Header1>
                    </Hexile>
                    {group.items.map((item) => (
                        <NavLink
                            key={item.link}
                            to={item.link}
                            style={{
                                color: 'unset',
                                textDecoration: 'none',
                            }}
                        >
                            {({ isActive }) => (
                                <styles.NavSection selected={isActive}>
                                    <Text1>{item.name}</Text1>
                                </styles.NavSection>
                            )}
                        </NavLink>
                    ))}
                </Vexile>
            ))}
        </styles.Wrapper>
    )
}

export default Sidebar
