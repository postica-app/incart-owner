import {
    Text1,
    Button,
    FInput,
    Header1,
    useSwitch,
    FormField,
    ProductType,
    FormikContext,
} from 'incart-fe-common'
import { ReactComponent as Refresh } from 'incart-fe-common/src/icons/Refresh.svg'
import { ReactComponent as Check } from 'incart-fe-common/src/icons/Check.svg'
import { ReactComponent as Trash } from 'incart-fe-common/src/icons/Trash.svg'

import { Hexile, Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import { useState } from 'react'

import { FloatingCheckButton, FOptionListEditer } from '@/components'
import { Doc } from '@/types/utils'
import actions from './actions'

export default {
    EditProductInfo(props: { product: Doc<ProductType> }) {
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
                await actions.updateProduct(values)
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
                        <FormField
                            name="상세 설명"
                            info="상품을 설명을 적어주세요. 상품의 이름과 함께 표시됩니다."
                        >
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
    },
    AskDeleteProduct: (props: {
        name: string
        onDelete: () => Promise<void>
        onClose: () => void
    }) => {
        const [isDeleting, setIsDeleting] = useState(false)

        const callDelete = async () => {
            setIsDeleting(true)
            await props.onDelete()
            setIsDeleting(false)
        }

        return (
            <>
                <Vexile gap={3}>
                    <Hexile gap={1}>
                        <Header1>
                            <u>{props.name}</u> 상품을 삭제할까요?
                        </Header1>
                    </Hexile>
                    <Text1 grey5>
                        상품을 삭제한 후엔 고객센터 문의를 통해서만 복구할 수
                        있습니다
                    </Text1>
                </Vexile>
                <Hexile gap={4} x="right">
                    <Button ghost onClick={props.onClose} disabled={isDeleting}>
                        돌아가기
                    </Button>
                    <Button
                        danger
                        icon={(d) => <Trash {...d} />}
                        onClick={callDelete}
                        loading={isDeleting}
                    >
                        네, 삭제할게요
                    </Button>
                </Hexile>
            </>
        )
    },
}
