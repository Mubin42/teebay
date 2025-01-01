import React, { FC } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
	title: string;
	description: string;
	children?: React.ReactNode;
	className?: string;
};

const FormWrapper: FC<Props> = ({
	title,
	description,
	children,
	className,
}) => {
	return (
		<Card className={cn('w-1/3', className)}>
			<CardHeader>
				<CardTitle className='text-2xl'>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default FormWrapper;
