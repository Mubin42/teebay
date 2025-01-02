'use client';
import { NextPage } from 'next';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { Button } from '@/components/ui/button';

import ProductCard from '@/components/cards/ProductCard';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_MY_PRODUCTS } from '@/graphql/queries';

const Home: NextPage = () => {
	const { data, loading } = useQuery(GET_MY_PRODUCTS);

	return (
		<PageWrapper title='My Products'>
			<Link href='create/product'>
				<Button>Add Product</Button>
			</Link>
			<div className='flex flex-col gap-4'>
				{data?.getMyProducts.length > 0 ? (
					data?.getMyProducts?.map((item: any, index: number) => (
						<ProductCard
							key={index}
							title={item.title}
							description={item.description}
							createdAt={item.createdAt}
							views={item.views}
							categoryMaps={item.categoryMaps}
						/>
					))
				) : (
					<p>No products added</p>
				)}
			</div>
		</PageWrapper>
	);
};

export default Home;
