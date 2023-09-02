import { supabase } from '@/supabase'
import loader from './loader'
import { signNumber } from '@/functions'

export default {
    async updateStage(rid: string, stage: string) {
        const result = await supabase
            .from('order_sheet')
            .update({
                stage,
            })
            .eq('rid', rid)
            .select()

        if (result.error) {
            return {
                status: 'error',
                message: result.error.message,
            } as const
        }

        return {
            status: 'success',
        } as const
    },
    createPriceCalcString(
        item: Awaited<ReturnType<typeof loader>>['order_item'][number]
    ) {
        const optionDetails = item.option_details
            .map(
                (option) =>
                    option.price &&
                    option.price +
                        option.optionName +
                        '(' +
                        option.selectedItemName +
                        ')'
            )
            .filter(Boolean)
            .join(' + ')

        if (optionDetails) {
            return `${item.price} = (${item.product.price} + ${optionDetails}) * ${item.amount}`
        } else {
            return `${item.price} = ${item.product.price} * ${item.amount}`
        }
    },
}
