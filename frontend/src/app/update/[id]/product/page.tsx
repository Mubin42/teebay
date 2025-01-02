'use client';

import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/wrappers/PageWrapper';
import React, { useEffect, useState } from 'react';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/graphql/queries';
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

const UpdateProductPage: NextPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data, loading, error } = useQuery(GET_CATEGORIES);

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

	return (
		<PageWrapper title='Update Product'>
			<form className='relative flex h-full w-full items-center justify-center'>
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
				</FormWrapper>
			</form>
		</PageWrapper>
	);
};

export default UpdateProductPage;
