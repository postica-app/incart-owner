import {
    Header1,
    OrderStage,
    ORDER_STAGE_MAP,
    ShippingInfoType,
} from 'incart-fe-common'
import GridConfig, { GridOptions } from 'tui-grid'
import { useEffect, useMemo } from 'react'
import { Hexile } from '@haechi/flexile'
import _Grid, { Props } from '@toast-ui/react-grid'
import 'tui-grid/dist/tui-grid.css'
import { toast } from '@/functions'
import { useAwait } from '@/hooks'

import actions from './actions'
import styles from './styles'
import parts from './parts'
import { Outlet, useNavigate } from 'react-router-dom'

let Grid = _Grid

if ('default' in Grid) {
    Grid = Grid['default'] as typeof _Grid
    // WTF is this
    // IDK why but this is needed to make it work
}

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
        formatter(props) {
            // Warning! Toast UI Grid의 Primary Key는 Numeric Type만 지원합니다
            // order_sheet.rid는 [store.rid]-[주문서 번째수(in store)] 형식으로 되어있어서
            // 1. transformData에서 중간 구분자인 `-`를 `.`로 바꿔서 실수처럼 보이게 만들어줍니다
            // 2. 사용자에겐 `-`로 보이게 하기 위해 custom formatter를 적용해서 다시 바꿔줍니다
            return (props.value as string)!.replace('.', '-')
        },
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
            // order.rid를 변형하는 이유에 대해서는 위의 columns 객체를 참고하세요
            rid: order.rid!.replace('-', '.'),
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
    const goto = useNavigate()

    useEffect(() => {
        if (error) {
            toast('주문 내역을 가져오는 데 오류가 발생했습니다', '😢')
        }
    }, [error])

    const openOrderSheet = ((e) => {
        if (!('rowKey' in e) || typeof e.rowKey !== 'number') return
        const pseudoRid = e.rowKey
        const rid = pseudoRid.toString().replace('.', '-')

        goto(`/order/${rid}`)
    }) satisfies Props['onClick']

    return (
        <>
            <Outlet />
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
                                    onClick={openOrderSheet}
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
