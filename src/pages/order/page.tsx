import { Header1, ShippingInfoType } from 'incart-fe-common'
import { useSearchParams } from 'react-router-dom'
import GridConfig, { GridOptions } from 'tui-grid'
import Grid from '@toast-ui/react-grid'
import 'tui-grid/dist/tui-grid.css'
import actions from './actions'
import { useAsyncValue } from '@/hooks'
import { Maximizer } from '@/components'

GridConfig.applyTheme('clean', {
    cell: {
        normal: {
            showHorizontalBorder: true,
        },
    },
})

const columns: GridOptions['columns'] = [
    {
        name: 'rid',
        header: '주문 번호',
        sortable: true,
    },
    {
        name: 'orderer_name',
        header: '주문자',
        sortable: true,
    },
    {
        name: 'products',
        header: '상품',
    },
    {
        name: 'shipping_info',
        header: '배송 정보',
    },
    {
        name: 'status',
        header: '상태',
        sortable: true,
    },
]

const transformData = (
    data: Awaited<ReturnType<typeof actions.getOrdersWithFilter>>
): GridOptions['data'] => {
    return data.map((order) => {
        const shippingInfo = order.shipping_info as unknown as ShippingInfoType
        return {
            rid: order.rid,
            orderer_name: order.orderer_name,
            shipping_info: shippingInfo.address
                ? shippingInfo.address.roadname + shippingInfo.address.detail
                : shippingInfo.message || shippingInfo.method,
            status: {
                created: '접수 됨',
                paid: '결제 완료',
                departed: '배송 출발함',
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
        range_start: new Date(new Date().getTime() - 70 * 24 * 60 * 60 * 1000)
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

    return (
        <>
            <Header1>주문 내역</Header1>
            <Maximizer
                style={{
                    border: '1px solid #eee',
                    borderRadius: '2rem',
                }}
            >
                {(size) => (
                    <>
                        {value ? (
                            <Grid
                                bodyHeight={size.height - 50}
                                width={Math.max(size.width, 1000)}
                                data={value}
                                columns={columns}
                                scrollX={true}
                                header={{
                                    align: 'left',
                                }}
                                keyColumnName="rid"
                            />
                        ) : (
                            <>아니</>
                        )}
                    </>
                )}
            </Maximizer>
        </>
    )
}
