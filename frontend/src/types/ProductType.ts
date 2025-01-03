export type Product = {
	id: string;
	title: string;
	description: string;
	price: number;
	rentPricePerDay: number;
	views: number;
	createdAt: string;
	categoryMaps: {
		category: {
			id: string;
			name: string;
		};
	}[];
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	purchase?: {
		id: string;
		user: {
			id: string;
			firstName: string;
			lastName: string;
			email: string;
		};
	};
};
