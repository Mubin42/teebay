'use client';

import { NextPage } from 'next';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/buttons/PasswordInput';
import Link from 'next/link';
import { loginSchema, LoginSchemaType } from '@/form-schema/login';
import AuthWrapper from '@/components/wrappers/AuthWrapper';

const LoginPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginSchemaType> = data => {
		alert(JSON.stringify(data));
	};

	return (
		<AuthWrapper
			title='Login'
			description='Please enter your credential to login'
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-6'>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='m@example.com'
							{...register('email')}
						/>
						{errors.email && (
							<span className='text-xs text-red-400'>
								{errors.email.message}
							</span>
						)}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<PasswordInput id='password' {...register('password')} />
						{errors.password && (
							<span className='text-xs text-red-400'>
								{errors.password.message}
							</span>
						)}
					</div>
					<Button type='submit' className='w-full'>
						Login
					</Button>
				</div>
				<div className='mt-4 text-center text-sm'>
					{`Don't have an account? `}
					<Link href='/auth/register' className='underline underline-offset-4'>
						Register
					</Link>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default LoginPage;
