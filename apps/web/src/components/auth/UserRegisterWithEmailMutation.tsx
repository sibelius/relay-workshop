import { graphql } from 'react-relay';

export const UserRegisterWithEmail = graphql`
  mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
    UserRegisterWithEmail(input: $input) {
      token
      success
      error
      me {
        id
        name
      }
    }
  }
`;
