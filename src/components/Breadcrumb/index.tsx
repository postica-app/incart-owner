import { Header1, Text1 } from 'incart-fe-common'
import { useLocation } from 'react-router-dom'
import { Hexile } from '@haechi/flexile'
import { useMemo } from 'react'

import { Plink } from '@/components'

const REPLACE_MAP: Record<string, string> = {
    product: '상품',
    new: '새로 만들기',
}

export const Breadcrumb: React.FC<{
    customReadable?: string[]
}> = (props) => {
    const router = useLocation()

    const { paths, readablePaths } = useMemo(() => {
        const paths = router.pathname.slice(1).split('/')

        if (props.customReadable) {
            return {
                paths,
                readablePaths: props.customReadable,
            }
        }

        return {
            paths,
            readablePaths: paths.map((p) => REPLACE_MAP[p]).filter(Boolean),
        }
    }, [router.pathname])

    return (
        <Hexile gap={3} y="center">
            {readablePaths.slice(0, -1).map((path, index) => (
                <Text1 key={path}>
                    <Plink to={'/' + paths.slice(0, index + 1).join('/')}>
                        {path}
                    </Plink>
                    {' >'}
                </Text1>
            ))}
            {<Header1>{readablePaths[readablePaths.length - 1]}</Header1>}
        </Hexile>
    )
}
