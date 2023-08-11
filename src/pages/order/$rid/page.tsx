import { ReactComponent as X } from 'incart-fe-common/src/icons/X.svg'
import { ReactComponent as Call } from 'incart-fe-common/src/icons/Call.svg'
import { ReactComponent as Email } from 'incart-fe-common/src/icons/Email.svg'
import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import { ReactComponent as Info } from 'incart-fe-common/src/icons/Info.svg'
import { ReactComponent as Plus } from 'incart-fe-common/src/icons/Plus.svg'
import { ReactComponent as Home } from 'incart-fe-common/src/icons/Home.svg'

import { useParams, useSearchParams } from 'react-router-dom'
import { Hexile, Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import {
    FormikContext,
    getCartItemPrice,
    Doc,
    CartItemType,
    Header1,
    Text2,
    FSwitch,
    ORDER_STAGE_MAP,
    Header3,
    Divider,
    Text1,
} from 'incart-fe-common'

import { ControlGroup } from '@/components'
import { signNumber } from '@/functions'
import { Table } from '@/types'
import { useQuery } from '@tanstack/react-query'
import actions from '../actions'

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

export default () => {
    const rid = useParams<{ rid: string }>().rid!
    const { data: _orderSheet } = useQuery(['ordersheet', rid], async () =>
        actions.getOrdersWithFilter({
            rid,
        })
    )

    const formik = useFormik({
        initialValues: _orderSheet || {},
        onSubmit(values, formikHelpers) {},
        enableReinitialize: true,
    })

    if (!_orderSheet) return <>asdf</>

    const orderSheet = {
        ..._orderSheet[0],
        order_item: _orderSheet[0].items.map((item) => ({
            ...item,
            option_details: getOptionInfo(item.product, item.selected_options),
            price: getCartItemPrice({
                ...(item as unknown as Doc<CartItemType>),
                selectedOptions: item.selected_options,
            }),
        })),
    }

    return (
        <Vexile gap={6} padding={4}>
            <Hexile y="center" x="space">
                <Hexile gap={3} y="center">
                    <Header1>주문서</Header1>
                    <Text2>주문번호: {orderSheet.rid}</Text2>
                </Hexile>
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
                            <table className="table">
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
                                                            [{option.optionName}
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
                                    <tr>
                                        <td colSpan={4}>
                                            <Divider />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Text2>
                                                {orderSheet.order_item.length}개
                                                상품종
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
                                                            acc + item.price,
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
                        <ControlGroup defaultOpened name="주문자">
                            <table className="table tight">
                                {[
                                    {
                                        name: '이름',
                                        value: orderSheet.orderer_name,
                                        icon: Person,
                                    },
                                    {
                                        name: '이메일',
                                        value: orderSheet.orderer_email,
                                        icon: Email,
                                    },
                                    {
                                        name: '전화번호',
                                        value: orderSheet.orderer_phone,
                                        icon: Call,
                                    },
                                ].map((row) => (
                                    <tr>
                                        <th className="w-30">
                                            <Hexile gap={2} y="center">
                                                <row.icon className="w-6 h-6" />
                                                <Text1>{row.name}</Text1>
                                            </Hexile>
                                        </th>
                                        <td>
                                            <Text2>{row.value}</Text2>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </ControlGroup>
                        <ControlGroup defaultOpened name="배송지">
                            <table className="table tight">
                                {[
                                    {
                                        name: '받는 사람',
                                        value: orderSheet.receiver_name,
                                        icon: Person,
                                    },
                                    {
                                        name: '전화번호',
                                        value: orderSheet.receiver_phone,
                                        icon: Call,
                                    },
                                    ...(orderSheet.shipping_info.address
                                        ? [
                                              {
                                                  name: '주소',
                                                  value:
                                                      orderSheet.shipping_info
                                                          .address.roadname +
                                                      ' ' +
                                                      orderSheet.shipping_info
                                                          .address.detail,
                                                  icon: Home,
                                              },
                                          ]
                                        : []),
                                    ...(orderSheet.shipping_info.method
                                        ? [
                                              {
                                                  name: '배송 방법',
                                                  value: orderSheet
                                                      .shipping_info.method,
                                                  icon: Info,
                                              },
                                          ]
                                        : []),
                                    ...(orderSheet.shipping_info.message
                                        ? [
                                              {
                                                  name: '요청사항',
                                                  value: orderSheet
                                                      .shipping_info.message,
                                                  icon: Plus,
                                              },
                                          ]
                                        : []),
                                ].map((row) => (
                                    <tr>
                                        <th className="w-30">
                                            <Hexile gap={2} y="center">
                                                <row.icon className="w-6 h-6" />
                                                <Text1>{row.name}</Text1>
                                            </Hexile>
                                        </th>
                                        <td>
                                            <Text2>{row.value}</Text2>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </ControlGroup>
                    </Vexile>
                </form>
            </FormikContext.Provider>
        </Vexile>
    )
}
