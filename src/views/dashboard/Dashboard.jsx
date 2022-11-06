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
import DatePicker from '../../base-components/DatePicker/DatePicker';
import { TomSelect } from '@/base-components';
import { Link } from 'lucide-react';
import Table from '../../base-components/table/Table';

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

	const headers = [
		{
			key: 'request_code',
			header: 'Request code',
		},
		{
			key: 'request_time',
			header: 'Request time',
		},
		{
			key: 'foreign_currency_amount',
			header: 'Amount of foreign currency',
		},
		{
			key: 'transaction_value',
			header: 'Transaction value',
		},
		{
			key: 'service_fee',
			header: 'Service fee',
		},
		{
			key: 'total_money',
			header: 'Total money',
		},
		{
			key: 'payment_account',
			header: 'Payment account',
		},
		{
			key: 'org_receipt_code',
			header: 'Original receipt code',
		},
		{
			key: 'note',
			header: 'Note',
		},
		{
			key: 'status',
			header: 'Status',
		},
	];

	const rows = [
		{
			id: 'a',
			name: 'Load balancer 1',
			status: <Link>asd</Link>,
		},
		{
			id: 'b',
			name: 'Load balancer 2',
			status: 'Starting',
		},
		{
			id: 'c',
			name: 'Load balancer 3',
			status: 'Active',
		},
	];

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
										<TomSelect
											value={selectedPerson}
											onChange={setSelectedPerson}
											options={{
												placeholder: 'Select your favorite actors',
											}}
											className='w-full'
										>
											{people.map((person) => {
												return (
													<option key={person} value={person}>
														{person}
													</option>
												);
											})}
										</TomSelect>
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
										<DatePicker></DatePicker>
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
						<Table></Table>
					</div>
					{/* END: Inbox Content */}
				</div>
			</div>
		</>
	);
}
