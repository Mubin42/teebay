import { FC, ReactNode } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
	header: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
	className?: string;
};

const ProductCard: FC<Props> = ({ header, children, footer, className }) => {
	return (
		<Card className={cn('w-[350px]', className)}>
			<CardHeader>{header}</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && (
				<CardFooter className='justify-end gap-2'>{footer}</CardFooter>
			)}
		</Card>
	);
};

export default ProductCard;
