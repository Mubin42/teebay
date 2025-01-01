import { Dispatch, SetStateAction } from 'react';

export type CompactState<T> = {
	value: T;
	set: Dispatch<SetStateAction<T>>;
};
