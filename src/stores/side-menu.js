import { atom } from 'recoil';

const sideMenu = atom({
	key: 'sideMenu',
	default: {
		menu: [
			{
				title: 'Dashboard',
				icon: 'Home',
				pathname: '/dashboard',
			},
			{
				icon: 'HardDrive',
				pathname: '/file-manager',
				title: 'File Manager',
			},
			// {
			// 	icon: 'File',
			// 	title: 'Storage',
			// 	subMenu: [
			// 		{
			// 			icon: '',
			// 			pathname: '/',
			// 			title: 'Overview 1',
			// 		},
			// 		{
			// 			icon: '',
			// 			pathname: '/dashboard-overview-2',
			// 			title: 'Overview 2',
			// 		},
			// 		{
			// 			icon: '',
			// 			pathname: '/dashboard-overview-3',
			// 			title: 'Overview 3',
			// 		},
			// 		{
			// 			icon: '',
			// 			pathname: '/dashboard-overview-4',
			// 			title: 'Overview 4',
			// 		},
			// 	],
			// },
			{
				icon: 'Edit',
				title: 'Settings',
				pathname: '/settings',
			},

			{
				icon: 'CreditCard',
				pathname: '/point-of-sale',
				title: 'Point of Sale',
			},
			{
				icon: 'FileText',
				pathname: '/post',
				title: 'Post',
			},
			'devider',
			{
				icon: 'Layout',
				title: 'Pages',
				subMenu: [
					{
						icon: '',
						pathname: '/update-profile',
						title: 'Update profile',
					},
					{
						icon: '',
						pathname: '/change-password',
						title: 'Change Password',
					},
				],
			},
			'devider',
			{
				icon: 'Inbox',
				title: 'Components',
				subMenu: [
					{
						icon: '',
						title: 'Table',
						subMenu: [
							{
								icon: '',
								pathname: '/regular-table',
								title: 'Regular Table',
							},
							{
								icon: '',
								pathname: '/tabulator',
								title: 'Tabulator',
							},
						],
					},
					{
						icon: '',
						title: 'Overlay',
						subMenu: [
							{
								icon: '',
								pathname: '/modal',
								title: 'Modal',
							},
							{
								icon: '',
								pathname: '/slide-over',
								title: 'Slide Over',
							},
							{
								icon: '',
								pathname: '/notification',
								title: 'Notification',
							},
						],
					},
					{
						icon: '',
						pathname: '/tab',
						title: 'Tab',
					},
					{
						icon: '',
						pathname: '/accordion',
						title: 'Accordion',
					},
					{
						icon: '',
						pathname: '/button',
						title: 'Button',
					},
					{
						icon: '',
						pathname: '/alert',
						title: 'Alert',
					},
					{
						icon: '',
						pathname: '/progress-bar',
						title: 'Progress Bar',
					},
					{
						icon: '',
						pathname: '/tooltip',
						title: 'Tooltip',
					},
					{
						icon: '',
						pathname: '/dropdown',
						title: 'Dropdown',
					},
					{
						icon: '',
						pathname: '/typography',
						title: 'Typography',
					},
					{
						icon: '',
						pathname: '/icon',
						title: 'Icon',
					},
					{
						icon: '',
						pathname: '/loading-icon',
						title: 'Loading Icon',
					},
				],
			},
			{
				icon: 'Sidebar',
				title: 'Forms',
				subMenu: [
					{
						icon: '',
						pathname: '/regular-form',
						title: 'Regular Form',
					},
					{
						icon: '',
						pathname: '/datepicker',
						title: 'Datepicker',
					},
					{
						icon: '',
						pathname: '/tom-select',
						title: 'Tom Select',
					},
					{
						icon: '',
						pathname: '/file-upload',
						title: 'File Upload',
					},
					{
						icon: '',
						pathname: '/wysiwyg-editor',
						title: 'Wysiwyg Editor',
					},
					{
						icon: '',
						pathname: '/validation',
						title: 'Validation',
					},
				],
			},
			{
				icon: 'HardDrive',
				title: 'Widgets',
				subMenu: [
					{
						icon: '',
						pathname: '/chart',
						title: 'Chart',
					},
					{
						icon: '',
						pathname: '/slider',
						title: 'Slider',
					},
					{
						icon: '',
						pathname: '/image-zoom',
						title: 'Image Zoom',
					},
				],
			},
		],
	},
});

export { sideMenu };
