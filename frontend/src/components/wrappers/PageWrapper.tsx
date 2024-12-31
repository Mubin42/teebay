import Header from '@/components/header/Header';
import React, { FC } from 'react';

type Props = {
	children: React.ReactNode;
	title: string;
};

const PageWrapper: FC<Props> = ({ children, title }) => {
	return (
		<div className='flex h-screen flex-col'>
			<Header title={title} />
			<main className='flex-1 flex-col space-y-4 overflow-y-auto px-6 py-10 lg:px-32'>
				{children}
			</main>
		</div>
	);
};

export default PageWrapper;
