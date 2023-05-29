import { ReactComponent as Logo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { Button, colors, Header1, Text1 } from 'incart-fe-common'
import { Hexile, Vexile } from '@haechi/flexile'
import { Link, NavLink } from 'react-router-dom'
import { ComponentProps } from 'react'

import styles from './styles'
import Parts from './Parts'

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
        ],
    },
    {
        groupName: '운영',
        items: [
            {
                name: '상품 수령 방법 (배송)',
                link: '/shipping',
            },
        ],
    },
]

export const Sidebar: React.FC<ComponentProps<(typeof styles)['Wrapper']>> = (
    props
) => {
    return (
        <styles.Wrapper gap={12} {...props}>
            <Link to="/">
                <Logo
                    style={{ height: '7rem', width: '28rem' }}
                    color={colors.purple}
                />
            </Link>
            <Vexile gap={6}>
                <Parts.UserInfo />
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
