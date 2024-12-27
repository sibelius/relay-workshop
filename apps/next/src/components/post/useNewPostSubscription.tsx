import React, { useMemo } from 'react';
import Button from '@mui/material/Button';

import { useSnackbar } from 'notistack';

import { useRouter } from  'next/router';

import { useSubscription } from 'react-relay';

import { GraphQLSubscriptionConfig } from 'relay-runtime';

import { PostNew, updater } from './PostNewSubscription.tsx';
import { PostNewSubscription, PostNewSubscriptionResponse } from './__generated__/PostNewSubscription.graphql';
import { FeedQueryResponse } from './__generated__/FeedQuery.graphql';

type Me = FeedQueryResponse['me'];

// TODO - use @inline for me
export const useNewPostSubscription = (me: Me) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

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
                  router.push(`/post/${post.id}`);
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
