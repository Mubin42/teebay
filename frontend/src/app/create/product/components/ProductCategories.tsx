import { CompactState } from '@/types/CompactState';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { CategoriesType } from '@/app/create/product/page';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/graphql/queries';
import Select from 'react-select';
import { FC } from 'react';

type Props = {
	categories: CompactState<CategoriesType[]>;
};

const ProductCategories: FC<Props> = ({ categories }) => {
	const { data, loading, error } = useQuery(GET_CATEGORIES);

	const options =
		data?.getCategories.map((c: CategoriesType) => ({
			value: c.id,
			label: c.name,
		})) || [];

	const selectedOptions = categories.value.map(c => ({
		value: c.id,
		label: c.name,
	}));

	return (
		<FormWrapper
			title='Product Categories'
			description='Add one or multiple categories for the product'
		>
			<Select
				options={options}
				isMulti
				isLoading={loading}
				value={selectedOptions}
				onChange={selected => {
					categories.set(
						selected.map((option: { value: string; label: string }) => ({
							id: option.value,
							name: option.label,
						}))
					);
				}}
			/>
		</FormWrapper>
	);
};

export default ProductCategories;
