import { ClassicEditor, TomSelect } from '@/base-components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Settings() {
	const form = useForm();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = form;

	const onSubmit = (data) => {
		console.log('data', data);
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
									id='accessKeyId'
									className={`intro-x login__input form-control py-3 px-4 block relative pr-16`}
									placeholder='AccessKeyID'
								/>
							</div>
							<div className='mt-4'>
								<label htmlFor='secretAccessKey' className='form-label'>
									SecretAccessKey
								</label>
								<input
									{...register('secretAccessKey', { required: true })}
									type='text'
									id='secretAccessKey'
									className={`intro-x login__input form-control py-3 px-4 block relative pr-16`}
									placeholder='SecretAccessKey'
								/>
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
