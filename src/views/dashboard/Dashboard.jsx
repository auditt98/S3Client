import { Lucide, Dropdown, DropdownToggle, DropdownMenu, DropdownContent, DropdownItem } from '@/base-components';
import { faker as $f } from '@/utils';
import classnames from 'classnames';
import React, { useState } from 'react';
import Selector from '../../components/selector/Selector';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import CardRadio from '../../base-components/radios/CardRadio';
import CardCheckbox from '../../base-components/checkboxes/CardCheckbox';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Combobox } from '@headlessui/react';

export default function Dashboard() {
	const { t } = useTranslation();
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

	const people = ['Wade Cooper', 'Arlene McCoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt'];

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
	const paymentMethods = [
		{
			id: 1,
			label: t('payment-method.alipay'),
			value: 'payment-method.alipay',
		},
		{
			id: 2,
			label: t('payment-method.bank'),
			value: 'payment-method.bank',
		},
	];
	const [statusFilterValues, setStatusFilterValues] = useState(statuses);
	const [paymentMethodValues, setPaymentMethodValues] = useState(paymentMethods);
	const [date, setDate] = useState(new Date());

	const [selectedPerson, setSelectedPerson] = useState(people[0]);
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) => {
					return person.toLowerCase().includes(query.toLowerCase());
			  });

	const requestCodeRegister = register('requestCode', {
		required: false,
	});
	const paymentAccountRegister = register('paymentAccount', {
		required: false,
	});

	const paymentMethodRegister = register('paymentMethod', {
		required: false,
	});

	const statusRegister = register('status', {
		required: false,
	});

	const originalRequestCodeRegister = register('originalRequestCode', {
		required: false,
	});

	const buyerAccountRegister = register('buyerAccount', {
		required: false,
	});
	const statusTimeRegister = register('statusTime', {
		required: false,
	});
	const statusTimeFromRegister = register('statusTimeFrom', {
		required: false,
	});
	const statusTimeToRegister = register('statusTimeTo', {
		required: false,
	});

	return (
		<>
			<div className='grid grid-cols-12 gap-6 mt-8'>
				<div className='col-span-12 lg:col-span-12 2xl:col-span-12'>
					<h2 className='intro-y text-lg font-medium mr-auto mt-2'>{t('dashboard.title')}</h2>
				</div>
				<div className='col-span-12 lg:col-span-12 2xl:col-span-12'>
					{/* BEGIN: Filter */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='intro-y flex flex-col-reverse sm:flex-row items-center'>
							<div className='w-full relative mr-auto mt-3 sm:mt-0 box bg-white p-2 flex flex-col'>
								<div className='flex flex-row gap-3 flex-wrap'>
									<span className='self-center'>{t('dashboard.status')}</span>
									<CardCheckbox options={statusFilterValues} register={statusRegister}></CardCheckbox>
								</div>
								<div className='flex flex-row gap-3 flex-wrap mt-4'>
									<span className='self-center'>{t('dashboard.payment-method')}</span>
									<CardRadio
										form={form}
										canUncheck={true}
										register={paymentMethodRegister}
										options={paymentMethodValues}
									></CardRadio>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-2 mt-4 gap-y-5'>
									<div className='col-span-1 md:col-span-2 xl:col-span-4 flex flex-col'>
										<label>{t('dashboard.request-code')}</label>
										<input {...requestCodeRegister} type='text' className='form-control'></input>
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-4 flex flex-col'>
										<label>{t('dashboard.payment-account')}</label>
										<Combobox value={selectedPerson} onChange={setSelectedPerson}>
											<Combobox.Input onChange={(event) => setQuery(event.target.value)} />
											<Combobox.Options>
												{filteredPeople.map((person) => (
													<Combobox.Option key={person} value={person}>
														{person}
													</Combobox.Option>
												))}
											</Combobox.Options>
										</Combobox>
										{/* <select {...paymentAccountRegister} className='form-select'>
											<option value=''>Select...</option>
											<option value='A'>Category A</option>
											<option value='B'>Category B</option>
										</select> */}
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col'>
										<label>{t('dashboard.request-time-start')}</label>
										<ReactDatePicker
											closeOnScroll={true}
											className='form-control'
											selected={date}
											onChange={(d) => setDate(d)}
										/>
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col'>
										<label>{t('dashboard.request-time-end')}</label>
										<ReactDatePicker
											closeOnScroll={true}
											className='form-control'
											selected={date}
											onChange={(d) => setDate(d)}
										/>
										<input type='datetime-local'></input>
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col'>
										<label>{t('dashboard.original-request-code')}</label>
										<input
											{...originalRequestCodeRegister}
											type='text'
											className='form-control'
										></input>
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-2 flex flex-col'>
										<label>{t('dashboard.buyer-account')}</label>
										<input {...buyerAccountRegister} type='text' className='form-control'></input>
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-2s flex flex-col'>
										<label>{t('dashboard.status-time')}</label>
										<select {...statusTimeRegister} className='form-select'>
											{statuses.map((status) => {
												return (
													<option key={status.id} value={status.value}>
														{status.label}
													</option>
												);
											})}
										</select>
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-3 flex flex-col'>
										<label>{t('dashboard.status-datefrom')}</label>
										<ReactDatePicker
											closeOnScroll={true}
											className='form-control'
											selected={date}
											showTimeSelect
											onChange={(d) => setDate(d)}
										/>
										{/* <input {...statusTimeFromRegister} type='text' className='form-control'></input> */}
									</div>
									<div className='col-span-1 md:col-span-2 xl:col-span-3 flex flex-col'>
										<label>{t('dashboard.status-dateto')}</label>
										<ReactDatePicker
											closeOnScroll={true}
											className='form-control'
											selected={date}
											showTimeSelect
											onChange={(d) => setDate(d)}
										/>
										{/* <input {...statusTimeToRegister} type='text' className='form-control'></input> */}
									</div>
								</div>
								<div className='flex flex-row-reverse flex-wrap mt-4 cursor-pointer'>
									<button type='submit' className='px-3 py-2 bg-primary rounded-md text-white'>
										{t('dashboard.search')}
									</button>
								</div>
							</div>
						</div>
					</form>
					{/* END: Inbox Filter */}
					{/* BEGIN: Inbox Content */}
					<div className='intro-y inbox box mt-5'>
						<div className='p-5 flex flex-col-reverse sm:flex-row text-slate-500 border-b border-slate-200/60'>
							<div className='flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-5 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0'>
								<input className='form-check-input' type='checkbox' />
								<Dropdown className='ml-1' placement='bottom-start'>
									<DropdownToggle className='w-5 h-5 block' href='#'>
										<Lucide icon='ChevronDown' className='w-5 h-5' />
									</DropdownToggle>
									<DropdownMenu className='w-32'>
										<DropdownContent>
											<DropdownItem>All</DropdownItem>
											<DropdownItem>None</DropdownItem>
											<DropdownItem>Read</DropdownItem>
											<DropdownItem>Unread</DropdownItem>
											<DropdownItem>Starred</DropdownItem>
											<DropdownItem>Unstarred</DropdownItem>
										</DropdownContent>
									</DropdownMenu>
								</Dropdown>
								<a href='#' className='w-5 h-5 ml-5 flex items-center justify-center'>
									<Lucide icon='RefreshCw' className='w-4 h-4' />
								</a>
								<a href='#' className='w-5 h-5 ml-5 flex items-center justify-center'>
									<Lucide icon='MoreHorizontal' className='w-4 h-4' />
								</a>
							</div>
							<div className='flex items-center sm:ml-auto'>
								<div className=''>1 - 50 of 5,238</div>
								<a href='#' className='w-5 h-5 ml-5 flex items-center justify-center'>
									<Lucide icon='ChevronLeft' className='w-4 h-4' />
								</a>
								<a href='#' className='w-5 h-5 ml-5 flex items-center justify-center'>
									<Lucide icon='ChevronRight' className='w-4 h-4' />
								</a>
								<a href='#' className='w-5 h-5 ml-5 flex items-center justify-center'>
									<Lucide icon='Settings' className='w-4 h-4' />
								</a>
							</div>
						</div>
						<div className='overflow-x-auto sm:overflow-x-visible'>
							{$f().map((faker, fakerKey) => (
								<div key={fakerKey} className='intro-y'>
									<div
										className={classnames({
											'inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400': true,
											'inbox__item--active': faker.trueFalse[0],
										})}
									>
										<div className='flex px-5 py-3'>
											<div className='w-72 flex-none flex items-center mr-5'>
												<input
													className='form-check-input flex-none'
													type='checkbox'
													checked={faker.trueFalse[0]}
													onChange={() => {}}
												/>
												<a
													href='#'
													className='w-5 h-5 flex-none ml-4 flex items-center justify-center text-slate-400'
												>
													<Lucide icon='Star' className='w-4 h-4' />
												</a>
												<a
													href='#'
													className='w-5 h-5 flex-none ml-2 flex items-center justify-center text-slate-400'
												>
													<Lucide icon='Bookmark' className='w-4 h-4' />
												</a>
												<div className='w-6 h-6 flex-none image-fit relative ml-5'>
													<img
														alt='Midone Tailwind HTML Admin Template'
														className='rounded-full'
														src={faker.photos[0]}
													/>
												</div>
												<div className='inbox__item--sender truncate ml-3'>
													{faker.users[0].name}
												</div>
											</div>
											<div className='w-64 sm:w-auto truncate'>
												<span className='inbox__item--highlight'>
													{faker.news[0].superShortContent}
												</span>
												{faker.news[0].shortContent}
											</div>
											<div className='inbox__item--time whitespace-nowrap ml-auto pl-10'>
												{faker.times[0]}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500'>
							<div>4.41 GB (25%) of 17 GB used Manage</div>
							<div className='sm:ml-auto mt-2 sm:mt-0'>Last account activity: 36 minutes ago</div>
						</div>
					</div>
					{/* END: Inbox Content */}
				</div>
			</div>
		</>
	);
}
