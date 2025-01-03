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

export const GET_PRODUCT = gql`
	query GetProduct($id: String!) {
		getProduct(id: $id) {
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

export const GET_AVAILABLE_PRODUCTS = gql`
	query GetAvailableProducts {
		getAvailableProducts {
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

export const GET_BOUGHT_PRODUCTS = gql`
	query GetBoughtProducts {
		getBoughtProducts {
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

export const GET_SOLD_PRODUCTS = gql`
	query GetSoldProducts {
		getSoldProducts {
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
