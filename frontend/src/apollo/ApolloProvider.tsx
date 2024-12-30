'use client';

import { HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { ReactNode } from 'react';
import { setContext } from '@apollo/client/link/context';

function makeClient() {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_BACKEND,
		fetchOptions: { caches: 'no-cache' },
	});

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem('teebay_token');
		return {
			headers: {
				...headers,
				authorization: token ? token : '',
			},
		};
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
}

const ApolloProvider = ({ children }: { children: ReactNode }) => {
	const client = makeClient();
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
};

export default ApolloProvider;
