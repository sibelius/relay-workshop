import React from 'react';

import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import { Flex } from 'rebass';

import { useSnackbar } from 'notistack';

import { Card, Content, Button, CardActions, TextField } from '@workshop/ui';

import { useHistory, Link } from '@workshop/route';

import { useMutation } from 'react-relay';

import {
  UserLoginWithEmailMutation,
  UserLoginWithEmailMutationResponse,
} from './__generated__/UserLoginWithEmailMutation.graphql';
import { UserLoginWithEmail } from './UserLoginWithEmailMutation.tsx';
import { updateToken } from './security.tsx';

type Values = {
  email: string;
  password: string;
};
const Login = () => {
  const [userLoginWithEmail, isPending] = useMutation<UserLoginWithEmailMutation>(UserLoginWithEmail);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const history = useHistory();

  const onSubmit = (values: Values) => {
    closeSnackbar();

    const config = {
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
      onCompleted: ({ UserLoginWithEmail }: UserLoginWithEmailMutationResponse) => {
        if (UserLoginWithEmail?.error) {
          enqueueSnackbar(UserLoginWithEmail.error);
          return;
        }

        enqueueSnackbar(UserLoginWithEmail?.success);
        if (UserLoginWithEmail?.token) {
          updateToken(UserLoginWithEmail.token);
        }

        history.push('/');
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
            <Link to={'/auth/signUp'}>Does not have an account? Sign Up</Link>
          </Flex>
        </Card>
      </Content>
    </FormikProvider>
  );
};

export default Login;
