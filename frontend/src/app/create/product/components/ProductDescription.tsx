import { CompactState } from '@/types/CompactState';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { Textarea } from '@/components/ui/textarea';

type Props = {
	description: CompactState<string>;
};

const ProductDescription = ({ description }: Props) => {
	return (
		<FormWrapper
			title='Product Description'
			description='Enter a description for the product'
		>
			<Textarea
				className='h-30'
				value={description.value}
				onChange={e => description.set(e.target.value)}
			/>
		</FormWrapper>
	);
};

export default ProductDescription;
