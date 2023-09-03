import { ReactComponent as Logo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { Button, colors, Header1, Text1, Text2 } from 'incart-fe-common'
import { Hexile, Vexile } from '@haechi/flexile'
import { Link, NavLink } from 'react-router-dom'
import { ComponentProps } from 'react'

import styles from './styles'
import Parts from './Parts'
import { Plink } from '../Atom'

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
            <Plink to={'/store-info'}>
                <Vexile gap={6}>
                    <Parts.UserInfo />
                    <Button ghost>상점 정보 수정</Button>
                </Vexile>
            </Plink>
            <Vexile filly style={{ margin: '-3rem' }}>
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
            </Vexile>
            <div>
                <p>Copyright ⓒ포스티카. All Rights Reserved</p>
                <p>
                    사업자등록번호: 484-26-01833 <br />
                    대표: 박정한
                    <br />
                    이메일: rycont@postica.app
                    <br />
                    호스팅제공자: 클라우드플레어코리아 유한책임회사, Supabase
                    Inc, Deno Land Inc
                    <br />
                    주소: 강원도 화천군 간동면 온수길 12
                </p>
                <p>포스티카와 인카트는 상품 판매의 당사자가 아닙니다</p>
            </div>
        </styles.Wrapper>
    )
}

export default Sidebar
