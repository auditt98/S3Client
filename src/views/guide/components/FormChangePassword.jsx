import React from 'react';

const FormChangePassword = () => {
	return (
		<div className='grid grid-cols-2 gap-2'>
			<div>
				<div className='sm:col-span-4'>
					<label htmlFor='email' className='block text-sm  text-gray-700'>
						Mã PIN cũ <span>*</span>
					</label>
					<div className='mt-1'>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
						/>
					</div>
				</div>

				<div className='sm:col-span-4'>
					<label htmlFor='email' className='block text-sm  text-gray-700'>
						Mã PIN mới <span>*</span>
					</label>
					<div className='mt-1'>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
						/>
					</div>
				</div>

				<div className='sm:col-span-4'>
					<label htmlFor='email' className='block text-sm  text-gray-700'>
						Nhập lại mã PIN <span>*</span>
					</label>
					<div className='mt-1'>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
						/>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default FormChangePassword;
