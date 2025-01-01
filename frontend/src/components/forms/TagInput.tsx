import { CompactState } from '@/types/CompactState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type Props = {
	state: CompactState<string[]>;
};

const TagInput = ({ state }: Props) => {
	const [input, setInput] = useState('');

	const addTag = () => {
		if (!input) return;
		state.set([...state.value, input]);
		setInput('');
	};

	const removeTag = (index: number) => {
		const newState = state.value.filter((_, i) => i !== index);
		state.set(newState);
	};

	const renderTags = (
		<div className='flex flex-wrap gap-2'>
			{state.value.map((item, index) => (
				<Badge key={index}>
					{item}
					<button
						className='group -mr-0.5 ml-1 shrink-0 rounded-full'
						onClick={() => removeTag(index)}
					>
						<X className='size-3 stroke-current' />
					</button>
				</Badge>
			))}
		</div>
	);

	return (
		<div className='space-y-2'>
			<div className='flex gap-2'>
				<Input value={input} onChange={e => setInput(e.target.value)} />
				<Button type='button' size='icon' className='h-9 w-10' onClick={addTag}>
					<Plus className='h-4 w-4' />
				</Button>
			</div>
			{renderTags}
		</div>
	);
};

export default TagInput;
