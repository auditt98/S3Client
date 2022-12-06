import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useAuthentication } from '../../hooks/auth/useAuthentication';

function Register() {
	const { signIn, signUp, confirmSignUp } = useAuthentication();
	const [showPassword, setShowPassword] = React.useState(false);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
		getValues,
	} = useForm();

	useEffect(() => {
		dom('body').removeClass('main').removeClass('error-page').addClass('login');
	}, []);

	const onSubmit = async (data) => {
		try {
			let result = await signUp({
				email: data.email,
				password: data.password,
				attributes: {
					email: data.email,
				},
			});
			if (result && result.userSub) {
				// {
				// 	userSub: 'string',
				// 	userConfirmed: true,
				// 	user: {
				// 		authenticationFlowType: 'string',
				// 		username: 'string',
				// 	},
				// 	codeDeliveryDetails: {
				// 		AttributeName: 'string',
				// 		DeliveryMedium: 'string',
				// 		Destination: 'string',
				// 	},
				// }

				//redirect to confirm page

				//call api to create user in dynamodb

				console.log('res', result);
			}
		} catch (error) {
			console.log('error registering', error);
		}
	};

	return (
		<>
			<div>
				<DarkModeSwitcher />
				<div className='container sm:px-10'>
					<div className='block xl:grid grid-cols-2 gap-4'>
						{/* BEGIN: Register Info */}
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
									sign up to your account.
								</div>
								<div className='-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400'></div>
							</div>
						</div>
						{/* END: Register Info */}
						{/* BEGIN: Register Form */}
						<div className='h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0'>
							<div className='my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto'>
								<h2 className='intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left'>
									Sign Up
								</h2>
								<div className='intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center'></div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='intro-x mt-8'>
										<div className='h-fit relative'>
											<input
												{...register('email', { required: true })}
												type='text'
												className={` intro-x login__input form-control py-3 px-4 block mt-4`}
												placeholder='Email'
											/>
										</div>
										<div className='h-fit relative'>
											<input
												{...register('password', { required: true })}
												type={showPassword ? 'text' : 'password'}
												className={`intro-x login__input form-control py-3 px-4 block mt-4`}
												placeholder='Password'
											/>
											<div className='absolute flex flex-col justify-center top-0 right-2 rounded-full z-50 h-full'>
												{showPassword && (
													<div
														className='w-12 h-8 text-center bg-primary text-white flex flex-col justify-center rounded-lg cursor-pointer border-solid border-2 border-primary'
														onClick={() => {
															setShowPassword(false);
														}}
													>
														Hide
													</div>
												)}
												{!showPassword && (
													<div
														className='w-12 h-8 text-center bg-neutral-100 text-gray-500 flex flex-col justify-center rounded-lg cursor-pointer  border-solid border-2 border-gray-200'
														onClick={() => {
															setShowPassword(true);
														}}
													>
														Show
													</div>
												)}
											</div>
										</div>
									</div>

									<div className='intro-x mt-5 xl:mt-8 text-center xl:text-left'>
										<button
											type='submit'
											className='btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top'
										>
											Sign Up
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
						{/* END: Register Form */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
