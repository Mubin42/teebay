import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CreateProductType = {
	title: string;
	description?: string;
	price: number;
	rentPricePerDay: number;
	categoryIds: string[];
};

type UpdateProps = {
	title?: string;
	description?: string;
	price?: number;
	rentPricePerDay?: number;
	categoryIds: string[];
};

const initialState: CreateProductType = {
	title: '',
	description: '',
	price: 0,
	rentPricePerDay: 0,
	categoryIds: [],
};

export const createProductSlice = createSlice({
	name: 'createProduct',
	initialState,
	reducers: {
		updateProductState: (state, action: PayloadAction<UpdateProps>) => {
			state.title = action.payload.title || state.title;
			state.description = action.payload.description || state.description;
			state.price = action.payload.price || state.price;
			state.rentPricePerDay =
				action.payload.rentPricePerDay || state.rentPricePerDay;
			state.categoryIds = action.payload.categoryIds || state.categoryIds;
		},

		refresh: state => {
			state.title = '';
			state.description = '';
			state.price = 0;
			state.rentPricePerDay = 0;
			state.categoryIds = [];
		},
	},
});

export const { updateProductState, refresh } = createProductSlice.actions;

export default createProductSlice.reducer;
