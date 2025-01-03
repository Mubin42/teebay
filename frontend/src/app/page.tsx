'use client';
import { NextPage } from 'next';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_MY_PRODUCTS } from '@/graphql/queries';
import DeleteProductDialog from '@/components/dialogs/DeleteProductDialog';
import { useState } from 'react';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Edit, Trash } from 'lucide-react';
import moment from 'moment';
import { Product } from '@/types/ProductType';
import ProductCard from '@/components/cards/ProductCard';

const Home: NextPage = () => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<{
		id: string;
		title: string;
	}>();

	const { data, loading } = useQuery<{ getMyProducts: Product[] }>(
		GET_MY_PRODUCTS
	);

	const handleDelete = (id: string, title: string) => {
		setSelectedProduct({ id, title });
		setOpenDeleteDialog(true);
	};

	const buttons = (
		<div className='flex gap-2'>
			<Link href='create/product'>
				<Button>Add Product</Button>
			</Link>
			<Link href='/products'>
				<Button>Buy/Rent Products</Button>
			</Link>
			<Link href='/histories/'>
				<Button>View Purchase History</Button>
			</Link>
		</div>
	);

	const renderProducts =
		data?.getMyProducts && data?.getMyProducts.length > 0 ? (
			data?.getMyProducts?.map((item: any, index: number) => (
				<ProductCard
					key={index}
					header={
						<>
							<CardTitle>{item.title}</CardTitle>
							<CardDescription>{`Created At: ${moment(item.createdAt).calendar()}`}</CardDescription>
							<CardDescription>{`Views: ${item.views}`}</CardDescription>
						</>
					}
					footer={
						<>
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
						</>
					}
				>
					<CardDescription>{item.description}</CardDescription>
					<div className='flex items-center gap-2'>
						<Label className='font-semibold'>Categories: </Label>
						<span className='text-sm'>
							{item?.categoryMaps
								.map((catMap: any) => catMap.category.name)
								.join(', ')}
						</span>
					</div>
				</ProductCard>
			))
		) : (
			<p>No products added by this user</p>
		);

	return (
		<PageWrapper title='My Products'>
			{buttons}
			<div>
				If nothing shows up when you open this page, please go to auth/login
				page
			</div>
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
