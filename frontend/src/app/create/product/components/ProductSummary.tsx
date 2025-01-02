import React, { FC } from 'react';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { CategoriesType } from '@/app/create/product/page';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Props = {
	title: string;
	description: string;
	price: number;
	rentPricePerDay: number;
	categories: CategoriesType[];
	isLoading?: boolean;
};

const ProductSummary: FC<Props> = ({
	title,
	description,
	price,
	rentPricePerDay,
	categories,
	isLoading = false,
}) => {
	return (
		<FormWrapper
			title='Product Summary'
			description='Please review the product details before creating it'
		>
			<div className='grid grid-cols-3 gap-2'>
				<Label className='text-lg font-semibold'>Title</Label>
				<p className='col-span-2'>{title}</p>
				<Label className='text-lg font-semibold'>Description</Label>
				<p className='col-span-2'>
					{description.length > 50
						? `${description.slice(0, 50)}...`
						: description}
				</p>
				<Label className='text-lg font-semibold'>Price</Label>
				<p className='col-span-2'>{price}</p>
				<Label className='text-lg font-semibold'>Rent Price</Label>
				<p className='col-span-2'>{`${rentPricePerDay} per day`}</p>
				<Label className='text-lg font-semibold'>Categories</Label>
				<p className='col-span-2'>{categories.map(c => c.name).join(', ')}</p>

				<Button className='col-span-3' type='submit' isLoading={isLoading}>
					Create Product
				</Button>
			</div>
		</FormWrapper>
	);
};

export default ProductSummary;
