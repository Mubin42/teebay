import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
	mutation RegisterUser($input: RegisterUserInput!) {
		registerUser(registerUserInput: $input) {
			id
			firstName
			lastName
			email
			address
			phoneNumber
		}
	}
`;

export const LOGIN = gql`
	mutation LoginUser($input: LoginInput!) {
		login(loginInput: $input) {
			token
		}
	}
`;

export const GET_SELF = gql`
	query GetSelf {
		getSelf {
			id
			firstName
			lastName
			email
		}
	}
`;
