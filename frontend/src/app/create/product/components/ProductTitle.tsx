import { Input } from '@/components/ui/input';
import FormWrapper from '@/components/wrappers/FormWrapper';
import React, { FC } from 'react';
import { CompactState } from '../../../../types/CompactState';
type Props = {
	title: CompactState<string>;
};

const ProductTitle: FC<Props> = ({ title }) => {
	return (
		<FormWrapper
			title='Product Name'
			description='Enter the name of the product'
		>
			<Input value={title.value} onChange={e => title.set(e.target.value)} />
		</FormWrapper>
	);
};

export default ProductTitle;
