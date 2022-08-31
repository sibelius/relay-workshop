import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

import { useHistory } from '@workshop/route';

type Props = {
  path?: string;
};
const BackButton = ({ path = '/' }: Props) => {
  const history = useHistory();

  const handleGoBack = () => {
    if (history.length > 2) {
      history.goBack();
      return;
    }

    history.push(path);
  };

  return (
    <IconButton onClick={handleGoBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
