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
import AuthWrapper from '@/components/wrappers/AuthWrapper';
import { registerSchema, RegisterSchemaType } from '@/form-schema/register';

const RegisterPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<RegisterSchemaType> = data => {
		alert(JSON.stringify(data));
	};

	return (
		<AuthWrapper
			title='Register'
			description='Enter your itentity to register'
			className='w-1/2'
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 flex-col gap-6'>
					<div className='grid gap-2'>
						<Label htmlFor='firstName'>First Name</Label>
						<Input
							id='firstName'
							type='firstName'
							placeholder='First Name'
							{...register('firstName')}
						/>
						{errors.firstName && (
							<span className='text-xs text-red-400'>
								{errors.firstName.message}
							</span>
						)}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='lastName'>Last Name</Label>
						<Input
							id='lastName'
							type='lastName'
							placeholder='Last Name'
							{...register('lastName')}
						/>
						{errors.lastName && (
							<span className='text-xs text-red-400'>
								{errors.lastName.message}
							</span>
						)}
					</div>

					<div className='col-span-2 grid gap-2'>
						<Label htmlFor='address'>Address</Label>
						<Input
							id='address'
							type='address'
							placeholder='123, Street Name, Dhaka'
							{...register('address')}
						/>
						{errors.address && (
							<span className='text-xs text-red-400'>
								{errors.address.message}
							</span>
						)}
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='user@example.com'
							{...register('email')}
						/>
						{errors.email && (
							<span className='text-xs text-red-400'>
								{errors.email.message}
							</span>
						)}
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='phone'>Phone</Label>
						<Input
							id='phone'
							type='phone'
							placeholder='017********'
							{...register('phone')}
						/>
						{errors.phone && (
							<span className='text-xs text-red-400'>
								{errors.phone.message}
							</span>
						)}
					</div>

					<div className='col-span-2 grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<PasswordInput id='password' {...register('password')} />
						{errors.password && (
							<span className='text-xs text-red-400'>
								{errors.password.message}
							</span>
						)}
					</div>

					<div className='col-span-2 grid gap-2'>
						<Label htmlFor='confirmPassword'>Confirm Password</Label>
						<PasswordInput
							id='confirmPassword'
							{...register('confirmPassword')}
						/>
						{errors.confirmPassword && (
							<span className='text-xs text-red-400'>
								{errors.confirmPassword.message}
							</span>
						)}
					</div>
					<Button type='submit' className='col-span-2 w-full'>
						Login
					</Button>
					<div className='col-span-2 mt-4 text-center text-sm'>
						{`Already have an account? `}
						<Link href='/auth/login' className='underline underline-offset-4'>
							Login
						</Link>
					</div>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default RegisterPage;
