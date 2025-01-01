import Header from '@/components/header/Header';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';

type Props = {
	children: React.ReactNode;
	title: string;
	className?: string;
};

const PageWrapper: FC<Props> = ({ children, title, className }) => {
	return (
		<div className='flex h-screen flex-col'>
			<Header title={title} />
			<main
				className={cn(
					'flex-1 flex-col space-y-4 overflow-y-auto px-6 py-10 lg:px-32',
					className
				)}
			>
				{children}
			</main>
		</div>
	);
};

export default PageWrapper;
