'use client';
import { NextPage } from 'next';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoughtTab from '@/app/histories/components/BoughtTab';
import SoldTab from '@/app/histories/components/SoldTab';
import BorrowedTab from '@/app/histories/components/BorrowedTab';
import LentTab from '@/app/histories/components/LentTab';

const ViewHistoryPage: NextPage = () => {
	return (
		<div>
			<PageWrapper title='View History'>
				<Tabs defaultValue='bought' className='w-full'>
					<TabsList className='grid w-full grid-cols-4'>
						<TabsTrigger value='bought'>Bought</TabsTrigger>
						<TabsTrigger value='sold'>Sold</TabsTrigger>
						<TabsTrigger value='borrowed'>Borrowed</TabsTrigger>
						<TabsTrigger value='lent'>Lent</TabsTrigger>
					</TabsList>
					<BoughtTab />
					<SoldTab />
					<BorrowedTab />
					<LentTab />
				</Tabs>
			</PageWrapper>
		</div>
	);
};
export default ViewHistoryPage;
