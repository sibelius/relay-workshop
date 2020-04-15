import React from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import { useHistory } from '../../routing/useHistory';

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
