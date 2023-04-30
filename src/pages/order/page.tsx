import {
    Header1,
    OrderStage,
    ORDER_STAGE_MAP,
    ShippingInfoType,
} from 'incart-fe-common'
import GridConfig, { GridOptions } from 'tui-grid'
import { useEffect, useMemo } from 'react'
import { Hexile } from '@haechi/flexile'
import Grid from '@toast-ui/react-grid'
import 'tui-grid/dist/tui-grid.css'
import { toast } from '@/functions'
import { useAwait } from '@/hooks'

import actions from './actions'
import styles from './styles'
import parts from './parts'

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
    },
    {
        name: 'orderer_name',
        header: '주문자',
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
        name: 'stage',
        header: '상태',
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
                ? `(${shippingInfo.method}) ` +
                  shippingInfo.address.roadname +
                  shippingInfo.address.detail
                : shippingInfo.message || shippingInfo.method,
            stage: ORDER_STAGE_MAP[order.stage as OrderStage],
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
    const [filter, filterView] = parts.useFilter()

    const valuePromise = useMemo(
        () => actions.getOrdersWithFilter(filter).then(transformData),
        [filter]
    )

    const { value, loading, error } = useAwait(valuePromise)

    useEffect(() => {
        if (error) {
            toast('주문 내역을 가져오는 데 오류가 발생했습니다', '😢')
        }
    }, [error])

    return (
        <>
            <Header1>주문 내역</Header1>
            <Hexile fillx filly gap={10}>
                <styles.GridWrapper loading={loading}>
                    {(size) => (
                        <>
                            {value ? (
                                <Grid
                                    bodyHeight={size.height - 50}
                                    width={Math.max(size.width, 1000)}
                                    data={value}
                                    columns={columns}
                                    scrollX={true}
                                    scrollY={true}
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
                </styles.GridWrapper>
                {filterView}
            </Hexile>
        </>
    )
}
