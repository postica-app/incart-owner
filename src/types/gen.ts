export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
          selected_options: string[] | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          order_id: string
          product: Json
          product_id: string
          selected_options?: string[] | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          order_id?: string
          product?: Json
          product_id?: string
          selected_options?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "order_sheet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "order_sheet_store_rid_fkey"
            columns: ["store_rid"]
            referencedRelation: "store"
            referencedColumns: ["rid"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "owner_store_rid_fkey"
            columns: ["store_rid"]
            referencedRelation: "store"
            referencedColumns: ["rid"]
          }
        ]
      }
      product: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          info: string | null
          name: string
          options: Json
          price: number
          store_rid: number
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          info?: string | null
          name: string
          options?: Json
          price: number
          store_rid: number
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          info?: string | null
          name?: string
          options?: Json
          price?: number
          store_rid?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_store_rid_fkey"
            columns: ["store_rid"]
            referencedRelation: "store"
            referencedColumns: ["rid"]
          }
        ]
      }
      store: {
        Row: {
          created_at: string | null
          name: string
          owner_id: string
          payment_receive_account: Json | null
          rid: number
          shipping_method: Json
        }
        Insert: {
          created_at?: string | null
          name: string
          owner_id: string
          payment_receive_account?: Json | null
          rid?: number
          shipping_method?: Json
        }
        Update: {
          created_at?: string | null
          name?: string
          owner_id?: string
          payment_receive_account?: Json | null
          rid?: number
          shipping_method?: Json
        }
        Relationships: [
          {
            foreignKeyName: "store_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "owner"
            referencedColumns: ["id"]
          }
        ]
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
