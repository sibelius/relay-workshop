import styled from 'styled-components';
import _Card from '@material-ui/core/Card';
import { flexbox, space, layout } from 'styled-system';

export const Card = styled(_Card)`
  display: flex;
  flex-direction: row;
  ${flexbox}
  ${space}
  ${layout}
`;
