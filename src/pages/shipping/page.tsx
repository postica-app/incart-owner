import { ReactComponent as Refresh } from 'incart-fe-common/src/icons/Refresh.svg'
import { ReactComponent as Check } from 'incart-fe-common/src/icons/Check.svg'
import { ReactComponent as Truck } from 'incart-fe-common/src/icons/Truck.svg'
import { ReactComponent as Info } from 'incart-fe-common/src/icons/Info.svg'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import {
    FCheckbox,
    Header1,
    Text1,
    FormikContext,
    FormField,
    FInput,
    ShippingMethodType,
} from 'incart-fe-common'

import { ControlGroup, FloatingCheckButton } from '@/components'
import { useLoaderData } from 'react-router-dom'
import actions from './actions'
import { toast } from '@/functions'

export default () => {
    const shippingMethods = useLoaderData() as ShippingMethodType[]

    const parcelPolicy = shippingMethods.find(
        (method) => method.name === '택배'
    )
    const roughParcelPolicy = shippingMethods.find(
        (method) => method.name === '택배(도서산간)'
    )
    const visitPolicy = shippingMethods.find(
        (method) => method.name === '방문수령'
    )

    const formik = useFormik<{
        enableParcelDelivery: boolean
        enableVisit: boolean
        parcelPrice: number
        roughParcelPrice: number
        visitNotice: string
    }>({
        initialValues: {
            enableParcelDelivery: !!parcelPolicy,
            enableVisit: !!visitPolicy,
            parcelPrice: parcelPolicy?.price || 3000,
            roughParcelPrice: roughParcelPolicy?.price || 3000,
            visitNotice: visitPolicy?.info || '수령지 위치',
        },
        validate(values) {
            const errors: Partial<Record<keyof typeof values, string>> = {}

            if (values.enableParcelDelivery) {
                if (!values.parcelPrice)
                    errors.parcelPrice = '배송비를 입력해주세요'
                if (!values.roughParcelPrice)
                    errors.roughParcelPrice =
                        '도서산간지역의 배송비를 입력해주세요'
            }

            if (values.enableVisit) {
                if (!values.visitNotice)
                    errors.visitNotice = '방문 수령 안내를 입력해주세요'
            }

            if (!values.enableParcelDelivery && !values.enableVisit) {
                errors.enableParcelDelivery =
                    '택배 또는 방문 수령 중 하나는 사용해야 합니다'

                errors.enableVisit =
                    '택배 또는 방문 수령 중 하나는 사용해야 합니다'
            }

            return errors
        },
        validateOnChange: true,
        async onSubmit(values) {
            const newMethods: ShippingMethodType[] = [
                ...(values.enableParcelDelivery
                    ? [
                          {
                              name: '택배',
                              price: values.parcelPrice,
                              form: {
                                  address: 'required' as const,
                                  message: 'optional' as const,
                              },
                          },
                          {
                              name: '택배(도서산간)',
                              price: values.roughParcelPrice,
                              form: {
                                  address: 'required' as const,
                                  message: 'optional' as const,
                              },
                          },
                      ]
                    : []),
                ...(values.enableVisit
                    ? [
                          {
                              name: '방문수령',
                              price: 0,
                              form: {
                                  address: 'no' as const,
                                  message: 'no' as const,
                              },
                              info: values.visitNotice,
                          },
                      ]
                    : []),
            ]
            try {
                await actions.setShippingMethods(newMethods)
                location.reload()
            } catch (e) {
                toast('수령 방법을 변경하지 못했어요', '⚠️')
            }
        },
    })

    return (
        <>
            <Vexile gap={3}>
                <Header1>상품 수령 방법</Header1>
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
                    <Vexile gap={6}>
                        <ControlGroup defaultOpened name="택배">
                            <FCheckbox name="enableParcelDelivery">
                                <Text1>사용</Text1>
                            </FCheckbox>
                            {formik.errors.enableParcelDelivery && (
                                <Text1 blue>
                                    {formik.errors.enableParcelDelivery}
                                </Text1>
                            )}
                            <FormField name="배송비 (원)" required>
                                <FInput
                                    name="parcelPrice"
                                    type="number"
                                    disabled={
                                        !formik.values.enableParcelDelivery
                                    }
                                    icon={(props) => <Truck {...props} />}
                                />
                            </FormField>
                            <FormField name="도서산간 배송비 (원)" required>
                                <FInput
                                    name="roughParcelPrice"
                                    type="number"
                                    disabled={
                                        !formik.values.enableParcelDelivery
                                    }
                                    icon={(props) => <Truck {...props} />}
                                />
                            </FormField>
                        </ControlGroup>
                        <ControlGroup defaultOpened name="방문 수령">
                            <FCheckbox name="enableVisit">
                                <Text1>사용</Text1>
                            </FCheckbox>
                            {formik.errors.enableVisit && (
                                <Text1 blue>{formik.errors.enableVisit}</Text1>
                            )}
                            <FormField name="안내 메시지" required>
                                <FInput
                                    name="visitNotice"
                                    disabled={!formik.values.enableVisit}
                                    placeholder="방문수령 위치: 서울시 마포구 신수동 1-1"
                                    icon={(props) => <Info {...props} />}
                                />
                            </FormField>
                        </ControlGroup>
                    </Vexile>
                </form>
            </FormikContext.Provider>
        </>
    )
}
