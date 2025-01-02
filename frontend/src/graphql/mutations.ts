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

export const CREATE_PRODUCT = gql`
	mutation CreateProduct($createProductInput: CreateProductInput!) {
		createProduct(createProductInput: $createProductInput) {
			id
			title
			description
			price
			rentPricePerDay
		}
	}
`;

export const DELETE_PRODUCT = gql`
	mutation DeleteProduct($id: String!) {
		deleteProduct(id: $id) {
			id
			title
		}
	}
`;
