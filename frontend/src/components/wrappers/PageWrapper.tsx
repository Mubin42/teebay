import Header from '@/components/header/Header';
import { FC } from 'react';

type Props = {
	children: React.ReactNode;
};

const PageWrapper: FC<Props> = ({ children }) => {
	return (
		<div className='flex h-screen flex-col'>
			<Header />
			<main className='flex-1 overflow-y-auto'>{children}</main>
		</div>
	);
};

export default PageWrapper;
