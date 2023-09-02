import { ReactComponent as Refresh } from 'incart-fe-common/src/icons/Refresh.svg'
import { ReactComponent as Check } from 'incart-fe-common/src/icons/Check.svg'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import {
    FInput,
    FormField,
    FormikContext,
    Header1,
    Text1,
} from 'incart-fe-common'
import * as yup from 'yup'
import { useLoaderData } from 'react-router-dom'
import actions from './actions'
import { toast } from '@/functions'
import { ControlGroup, FloatingCheckButton } from '@/components'
import type loader from './loader'

export default () => {
    const store = useLoaderData() as Awaited<ReturnType<typeof loader>>

    const formik = useFormik({
        initialValues: store,
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required('이름을 입력해주세요')
                .min(2, '이름은 2글자 이상으로 입력해주세요')
                .max(10, '이름은 10글자 이하로 입력해주세요'),
        }),
        validateOnChange: true,

        async onSubmit(values) {
            const result = await actions.setStoreName(values)
            if (result.status === 'success') {
                location.reload()
            } else {
                toast(result.message)
            }
        },
    })

    return (
        <>
            <Vexile gap={3}>
                <Header1>정보 수정</Header1>
                <Text1 grey5>
                    작업 후 꼭 아래의 “변경사항 저장” 버튼을 눌러주세요
                </Text1>
            </Vexile>
            <FormikContext.Provider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <FloatingCheckButton
                        visible={formik.dirty}
                        ghost={{
                            icon: (props) => <Refresh {...props} />,
                            children: '원래대로 되돌리기',
                            active: !formik.isSubmitting,
                            onClick() {
                                location.reload()
                            },
                        }}
                        normal={{
                            icon: (props) => <Check {...props} />,
                            children: '변경사항 저장',
                            active: !formik.isSubmitting && formik.isValid,
                            type: 'submit',
                            onClick() {
                                formik.submitForm()
                            },
                        }}
                    />
                    <ControlGroup defaultOpened name="상점 정보">
                        <FormField name="상점 ID">
                            <FInput name="rid" disabled />
                        </FormField>
                        <FormField name="이름" required>
                            <FInput name="name" />
                        </FormField>
                    </ControlGroup>
                </form>
            </FormikContext.Provider>
        </>
    )
}
