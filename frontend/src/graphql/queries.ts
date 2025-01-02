import { gql } from '@apollo/client';

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

export const GET_CATEGORIES = gql`
	query GetCategories {
		getCategories {
			id
			name
		}
	}
`;

export const GET_MY_PRODUCTS = gql`
	query GetMyProducts {
		getMyProducts {
			id
			title
			description
			price
			rentPricePerDay
			views
			createdAt
			categoryMaps {
				category {
					id
					name
				}
			}
		}
	}
`;
