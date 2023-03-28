import { ReactComponent as Logo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { Button, colors, Header1, Text1 } from 'incart-fe-common'
import { Hexile, Vexile } from '@haechi/flexile'
import { NavLink } from 'react-router-dom'
import { ComponentProps, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

import { supabase } from '@/supabase'
import { router } from '@/main'
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
