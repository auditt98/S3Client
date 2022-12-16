import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { API, Auth } from 'aws-amplify';
import { Lucide, Modal, ModalBody } from '@/base-components';
import { useLottie } from 'lottie-react';
import loadingAnimation from '../lottie/loading.json';
import Lottie from 'lottie-react';

function Register() {
	const { signIn, signUp, confirmSignUp } = useAuthentication();
	const [showNotificationModal, setShowNotificationModal] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const [modalText, setModalText] = React.useState('');
	const [modalState, setModalState] = React.useState('success');
	const navigate = useNavigate();
	const options = {
		animationData: loadingAnimation,
		loop: true,
	};

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
				//call api to create user in dynamodb
				navigate('/register-confirm', { state: { email: data.email } });
				API.post('s3cUserAPI', '/user/register', {
					body: {
						id: result.userSub,
						email: data.email,
					},
				});
			}
		} catch (error) {
			setModalState('error');
			setModalText(error.message);
			setShowNotificationModal(true);
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
							setShowNotificationModal(false);
						}}
						className='flex flex-col justify-center'
					>
						<a
							onClick={() => {
								setShowNotificationModal(false);
							}}
							className='absolute right-0 top-0 mt-3 mr-3'
							href='#'
						>
							<Lucide icon='X' className='w-8 h-8 text-slate-400' />
						</a>
						<ModalBody className='p-0'>
							<div className='p-5 text-center'>
								{modalState === 'success' && (
									<Lucide icon='Check' className='w-12 h-12 text-green-400 mx-auto mt-3' />
								)}
								{modalState === 'error' && (
									<Lucide icon='Slash' className='w-12 h-12 text-red-400 mx-auto mt-3' />
								)}
								{/* <Lucide icon='Slash' className='w-12 h-12 text-red-400 mx-auto mt-3' /> */}
								<div className='text-slate-500 text-lg mt-2'>{modalText}</div>
							</div>
							<div className='px-5 pb-8 text-center'>
								<button
									type='button'
									onClick={() => {
										setShowNotificationModal(false);
									}}
									className='btn btn-primary w-24'
								>
									Ok
								</button>
							</div>
						</ModalBody>
					</Modal>
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
											{/* <Lottie animationData={loadingAnimation} loop={true} /> */}
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
