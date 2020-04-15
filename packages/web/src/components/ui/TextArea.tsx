import TextField from '@material-ui/core/TextField';
import React from 'react';
import styled from 'styled-components';

export const TextArea = styled(TextField).attrs({
  rows: 4,
  multiline: true,
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
  },
})`
  && {
    margin: 0;
    .MuiInputBase-inputMultiline {
      font-weight: normal;
      padding: 5px;
      border: solid 1px #dedede;
      border-radius: 10px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .MuiInputLabel-root {
      margin-left: 10px;
    }
  }
`;
