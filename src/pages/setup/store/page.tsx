import { useEffect } from 'react'
import * as yup from 'yup'

import { SingleInputPage } from '@/components'
import { toast } from '@/functions'
import { router } from '@/main'
import actions from './actions'

export default () => {
    useEffect(() => {
        actions.isStoreExist().then((isExist) => {
            if (isExist) {
                router.navigate('/')
            }
        })
    }, [])

    return (
        <SingleInputPage
            title="쇼핑몰의 이름을 알려주세요"
            description="이후 설정에서 변경 가능합니다"
            placeholder="앗! 타이어 신발보다 싸다!"
            button={{
                submitText: '만들기',
            }}
            scheme={yup
                .string()
                .required('이름을 입력해주세요')
                .max(10, '최대 10글자까지 입력할 수 있어요')}
            onSubmit={async (name) => {
                try {
                    await actions.createStore(name)
                    toast('쇼핑몰이 생성되었습니다', '😍')
                    router.navigate('/')
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
