import { ReactComponent as Storefront } from 'incart-fe-common/src/icons/Storefront.svg'
import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import { ICON_SIZE_24 } from '@/constants'
import { Vexile, Hexile } from '@haechi/flexile'
import { Text1 } from 'incart-fe-common'
import { User } from '@supabase/supabase-js'

export default {
    UserInfo({ getUser }: { getUser: () => User }) {
        const user = getUser()
        return (
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
        )
    },
}
