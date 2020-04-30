import React from 'react';
import styled from 'styled-components';
import { width } from 'styled-system';

const StyledImg = styled.img`
  ${width}
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InlineImg = ({ src, ...props }) => (
  <Center>
    <StyledImg src={src} {...props} />
  </Center>
);
