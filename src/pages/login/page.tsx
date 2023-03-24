import { Box } from '@/components'
import { Vexile } from '@haechi/flexile'
import { colors, Input, Text1, Text2 } from 'incart-fe-common'
import { ReactComponent as Email } from 'incart-fe-common/src/icons/Email.svg'

export default () => {
    return (
        <Vexile
            style={{
                backgroundColor: colors.grey1,
                minHeight: '100vh',
            }}
            fillx
            filly
            x="center"
            y="center"
        >
            <Box
                padding={8}
                gap={4}
                x="center"
                y="center"
                css={{
                    width: '100rem',
                }}
            >
                <Vexile x="center" gap={1}>
                    <Text1>이메일을 입력해주세요</Text1>
                    <Text2 grey5>
                        이메일로 로그인 / 가입 링크를 보내드려요
                    </Text2>
                </Vexile>
                <Input
                    placeholder="kimsundal@cloud.com"
                    icon={(style) => {
                        console.log(style)
                        return <Email style={style} />
                    }}
                />
            </Box>
        </Vexile>
    )
}
