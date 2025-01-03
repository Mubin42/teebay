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

export const UPDATE_PRODUCT = gql`
	mutation UpdateProduct(
		$id: String!
		$updateProductInput: UpdateProductInput!
	) {
		updateProduct(id: $id, updateProductInput: $updateProductInput) {
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

export const RENT_PRODUCT = gql`
	mutation RentProduct($rentProductInput: RentProductInput!) {
		rentProduct(rentProductInput: $rentProductInput) {
			id
			startDay
			endDay
			productId
			userId
		}
	}
`;

export const PURCHASE_PRODUCT = gql`
	mutation PurchaseProduct($purchaseProductInput: PurchaseProductInput!) {
		purchaseProduct(purchaseProductInput: $purchaseProductInput) {
			id
			productId
			userId
		}
	}
`;
