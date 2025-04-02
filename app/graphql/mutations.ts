import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
  ) {
    register(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      name: $name
    ) {
      id
      email
      name
      isVerified
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!, $code: String!) {
    verifyEmail(email: $email, code: $code) {
      success
      message
      accessToken
      refreshToken
      email
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      email
      name
    }
  }
`;

export const GOOGLE_AUTH = gql`
  mutation GoogleAuth($token: String!) {
    googleAuth(token: $token) {
      accessToken
      refreshToken
      email
      name
    }
  }
`;

export const FACEBOOK_AUTH = gql`
  mutation FacebookAuth($token: String!) {
    facebookAuth(token: $token) {
      accessToken
      refreshToken
      email
      name
    }
  }
`;

export const REFRESH_TOKENS = gql`
  mutation RefreshTokens($refreshToken: String!) {
    refreshTokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      email
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      success
      message
    }
  }
`; 