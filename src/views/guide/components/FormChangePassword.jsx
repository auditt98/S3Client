import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
const FormChangePassword = (props) => {
	const [isShowPassword, setIsShowPassword] = useState({
		currenPassword: false,
		newPassword: false,
		confirmPassword: false,
	});
	const { t } = useTranslation();

	return (
		<div className='grid lg:grid-cols-2 lg:gap-2 md:gap-1 sm:gap-1 '>
			<div className='col-span-1 grid grid-cols-6 gap-6'>
				<div className='col-span-6 sm:col-span-4'>
					<label className='block text-sm  text-gray-700'>
						{t('Mật khẩu hiện tại')} <span>*</span>
					</label>
					<div className='flex mt-1 items-center rounded-md relative  '>
						<input
							type={isShowPassword.currenPassword ? 'text' : 'password'}
							autoComplete='new-password'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
						/>
						<div
							className='h text-2xl absolute right-0 top-2'
							onClick={() =>
								setIsShowPassword({ ...isShowPassword, currenPassword: !isShowPassword.currenPassword })
							}
						>
							{isShowPassword.currenPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>
				</div>

				<div className='col-span-6 sm:col-span-4'>
					<label className='block text-sm  text-gray-700'>
						{t('Mật khẩu mới')} <span>*</span>
					</label>
					<div className='flex mt-1 items-center rounded-md relative  '>
						<input
							type={isShowPassword.newPassword ? 'text' : 'password'}
							autoComplete='new-password'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
						/>
						<div
							className='text-2xl absolute right-0 top-2'
							onClick={() =>
								setIsShowPassword({ ...isShowPassword, newPassword: !isShowPassword.newPassword })
							}
						>
							{isShowPassword.newPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>
				</div>

				<div className='col-span-6 sm:col-span-4'>
					<label className='block text-sm  text-gray-700'>
						{t('Nhập lại mật khẩu mới')} <span>*</span>
					</label>
					<div className='flex mt-1 items-center rounded-md relative  '>
						<input
							type={isShowPassword.confirmPassword ? 'text' : 'password'}
							autoComplete='new-password'
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
						/>
						<div
							className='text-2xl absolute right-0 top-2'
							onClick={() =>
								setIsShowPassword({
									...isShowPassword,
									confirmPassword: !isShowPassword.confirmPassword,
								})
							}
						>
							{isShowPassword.confirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
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

export default FormChangePassword;
