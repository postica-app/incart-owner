import { CartItemType, Doc, getCartItemPrice } from 'incart-fe-common'
import { LoaderFunction } from 'react-router-dom'

import { Table } from '@/types'
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

export default (async (props) => {
    const _orderSheet = await actions.getOrdersWithFilter({
        rid: props.params.rid!,
    })

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

    return orderSheet
}) satisfies LoaderFunction
