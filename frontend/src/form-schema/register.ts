import { z } from 'zod';

export const registerSchema = z
	.object({
		firstName: z.string().min(2, { message: 'At least 2 characters' }),
		lastName: z.string().min(2, { message: 'At least 2 characters' }),
		email: z.string().email({ message: 'Invalid email address' }),
		phone: z.string().min(11, { message: 'At least 11 characters' }),
		address: z.string().optional(),
		password: z.string().min(6, { message: 'At least 6 characters' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
