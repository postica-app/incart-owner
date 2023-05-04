import { useEffect } from 'react'
import { router } from '@/main'
import { redirect } from 'react-router-dom'

export default () => {
    return <>{void router.navigate('/setup/owner/start')}</>
}
