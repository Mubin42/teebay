'use client';
import { NextPage } from 'next';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { Button } from '@/components/ui/button';

import ProductCard from '@/components/cards/ProductCard';
import Link from 'next/link';

const Home: NextPage = () => {
	return (
		<PageWrapper title='My Products'>
			<Link href='create/product'>
				<Button>Add Product</Button>
			</Link>
			<div className='flex flex-col gap-4'>
				{Array.from({ length: 10 }).map((item, index) => (
					<ProductCard key={index} />
				))}
			</div>
		</PageWrapper>
	);
};

export default Home;
