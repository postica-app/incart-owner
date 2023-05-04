import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import * as yup from 'yup'

import { SingleInputPage } from '@/components'
import { router } from '@/main'
import actions from './actions'
import { useEffect } from 'react'
import { toast } from '@/functions'

export default () => {
    useEffect(() => {
        actions.checkIfOwnerExists().then((exists) => {
            if (!exists) return
            router.navigate('/setup/owner/start')
        })
    }, [])

    return (
        <SingleInputPage
            title="사장님의 성함을 알려주세요"
            scheme={yup
                .string()
                .required('이름을 입력해주세요')
                .max(15, '최대 15글자까지 입력할 수 있어요')}
            placeholder="김선달"
            inputIcon={(props) => <Person {...props} />}
            onSubmit={async (name) => {
                try {
                    await actions.createOwner(name)
                    toast('멋진 이름이네요', '😍')
                    router.navigate('/setup/store')
                } catch (e) {
                    if (typeof e === 'string') {
                        toast(e, '😥')
                    } else if (typeof (e as Error).message === 'string') {
                        toast((e as Error).message, '😥')
                    } else if ((e as Error).toString) {
                        toast((e as Error).toString(), '😥')
                    }
                }
            }}
        />
    )
}
