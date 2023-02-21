import styled from 'styled-components'
import {
    Box,
} from 'grommet'


const ShadowBox = styled(Box)`
    box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17)
`

export const ShadowHoverBox = styled(ShadowBox)`
&:hover {
    background: #4C4F54;
}
`

export default ShadowBox;