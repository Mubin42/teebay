import Header from '@/components/header/Header';
import React, {FC, useEffect} from 'react';
import { cn } from '@/lib/utils';
import {AUTH_TOKEN_NAME} from "@/lib/constants";

type Props = {
	children: React.ReactNode;
	title: string;
	className?: string;
};

const PageWrapper: FC<Props> = ({ children, title, className }) => {

	// We need to check if the user is authenticated, if not redirect to login page
	useEffect(() => {
		localStorage.getItem(AUTH_TOKEN_NAME) || window.location.replace('/auth/login')
	}, [localStorage.getItem(AUTH_TOKEN_NAME)])

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
