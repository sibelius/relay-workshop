import type { NextPage } from 'next';
import { useMutation } from 'react-relay';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Card, CardActions, Content, TextField } from '@workshop/ui';
import { Flex } from 'rebass';
import React from 'react';

import { useSnackbar } from 'notistack';

import AuthRoot from '../../components/auth/AuthRoot';
import { UserLoginWithEmail } from '../../components/auth/UserLoginWithEmailMutation';
import {
  UserLoginWithEmailMutation$data,
  UserLoginWithEmailMutation,
} from '../..//__generated__/UserLoginWithEmailMutation.graphql';

type Values = {
  email: string;
  password: string;
};
const Login: NextPage = () => {
  const [userLoginWithEmail, isPending] = useMutation<UserLoginWithEmailMutation>(UserLoginWithEmail);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const history = useHistory();

  const onSubmit = (values: Values) => {
    closeSnackbar();

    const config = {
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
      onCompleted: ({ UserLoginWithEmail }: UserLoginWithEmailMutation$data) => {
        if (UserLoginWithEmail?.error) {
          enqueueSnackbar(UserLoginWithEmail.error);
          return;
        }

        enqueueSnackbar(UserLoginWithEmail?.success);
        if (UserLoginWithEmail?.token) {
          updateToken(UserLoginWithEmail.token);
        }

        // history.push('/');
      },
    };

    userLoginWithEmail(config);
  };

  const formik = useFormik<Values>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
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
              <span>Login</span>
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
                  Login
                </Button>
              </CardActions>
              {/*<Link to={'/auth/signUp'}>Does not have an account? Sign Up</Link>*/}
            </Flex>
          </Card>
        </Content>
      </FormikProvider>
    </AuthRoot>
  );
};

export default Login;
