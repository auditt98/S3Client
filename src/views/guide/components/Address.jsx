import { Dialog } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../base-components/modal';
import { useForm } from 'react-hook-form';

const Address = () => {
	const { t } = useTranslation();
	const [dataTable, setDataTable] = useState([
		{ name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
	]);
	const [openFormModal, setOpenFormModal] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onCloseFormModal = () => {
		setOpenFormModal(false);
	};

	const onOpenFormModal = () => {
		setOpenFormModal(true);
	};

	const statuses = [
		{
			id: 1,
			label: t('status.cancel'),
			value: 'status.cancel',
		},
		{
			id: 2,
			label: t('status.confirm'),
			value: 'status.confirm',
		},
		{
			id: 3,
			label: t('status.pending'),
			value: 'status.pending',
		},
		{
			id: 4,
			label: t('status.processing'),
			value: 'status.processing',
		},
		{
			id: 5,
			label: t('status.reject'),
			value: 'status.reject',
		},
		{
			id: 6,
			label: t('status.await-payment-request'),
			value: 'status.await-payment-request',
		},
		{
			id: 7,
			label: t('status.await-payment'),
			value: 'status.await-payment',
		},
		{
			id: 8,
			label: t('status.refund'),
			value: 'status.refund',
		},
	];

	const onSubmit = (data) => {
		console.log('data', data);
	};

	const nameAddressRegister = register('nameAddressRegister', {
		required: false,
	});

	const phoneNumberRegister = register('phoneNumberRegister', {
		required: false,
	});

	const addressRegister = register('addressRegister', {
		required: false,
	});

	const cityNameRegister = register('cityNameRegister', {
		required: false,
	});

	const districtNameRegister = register('districtNameRegister', {
		required: false,
	});

	return (
		<div>
			<Modal show={openFormModal} onHidden={onCloseFormModal}>
				<div className='p-5'>
					<div className='px-4 py-6'>
						<h2 className='text-primary font-bold text-2xl '>THÊM ĐỊA CHỈ MỚI</h2>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='flex justify-between'>
							<div>
								<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col py-3'>
									<label>{t('Họ tên*')}</label>
									<input {...nameAddressRegister} type='text' className='form-control'></input>
								</div>
								<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col py-3'>
									<label>{t('Điện thoại*')}</label>
									<input {...phoneNumberRegister} type='text' className='form-control'></input>
								</div>
								<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col py-3'>
									<label>{t('Địa chỉ *')}</label>
									<input {...addressRegister} type='text' className='form-control'></input>
								</div>
							</div>
							<div>
								<div className='col-span-1 md:col-span-2 xl:col-span-2s flex flex-col py-3'>
									<label>{t('Tỉnh/Thành phố *')}</label>
									<select {...cityNameRegister} className='form-select'>
										{statuses.map((status) => {
											return (
												<option key={status.id} value={status.value}>
													{status.label}
												</option>
											);
										})}
									</select>
								</div>
								<div className='col-span-1 md:col-span-2 xl:col-span-2s flex flex-col py-3'>
									<label>{t('Quận/Huyện *')}</label>
									<select {...districtNameRegister} className='form-select'>
										{statuses.map((status) => {
											return (
												<option key={status.id} value={status.value}>
													{status.label}
												</option>
											);
										})}
									</select>
								</div>
								<div className='col-span-1 md:col-span-2 xl:col-span-2s flex flex-col py-3'>
									<label>{t('Phường/Xã')}</label>
									<select className='form-select'>
										{statuses.map((status) => {
											return (
												<option key={status.id} value={status.value}>
													{status.label}
												</option>
											);
										})}
									</select>
								</div>
							</div>
						</div>
						<div>
							<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col py-3'>
								<label>{t('Tên địa chỉ')}</label>
								<input type='text' className='form-control'></input>
							</div>
							<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col'>
								<textarea type='text' className='form-control'></textarea>
							</div>
						</div>
						<div className='form-check mt-5'>
							<input id='vertical-form-3' className='form-check-input' type='checkbox' value='' />
							<label className='form-check-label' htmlFor='vertical-form-3'>
								Đặt làm địa chỉ mặc định
							</label>
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
								Thêm địa chỉ mới
							</button>
						</div>
					</form>
				</div>
			</Modal>

			<div className='flex justify-between pb-3 border-b-2'>
				<p className='text-base'>Danh sách địa chỉ nhận hàng ({'1'})</p>
				<button
					className='mr-2 px-7 py-2  border border-blue-500 bg-blue-500 text-white rounded hover:bg-blue-400'
					onClick={onOpenFormModal}
				>
					Thêm địa chỉ mới
				</button>
			</div>
			<div>
				<div className='mt-5 flex flex-col'>
					<div className='-my-2 -mx-4  sm:-mx-6 lg:-mx-8'>
						<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
							<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
								<table className='min-w-full divide-y divide-gray-300'>
									<thead className='bg-gray-50'>
										<tr>
											<th
												scope='col'
												className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
											>
												Họ tên
											</th>
											<th
												scope='col'
												className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
											>
												Điện thoại
											</th>
											<th
												scope='col'
												className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
											>
												Tên địa chỉ
											</th>
											<th
												scope='col'
												className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
											>
												Địa chỉ
											</th>
											<th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
												<span className='sr-only'></span>
											</th>
											<th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
												<span className='sr-only'></span>
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200 bg-white'>
										{dataTable.map((dataRow) => (
											<tr key={dataRow.email}>
												<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
													{dataRow.name}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													{dataRow.title}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													{dataRow.email}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													{dataRow.role}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													<span className='bg-lime-500 rounded-full text-white p-1'>
														Mặc định
													</span>
												</td>
												<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm  sm:pr-6'>
													<a href='#' className='text-indigo-600 hover:text-indigo-900'>
														Edit<span className='sr-only'>, {dataRow.name}</span>
													</a>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Address;
