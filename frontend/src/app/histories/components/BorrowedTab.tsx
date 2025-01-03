import { TabsContent } from '@/components/ui/tabs';
import { useQuery } from '@apollo/client';
import { GET_BORROWED_PRODUCTS, GET_BOUGHT_PRODUCTS } from '@/graphql/queries';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import moment from 'moment/moment';
import { Label } from '@/components/ui/label';

const BorrowedTab = () => {
	const { data, loading } = useQuery(GET_BORROWED_PRODUCTS);

	const renderProducts =
		data?.getBorrowedProducts.length > 0 ? (
			data?.getBorrowedProducts?.map((item: any, index: number) => (
				<Card key={index} className='w-[350px]'>
					<CardHeader>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{`Created At: ${moment(item.createdAt).calendar()}`}</CardDescription>
						<CardDescription>{`Posted By: ${item.user.firstName} ${item.user.lastName}`}</CardDescription>
						<CardDescription>{`Views: ${item.views}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<CardDescription>{item.description}</CardDescription>
						<div className='flex items-center gap-2'>
							<Label className='font-semibold'>Categories: </Label>
							<span className='text-sm'>
								{item?.categoryMaps
									.map((catMap: any) => catMap.category.name)
									.join(', ')}
							</span>
						</div>
					</CardContent>
					<CardFooter className='justify-end gap-2'></CardFooter>
				</Card>
			))
		) : (
			<p>No products available</p>
		);

	return (
		<TabsContent value='borrowed'>
			<div className='flex flex-col items-center gap-4 p-10'>
				{renderProducts}
			</div>
		</TabsContent>
	);
};

export default BorrowedTab;
