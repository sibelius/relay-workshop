import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';

type Props = {
  path?: string;
};
const BackButton = ({ path = '/' }: Props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // discuss this
    // if (navigate.length > 2) {
    //   navigate.goBack();
    // navigate(-1);
    //   return;
    // }

    navigate(path);
  };

  return (
    <IconButton onClick={handleGoBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
