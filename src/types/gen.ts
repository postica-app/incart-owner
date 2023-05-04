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
          rid: string | null
          shipping_info: Json
          stage: string
          store_rid: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          orderer_email: string
          orderer_name: string
          orderer_phone: string
          receiver_name: string
          receiver_phone: string
          rid?: string | null
          shipping_info: Json
          stage?: string
          store_rid: number
        }
        Update: {
          created_at?: string | null
          id?: string
          orderer_email?: string
          orderer_name?: string
          orderer_phone?: string
          receiver_name?: string
          receiver_phone?: string
          rid?: string | null
          shipping_info?: Json
          stage?: string
          store_rid?: number
        }
      }
      owner: {
        Row: {
          created_at: string | null
          id: string
          name: string
          store_rid: number | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          store_rid?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          store_rid?: number | null
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
          store_rid: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          info?: string | null
          name: string
          options?: Json
          price: number
          store_rid: number
        }
        Update: {
          created_at?: string | null
          id?: string
          info?: string | null
          name?: string
          options?: Json
          price?: number
          store_rid?: number
        }
      }
      store: {
        Row: {
          created_at: string | null
          id: number
          name: string
          owner_id: string
          payment_receive_account: Json | null
          shipping_method: Json
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          owner_id: string
          payment_receive_account?: Json | null
          shipping_method?: Json
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          owner_id?: string
          payment_receive_account?: Json | null
          shipping_method?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_order_rid:
        | {
            Args: {
              fetching_store_id: string
            }
            Returns: string
          }
        | {
            Args: {
              fetching_store_rid: number
            }
            Returns: string
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
