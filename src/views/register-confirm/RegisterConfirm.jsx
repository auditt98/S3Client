import React, { useEffect, useState } from 'react';
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function RegisterConfirm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm();
	const { signIn, signUp, confirmSignUp } = useAuthentication();

	useEffect(() => {
		dom('body').removeClass('main').removeClass('error-page').addClass('login');
	}, []);

	const onSubmit = async (data) => {
		try {
			let res = await confirmSignUp({
				email: data.email,
				code: data.verificationCode,
			});
			if (res) {
				console.log('res', res);
			}
		} catch (e) {
			console.log('error signing up', e);
		}
	};

	return (
		<>
			<div>
				<DarkModeSwitcher />
				<div className='container sm:px-10'>
					<div className='block xl:grid grid-cols-2 gap-4'>
						{/* BEGIN: Login Info */}
						<div className='hidden xl:flex flex-col min-h-screen'>
							<a href='' className='-intro-x flex items-center pt-5'>
								<img alt='Midone Tailwind HTML Admin Template' className='w-6' src={logoUrl} />
								<span className='text-white text-lg ml-3'> Tinker </span>
							</a>
							<div className='my-auto'>
								<img
									alt='Midone Tailwind HTML Admin Template'
									className='-intro-x w-1/2 -mt-16'
									src={illustrationUrl}
								/>
								<div className='-intro-x text-white font-medium text-4xl leading-tight mt-10'>
									A few more clicks to <br />
									sign in to your account.
								</div>
								<div className='-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400'>
									Manage all your e-commerce accounts in one place
								</div>
							</div>
						</div>
						{/* END: Login Info */}
						{/* BEGIN: Login Form */}
						<div className='h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0'>
							<div className='my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto'>
								<h2 className='intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left'>
									Email Confirmation
								</h2>
								{/* <UsersCreateForm></UsersCreateForm> */}
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='intro-x mt-8'>
										<input
											{...register('email', { required: true })}
											type='text'
											className={`${
												Object.keys(errors).length > 0 && errors?.fullName
													? 'intro-x login__input form-control py-3 px-4 block mt-4 border-input-err'
													: 'intro-x login__input form-control py-3 px-4 block mt-4'
											}`}
											placeholder='Email'
										/>
										<input
											{...register('verificationCode', { required: true })}
											type='text'
											className={`${
												Object.keys(errors).length > 0 && errors?.email
													? 'intro-x login__input form-control py-3 px-4 block mt-4 border-input-err'
													: 'intro-x login__input form-control py-3 px-4 block mt-4'
											}`}
											placeholder='Verification Code'
										/>
									</div>

									<div className='intro-x mt-5 xl:mt-8 text-center xl:text-left'>
										<button
											type='submit'
											className='btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top'
										>
											Submit
										</button>
										<Link
											to='/login'
											className='btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top'
										>
											Sign in
										</Link>
									</div>
								</form>
							</div>
						</div>
						{/* END: Login Form */}
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterConfirm;
