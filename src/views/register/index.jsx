import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';

function PasswordStrengthDisplay({ control }) {
	const passwordStrengthChecker = (password) => {
		let valid = false;
		let strength = 'Weak';
		let strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
		let mediumRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
		let weakRegex = /(?=.{6,})/;
		if (strongRegex.test(password)) {
			valid = true;
			strength = 'Strong';
		} else if (mediumRegex.test(password)) {
			valid = true;
			strength = 'Medium';
		} else if (weakRegex.test(password)) {
			valid = true;
		}
		return { valid, strength };
	};

	const passwordStrengthColor = (position, strength, valid) => {
		switch (strength) {
			case 'Weak':
				if (position <= 1 && valid) return 'bg-danger';
				break;
			case 'Medium':
				if (position <= 2 && valid) return 'bg-warning';
				break;
			// eslint-disable-next-line no-fallthrough
			case 'Strong':
				if (position <= 3 && valid) return 'bg-success';
				break;
			// eslint-disable-next-line no-fallthrough
			default:
				return 'bg-slate-100 dark:bg-darkmode-800';
		}
		return 'bg-slate-100 dark:bg-darkmode-800';
	};

	let password = useWatch({
		control,
		name: 'Password', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
	});
	let { valid, strength } = passwordStrengthChecker(password);

	return (
		<>
			<div className={`col-span-4 h-full rounded ${passwordStrengthColor(1, strength, valid)}`}></div>
			<div className={`col-span-4 h-full rounded ${passwordStrengthColor(2, strength, valid)}`}></div>
			<div className={`col-span-4 h-full rounded ${passwordStrengthColor(3, strength, valid)}`}></div>
		</>
	);
}

function Register() {
	const [passwordState, setPasswordState] = React.useState({});
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm();
	const password = useRef({});
	password.current = watch('password', '');

	let msgError = '';
	if (Object.keys(errors).length !== 0) {
		switch (true) {
			case errors?.fullName?.type === 'required':
				msgError = 'Full Name is required';
				break;
			case errors?.email?.type === 'required':
				msgError = 'Password is required';
				break;
			case errors?.password?.type === 'required':
				msgError = 'Password is required';
				break;
			case errors?.confirmPassword?.type === 'required':
				msgError = 'Confirm password is required';
				break;
			case errors?.terms?.type === 'required':
				msgError = 'Term must be checked';
				break;

			case errors?.password?.type === 'minLength':
				msgError = 'Password must be 6 characters long';
				break;

			case errors?.confirmPassword?.type === 'validate':
				msgError = 'The passwords do not match';
				break;

			default:
		}
	}

	const onSubmit = (data) => console.log(data);

	useEffect(() => {
		dom('body').removeClass('main').removeClass('error-page').addClass('login');
	}, []);

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
										<input
											{...register('fullName', { required: true })}
											type='text'
											className={`${
												Object.keys(errors).length > 0 && errors?.fullName
													? 'intro-x login__input form-control py-3 px-4 block mt-4 border-input-err'
													: 'intro-x login__input form-control py-3 px-4 block mt-4'
											}`}
											placeholder='Full Name'
										/>
										<input
											{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
											type='text'
											className={`${
												Object.keys(errors).length > 0 && errors?.email
													? 'intro-x login__input form-control py-3 px-4 block mt-4 border-input-err'
													: 'intro-x login__input form-control py-3 px-4 block mt-4'
											}`}
											placeholder='Email'
										/>
										<input
											{...register('password', { required: true, minLength: 6 })}
											type='password'
											className={`${
												Object.keys(errors).length > 0 && errors?.password
													? 'intro-x login__input form-control py-3 px-4 block mt-4 border-input-err'
													: 'intro-x login__input form-control py-3 px-4 block mt-4'
											}`}
											placeholder='Password'
										/>
										<div className='intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3'>
											<PasswordStrengthDisplay control={control}></PasswordStrengthDisplay>
											{/* <div
												className={`col-span-4 h-full rounded ${passwordStrengthColor(1)}`}
											></div>
											<div
												className={`col-span-4 h-full rounded ${passwordStrengthColor(2)}`}
											></div>
											<div
												className={`col-span-4 h-full rounded ${passwordStrengthColor(3)}`}
											></div> */}
											{/* bg-slate-100 dark:bg-darkmode-800  */}
										</div>
										<input
											{...register('confirmPassword', {
												required: true,
												validate: (value) => value === password.current,
											})}
											type='password'
											className={`${
												Object.keys(errors).length > 0 && errors?.confirmPassword
													? 'intro-x login__input form-control py-3 px-4 block mt-4 border-input-err'
													: 'intro-x login__input form-control py-3 px-4 block mt-4'
											}`}
											placeholder='Password Confirmation'
										/>
									</div>
									<div className='intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm'>
										<input
											{...register('terms', { required: true })}
											id='remember-me'
											type='checkbox'
											className='form-check-input border mr-2'
										/>
										<label className='cursor-pointer select-none' htmlFor='remember-me'>
											I agree to the
										</label>
										<a className='text-primary dark:text-slate-200 ml-1' href=''>
											Privacy Policy
										</a>
										.
									</div>

									<div className='mt-4 text-danger'>{msgError}</div>

									<div className='intro-x mt-5 xl:mt-8 text-center xl:text-left'>
										<button
											type='submit'
											className='btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top'
										>
											Register
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
