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
import { Label } from '@/components/ui/label';

type Props = {
	className?: string;
	title: string;
	description: string;
	createdAt: string;
	views: number;
	categoryMaps: {
		category: {
			id: string;
			name: string;
		};
	}[];
};

const ProductCard: FC<Props> = ({
	className,
	title,
	views,
	createdAt,
	description,
	categoryMaps,
}) => {
	return (
		<Card className={cn('w-[350px]', className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{`Created At: ${createdAt}`}</CardDescription>
				<CardDescription>{`Views: ${views}`}</CardDescription>
			</CardHeader>
			<CardContent>
				<CardDescription>{description}</CardDescription>
				<div className='flex items-center gap-2'>
					<Label className='font-semibold'>Categories: </Label>
					<span className='text-sm'>
						{categoryMaps.map(catMap => catMap.category.name).join(', ')}
					</span>
				</div>
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
