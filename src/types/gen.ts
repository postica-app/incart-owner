export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            order_item: {
                Row: {
                    amount: number
                    created_at: string | null
                    id: string
                    order_id: string
                    product: Json
                    product_id: string
                    selected_options: Json | null
                }
                Insert: {
                    amount: number
                    created_at?: string | null
                    id?: string
                    order_id: string
                    product: Json
                    product_id: string
                    selected_options?: Json | null
                }
                Update: {
                    amount?: number
                    created_at?: string | null
                    id?: string
                    order_id?: string
                    product?: Json
                    product_id?: string
                    selected_options?: Json | null
                }
            }
            order_sheet: {
                Row: {
                    created_at: string | null
                    id: string
                    orderer_email: string
                    orderer_name: string
                    orderer_phone: string
                    receiver_name: string
                    receiver_phone: string
                    shipping_info: Json
                    status: string
                    store_id: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    orderer_email: string
                    orderer_name: string
                    orderer_phone: string
                    receiver_name: string
                    receiver_phone: string
                    shipping_info: Json
                    status?: string
                    store_id: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    orderer_email?: string
                    orderer_name?: string
                    orderer_phone?: string
                    receiver_name?: string
                    receiver_phone?: string
                    shipping_info?: Json
                    status?: string
                    store_id?: string
                }
            }
            owner: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                    store_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id: string
                    name: string
                    store_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                    store_id?: string | null
                }
            }
            product: {
                Row: {
                    created_at: string | null
                    id: string
                    info: string | null
                    name: string
                    options: Json
                    price: number
                    store_id: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    info?: string | null
                    name: string
                    options?: Json
                    price: number
                    store_id: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    info?: string | null
                    name?: string
                    options?: Json
                    price?: number
                    store_id?: string
                }
            }
            store: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                    owner_id: string
                    payment_receive_account: Json
                    shipping_method: Json
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    name: string
                    owner_id: string
                    payment_receive_account: Json
                    shipping_method?: Json
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                    owner_id?: string
                    payment_receive_account?: Json
                    shipping_method?: Json
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
