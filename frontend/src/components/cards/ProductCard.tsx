import { FC } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
	className?: string;
};

const ProductCard: FC<Props> = ({ className }) => {
	return (
		<Card className={cn('w-[350px]', className)}>
			<CardHeader>
				<CardTitle>Product Name</CardTitle>
				<CardDescription>Date Posted: 12/12/2021, 12:00:00</CardDescription>
				<CardDescription>Total Views: 1000</CardDescription>
			</CardHeader>
			<CardContent>
				{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
			</CardContent>
			<CardFooter className='justify-end gap-2'>
				<Button variant='outline' size='icon'>
					<Edit className='h-4 w-4' />
				</Button>
				<Button variant='destructive' size='icon'>
					<Trash className='h-4 w-4' />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
