import React, { useState } from 'react';
import pencilIcon from '@/assets/images/pencil.svg';
import FormChangePassword from './FormChangePassword';
import FormChangePin from './FormChangePin';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../base-components/modal';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Profile = () => {
	const [showInput, setShowInput] = useState({
		inputName: false,
		inputBirthday: false,
		inputAddress: false,
		inputEmail: false,
		inputGender: false,
		inputPhoneNumber: false,
	});
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOpenForm, setIsOpenForm] = useState({ isOpenFormChangePassword: false, isOpenFormChangePin: false });
	const { t } = useTranslation();

	const onOpenForm = (isOpenFormChangePassword, isOpenFormChangePin) => {
		setIsOpenForm({ ...isOpenForm, isOpenFormChangePassword, isOpenFormChangePin });
	};

	return (
		<div>
			{isOpenForm.isOpenFormChangePassword && <FormChangePassword onOpenForm={onOpenForm} />}
			{isOpenForm.isOpenFormChangePin && <FormChangePin onOpenForm={onOpenForm} />}

			<Modal show={isOpenModal} onHidden={() => setIsOpenModal(false)}>
				<div className='p-4'>
					<div className='py-5'>
						<h2 className='font-bold text-primary text-2xl'>Vui lòng nhập mật khẩu</h2>
					</div>
					<div>
						<div className='col-span-6 sm:col-span-4'>
							<label className='block text-sm  text-gray-700'>{t('Vui lòng nhập mật khẩu')}</label>
							<div className='flex mt-1 items-center rounded-md relative  '>
								<input
									type={true ? 'text' : 'password'}
									autoComplete='new-password'
									className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
								/>
								<div className='h text-2xl absolute right-0 top-2' onClick={() => {}}>
									{false ? <AiFillEye /> : <AiFillEyeInvisible />}
								</div>
							</div>
						</div>
						<div className='flex justify-end py-6'>
							<button
								className='mr-2 px-7 py-2  border border-primary-500 bg-primary-500 text-primary rounded hover:text-blue-400'
								onClick={() => {}}
							>
								Hủy bỏ
							</button>
							<button
								className=' px-7 py-2  border border-primary-500 bg-blue-500 text-white rounded hover:bg-blue-400'
								onClick={() => {}}
							>
								Xác nhận
							</button>
						</div>
					</div>
				</div>
			</Modal>

			{!isOpenForm.isOpenFormChangePassword && !isOpenForm.isOpenFormChangePin && (
				<div>
					<div className='grid grid-cols-2 gap-2'>
						<div>
							<div className=''>
								<div className='grid grid-cols-12 gap-0 py-2'>
									<span className='col-span-5 text-slate-400'>{t('Tên đăng nhập')}:</span>
									<span className='col-span-7'>test123</span>
								</div>
								<div className='grid grid-cols-12 gap-0 py-2'>
									<span className='col-span-5 text-slate-400'>{t('Họ và tên')}:</span>
									{showInput.inputName ? (
										<div className='flex col-span-4 '>
											<input className=' border border-blue-500 focus-visible:outline-none' />
											<img
												src={pencilIcon}
												alt=''
												className='w-4'
												onClick={() => setShowInput({ ...showInput, inputName: false })}
											/>
										</div>
									) : (
										<div className='flex col-span-4 '>
											<span className='col-span-7 mr-1'>test123</span>
											<img
												src={pencilIcon}
												alt=''
												className='w-4 mb-1'
												onClick={() => setShowInput({ ...showInput, inputName: true })}
											/>
										</div>
									)}
								</div>
								<div className=''>
									<div className='grid grid-cols-12 gap-0 py-2'>
										<span className='col-span-5 text-slate-400'>{t('Ngày sinh')}: </span>
										{showInput.inputBirthday ? (
											<div className='flex col-span-4 '>
												<input className=' border border-blue-500 focus-visible:outline-none' />
												<img
													src={pencilIcon}
													alt=''
													className='w-4'
													onClick={() => setShowInput({ ...showInput, inputBirthday: false })}
												/>
											</div>
										) : (
											<div className='flex col-span-4 '>
												<span className='col-span-7 mr-1'>---</span>
												<img
													src={pencilIcon}
													alt=''
													className='w-4 mb-1'
													onClick={() => setShowInput({ ...showInput, inputBirthday: true })}
												/>
											</div>
										)}
									</div>
								</div>
								<div className='mgbt10'>
									<div className='grid grid-cols-12 gap-0 py-2'>
										<span className=' col-span-5 text-slate-400'>{t('Địa chỉ liên hệ')}: </span>
										{showInput.inputAddress ? (
											<div className='flex col-span-4 '>
												<input className=' border border-blue-500 focus-visible:outline-none' />
												<img
													src={pencilIcon}
													alt=''
													className='w-4'
													onClick={() => setShowInput({ ...showInput, inputAddress: false })}
												/>
											</div>
										) : (
											<div className='flex col-span-4 '>
												<span className='col-span-7 mr-1'>---</span>
												<img
													src={pencilIcon}
													alt=''
													className='w-4 mb-1'
													onClick={() => setShowInput({ ...showInput, inputAddress: true })}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div>
							<div className='ant-col ant-col-lg-24 ant-col-xl-12 ant-col-xxl-12'>
								<div className='grid grid-cols-12 gap-0 py-2'>
									<span className='col-span-5 text-slate-400'>{t('Email')}: </span>
									<div className='col-span-7'>
										{showInput.inputEmail ? (
											<div className='flex col-span-4 '>
												<input className=' border border-blue-500 focus-visible:outline-none' />
												<img
													src={pencilIcon}
													alt=''
													className='w-4'
													onClick={() => setShowInput({ ...showInput, inputEmail: false })}
												/>
											</div>
										) : (
											<div className='flex col-span-4 '>
												<span className='col-span-7 mr-1'>test1231212jza@yopmail.com</span>
												<img
													src={pencilIcon}
													alt=''
													className='w-4 mb-1'
													onClick={() => setShowInput({ ...showInput, inputEmail: true })}
												/>
											</div>
										)}
									</div>
								</div>
								<div className='grid grid-cols-12 gap-0 py-2'>
									<span className=' col-span-5 text-slate-400'>{t('Giới tính')}: </span>
									{showInput.inputGender ? (
										<div className='flex col-span-4 '>
											<input className=' border border-blue-500 focus-visible:outline-none' />
											<img
												src={pencilIcon}
												alt=''
												className='w-4'
												onClick={() => setShowInput({ ...showInput, inputGender: false })}
											/>
										</div>
									) : (
										<div className='flex col-span-4 '>
											<span className='col-span-7 mr-1'>---</span>
											<img
												src={pencilIcon}
												alt=''
												className='w-4 mb-1'
												onClick={() => setShowInput({ ...showInput, inputGender: true })}
											/>
										</div>
									)}
								</div>
								<div className='mgbt10'>
									<div className='grid grid-cols-12 gap-0 py-2'>
										<span className='col-span-5 text-slate-400'>{t('Số điện thoại')}: </span>
										{showInput.inputPhoneNumber ? (
											<div className='flex col-span-4 '>
												<input className=' border border-blue-500 focus-visible:outline-none' />
												<img
													src={pencilIcon}
													alt=''
													className='w-4'
													onClick={() =>
														setShowInput({ ...showInput, inputPhoneNumber: false })
													}
												/>
											</div>
										) : (
											<div className='flex col-span-4 '>
												<span className='col-span-7 mr-1'>0987643215</span>
												<img
													src={pencilIcon}
													alt=''
													className='w-4 mb-1'
													onClick={() =>
														setShowInput({ ...showInput, inputPhoneNumber: true })
													}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-3'>
						<button
							className='mr-2 px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'
							onClick={() => onOpenForm(true, false)}
						>
							{t('Thay đổi mật khẩu')}
						</button>
						<button
							className='mr-2 px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'
							onClick={() => onOpenForm(false, true)}
						>
							{t('Thay đổi mã PIN')}
						</button>
						<button
							className='mr-2 px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'
							onClick={() => setIsOpenModal(true)}
						>
							{t('Khôi phục mã PIN')}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
