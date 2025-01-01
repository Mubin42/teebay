'use client';
import { NextPage } from 'next';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { Input } from '@/components/ui/input';
import CreateProductWrapper from '@/app/create/product/components/CreateProductWrapper';
import { useState } from 'react';

const CreateProductPage: NextPage = ({}) => {
	const [step, setStep] = useState(1);

	// Step configuration
	const steps = [
		{
			step: 1,
			node: (
				<FormWrapper
					title='Product Name'
					description='Enter the name of the product'
				>
					<Input />
				</FormWrapper>
			),
		},

		{
			step: 2,
			node: (
				<FormWrapper
					title='Product Description'
					description='Enter the description of the product'
				>
					<Input />
				</FormWrapper>
			),
		},

		{
			step: 3,
			node: (
				<FormWrapper
					title='Product Price'
					description='Enter the price of the product'
				>
					<Input />
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
					<Input />
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
					<Input />
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
		>
			{steps.find(s => s.step === step)?.node}
		</CreateProductWrapper>
	);
};

export default CreateProductPage;
