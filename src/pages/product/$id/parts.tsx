import {
    Button,
    FInput,
    FormField,
    FormikContext,
    ProductType,
    useSwitch,
} from 'incart-fe-common'
import { ReactComponent as Refresh } from 'incart-fe-common/src/icons/Refresh.svg'
import { ReactComponent as Check } from 'incart-fe-common/src/icons/Check.svg'
import { useFormik } from 'formik'
import { FloatingCheckButton, FOptionListEditer } from '@/components'
import { Vexile } from '@haechi/flexile'
import actions from './actions'
import { Doc } from '@/types/utils'

export const EditProductInfo: React.FC<{
    product: Doc<ProductType>
}> = (props) => {
    const [productOptionUsage, _, __, Switch] = useSwitch({
        items: [
            {
                key: '사용 안함',
            },
            {
                key: '사용',
            },
        ],
        selectedKey: props.product.options ? '사용' : '사용 안함',
    })

    const formik = useFormik<Doc<ProductType>>({
        initialValues: props.product,
        validate(values) {
            const errors: Partial<Record<keyof typeof values, string>> = {}

            if (!values.price) errors.price = '가격을 입력해주세요'
            if (!values.name) errors.name = '이름을 입력해주세요'

            return errors
        },
        async onSubmit(values) {
            const result = await actions.updateProduct(values)
            location.reload()
        },
    })

    return (
        <FormikContext.Provider value={formik}>
            <form
                onSubmit={formik.handleSubmit}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                <FloatingCheckButton
                    visible={formik.dirty}
                    ghost={{
                        icon: (style) => <Refresh style={style} />,
                        children: '기본 설정으로 되돌리기',
                        active: !formik.isSubmitting,
                        onClick() {
                            location.reload()
                        },
                    }}
                    normal={{
                        icon: (style) => <Check style={style} />,
                        children: '변경사항 저장',
                        active: !formik.isSubmitting,
                        type: 'submit',
                        onClick() {
                            formik.submitForm()
                        },
                    }}
                />
                <Vexile gap={6}>
                    <FormField name="상품 이름" required>
                        <FInput name="name" />
                    </FormField>
                    <FormField name="가격 (원)" required>
                        <FInput name="price" type="number" />
                    </FormField>
                    <FormField name="상세 설명">
                        <FInput name="info" />
                    </FormField>
                    <FormField name="옵션">{Switch}</FormField>
                    {productOptionUsage === '사용' && (
                        <>
                            <FormField name="옵션 이름">
                                <FInput name="options[0].name" />
                            </FormField>
                            <FormField name="옵션">
                                <FOptionListEditer name="options[0].items" />
                            </FormField>
                        </>
                    )}
                </Vexile>
            </form>
        </FormikContext.Provider>
    )
}
