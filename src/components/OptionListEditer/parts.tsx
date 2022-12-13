import { ReactComponent as X } from 'incart-fe-common/src/icons/X.svg'
import {
    Header1,
    FormField,
    FInput,
    FormikContext,
    Button,
    ProductOptionType,
} from 'incart-fe-common'
import { useFormik } from 'formik'

import { Hexile, Vexile } from '@haechi/flexile'
import { ICON_SIZE_24 } from '@/constants'

export const OptionEditModal: React.FC<{
    closeModal: () => void
    onSubmit: (newOption: ProductOptionType) => void
    options: ProductOptionType[]
    editExistingOption?: ProductOptionType
}> = (props) => {
    const formik = useFormik<ProductOptionType>({
        initialValues: props.editExistingOption || {
            name: '',
            priceDelta: undefined,
            info: undefined,
        },
        validate: (values) => {
            const errors: Partial<Record<keyof typeof values, string>> = {}

            if (!values['name']) {
                errors.name = '항목 이름을 입력해주세요'
            }

            if (
                !props.editExistingOption &&
                props.options.some((option) => option.name === values.name)
            ) {
                errors.name = '이미 추가된 옵션과 이름이 동일합니다'
            }

            return errors
        },
        onSubmit(values) {
            props.onSubmit(values)
            props.closeModal()
        },
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <FormikContext.Provider value={formik}>
                    <Vexile gap={6}>
                        <Hexile x="space" y="center">
                            <Header1>옵션 추가</Header1>
                            <X
                                style={ICON_SIZE_24}
                                onClick={() => props.closeModal()}
                            />
                        </Hexile>
                        <FormField name="항목 이름" required>
                            <FInput name="name" />
                        </FormField>
                        <FormField
                            name="변동 가격 (원)"
                            info="이 옵션을 골랐을 떄 변동되는 가격을 적어주세요. 음수(예: -500)도 가능합니다."
                        >
                            <FInput
                                name="priceDelta"
                                type="number"
                                placeholder="-500"
                            />
                        </FormField>
                        <FormField
                            name="옵션 설명"
                            info="옵션을 선택했을 떄 아래에 표시되는 설명입니다"
                        >
                            <FInput name="info" placeholder="" />
                        </FormField>
                        <Button type="submit">+ 옵션 추가하기</Button>
                    </Vexile>
                </FormikContext.Provider>
            </form>
        </>
    )
}
