import { CompactState } from '@/types/CompactState';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { ProductType } from '@/app/products/page';
import { useMutation } from '@apollo/client';
import { RENT_PRODUCT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { GET_AVAILABLE_PRODUCTS } from '@/graphql/queries';

type Props = {
	open: CompactState<boolean>;
	product?: ProductType;
};

const RentProductDialog: React.FC<Props> = ({ open, product }) => {
	const [startDay, setStartDay] = useState('');
	const [endDay, setEndDay] = useState('');

	const [rentTrigger, result] = useMutation(RENT_PRODUCT, {
		refetchQueries: [GET_AVAILABLE_PRODUCTS],
	});

	const handleRentProduct = async () => {
		const rentProductInput = {
			startDay: new Date(startDay).toISOString(),
			endDay: new Date(endDay).toISOString(),
			productId: product?.id,
		};
		await rentTrigger({
			variables: {
				rentProductInput,
			},
		});
	};

	// Show a toast notification when the mutation is successful or failed
	useEffect(() => {
		if (result.data) {
			toast({
				title: 'Product Rent',
				description: 'You have successfully rented a product',
				variant: 'default',
			});
		}
		if (result.error) {
			toast({
				title: 'Product rent failed',
				description: result.error.message,
				variant: 'destructive',
			});
		}
	}, [result]);

	// Close the dialog when the mutation is successful
	useEffect(() => {
		if (result.data) {
			setEndDay('');
			setStartDay('');
			open.set(false);
		}
	}, [result.data]);

	return (
		<Dialog open={open.value} onOpenChange={open.set}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Rent Product</DialogTitle>
					<DialogDescription>
						{`Rent ${product?.title} for ${product?.rentPricePerDay} per day`}
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Start Date
						</Label>
						<Input
							type='date'
							className='col-span-3'
							value={startDay}
							onChange={e => setStartDay(e.target.value)}
							required
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='username' className='text-right'>
							End Date
						</Label>
						<Input
							type='date'
							className='col-span-3'
							value={endDay}
							onChange={e => setEndDay(e.target.value)}
							required
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => open.set(false)}>
						Cancel
					</Button>
					<Button onClick={handleRentProduct}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default RentProductDialog;
