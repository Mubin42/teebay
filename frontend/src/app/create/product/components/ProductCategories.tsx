import { CompactState } from '@/types/CompactState';
import FormWrapper from '@/components/wrappers/FormWrapper';
import TagInput from '@/components/forms/TagInput';

type Props = {
	categoryIds: CompactState<string[]>;
};
const ProductCategories = ({ categoryIds }: Props) => {
	return (
		<FormWrapper
			title='Product Categories'
			description='Add one or multiple categories for the product'
		>
			<TagInput
				state={{
					value: categoryIds.value,
					set: categoryIds.set,
				}}
			/>
		</FormWrapper>
	);
};

export default ProductCategories;
