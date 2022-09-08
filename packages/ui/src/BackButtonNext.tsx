import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'next/router';

type Props = {
  path?: string;
};
export const BackButtonNext = ({ path = '/' }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <IconButton onClick={handleGoBack}>
      <ArrowBackIcon />
    </IconButton>
  );
}
