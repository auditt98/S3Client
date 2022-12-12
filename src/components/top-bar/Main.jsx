import { useState } from 'react';
import {
	Lucide,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownContent,
	DropdownItem,
	DropdownHeader,
	DropdownDivider,
} from '@/base-components';
import { faker as $f } from '@/utils';
import * as $_ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { TomSelect } from '@/base-components';
import { useRecoilState } from 'recoil';
import { currentRegionList, currentUserState } from '../../stores/user-store';
import { useAPI } from '../../hooks/api/useAPI';

function Main(props) {
	const { signOut } = useAuthentication();
	const { updateUser } = useAPI();
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [searchDropdown, setSearchDropdown] = useState(false);
	const [currentRegions, setCurrentRegions] = useRecoilState(currentRegionList);
	const showSearchDropdown = () => {
		setSearchDropdown(true);
	};
	const hideSearchDropdown = () => {
		setSearchDropdown(false);
	};

	const onChangeDefaultRegion = async (region) => {
		try {
			let res = await updateUser({ defaultRegion: region });
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			{/* BEGIN: Top Bar */}
			<div className='top-bar pt-2 pb-2'>
				{/* BEGIN: Breadcrumb */}
				<nav aria-label='breadcrumb' className='-intro-x mr-auto hidden sm:flex'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item'>
							<a href='#'>Application</a>
						</li>
						<li className='breadcrumb-item active' aria-current='page'>
							Dashboard
						</li>
					</ol>
				</nav>
				{/* END: Breadcrumb */}
				<Dropdown className='intro-x mr-auto sm:mr-6'>
					<DropdownToggle tag='div' role='button' className='cursor-pointer'>
						<div>
							ap-southeast-1 <Lucide className='inline w-4 h-4' icon='ArrowDownRight'></Lucide>
						</div>
					</DropdownToggle>
					<DropdownMenu className='notification-content pt-2'>
						<DropdownContent tag='div' className='notification-content__box  max-h-96 !p-0 overflow-auto'>
							{currentRegions.map((region) => {
								return (
									<div
										key={region}
										className={classnames('w-full p-2 hover:bg-gray-50 cursor-pointer')}
										onClick={() => {
											onChangeDefaultRegion(region);
										}}
									>
										{region}
									</div>
								);
							})}
						</DropdownContent>
					</DropdownMenu>
				</Dropdown>
				{/* BEGIN: Search */}
				<div className='intro-x relative mr-3 sm:mr-6'>
					<div className='search hidden sm:block'>
						<input
							type='text'
							className='search__input form-control border-transparent'
							placeholder='Search...'
							onFocus={showSearchDropdown}
							onBlur={hideSearchDropdown}
						/>
						<Lucide icon='Search' className='search__icon dark:text-slate-500' />
					</div>
					<a className='notification sm:hidden' href=''>
						<Lucide icon='Search' className='notification__icon dark:text-slate-500' />
					</a>
					<div
						className={classnames({
							'search-result': true,
							show: searchDropdown,
						})}
					>
						<div className='search-result__content'>
							<div className='search-result__content__title'>Pages</div>
							<div className='mb-5'>
								<a href='' className='flex items-center'>
									<div className='w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full'>
										<Lucide icon='Inbox' className='w-4 h-4' />
									</div>
									<div className='ml-3'>Mail Settings</div>
								</a>
								<a href='' className='flex items-center mt-2'>
									<div className='w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full'>
										<Lucide icon='Users' className='w-4 h-4' />
									</div>
									<div className='ml-3'>Users & Permissions</div>
								</a>
								<a href='' className='flex items-center mt-2'>
									<div className='w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full'>
										<Lucide icon='CreditCard' className='w-4 h-4' />
									</div>
									<div className='ml-3'>Transactions Report</div>
								</a>
							</div>
							<div className='search-result__content__title'>Users</div>
							<div className='mb-5'>
								{$_.take($f(), 4).map((faker, fakerKey) => (
									<a key={fakerKey} href='' className='flex items-center mt-2'>
										<div className='w-8 h-8 image-fit'>
											<img
												alt='Midone Tailwind HTML Admin Template'
												className='rounded-full'
												src={faker.photos[0]}
											/>
										</div>
										<div className='ml-3'>{faker.users[0].name}</div>
										<div className='ml-auto w-48 truncate text-slate-500 text-xs text-right'>
											{faker.users[0].email}
										</div>
									</a>
								))}
							</div>
							<div className='search-result__content__title'>Products</div>
							{$_.take($f(), 4).map((faker, fakerKey) => (
								<a key={fakerKey} href='' className='flex items-center mt-2'>
									<div className='w-8 h-8 image-fit'>
										<img
											alt='Midone Tailwind HTML Admin Template'
											className='rounded-full'
											src={faker.images[0]}
										/>
									</div>
									<div className='ml-3'>{faker.products[0].name}</div>
									<div className='ml-auto w-48 truncate text-slate-500 text-xs text-right'>
										{faker.products[0].category}
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
				{/* END: Search  */}
				{/* BEGIN: Notifications */}
				<Dropdown className='intro-x mr-auto sm:mr-6'>
					<DropdownToggle
						tag='div'
						role='button'
						className='notification notification--bullet cursor-pointer'
					>
						<Lucide icon='Bell' className='notification__icon dark:text-slate-500' />
					</DropdownToggle>
					<DropdownMenu className='notification-content pt-2'>
						<DropdownContent tag='div' className='notification-content__box'>
							<div className='notification-content__title'>Notifications</div>
							{$_.take($f(), 5).map((faker, fakerKey) => (
								<div
									key={fakerKey}
									className={classnames({
										'cursor-pointer relative flex items-center': true,
										'mt-5': fakerKey,
									})}
								>
									<div className='w-12 h-12 flex-none image-fit mr-1'>
										<img
											alt='Midone Tailwind HTML Admin Template'
											className='rounded-full'
											src={faker.photos[0]}
										/>
										<div className='w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600'></div>
									</div>
									<div className='ml-2 overflow-hidden'>
										<div className='flex items-center'>
											<a href='' className='font-medium truncate mr-5'>
												{faker.users[0].name}
											</a>
											<div className='text-xs text-slate-400 ml-auto whitespace-nowrap'>
												{faker.times[0]}
											</div>
										</div>
										<div className='w-full truncate text-slate-500 mt-0.5'>
											{faker.news[0].shortContent}
										</div>
									</div>
								</div>
							))}
						</DropdownContent>
					</DropdownMenu>
				</Dropdown>
				{/* END: Notifications  */}
				{/* BEGIN: Account Menu */}
				<Dropdown className='intro-x w-8 h-8'>
					<DropdownToggle
						tag='div'
						role='button'
						className='w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in'
					>
						<img alt='Midone Tailwind HTML Admin Template' src={$f()[9].photos[0]} />
					</DropdownToggle>
					<DropdownMenu className='w-56'>
						<DropdownContent className='bg-primary text-white'>
							<DropdownHeader tag='div' className='!font-normal'>
								<div className='font-medium'>{currentUser.email}</div>
							</DropdownHeader>
							<DropdownDivider className='border-white/[0.08]' />
							<DropdownItem className='hover:bg-white/5'>
								<Lucide icon='User' className='w-4 h-4 mr-2' /> Settings
							</DropdownItem>
							<DropdownItem className='hover:bg-white/5'>
								<Lucide icon='Lock' className='w-4 h-4 mr-2' /> Change Password
							</DropdownItem>
							<DropdownDivider className='border-white/[0.08]' />
							<DropdownItem className='hover:bg-white/5' onClick={() => signOut()}>
								<Lucide icon='ToggleRight' className='w-4 h-4 mr-2' /> Logout
							</DropdownItem>
						</DropdownContent>
					</DropdownMenu>
				</Dropdown>
				{/* END: Account Menu */}
			</div>
			{/* END: Top Bar */}
		</>
	);
}

export default Main;
