import { FC, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from '@/components/ui/dialog';
import { CompactState } from '@/types/CompactState';
import { Button } from '@/components/ui/button';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { GET_MY_PRODUCTS } from '@/graphql/queries';

type Props = {
	id: string;
	title: string;
	open: CompactState<boolean>;
};

const DeleteProductDialog: FC<Props> = ({ id, title, open }) => {
	const [deleteProduct, result] = useMutation(DELETE_PRODUCT, {
		refetchQueries: [GET_MY_PRODUCTS],
	});

	const handleDelete = () => {
		deleteProduct({ variables: { id } }).then(r => r);
	};

	// Show a toast notification when the mutation is successful or failed
	useEffect(() => {
		if (result.data) {
			toast({
				title: 'Product created',
				description: 'You have successfully created a product',
				variant: 'default',
			});
		}
		if (result.error) {
			toast({
				title: 'Product creation failed',
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
			<DialogOverlay />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete product:{' '}
						<span className='font-semibold'>{title}</span>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant='secondary' onClick={() => open.set(false)}>
						Cancel
					</Button>
					<Button onClick={handleDelete}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteProductDialog;
