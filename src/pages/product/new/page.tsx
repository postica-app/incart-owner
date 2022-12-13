import {
    Button,
    FInput,
    FormField,
    FormikContext,
    ProductOptionType,
    ProductType,
} from 'incart-fe-common'
import { ReactComponent as Cart } from 'incart-fe-common/src/icons/Cart.svg'
import { useNavigate } from 'react-router-dom'
import { useSwitch } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'

import { FOptionListEditer, Breadcrumb } from '@/components'

import actions from './actions'

export default () => {
    const [productOptionUsage, _, __, Switch] = useSwitch({
        items: [
            {
                key: '사용 안함',
            },
            {
                key: '사용',
            },
        ],
    })
    const goto = useNavigate()
    const formik = useFormik<
        Partial<
            ProductType & {
                optionName: string
                options: ProductOptionType[]
            }
        >
    >({
        initialValues: {
            name: undefined,
            price: undefined,
            optionName: undefined,
            options: [],
        },
        onSubmit: async (values) => {
            const result = await actions.createNewProduct({
                name: values.name!,
                price: values.price!,
                options: values.options
                    ? [
                          {
                              name: values.optionName!,
                              items: values.options,
                          },
                      ]
                    : undefined,
            })
            goto('/product/' + result.id)
        },
        validateOnChange: false,
        validate(values) {
            const errors: Partial<Record<keyof typeof values, string>> = {}

            if (!values.price) errors.price = '가격을 입력해주세요'
            if (!values.name) errors.name = '이름을 입력해주세요'

            return errors
        },
    })

    return (
        <FormikContext.Provider value={formik}>
            <Breadcrumb />
            <form onSubmit={formik.handleSubmit}>
                <Vexile gap={6}>
                    <FormField name="상품 이름" required>
                        <FInput name="name" placeholder="봉이워터 500ML" />
                    </FormField>
                    <FormField name="가격 (원)" required>
                        <FInput
                            name="price"
                            placeholder="3500"
                            type="number"
                            min="1"
                            step="any"
                        />
                    </FormField>
                    <FormField name="옵션">{Switch}</FormField>
                    {productOptionUsage === '사용' && (
                        <>
                            <FormField name="옵션 이름">
                                <FInput name="optionName" placeholder="크기" />
                            </FormField>
                            <FormField name="옵션 목록" required>
                                <FOptionListEditer name="options" />
                            </FormField>
                        </>
                    )}
                    <Button
                        icon={(style) => <Cart style={style} />}
                        active={!formik.isSubmitting}
                        type="submit"
                    >
                        새 상품 만들기
                    </Button>
                </Vexile>
            </form>
        </FormikContext.Provider>
    )
}
