import { CompactState } from '@/types/CompactState';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import FormWrapper from '@/components/wrappers/FormWrapper';

type Props = {
	price: CompactState<number>;
	rentPricePerDay: CompactState<number>;
};

export const rentOptions = [
	{ value: 'day', label: 'Per Day' },
	{ value: 'week', label: 'Per Week' },
	{ value: 'month', label: 'Per Month' },
];

const ProductPrice: React.FC<Props> = ({ price, rentPricePerDay }) => {
	const [rent, setRent] = useState(0);
	const [selected, setSelected] = useState<{
		value: string;
		label: string;
	}>(rentOptions[0]);

	// Based on the selected value, calculating the rent price per day
	useEffect(() => {
		switch (selected.value) {
			case 'week':
				rentPricePerDay.set(rent / 7);
				break;
			case 'month':
				rentPricePerDay.set(rent / 30);
				break;
			default:
				rentPricePerDay.set(rent);
		}
	}, [selected, rent]);

	return (
		<FormWrapper
			title='Selling and Renting Price'
			description='Set the price for selling and renting the product.'
		>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='price' className='text-sm font-semibold'>
						Price
					</label>
					<Input
						type='number'
						value={price.value.toString()}
						onChange={e => price.set(parseInt(e.target.value) || 0)}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor='rentPricePerDay' className='text-sm font-semibold'>
						Rent price per day: {rentPricePerDay.value.toFixed(2)} taka
					</label>
					<div className='grid grid-cols-2 gap-2'>
						<Input
							type='number'
							value={rent.toString()}
							onChange={e => setRent(parseInt(e.target.value) || 0)}
						/>
						<Select
							value={selected.value}
							onValueChange={value => {
								setSelected({
									value: value,
									label:
										rentOptions.find(option => option.value === value)?.label ||
										'',
								});
							}}
						>
							<SelectTrigger aria-label='Select unit'>
								<SelectValue placeholder={selected.label || 'Select status'} />
							</SelectTrigger>
							<SelectContent>
								{rentOptions.map((item, index) => (
									<SelectItem key={index} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</FormWrapper>
	);
};

export default ProductPrice;
