'use client';
import { NextPage } from 'next';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Edit, Trash } from 'lucide-react';
import ProductCard from '@/components/cards/ProductCard';

const Home: NextPage = () => {
	return (
		<PageWrapper title='My Products'>
			<Button>Add Product</Button>
			<div className='flex flex-col gap-4'>
				{Array.from({ length: 10 }).map((item, index) => (
					<ProductCard key={index} />
				))}
			</div>
		</PageWrapper>
	);
};

export default Home;
