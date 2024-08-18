import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom'


type Props = {
  path?: string;
};
const BackButton = ({ path = '/' }: Props) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  };

  return (
    <IconButton onClick={handleGoBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
