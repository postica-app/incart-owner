import { Hexile } from '@haechi/flexile'
import { Header2 } from 'incart-fe-common'
import React, { ComponentProps, ReactNode, useState } from 'react'
import styles from './styles'

export const ControlGroup: React.FC<
    {
        children: ReactNode
        name: string
        defaultOpened?: boolean
    } & ComponentProps<typeof styles.Wrapper>
> = ({ defaultOpened, name, children, ...props }) => {
    const [opened, setOpened] = useState(!!defaultOpened)

    return (
        <styles.Wrapper padding={6} gap={6} {...props}>
            <Hexile gap={3} onClick={() => setOpened((t) => !t)}>
                <Header2>
                    {opened ? '↑ ' : '↓ '}
                    {name}
                </Header2>
            </Hexile>
            {opened ? children : <></>}
        </styles.Wrapper>
    )
}
