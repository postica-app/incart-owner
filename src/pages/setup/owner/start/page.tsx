import { ReactComponent as Email } from 'incart-fe-common/src/icons/Email.svg'
import * as yup from 'yup'

import { SingleInputPage } from '@/components'
import { router } from '@/main'

export default () => {
    return (
        <SingleInputPage
            title="처음 뵙겠습니다 사장님!"
            description="이제 쇼핑몰을 시작해볼게요"
            hideInput
            placeholder="김선달"
            button={{
                submitText: '출발!',
            }}
            inputIcon={(props) => <Email {...props} />}
            onSubmit={() => {
                router.navigate('/setup/owner/name')
            }}
        />
    )
}
