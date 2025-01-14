import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  query authenticateUser ($user: AuthenticateUserInput!) {
    authenticateUser (user:$user) {
      message
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      email
      isactive
      name
      password
      phone
      status
      voucher
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllAvailableProducts {
    getAllAvailableProducts {
      message
      products {
        description
        name
        price
        quantity
        tag
        link
      }
      productsCount
    }
  }
`;