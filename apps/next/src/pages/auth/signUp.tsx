import type { NextPage } from 'next';
import { useMutation } from 'react-relay';
import { updateToken } from '@workshop/web/src/components/auth/security';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Card, CardActions, Content, TextField } from '@workshop/ui';
import { Flex } from 'rebass';
import React from 'react';
import { useSnackbar } from 'notistack';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { UserRegisterWithEmail } from '../../components/auth/UserRegisterWithEmailMutation';
import {
  UserRegisterWithEmailMutation,
  UserRegisterWithEmailMutation$data,
} from '../../__generated__/UserRegisterWithEmailMutation.graphql';
import AuthRoot from '../../components/auth/AuthRoot';

type Values = {
  name: string;
  email: string;
  password: string;
};
const SignUp: NextPage = () => {
  const [userRegisterWithEmail, isPending] = useMutation<UserRegisterWithEmailMutation>(UserRegisterWithEmail);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  const onSubmit = (values: Values) => {
    closeSnackbar();

    const config = {
      variables: {
        input: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      },
      onCompleted: ({ UserRegisterWithEmail }: UserRegisterWithEmailMutation$data) => {
        if (UserRegisterWithEmail?.error) {
          enqueueSnackbar(UserRegisterWithEmail.error);
          return;
        }

        enqueueSnackbar(UserRegisterWithEmail?.success);
        if (UserRegisterWithEmail?.token) {
          updateToken(UserRegisterWithEmail.token);
        }

        router.push('/');
      },
    };

    userRegisterWithEmail(config);
  };

  const formik = useFormik<Values>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email().required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit,
  });

  const { handleSubmit, isValid } = formik;

  const isSubmitDisabled = !isValid || isPending;

  return (
    <AuthRoot>
      <FormikProvider value={formik}>
        <Content>
          <Card mb='10px' p='10px' justifyContent='center' flex={1}>
            <Flex flexDirection='column'>
              <span>SignUp</span>
              <TextField name='name' label='name' />
              <TextField name='email' label='email' />
              <TextField name='password' label='password' type='password' />
              <CardActions justifyContent='flex-end'>
                <Button
                  variant='contained'
                  color='primary'
                  mt='10px'
                  type='submit'
                  onClick={() => handleSubmit()}
                  disabled={isSubmitDisabled}
                >
                  Sign Up
                </Button>
              </CardActions>
              <Link href={'/auth/login'}>Already have an account? Login</Link>
            </Flex>
          </Card>
        </Content>
      </FormikProvider>
    </AuthRoot>
  );
};

export default SignUp;
