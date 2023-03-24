import { toast } from '@/functions'
import { router } from '@/main'
import { supabase } from '@/supabase'

export default {
    async login(email: string) {
        const result = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            },
        })

        if (result.error) {
            toast('로그인에 실패했습니다', '😥')
            throw result.error
        }

        router.navigate('/login/email-sent')
    },
}
