import { CompactState } from '@/types/CompactState';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { ProductType } from '@/app/products/page';
import { useMutation } from '@apollo/client';
import { PURCHASE_PRODUCT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { GET_AVAILABLE_PRODUCTS } from '@/graphql/queries';

type Props = {
	open: CompactState<boolean>;
	product?: ProductType;
};

const BuyProductDialog: React.FC<Props> = ({ open, product }) => {
	const [purchaseTrigger, result] = useMutation(PURCHASE_PRODUCT, {
		refetchQueries: [GET_AVAILABLE_PRODUCTS],
	});

	const handlePurchaseProduct = async () => {
		const purchaseProductInput = {
			productId: product?.id,
		};
		await purchaseTrigger({
			variables: {
				purchaseProductInput,
			},
		});
	};

	// Show a toast notification when the mutation is successful or failed
	useEffect(() => {
		if (result.data) {
			toast({
				title: 'Product Purchase',
				description: 'You have successfully purchased a product',
				variant: 'default',
			});
		}
		if (result.error) {
			toast({
				title: 'Product purchase failed',
				description: result.error.message,
				variant: 'destructive',
			});
		}
	}, [result]);

	// Close the dialog when the mutation is successful
	useEffect(() => {
		if (result.data) {
			open.set(false);
		}
	}, [result.data]);

	return (
		<Dialog open={open.value} onOpenChange={open.set}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Rent Product</DialogTitle>
					<DialogDescription>
						{`You are about to purchase the product: ${product?.title} with the price of ${product?.price}`}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant='outline' onClick={() => open.set(false)}>
						Cancel
					</Button>
					<Button onClick={handlePurchaseProduct}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default BuyProductDialog;
