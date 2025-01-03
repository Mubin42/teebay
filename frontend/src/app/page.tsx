'use client';
import { NextPage } from 'next';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_MY_PRODUCTS } from '@/graphql/queries';
import DeleteProductDialog from '@/components/dialogs/DeleteProductDialog';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Edit, Trash } from 'lucide-react';
import moment from 'moment';

const Home: NextPage = () => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<{
		id: string;
		title: string;
	}>();

	const { data, loading } = useQuery(GET_MY_PRODUCTS);

	const handleDelete = (id: string, title: string) => {
		setSelectedProduct({ id, title });
		setOpenDeleteDialog(true);
	};

	const renderProducts =
		data?.getMyProducts.length > 0 ? (
			data?.getMyProducts?.map((item: any, index: number) => (
				<Card key={index} className='w-[350px]'>
					<CardHeader>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{`Created At: ${moment(item.createdAt).calendar()}`}</CardDescription>
						<CardDescription>{`Views: ${item.views}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<CardDescription>{item.description}</CardDescription>
						<div className='flex items-center gap-2'>
							<Label className='font-semibold'>Categories: </Label>
							<span className='text-sm'>
								{item?.categoryMaps
									.map((catMap: any) => catMap.category.name)
									.join(', ')}
							</span>
						</div>
					</CardContent>
					<CardFooter className='justify-end gap-2'>
						<Link href={`/update/${item.id}/product`}>
							<Button variant='outline' size='icon'>
								<Edit className='h-4 w-4' />
							</Button>
						</Link>
						<Button
							variant='destructive'
							size='icon'
							onClick={() => handleDelete(item.id, item.title)}
						>
							<Trash className='h-4 w-4' />
						</Button>
					</CardFooter>
				</Card>
			))
		) : (
			<p>No products added</p>
		);

	return (
		<PageWrapper title='My Products'>
			<Link href='create/product'>
				<Button>Add Product</Button>
			</Link>
			<div className='flex flex-col gap-4'>
				{renderProducts}
				<DeleteProductDialog
					open={{
						value: openDeleteDialog,
						set: setOpenDeleteDialog,
					}}
					id={selectedProduct?.id || ''}
					title={selectedProduct?.title || ''}
				/>
			</div>
		</PageWrapper>
	);
};

export default Home;
