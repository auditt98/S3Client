import { ClassicEditor, TomSelect } from '@/base-components';
import { API } from 'aws-amplify';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useS3 } from '../../hooks/storage/useS3';
import { currentUserState } from '../../stores/user-store';

function Settings() {
	const form = useForm();
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordReadonly, setPasswordReadonly] = useState(true);
	const { getRegions } = useS3();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = form;

	const onSubmit = async (data) => {
		let { accessKeyId, secretAccessKey } = data;
		try {
			console.log('currentUser', currentUser);
			let result = await API.post('s3cUserAPI', `/user/${currentUser.id}/${currentUser.email}`, {
				body: {
					accessKeyId,
					secretAccessKey,
				},
			});
			if (result && result.result === 'success') {
				setCurrentUser({ ...currentUser, accessKeyId, secretAccessKey });
				// let regions = await getRegions();
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<>
			<div className='intro-y flex items-center mt-8'>
				<h2 className='text-lg font-medium mr-auto'>Settings</h2>
			</div>
			<div className='grid grid-cols-12 gap-6 mt-5'>
				<div className='intro-y col-span-12 lg:col-span-6'>
					{/* BEGIN: Form Layout */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='intro-y box p-5'>
							<div>
								<label htmlFor='accessKeyId' className='form-label'>
									AccessKeyID
								</label>
								<input
									{...register('accessKeyId', { required: true })}
									type='text'
									defaultValue={currentUser.accessKeyId}
									id='accessKeyId'
									autoComplete='do-not-autocomplete'
									className={`intro-x login__input form-control py-3 px-4 block relative pr-16 cursor-text`}
									placeholder='AccessKeyID'
								/>
							</div>
							<div className='mt-4'>
								<label htmlFor='secretAccessKey' className='form-label'>
									SecretAccessKey
								</label>
								<div className='h-fit relative'>
									<input
										{...register('secretAccessKey', { required: true })}
										defaultValue={currentUser.secretAccessKey}
										readOnly={passwordReadonly}
										onFocus={() => {
											setPasswordReadonly(false);
										}}
										type={showPassword ? 'text' : 'password'}
										autoComplete='do-not-autocomplete'
										id='secretAccessKey'
										className={`intro-x login__input form-control py-3 px-4 block relative pr-16 cursor-text`}
										placeholder='SecretAccessKey'
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
							<div className='text-right mt-5'>
								<button type='submit' className='btn btn-primary w-24'>
									Save
								</button>
							</div>
						</div>
					</form>

					{/* END: Form Layout */}
				</div>
			</div>
		</>
	);
}

export default Settings;
