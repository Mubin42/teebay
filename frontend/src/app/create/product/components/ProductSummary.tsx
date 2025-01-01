import React, { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/components/wrappers/FormWrapper';

type Props = {};

const ProductSummary: FC<Props> = () => {
	return (
		<FormWrapper
			title='Product Category'
			description='Select the category of the product'
		>
			<div className='flex flex-1 flex-col gap-2'>
				<Input value='' />
				<Button type='submit'>Create Product</Button>
			</div>
		</FormWrapper>
	);
};

export default ProductSummary;
