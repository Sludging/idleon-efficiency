import styled from 'styled-components';
import ShadowBox from './ShadowBox';

const RoundedShadowBox = styled(ShadowBox)`
    min-width: 0;
    border: 1px solid ${({ theme }) => theme.global.colors['grey-1']};
    border-radius: 12px;
`;

export default RoundedShadowBox;
