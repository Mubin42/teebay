'use client';

import moment from 'moment';
import { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/wrappers/PageWrapper';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_PRODUCTS } from '@/graphql/queries';
import { useState } from 'react';
import RentProductDialog from '@/app/products/components/RentProductDialog';
import BuyProductDialog from '@/app/products/components/BuyProductDialog';

export type ProductType = {
	id: string;
	title: string;
	price: number;
	rentPricePerDay: number;
};

const ViewAvailableProductsPage: NextPage = () => {
	const { data, loading } = useQuery(GET_AVAILABLE_PRODUCTS);

	// states
	const [selectedProduct, setSelectedProduct] = useState<ProductType>();
	const [openRentDialog, setOpenRentDialog] = useState(false);
	const [openBuyDialog, setOpenBuyDialog] = useState(false);

	const handleRentDialog = (product: ProductType) => {
		setSelectedProduct(product);
		setOpenRentDialog(true);
	};

	const handleBuyDialog = (product: ProductType) => {
		setSelectedProduct(product);
		setOpenBuyDialog(true);
	};

	const renderProducts =
		data?.getAvailableProducts.length > 0 ? (
			data?.getAvailableProducts?.map((item: any, index: number) => (
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
						<Button variant='outline' onClick={() => handleRentDialog(item)}>
							Rent
						</Button>
						<Button onClick={() => handleBuyDialog(item)}>Buy</Button>
					</CardFooter>
				</Card>
			))
		) : (
			<p>No products available</p>
		);
	return (
		<PageWrapper title='View Products for buy and rent'>
			<div className='flex flex-col gap-4'>{renderProducts}</div>
			<RentProductDialog
				open={{
					value: openRentDialog,
					set: setOpenRentDialog,
				}}
				product={selectedProduct}
			/>
			<BuyProductDialog
				open={{
					value: openBuyDialog,
					set: setOpenBuyDialog,
				}}
				product={selectedProduct}
			/>
		</PageWrapper>
	);
};
export default ViewAvailableProductsPage;
