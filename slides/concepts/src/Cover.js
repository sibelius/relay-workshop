import React from 'react';
import styled from 'styled-components';
import { space, width } from 'styled-system';

export const Root = styled.div([], {
  width: '50vw',
  height: '70vh',
});

const Img = styled.img`
  ${width}
`;

export const Center = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 50px;
  ${space}
`;

const Subtitle = styled.span`
  font-size: 40px;
  color: #fdaa4c;
  ${space}
`;

const MeName = styled.span`
  font-size: 30px;
  color: #25d7fd;
  ${space}
`;

export const Cover = () => (
  <Root>
    <Center>
      <Img src={'./img/graphqlrelay.png'} width={200} />
      <Title mt={20}>GraphQL & Relay Concepts</Title>
      <Subtitle mt={20}>Making all the pieces fit together</Subtitle>
      <MeName mt={100}>Sibelius Seraphini</MeName>
    </Center>
  </Root>
);
