import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SELF } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { AUTH_TOKEN_NAME } from '@/lib/constants';

type AccountDropdownProps = {
	children: React.ReactNode;
};

const AccountDropdown: FC<AccountDropdownProps> = ({ children }) => {
	const { data, loading, error } = useQuery(GET_SELF);
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem(AUTH_TOKEN_NAME);
		router.push('/auth/login');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>
					<div className='flex flex-col'>
						<h1 className='text-sm font-semibold'>{`${data?.getSelf.firstName} ${data?.getSelf.lastName}`}</h1>
						<div className='w-fit text-xs font-semibold'>
							{data?.getSelf.email}
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AccountDropdown;
