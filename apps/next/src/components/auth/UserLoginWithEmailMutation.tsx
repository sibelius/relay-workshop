import { graphql } from 'react-relay';

export const UserLoginWithEmail = graphql`
  mutation UserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
    UserLoginWithEmail(input: $input) {
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
