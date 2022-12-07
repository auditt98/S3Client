import React, { useEffect, useState } from 'react';
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import { useSignIn } from 'react-auth-kit';
import { useAuth } from '../../hooks/auth/useAuth';
import { Link } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { useForm } from 'react-hook-form';
import {
	Lucide,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownContent,
	DropdownItem,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	TinySlider,
	PreviewComponent,
	Preview,
	Source,
	Highlight,
} from '@/base-components';
import { useNavigate } from 'react-router-dom';
import { ERRORS } from '../../constants/constants';

function Login() {
	const [showNotificationModal, setNotificationModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	let navigate = useNavigate();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm();

	const { signIn } = useAuthentication();

	useEffect(() => {
		dom('body').removeClass('main').removeClass('error-page').addClass('login');
	}, []);

	const onSubmit = async (data) => {
		try {
			let res = await signIn({ email: data.email, password: data.password });
			if (res && res.username) {
				navigate('/dashboard');
				console.log('res', res);
			}
		} catch (e) {
			let errorCode = e['code'];
			let errMessage = ERRORS[errorCode] || ERRORS.FallbackError;
			if (errorCode === ERRORS.NotAuthorizedException) {
				setModalText(e.message);
				setNotificationModal(true);
				return;
			}
			if (errorCode === ERRORS.UserNotConfirmedException) {
				navigate('/register-confirm', {
					state: {
						email: data.email,
					},
				});
			} else {
				setModalText(errMessage);
				setNotificationModal(true);
			}
		}
	};

	return (
		<>
			<div>
				<DarkModeSwitcher />
				<div className='container sm:px-10'>
					<Modal
						show={showNotificationModal}
						onHidden={() => {
							setNotificationModal(false);
						}}
						className='flex flex-col justify-center'
					>
						<a
							onClick={() => {
								setNotificationModal(false);
							}}
							className='absolute right-0 top-0 mt-3 mr-3'
							href='#'
						>
							<Lucide icon='X' className='w-8 h-8 text-slate-400' />
						</a>
						<ModalBody className='p-0'>
							<div className='p-5 text-center'>
								<Lucide icon='Slash' className='w-12 h-12 text-red-400 mx-auto mt-3' />
								<div className='text-slate-500 text-lg mt-2'>{modalText}</div>
							</div>
							<div className='px-5 pb-8 text-center'>
								<button
									type='button'
									onClick={() => {
										setNotificationModal(false);
									}}
									className='btn btn-primary w-24'
								>
									Ok
								</button>
							</div>
						</ModalBody>
					</Modal>
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
								{/* <div className='-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400'>
									Manage all your e-commerce accounts in one place
								</div> */}
							</div>
						</div>
						{/* END: Login Info */}
						{/* BEGIN: Login Form */}
						<div className='h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0'>
							<div className='my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto'>
								<h2 className='intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left'>
									Sign In
								</h2>
								<div className='intro-x mt-2 text-slate-400 xl:hidden text-center'>
									A few more clicks to sign in to your account. Manage all your e-commerce accounts in
									one place
								</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='intro-x mt-8'>
										<div className='h-fit relative'>
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
										</div>
										<div className='h-fit relative'>
											<input
												{...register('password', { required: true })}
												type={showPassword ? 'text' : 'password'}
												className={`intro-x login__input form-control py-3 px-4 block mt-4 relative pr-16`}
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
											Sign In
										</button>
										<Link
											to='/register'
											className='btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top'
										>
											Sign Up
										</Link>
									</div>
								</form>
								<div className='intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4'>
									{/* <div className='flex items-center mr-auto'>
										<input
											id='remember-me'
											type='checkbox'
											className='form-check-input border mr-2'
										/>
										<label className='cursor-pointer select-none' htmlFor='remember-me'>
											Remember me
										</label>
									</div> */}
									<Link to='/forgot-password' href=''>
										Forgot Password?
									</Link>
								</div>
							</div>
						</div>
						{/* END: Login Form */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
