'use client';

import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import PageWrapper from '@/components/wrappers/PageWrapper';
import React, { useEffect, useState, useId } from 'react';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from '@apollo/client';
import {
	GET_CATEGORIES,
	GET_MY_PRODUCTS,
	GET_PRODUCT,
} from '@/graphql/queries';
import { CategoriesType } from '@/app/create/product/page';
import Select from 'react-select';
import { Textarea } from '@/components/ui/textarea';
import { rentOptions } from '@/app/create/product/components/ProductPrice';
import {
	Select as SelectComponent,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { UPDATE_PRODUCT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';

const UpdateProductPage: NextPage = () => {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const selectId = useId();

	const { data, loading, error } = useQuery(GET_CATEGORIES);
	const { data: productData, loading: ProductLoading } = useQuery(GET_PRODUCT, {
		variables: { id },
	});
	const [updateProduct, result] = useMutation(UPDATE_PRODUCT, {
		refetchQueries: [GET_MY_PRODUCTS],
	});

	// States
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [rentPricePerDay, setRentPricePerDay] = useState(0);
	const [categories, setCategories] = useState<CategoriesType[]>([]);

	const [rent, setRent] = useState(0);
	const [selected, setSelected] = useState<{
		value: string;
		label: string;
	}>(rentOptions[0]);

	const labelClassName: string = 'col-span-1 text-lg font-semibold';

	const options =
		data?.getCategories.map((c: CategoriesType) => ({
			value: c.id,
			label: c.name,
		})) || [];

	const selectedOptions = categories.map(c => ({
		value: c.id,
		label: c.name,
	}));

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();

		const input = {
			title,
			description,
			price,
			rentPricePerDay,
			categoryIds: categories.map(c => c.id),
		};

		updateProduct({ variables: { id, updateProductInput: input } }).then(
			r => r
		);
	};

	useEffect(() => {
		if (result.data) {
			toast({
				title: 'Product updated',
				description: 'You have successfully updated the product',
				variant: 'default',
			});
			router.push('/');
		}
		if (result.error) {
			toast({
				title: 'Product update failed',
				description: result.error.message,
				variant: 'destructive',
			});
		}
	}, [result]);

	// Based on the selected value, calculating the rent price per day
	useEffect(() => {
		switch (selected.value) {
			case 'week':
				setRentPricePerDay(rent / 7);
				break;
			case 'month':
				setRentPricePerDay(rent / 30);
				break;
			default:
				setRentPricePerDay(rent);
		}
	}, [selected, rent]);

	// when api data is fetched, populate the fields with the data
	useEffect(() => {
		if (productData?.getProduct) {
			const product = productData.getProduct;
			setTitle(product.title);
			setDescription(product.description);
			setPrice(product.price);
			setRent(product.rentPricePerDay);
			setCategories(
				product.categoryMaps.map((c: { category: CategoriesType }) => ({
					id: c.category.id,
					name: c.category.name,
				}))
			);
		}
	}, [productData]);

	return (
		<PageWrapper title='Update Product'>
			<form
				className='relative flex h-full w-full items-center justify-center'
				onSubmit={handleSubmit}
			>
				<FormWrapper
					title='Update Product'
					description='Update your product'
					className='w-2/3'
				>
					<div className='grid grid-cols-5 gap-4'>
						<Label className={labelClassName}>Name</Label>
						<Input
							className='col-span-4'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>

						<Label className={labelClassName}>Categories</Label>
						<Select
							className='col-span-4'
							options={options}
							isMulti
							isLoading={loading}
							value={selectedOptions}
							onChange={selected => {
								setCategories(
									selected.map((option: { value: string; label: string }) => ({
										id: option.value,
										name: option.label,
									}))
								);
							}}
							instanceId={selectId}
						/>
						<Label className={labelClassName}>Description</Label>
						<Textarea
							className='h-30 col-span-4'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<Label className={labelClassName}>Rent</Label>
						<div className='col-span-4 grid grid-cols-3 gap-2'>
							<Input
								type='number'
								placeholder='Fixed price'
								value={price.toString()}
								onChange={e => setPrice(parseInt(e.target.value) || 0)}
							/>

							<Input
								type='number'
								placeholder='Rent price'
								value={rent.toString()}
								onChange={e => setRent(parseInt(e.target.value) || 0)}
							/>
							<SelectComponent
								value={selected.value}
								onValueChange={value => {
									setSelected({
										value: value,
										label:
											rentOptions.find(option => option.value === value)
												?.label || '',
									});
								}}
							>
								<SelectTrigger aria-label='Select unit'>
									<SelectValue
										placeholder={selected.label || 'Select status'}
									/>
								</SelectTrigger>
								<SelectContent>
									{rentOptions.map((item, index) => (
										<SelectItem key={index} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectContent>
							</SelectComponent>
						</div>
					</div>
					<div className='my-4 flex flex-1 justify-between'>
						<Button
							variant='outline'
							type='button'
							onClick={() => window.history.back()}
						>
							Back
						</Button>
						<Button type='submit' isLoading={result.loading}>
							Submit
						</Button>
					</div>
				</FormWrapper>
			</form>
		</PageWrapper>
	);
};

export default UpdateProductPage;
