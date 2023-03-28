import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { ReactComponent as Email } from 'incart-fe-common/src/icons/Email.svg'
import {
    Button,
    colors,
    FInput,
    Text1,
    Text2,
    FormikContext,
} from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import * as yup from 'yup'

import scribbleNotePath from '@/images/scribble-note.png'
import { Box } from '@/components'
import actions from './actions'

export default () => {
    const formik = useFormik<{
        email: string
    }>({
        initialValues: {
            email: '',
        },
        async onSubmit(values) {
            await actions.login(values.email)
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required('이메일을 입력해주세요')
                .email('이메일 형식을 다시 확인해주세요'),
        }),
    })

    return (
        <FormikContext.Provider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Vexile
                    style={{
                        backgroundColor: colors.grey1,
                        minHeight: '100vh',
                    }}
                    fillx
                    filly
                    x="center"
                    y="center"
                >
                    <Box
                        padding={12}
                        gap={6}
                        x="center"
                        y="center"
                        css={{
                            width: '100rem',
                        }}
                    >
                        <img
                            src={scribbleNotePath}
                            style={{ width: '40rem' }}
                        />
                        <Vexile x="center" gap={1}>
                            <Text1>이메일을 입력해주세요</Text1>
                            <Text2 grey5>
                                이메일로 로그인 / 가입 링크를 보내드려요
                            </Text2>
                        </Vexile>
                        <Vexile fillx>
                            <FInput
                                name="email"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="kimsundal@cloud.com"
                                icon={(style) => <Email style={style} />}
                            />
                        </Vexile>
                        <Button
                            active={!formik.isSubmitting}
                            icon={(props) => <Arrow {...props} />}
                            type="submit"
                        >
                            다음
                        </Button>
                    </Box>
                </Vexile>
            </form>
        </FormikContext.Provider>
    )
}
