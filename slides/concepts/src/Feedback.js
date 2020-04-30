import React from 'react';
import styled from 'styled-components';
import { space, width, fontSize, color } from 'styled-system';
import QRCode from 'qrcode.react';

export const Root = styled.div([], {
  width: '50vw',
  height: '70vh',
});

const FeedbackText = styled.span`
  font-size: 50px;
  color: #ffffff;
`;

const FeedbackLink = styled.a`
  font-size: 50px;
  color: #25d7fd;
`;

export const Center = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${space}
`;

export const Feedback = () => (
  <Root>
    <Center>
      <FeedbackText>Give me Feedback:</FeedbackText>
    </Center>
    <Center mt={60} mb={60}>
      <QRCode value='https://entria.feedback.house/sibelius' size={256} bgColor='#272425' fgColor='white' />
    </Center>
    <Center>
      <FeedbackLink href='https://entria.feedback.house/sibelius'>https://entria.feedback.house/sibelius</FeedbackLink>
    </Center>
  </Root>
);
