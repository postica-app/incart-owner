import { ReactComponent as X } from 'incart-fe-common/src/icons/X.svg'
import {
    Header1,
    Text2,
    FormikContext,
    FSwitch,
    ORDER_STAGE_MAP,
    Header3,
    getCartItemPrice,
    CartItemType,
    Doc,
    Divider,
} from 'incart-fe-common'

import { ICON_SIZE_24 } from '@/constants'
import { Hexile, Vexile } from '@haechi/flexile'
import { Table } from '@/types'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MODAL_KEY } from './page'
import { ControlGroup } from '@/components'
import { useFormik } from 'formik'
import { signNumber } from '@/functions'

function getOptionInfo(
    product: Table['order_item']['product'],
    selectedOptionNames: string[]
) {
    const selectedItems = selectedOptionNames.map((name, index) => {
        const selectedItem = product.options[index].items.find(
            (item) => item.name === name
        )

        if (!selectedItem)
            return {
                optionName: product.options[index].name,
                selectedItemName: '알 수 없음',
                price: 0,
            }

        return {
            optionName: product.options[index].name,
            selectedItemName: selectedItem.name,
            price: selectedItem.priceDelta,
        }
    })
    return selectedItems
}

export default {
    OrderSheetModal(props: {
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
            | 'order_item'
        >
        onClose(): void
    }) {
        const [_, setSearchParams] = useSearchParams()

        const orderSheet = {
            ...props.orderSheet,
            order_item: props.orderSheet.order_item.map((item) => ({
                ...item,
                option_details: getOptionInfo(
                    item.product,
                    item.selected_options
                ),
                price: getCartItemPrice({
                    ...(item as unknown as Doc<CartItemType>),
                    selectedOptions: item.selected_options,
                }),
            })),
        }

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
                                <table className="item_table">
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
                                                    {item.option_details.map(
                                                        (option) => (
                                                            <Text2>
                                                                [
                                                                {
                                                                    option.optionName
                                                                }
                                                                ]{' '}
                                                                {
                                                                    option.selectedItemName
                                                                }{' '}
                                                                {option.price &&
                                                                    `(${signNumber(
                                                                        option.price
                                                                    )}원)`}
                                                            </Text2>
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    <Text2>
                                                        {item.price} = (
                                                        {item.product.price}{' '}
                                                        {item.option_details
                                                            .map((option) =>
                                                                signNumber(
                                                                    option.price
                                                                )
                                                            )
                                                            .join(' ')}
                                                        ) * {item.amount}
                                                    </Text2>
                                                </td>
                                            </tr>
                                        ))}
                                        <td colSpan={4}>
                                            <Divider />
                                        </td>
                                        <tr>
                                            <td>
                                                <Text2>
                                                    {
                                                        orderSheet.order_item
                                                            .length
                                                    }
                                                    개 상품종
                                                </Text2>
                                            </td>
                                            <td colSpan={2}>
                                                <Text2>
                                                    총{' '}
                                                    {orderSheet.order_item.reduce(
                                                        (acc, item) =>
                                                            acc + item.amount,
                                                        0
                                                    )}
                                                    개 구매
                                                </Text2>
                                            </td>
                                            <td>
                                                <Text2>
                                                    {orderSheet.order_item
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                item.price,
                                                            0
                                                        )
                                                        .toLocaleString()}{' '}
                                                    원
                                                </Text2>
                                            </td>
                                        </tr>
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
