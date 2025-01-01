'use client';
import { NextPage } from 'next';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { Input } from '@/components/ui/input';
import CreateProductWrapper from '@/app/create/product/components/CreateProductWrapper';
import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CreateProductPage: NextPage = ({}) => {
	const [step, setStep] = useState(1);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [rentPricePerDay, setRentPricePerDay] = useState(0);
	const [categoryIds, setCategoryIds] = useState<string[]>([]);

	const router = useRouter();

	const [createProduct, result] = useMutation(CREATE_PRODUCT);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();

		const input = {
			title,
			description,
			price,
			rentPricePerDay,
			categoryIds,
		};

		// createProduct({ variables: { createProductInput: input } }).then(r => r);

		alert(JSON.stringify(input));
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
				<FormWrapper
					title='Product Name'
					description='Enter the name of the product'
				>
					<Input value={title} onChange={e => setTitle(e.target.value)} />
				</FormWrapper>
			),
		},

		{
			step: 2,
			node: (
				<FormWrapper
					title='Product Categories'
					description='Add one or multiple categories for the product'
				>
					<Input value='' />
				</FormWrapper>
			),
		},

		{
			step: 3,
			node: (
				<FormWrapper
					title='Product Description'
					description='Enter a description for the product'
				>
					<Textarea
						className='h-20'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</FormWrapper>
			),
		},

		{
			step: 4,
			node: (
				<FormWrapper
					title='Product Image'
					description='Upload an image of the product'
				>
					<Input value='' />
				</FormWrapper>
			),
		},

		{
			step: 5,
			node: (
				<FormWrapper
					title='Product Category'
					description='Select the category of the product'
				>
					<div className='space-y-4'>
						<Input value='' />
						{/*Render errors */}
						<Button type='submit'>Create Product</Button>
					</div>
				</FormWrapper>
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
