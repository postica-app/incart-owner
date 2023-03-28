import { Hexile } from '@haechi/flexile'
import { Header2 } from 'incart-fe-common'
import React, { ReactNode, useState } from 'react'
import styles from './styles'

export const ControlGroup: React.FC<{
    children: ReactNode
    name: string
    defaultOpened?: boolean
}> = (props) => {
    const [opened, setOpened] = useState(!!props.defaultOpened)

    return (
        <styles.Wrapper
            padding={6}
            gap={6}
            onClick={() => setOpened((t) => !t)}
        >
            <Hexile gap={3}>
                <Header2>
                    {opened ? '↑ ' : '↓ '}
                    {props.name}
                </Header2>
            </Hexile>
            {opened ? props.children : <></>}
        </styles.Wrapper>
    )
}
