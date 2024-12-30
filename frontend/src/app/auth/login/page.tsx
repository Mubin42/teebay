'use client';

import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/buttons/PasswordInput';
import Link from 'next/link';
import { loginSchema, LoginSchemaType } from '@/form-schema/login';
import AuthWrapper from '@/components/wrappers/AuthWrapper';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { AUTH_TOKEN_NAME } from '@/lib/constants';

const LoginPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
	});

	const [login, result] = useMutation(LOGIN);

	const onSubmit: SubmitHandler<LoginSchemaType> = data => {
		login({
			variables: { input: data },
		}).then(r => r);
	};

	useEffect(() => {
		if (result.data) {
			toast({
				title: 'Login success',
				description: 'You have successfully logged in',
				variant: 'default',
			});
			localStorage.setItem(AUTH_TOKEN_NAME, result.data.login.token);
			window.location.href = '/';
		}
		if (result.error) {
			toast({
				title: 'Login failed',
				description: result.error.message,
				variant: 'destructive',
			});
		}
	}, [result]);

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
