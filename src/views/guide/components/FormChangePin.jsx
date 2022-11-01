import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormChangePin = (props) => {
	const { t } = useTranslation();

	const [isShowPassword, setIsShowPassword] = useState({
		currenPin: false,
		newPin: false,
		confirmPin: false,
	});

	return (
		<div className='grid lg:grid-cols-2 lg:gap-2 md:gap-1 sm:gap-1 '>
			<div className='col-span-1 grid grid-cols-6 gap-6'>
				<div className='col-span-6 sm:col-span-4'>
					<label className='block text-sm  text-gray-700'>
						{t('Mã PIN cũ')} <span>*</span>
					</label>
					<div className='flex mt-1 items-center rounded-md relative  '>
						<input
							type={isShowPassword.currenPin ? 'text' : 'password'}
							autoComplete='new-password'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
						/>
						<div
							className='h text-2xl absolute right-0 top-2'
							onClick={() =>
								setIsShowPassword({ ...isShowPassword, currenPin: !isShowPassword.currenPin })
							}
						>
							{isShowPassword.currenPin ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>
				</div>

				<div className='col-span-6 sm:col-span-4'>
					<label className='block text-sm  text-gray-700'>
						{t('Mật khẩu mới')} <span>*</span>
					</label>
					<div className='flex mt-1 items-center rounded-md relative  '>
						<input
							type={isShowPassword.newPin ? 'text' : 'password'}
							autoComplete='new-password'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
						/>
						<div
							className='text-2xl absolute right-0 top-2'
							onClick={() => setIsShowPassword({ ...isShowPassword, newPin: !isShowPassword.newPin })}
						>
							{isShowPassword.newPin ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>
				</div>

				<div className='col-span-6 sm:col-span-4'>
					<label className='block text-sm  text-gray-700'>
						{t('Nhập lại mã PIN')} <span>*</span>
					</label>
					<div className='flex mt-1 items-center rounded-md relative  '>
						<input
							type={isShowPassword.confirmPin ? 'text' : 'password'}
							autoComplete='new-password'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
						/>
						<div
							className='text-2xl absolute right-0 top-2'
							onClick={() =>
								setIsShowPassword({
									...isShowPassword,
									confirmPin: !isShowPassword.confirmPin,
								})
							}
						>
							{isShowPassword.confirmPin ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>
				</div>

				<div className='col-span-6 sm:col-span-4'>
					<button
						className='mr-2 px-7 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'
						onClick={() => props.onOpenForm(false, false)}
					>
						{t('Hủy')}
					</button>
					<button className='mr-2 px-7 py-2  border border-blue-500 bg-blue-500 text-white rounded hover:bg-blue-400'>
						{t('Lưu')}
					</button>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default FormChangePin;
