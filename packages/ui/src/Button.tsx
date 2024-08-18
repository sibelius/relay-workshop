import styled from 'styled-components';

import { flexbox, FlexboxProps, space, SpaceProps } from 'styled-system';

import MaterialButton from '@mui/material/Button'

interface ButtonProps extends FlexboxProps, SpaceProps {}

export const Button = styled(MaterialButton)<ButtonProps>`
  ${flexbox}
  ${space}
`;
