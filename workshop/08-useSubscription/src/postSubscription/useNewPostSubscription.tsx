// eslint-disable-next-line
import React, { useMemo } from 'react';
import Button from '@mui/material/Button';

import { useSnackbar } from 'notistack';

import { useSubscription } from '@workshop/relay';

import { GraphQLSubscriptionConfig } from 'relay-runtime';

import { AppQueryResponse } from '../__generated__/AppQuery.graphql';

import { PostNew, updater } from './PostNewSubscription.tsx';
import { PostNewSubscription, PostNewSubscriptionResponse } from './__generated__/PostNewSubscription.graphql';

// TODO - use @inline for me
type Me = AppQueryResponse['me'];

// eslint-disable-next-line
export const useNewPostSubscription = (me: Me) => {
  // eslint-disable-next-line
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const postNewConfig = useMemo<GraphQLSubscriptionConfig<PostNewSubscription>>(
    () => ({
      subscription: PostNew,
      variables: {
        input: {},
      },
      onCompleted: (...args) => {
        // eslint-disable-next-line
        console.log('onCompleted: ', args);
      },
      onError: (...args) => {
        // eslint-disable-next-line
        console.log('onError: ', args);
      },
      // eslint-disable-next-line
      onNext: ({ PostNew }: PostNewSubscriptionResponse) => {
        /**
         * TODO
         * show a snackbar info message with new post data
         */
      },
      updater,
    }),
    [],
  );

  useSubscription(postNewConfig);
};
