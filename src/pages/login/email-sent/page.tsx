import { Box } from '@/components'
import scribbleNotePath from '@/images/scribble-note.png'
import { Vexile } from '@haechi/flexile'
import { colors, Text1, Text2 } from 'incart-fe-common'

export default () => (
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
            padding={12}
            gap={6}
            x="center"
            y="center"
            css={{
                width: '100rem',
            }}
        >
            <img src={scribbleNotePath} style={{ width: '40rem' }} />
            <Vexile x="center" gap={1}>
                <Text1>이메일로 인증링크를 보냈습니다</Text1>
                <Text2 grey5 center>
                    이메일이 오지 않았다면 스팸함을 확인해주세요
                </Text2>
            </Vexile>
        </Box>
    </Vexile>
)
