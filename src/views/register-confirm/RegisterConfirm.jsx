import React, { useEffect, useState } from 'react';
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lucide, Modal, ModalBody } from '@/base-components';
import { ERRORS } from '../../constants/constants';

function RegisterConfirm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
		getValues,
	} = useForm();
	const { signIn, signUp, confirmSignUp, resendSignUp } = useAuthentication();

	useEffect(() => {
		dom('body').removeClass('main').removeClass('error-page').addClass('login');
	}, []);

	const navigate = useNavigate();

	const { state } = useLocation();
	const [showNotificationModal, setShowNotificationModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [modalState, setModalState] = useState('success');

	const onSubmit = async (data) => {
		try {
			let res = await confirmSignUp({
				email: data.email,
				code: data.verificationCode,
			});
			if (res) {
				navigate('/login');
			}
		} catch (e) {
			let errorCode = e['code'];
			let errMessage = ERRORS[errorCode] || ERRORS.FallbackError;
			if (
				errorCode === 'NotAuthorizedException' &&
				e.message === 'User cannot be confirmed. Current status is CONFIRMED'
			) {
				errMessage = 'User is already confirmed!';
			}
			setModalState('error');
			setModalText(errMessage);
			setShowNotificationModal(true);
		}
	};

	const resendConfirmation = async () => {
		let email = getValues('email');
		try {
			if (!email) {
				setModalState('error');
				setModalText('Please enter your email address');
				setShowNotificationModal(true);
			}
			let result = await resendSignUp({ email });
			if (result && result['CodeDeliveryDetails']) {
				setModalState('success');
				setModalText('Verification code sent, please check your email');
				setShowNotificationModal(true);
			}
		} catch (e) {
			setModalState('error');
			let errorCode = e['code'];
			let errMessage = ERRORS[errorCode] || ERRORS.FallbackError;
			setModalText(errMessage);
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
									Email Confirmation
								</h2>
								<h5 className='intro-x mt-4 text-center xl:text-left'>
									We've sent you a confirmation email, please enter the verification code to complete
									your account creation process.
								</h5>
								{/* <UsersCreateForm></UsersCreateForm> */}
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='intro-x mt-8'>
										<input
											{...register('email', { required: true })}
											defaultValue={state?.email || ''}
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
											Verify Account
										</button>
										<button
											onClick={() => {
												resendConfirmation();
											}}
											className='btn btn-outline-secondary py-3 px-4 w-full xl:w-60 xl:mr-3 align-top'
										>
											Resend Confirmation Email
											<Lucide icon='RefreshCcw' className='w-5 h-5 ml-2 text-slate-400' />
										</button>
										<Link
											to='/login'
											className='btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top'
										>
											Back to Sign In
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
