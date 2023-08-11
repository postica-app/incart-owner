import { ReactComponent as Refresh } from 'incart-fe-common/src/icons/Refresh.svg'
import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import { ReactComponent as Email } from 'incart-fe-common/src/icons/Email.svg'
import { ReactComponent as Check } from 'incart-fe-common/src/icons/Check.svg'
import { ReactComponent as Call } from 'incart-fe-common/src/icons/Call.svg'
import { ReactComponent as Info } from 'incart-fe-common/src/icons/Info.svg'
import { ReactComponent as Plus } from 'incart-fe-common/src/icons/Plus.svg'
import { ReactComponent as Home } from 'incart-fe-common/src/icons/Home.svg'

import { useLoaderData } from 'react-router-dom'
import { Hexile, Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import {
    ORDER_STAGE_MAP,
    FormikContext,
    FSwitch,
    Header3,
    Divider,
    Header1,
    Text1,
    Text2,
} from 'incart-fe-common'

import { ControlGroup, FloatingCheckButton } from '@/components'
import { usePreventLeave } from '@/hooks'
import { signNumber, toast } from '@/functions'
import type loader from './loader'
import actions from './actions'

export default () => {
    const orderSheet = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const formik = useFormik({
        initialValues: orderSheet,
        async onSubmit(values, formikHelpers) {
            alert('네?')
            const result = await actions.updateStage(
                orderSheet.rid,
                values.stage
            )
            if (result.status === 'success') {
                toast('내용을 수정했어요', '✔')
                formikHelpers.resetForm()
                return
            }
            toast('내용을 수정하지 못했어요', '❌')
        },
    })

    usePreventLeave({
        enabled: formik.dirty,
    })

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
                    <FloatingCheckButton
                        visible={formik.dirty}
                        ghost={{
                            icon: (props) => <Refresh {...props} />,
                            children: '원래대로 되돌리기',
                            active: !formik.isSubmitting,
                            type: 'button',
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
                        <ControlGroup defaultOpened name="상태">
                            <FSwitch
                                name="stage"
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
                                        <tr key={item.product.id}>
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
                                                        <Text2
                                                            key={
                                                                option.optionName +
                                                                option.selectedItemName
                                                            }
                                                        >
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
                                <tbody>
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
                                        <tr key={row.name}>
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
                                </tbody>
                            </table>
                        </ControlGroup>
                        <ControlGroup defaultOpened name="배송지">
                            <table className="table tight">
                                <tbody>
                                    {' '}
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
                                                          orderSheet
                                                              .shipping_info
                                                              .address
                                                              .roadname +
                                                          ' ' +
                                                          orderSheet
                                                              .shipping_info
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
                                                          .shipping_info
                                                          .message,
                                                      icon: Plus,
                                                  },
                                              ]
                                            : []),
                                    ].map((row) => (
                                        <tr key={row.name}>
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
                                </tbody>
                            </table>
                        </ControlGroup>
                    </Vexile>
                </form>
            </FormikContext.Provider>
        </Vexile>
    )
}
