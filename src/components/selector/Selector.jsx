import React from 'react';

export default function Selector({ statuses = [], onChange, multiple = false }) {
	return statuses.map((status) => (
		<button
			className={`px-3 py-2 border border-solid border-gray-100 ${
				status.selected ? 'bg-primary text-white' : ''
			}`}
			onClick={() => {
				if (!multiple) {
					let newStatuses = structuredClone(statuses).map((x) => {
						return {
							...x,
							selected: x.id === status.id,
						};
					});
					onChange(newStatuses);
				} else {
					let newStatuses = structuredClone(statuses).map((x) => {
						return {
							...x,
							selected: x.id === status.id ? !x.selected : x.selected,
						};
					});
					onChange(newStatuses);
				}
			}}
			key={status.id}
		>
			{status.label}
		</button>
	));
	// <button className='px-4 py-2'>
	// 	<h1>Single Selector</h1>
	// </button>
}
