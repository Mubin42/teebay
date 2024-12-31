import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import { FC } from 'react';
import AccountDropdown from '@/components/header/AccountDropdown';

type Props = {
	title: string;
};

const Header: FC<Props> = ({ title }) => {
	const user = (
		<AccountDropdown>
			<Button variant='outline' size='icon'>
				<CircleUser />
			</Button>
		</AccountDropdown>
	);

	return (
		<header className='flex h-16 w-full items-center justify-between gap-4 border-b bg-background px-4'>
			<h1 className='hidden text-xl font-bold md:block'>{title}</h1>
			<div className='flex items-center gap-4'>{user}</div>
		</header>
	);
};

export default Header;
