'use client';

import { HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { ReactNode } from 'react';

function makeClient() {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_BACKEND,
		fetchOptions: { caches: 'no-cache' },
	});

	return new ApolloClient({
		link: httpLink,
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
