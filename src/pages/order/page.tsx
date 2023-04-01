import { Header1, ShippingInfoType } from 'incart-fe-common'
import { useSearchParams } from 'react-router-dom'
import Grid from '@toast-ui/react-grid'
import 'tui-grid/dist/tui-grid.css'
import { useEffect } from 'react'
import actions from './actions'
import { useAsyncValue } from '@/hooks'

const columns = [
    {
        name: 'id',
        header: '주문 번호',
    },
    {
        name: 'orderer_name',
        header: '주문자',
    },
    {
        name: 'shipping_info',
        header: '배송 정보',
    },
    {
        name: 'status',
        header: '상태',
    },
    {
        name: 'products',
        header: '상품',
    },
]

const transformData = (
    data: Awaited<ReturnType<typeof actions.getOrdersWithFilter>>
) => {
    return data.map((order) => {
        const shippingInfo = order.shipping_info as unknown as ShippingInfoType
        return {
            id: order.id,
            orderer_name: order.orderer_name,
            shipping_info: shippingInfo.address
                ? shippingInfo.address.roadname + shippingInfo.address.detail
                : shippingInfo.message || shippingInfo.method,
            status: {
                pending: '결제 대기',
                paid: '결제 완료',
                departed: '배송 중',
                canceled: '취소',
            }[order.status],
            products: order.items
                .map(
                    (item) =>
                        item.product?.name +
                        ' ' +
                        item.selected_options?.join(' ') +
                        'x' +
                        item.amount
                )
                .join(', '),
        }
    })
}

export default () => {
    const [params, setSearchParams] = useSearchParams({
        range_start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substring(0, 10),
        range_end: new Date().toISOString().substring(0, 10),
    })

    const { value, loading, error } = useAsyncValue(
        () =>
            actions
                .getOrdersWithFilter(
                    Object.fromEntries([...params.entries()]) as unknown
                )
                .then(transformData),
        [params]
    )

    console.log(value)

    return (
        <>
            <Header1>주문 내역</Header1>
            {value ? (
                <Grid
                    data={value}
                    columns={columns}
                    rowHeight={25}
                    bodyHeight={100}
                    heightResizable={true}
                    rowHeaders={['rowNum']}
                />
            ) : (
                <>아니</>
            )}
        </>
    )
}
