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
