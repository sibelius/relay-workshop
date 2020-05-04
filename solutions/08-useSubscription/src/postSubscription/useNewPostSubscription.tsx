import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';

import { useSnackbar } from 'notistack';

import { useSubscription } from '@workshop/relay';

import { GraphQLSubscriptionConfig } from 'relay-runtime';

import { AppQueryResponse } from '../__generated__/AppQuery.graphql';

import { PostNew, updater } from './PostNewSubscription';
import { PostNewSubscription, PostNewSubscriptionResponse } from './__generated__/PostNewSubscription.graphql';

// TODO - use @inline for me
type Me = AppQueryResponse['me'];

export const useNewPostSubscription = (me: Me) => {
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
      onNext: ({ PostNew }: PostNewSubscriptionResponse) => {
        const { post } = PostNew;
        const { author } = post;

        // new post, check if from another user
        if (author.id !== me.id) {
          const action = (key: string) => (
            <>
              <Button
                color='primary'
                onClick={() => {
                  closeSnackbar(key);
                }}
              >
                See
              </Button>
              <Button
                onClick={() => {
                  closeSnackbar(key);
                }}
              >
                Dismiss
              </Button>
            </>
          );

          enqueueSnackbar(`New Post from ${author.name}`, {
            variant: 'success',
            action,
          });
        }
      },
      updater,
    }),
    [],
  );

  useSubscription(postNewConfig);
};
