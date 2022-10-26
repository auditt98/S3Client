import React from 'react';
import { Lucide, Dropdown, DropdownToggle, DropdownMenu, DropdownContent, DropdownItem } from '@/base-components';
import { faker as $f } from '@/utils';
import classnames from 'classnames';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { helper } from '@/utils/helper';

export default function Guide() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const LIST_MENU = [
		{
			name: t('Thông tin tài khoản'),
			icon: '',
			selected: true,
			href: '/guide',
		},
		{
			name: t('Địa chỉ của bạn'),
			icon: '',
			selected: false,
			href: '/guide/address',
		},
		{
			name: t('Lịch sử giao dịch'),
			icon: '',
			selected: false,
			href: '/guide/transactions',
		},
		{
			name: t('Hướng dẫn'),
			icon: '',
			selected: false,
			href: '/guide/faqs',
		},
	];

	return (
		<>
			<div className='grid grid-cols-12 gap-6 mt-8'>
				<div className='col-span-12 lg:col-span-4 2xl:col-span-4'>
					<h2 className='intro-y text-lg font-medium mr-auto mt-2'>{t('Thông tin tài khoản')}</h2>
					<div className='box p-2 mt-14 pt-14'>
						<span className='absolute -top-10 left-[calc(50%-2.5rem)] inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-500'>
							<span className='text-xs font-medium leading-none text-white'>TW</span>
						</span>
						<h3 className='text-center text-xl font-semibold'>Name</h3>
						<div className='text-center text-lg'>Name | MUU214</div>
						<ul className='mt-5 flex-1 space-y-1 px-2'>
							{LIST_MENU.map((menuItem, index) => (
								<li
									key={menuItem.name}
									className={helper.classNames(
										menuItem.selected
											? 'bg-primary-50 border-indigo-700 text-indigo-600'
											: 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
										'group flex items-center px-5 py-4 text-sm font-medium border-r-4'
									)}
									onClick={() => navigate(menuItem.href)}
								>
									{menuItem.name}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='box col-span-12 lg:col-span-8 2xl:col-span-8 p-5'>
					<Outlet />
				</div>
			</div>
		</>
	);
}
