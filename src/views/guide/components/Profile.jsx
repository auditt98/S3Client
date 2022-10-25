import React, { useState } from 'react';
import pencilIcon from '@/assets/images/pencil.svg';
// import FormChangePassword from './FormChangePassword';
const Profile = () => {
	const [showInput, setShowInput] = useState({
		inputName: false,
		inputBirthday: false,
		inputAddress: false,
		inputEmail: false,
		inputGender: false,
		inputPhoneNumber: false,
	});

	return (
		<div>
			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className=''>
						<div className='grid grid-cols-12 gap-0 py-2'>
							<span className='col-span-5 text-slate-400'>Tên đăng nhập:</span>
							<span className='col-span-7'>test123</span>
						</div>
						<div className='grid grid-cols-12 gap-0 py-2'>
							<span className='col-span-5 text-slate-400'>Họ và tên:</span>
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
								<span className='col-span-5 text-slate-400'>Ngày sinh: </span>
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
								<span className=' col-span-5 text-slate-400'>Địa chỉ liên hệ: </span>
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
							<span className='col-span-5 text-slate-400'>Email: </span>
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
							<span className=' col-span-5 text-slate-400'>Giới tính: </span>
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
								<span className='col-span-5 text-slate-400'>Số điện thoại: </span>
								{showInput.inputPhoneNumber ? (
									<div className='flex col-span-4 '>
										<input className=' border border-blue-500 focus-visible:outline-none' />
										<img
											src={pencilIcon}
											alt=''
											className='w-4'
											onClick={() => setShowInput({ ...showInput, inputPhoneNumber: false })}
										/>
									</div>
								) : (
									<div className='flex col-span-4 '>
										<span className='col-span-7 mr-1'>0987643215</span>
										<img
											src={pencilIcon}
											alt=''
											className='w-4 mb-1'
											onClick={() => setShowInput({ ...showInput, inputPhoneNumber: true })}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-3'>
				<button className='mr-2 px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'>
					Thay đổi mật khẩu
				</button>
				<button className='mr-2 px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'>
					Thay đổi mã PIN
				</button>
				<button className='mr-2 px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'>
					Khôi phục mã PIN
				</button>
			</div>
			{/* <FormChangePassword /> */}
		</div>
	);
};

export default Profile;
