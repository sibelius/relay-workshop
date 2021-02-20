import styled from 'styled-components';
import _CardActions from '@material-ui/core/CardActions';
import { flexbox, FlexProps, space, SpaceProps } from 'styled-system';

interface CardActionsProps extends FlexProps, SpaceProps {}

export const CardActions = styled(_CardActions)<CardActionsProps>`
  ${flexbox}
  ${space}
`;
