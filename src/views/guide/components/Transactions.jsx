import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Selector from '../../../components/selector/Selector';
import { BsArrowRepeat } from 'react-icons/bs';

const Transactions = () => {
	const { t } = useTranslation();

	const listTypeTransaction = [
		{ id: 0, label: t('Rút tiền'), value: 'Rút tiền', selected: false },
		{ id: 1, label: t('Quà Tặng'), value: 'Quà Tặng', selected: false },
		{ id: 2, label: t('Nạp Tiền'), value: 'Nạp Tiền', selected: false },
		{ id: 3, label: t('Đặt Cọc'), value: 'Đặt Cọc', selected: false },
		{ id: 4, label: t('Hoàn Tiền'), value: 'Hoàn Tiền', selected: false },
		{ id: 5, label: t('Thanh Toán'), value: 'Thanh Toán', selected: false },
		{ id: 6, label: t('Truy Thu Trên Đơn'), value: 'Truy Thu Trên Đơn', selected: false },
		{ id: 7, label: t('Truy Thu'), value: 'Truy Thu', selected: false },
		{ id: 8, label: t('Khiếu Nại'), value: 'Khiếu Nại', selected: false },
		{ id: 9, label: t('Điều Chỉnh'), value: 'Điều Chỉnh', selected: false },
	];

	const people = [
		{ name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
		// More people...
	];

	const [typeTransactionFilter, setTypeTransactionFilter] = useState(listTypeTransaction);

	return (
		<div>
			<div className='p-2 border mb-4'>
				<div className='flex flex-row gap-3 pb-3 border-dotted border-b-2'>
					<span className='self-center'>{t('Loại giao dịch')}: </span>
					<Selector
						statuses={typeTransactionFilter}
						multiple={true}
						onChange={setTypeTransactionFilter}
					></Selector>
				</div>

				<div className='grid grid-cols-12 pt-2 pb-3 border-dotted border-b-2 '>
					<div className='col-span-6 pr-2'>
						<label className='block text-sm  text-gray-700'>{t('Nhập mã đơn, mã giao dịch')}: </label>
						<div className='flex mt-1 items-center rounded-md relative  '>
							<input
								type='text'
								className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
							/>
						</div>
					</div>

					<div className='col-span-6 pl-2 flex items-end justify-evenly'>
						<div className='px-2'>
							<label className='block text-sm  text-gray-700'>{t('Nhập mã đơn, mã giao dịch')}: </label>
							<div className='flex mt-1 items-center rounded-md relative  '>
								<input
									type='date'
									className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
								/>
							</div>
						</div>
						<div className='px-2'>
							<label className='block text-sm  text-gray-700'></label>
							<div className='flex mt-1 items-center rounded-md relative  '>
								<input
									type='date'
									className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-white sm:text-sm'
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='w-100 flex justify-end pt-2'>
					<div className='hover:text-blue-400 flex items-center mr-3'>
						<BsArrowRepeat />
						<span className='pl-1'>{t('Làm mới bộ lọc')}</span>
					</div>
					<button className='mr-2 px-7 py-2  border border-blue-500 bg-blue-500 text-white rounded hover:bg-blue-400'>
						{t('Tìm kiếm')}
					</button>
				</div>
			</div>
			<div className='p-2 border mb-3'>
				<div className='flex justify-between pb-2 border-solid border-b'>
					<p>
						{t('Danh sanh sách lịch sử giao dịch')} {`(1)`}
					</p>
					<button className='mr-2 px-7 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded'>
						{t('Xuất Excel')}
					</button>
				</div>
				<div>
					<div className='mt-8 flex flex-col'>
						<div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
							<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
								<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
									<table className='min-w-full divide-y divide-gray-300'>
										<thead className='bg-gray-50'>
											<tr className='divide-x divide-gray-200'>
												<th
													scope='col'
													className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6'
												>
													{t('Thời gian')}
												</th>
												<th
													scope='col'
													className='px-4 py-3.5 text-left text-sm font-semibold text-gray-900'
												>
													{t('Loại giao dịch')}
												</th>
												<th
													scope='col'
													className='px-4 py-3.5 text-left text-sm font-semibold text-gray-900'
												>
													{t('Nội dung')}
												</th>
												<th
													scope='col'
													className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6'
												>
													{t('Giá trị')}
												</th>
												<th
													scope='col'
													className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6'
												>
													{t('Số dư')}
												</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-200 bg-white'>
											{people.map((person) => (
												<tr key={person.email} className='divide-x divide-gray-200'>
													<td className='whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6'>
														{person.name}
													</td>
													<td className='whitespace-nowrap p-4 text-sm text-gray-500'>
														{person.title}
													</td>
													<td className='whitespace-nowrap p-4 text-sm text-gray-500'>
														{person.email}
													</td>
													<td className='whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6'>
														{person.role}
													</td>
													<td className='whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6'>
														{person.role}
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
		</div>
	);
};

export default Transactions;
