import {
	registerApolloClient,
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { HttpLink } from '@apollo/client';

export const { getClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_BACKEND,
		}),
	});
});
