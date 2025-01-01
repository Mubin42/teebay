import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageWrapper from '@/components/wrappers/PageWrapper';
import { CompactState } from '../../../../types/CompactState';
import { Progress } from '@/components/ui/progress';

type Props = {
	children: React.ReactNode;
	step: CompactState<number>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CreateProductWrapper: FC<Props> = ({ children, step, handleSubmit }) => {
	return (
		<PageWrapper title='Create Product'>
			<div className='relative flex h-full w-full items-center'>
				<div className='flex w-full items-center justify-between'>
					{/*Left Button*/}
					<Button
						onClick={() => step.set(prev => prev - 1)}
						disabled={step.value === 1}
					>
						<ChevronLeft className='mr-2 h-4 w-4' />
						Back
					</Button>
					<form onSubmit={handleSubmit} className='flex w-full justify-center'>
						{children}
					</form>

					{/*Right Button*/}
					<Button
						onClick={() => step.set(prev => prev + 1)}
						disabled={step.value === 5}
					>
						<ChevronRight className='mr-2 h-4 w-4' />
						Right
					</Button>
				</div>
				{/*Step component*/}
				<div className='absolute left-[35%] top-0 min-w-[400px]'>
					<Progress value={((step.value - 1) / 4) * 100} />
				</div>
			</div>
		</PageWrapper>
	);
};

export default CreateProductWrapper;
