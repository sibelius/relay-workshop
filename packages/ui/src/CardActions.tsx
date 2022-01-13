import styled from 'styled-components';
import _CardActions from '@mui/material';
import { flexbox, FlexboxProps, space, SpaceProps } from 'styled-system';

interface CardActionsProps extends FlexboxProps, SpaceProps {}

export const CardActions = styled(_CardActions)<CardActionsProps>`
  ${flexbox}
  ${space}
`;
