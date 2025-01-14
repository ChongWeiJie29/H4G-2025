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

export const CONFIRM_SHOPPING_CART = gql`
  mutation confirmShoppingCart ($shoppingCart: [ShoppingCartItem!]!) {
    confirmShoppingCart (shoppingCart: $shoppingCart) {
      message
    }
  }
`;

export const CREATE_VOUCHER = gql`
  mutation createVoucher ($voucher: CreateVoucherInput!) {
    createVoucher (voucher: $voucher) {
      message
    }
  }
`;

export const GET_USER_VOUCHERS = gql`
  query getUserVouchers {
    getUserVouchers {
      message
      vouchers {
          voucher_id
          amount
          task
          status
          request_time
          response_time
      }
      vouchersCount
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      message
      users {
        name
        password
        status
        isactive
        email
        phone
        voucher
      }
      usersCount
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser ($user: UserInput!) {
    createUser (user:$user) {
      message
    }
  }
`;