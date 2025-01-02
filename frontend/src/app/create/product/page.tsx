'use client';
import { NextPage } from 'next';
import CreateProductWrapper from '@/app/create/product/components/CreateProductWrapper';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import ProductTitle from './components/ProductTitle';
import ProductCategories from '@/app/create/product/components/ProductCategories';
import ProductDescription from '@/app/create/product/components/ProductDescription';
import ProductPrice from '@/app/create/product/components/ProductPrice';
import ProductSummary from '@/app/create/product/components/ProductSummary';

export type CategoriesType = {
	id: string;
	name: string;
};

const CreateProductPage: NextPage = ({}) => {
	const [step, setStep] = useState(1);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [rentPricePerDay, setRentPricePerDay] = useState(0);
	const [categories, setCategories] = useState<CategoriesType[]>([]);

	const router = useRouter();

	const [createProduct, result] = useMutation(CREATE_PRODUCT);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();

		const input = {
			title,
			description,
			price,
			rentPricePerDay,
			categoryIds: categories.map(c => c.id),
		};

		createProduct({ variables: { createProductInput: input } }).then(r => r);
	};

	useEffect(() => {
		if (result.data) {
			toast({
				title: 'Product created',
				description: 'You have successfully created a product',
				variant: 'default',
			});
			router.push('/');
		}
		if (result.error) {
			toast({
				title: 'Product creation failed',
				description: result.error.message,
				variant: 'destructive',
			});
		}
	}, [result]);

	// Step configuration
	const steps = [
		{
			step: 1,
			node: (
				<ProductTitle
					title={{
						value: title,
						set: setTitle,
					}}
				/>
			),
		},

		{
			step: 2,
			node: (
				<ProductCategories
					categories={{
						value: categories,
						set: setCategories,
					}}
				/>
			),
		},

		{
			step: 3,
			node: (
				<ProductDescription
					description={{
						value: description,
						set: setDescription,
					}}
				/>
			),
		},

		{
			step: 4,
			node: (
				<ProductPrice
					price={{
						value: price,
						set: setPrice,
					}}
					rentPricePerDay={{
						value: rentPricePerDay,
						set: setRentPricePerDay,
					}}
				/>
			),
		},

		{
			step: 5,
			node: (
				<ProductSummary
					title={title}
					description={description}
					price={price}
					rentPricePerDay={rentPricePerDay}
					categories={categories}
				/>
			),
		},
	];

	return (
		<CreateProductWrapper
			step={{
				value: step,
				set: setStep,
			}}
			handleSubmit={handleSubmit}
		>
			{steps.find(s => s.step === step)?.node}
		</CreateProductWrapper>
	);
};

export default CreateProductPage;
