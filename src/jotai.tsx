import { atom } from 'jotai'
import { toast } from './functions/toast'
import { supabase } from './supabase'
import { Store } from './types/Store'

export const modalContentAtom = atom<JSX.Element[]>([])
