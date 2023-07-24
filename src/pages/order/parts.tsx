import { ReactComponent as X } from 'incart-fe-common/src/icons/X.svg'
import {
    Header1,
    Text2,
    FormikContext,
    FSwitch,
    ORDER_STAGE_MAP,
    Header3,
} from 'incart-fe-common'

import { ICON_SIZE_24 } from '@/constants'
import { Hexile, Vexile } from '@haechi/flexile'
import { Table, dumpedProduct } from '@/types'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MODAL_KEY } from './page'
import { ControlGroup } from '@/components'
import { useFormik } from 'formik'
import { infer } from 'zod'

export default {
    OrderSheetModal({
        orderSheet,
        ...props
    }: {
        orderSheet: Pick<
            Table['order_sheet'],
            | 'rid'
            | 'stage'
            | 'orderer_email'
            | 'orderer_name'
            | 'orderer_phone'
            | 'receiver_name'
            | 'receiver_phone'
            | 'shipping_info'
            | 'created_at'
        > & {
            order_item: (Pick<
                Table['order_item'],
                'amount' | 'selected_options'
            > & {
                product: (typeof dumpedProduct)['_type']
                selected_options: string[]
            })[]
        }
        onClose(): void
    }) {
        const [_, setSearchParams] = useSearchParams()

        useEffect(
            () => () => {
                setSearchParams((prev) => {
                    prev.delete(MODAL_KEY)
                    return prev
                })
            },
            []
        )

        const formik = useFormik({
            initialValues: orderSheet,
            onSubmit(values, formikHelpers) {},
        })

        return (
            <>
                <Hexile y="center" x="space">
                    <Hexile gap={3} y="center">
                        <Header1>주문서</Header1>
                        <Text2>주문번호: {orderSheet.rid}</Text2>
                    </Hexile>

                    <X
                        style={ICON_SIZE_24}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            props.onClose()
                        }}
                    />
                </Hexile>
                <FormikContext.Provider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Vexile gap={6}>
                            <ControlGroup defaultOpened name="상태">
                                <FSwitch
                                    name="order_stage"
                                    items={Object.entries(ORDER_STAGE_MAP).map(
                                        ([key, value]) => ({
                                            key,
                                            name: value,
                                        })
                                    )}
                                />
                            </ControlGroup>
                            <ControlGroup defaultOpened name="상품">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <Header3>상품명</Header3>
                                            </th>
                                            <th>
                                                <Header3>갯수</Header3>
                                            </th>
                                            <th>
                                                <Header3>옵션</Header3>
                                            </th>
                                            <th>
                                                <Header3>가격</Header3>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderSheet.order_item.map((item) => (
                                            <tr>
                                                <td>
                                                    <Text2>
                                                        {item.product.name}
                                                    </Text2>
                                                </td>
                                                <td>
                                                    <Text2>{item.amount}</Text2>
                                                </td>
                                                <td>
                                                    <Text2>
                                                        {item.selected_options?.join?.(
                                                            ' / '
                                                        )}
                                                    </Text2>
                                                </td>
                                                <td>
                                                    <Text2>
                                                        TO DO
                                                        {/* {calcpr} */}
                                                    </Text2>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ControlGroup>
                        </Vexile>
                    </form>
                </FormikContext.Provider>
            </>
        )
    },
}
