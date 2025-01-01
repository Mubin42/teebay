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
