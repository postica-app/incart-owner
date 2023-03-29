import { ReactComponent as Storefront } from 'incart-fe-common/src/icons/Storefront.svg'
import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import { Vexile, Hexile } from '@haechi/flexile'
import { useEffect, useState } from 'react'
import { Text1 } from 'incart-fe-common'

import { ICON_SIZE_24 } from '@/constants'
import { router } from '@/main'

import actions from './actions'

export default {
    UserInfo() {
        const [user, setUser] = useState<Awaited<
            ReturnType<typeof actions['getOwner']>
        > | null>(null)

        useEffect(() => {
            actions
                .getOwner()
                .then(setUser)
                .catch((e) => {
                    console.error(e)
                    router.navigate('/login')
                })
        }, [])

        return (
            <Vexile gap={2}>
                <Hexile gap={1.5} y="center">
                    <Person style={ICON_SIZE_24} />
                    <Text1>
                        <b>{user?.owner.name || 'OOO'}</b> 사장님
                    </Text1>
                </Hexile>
                <Hexile gap={1.5} y="center">
                    <Storefront style={ICON_SIZE_24} />
                    <Text1>{user?.store?.name}</Text1>
                </Hexile>
            </Vexile>
        )
    },
}
