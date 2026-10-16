import styled from 'styled-components';
import ShadowBox from '../../base/ShadowBox';

export const SushiCard = styled(ShadowBox)`
    min-width: 0;
    border: 1px solid ${({ theme }) => theme.global.colors['grey-1']};
    border-radius: 12px;
`;
