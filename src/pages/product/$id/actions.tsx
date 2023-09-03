import { supabase } from '@/supabase'
import { Doc } from '@/types/utils'
import { ProductType } from 'incart-fe-common'
import Parts from './parts'
import { toast } from '@/functions'
import { PostgrestError } from '@supabase/supabase-js'

export default {
    async updateProduct(product: Doc<ProductType>) {
        const result = await supabase
            .from('product')
            .update({
                ...product,
                options: product.options.map((option) => ({
                    ...option,
                    items: option.items.map((item) => ({
                        ...(item.info && { info: item.info }),
                        ...(item.priceDelta && { price: item.priceDelta }),
                        name: item.name,
                    })),
                })),
            })
            .eq('id', product.id)
            .select()

        if (result.error) throw result.error

        return result.data
    },
    async getProductById(id: string) {
        const result = await supabase
            .from('product')
            .select('*')
            .filter('id', 'eq', id)

        if (result.error) throw result.error

        return result.data[0] as unknown as Doc<ProductType>
    },
    deleteProduct(
        product: Doc<ProductType>,
        showModal: (content: JSX.Element) => () => void
    ) {
        return new Promise<
            | {
                  status: 'success'
              }
            | {
                  status: 'fail'
                  error: PostgrestError
              }
        >((finish) => {
            const closeModal = showModal(
                <Parts.AskDeleteProduct
                    name={product.name}
                    onClose={() => closeModal()}
                    onDelete={async () => {
                        const { error } = await supabase
                            .from('product')
                            .update({ deleted_at: new Date().toISOString() })
                            .eq('id', product.id)

                        if (error) {
                            toast('삭제에 실패했습니다', '❌')
                            finish({
                                status: 'fail',
                                error,
                            })

                            return
                        }

                        toast('삭제되었습니다', '🗑️')
                        closeModal()
                        finish({
                            status: 'success',
                        })
                    }}
                />
            )
        })
    },
}
