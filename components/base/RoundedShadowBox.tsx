import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import ShadowBox from './ShadowBox';

const RoundedShadowBox = styled(ShadowBox)`
    min-width: 0;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    border-radius: 12px;
`;

export default RoundedShadowBox;
