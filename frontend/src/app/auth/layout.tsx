import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10'>
			{children}
		</div>
	);
};

export default AuthLayout;
