import React from 'react';

export default function CardCheckbox({ options, register }) {
	return (
		<>
			<ul className='flex flex-row flex-wrap'>
				{options.map((option) => {
					return (
						<li key={option.id} className='mx-1'>
							<input
								type='checkbox'
								id={`card-checkbox-${register.name}-${option.id}`}
								value={option.value}
								className='hidden peer'
								{...register}
							/>
							<label
								htmlFor={`card-checkbox-${register.name}-${option.id}`}
								className='inline-flex justify-between items-center px-3 py-2 w-full border-2 border-gray-200 cursor-pointer 
              dark:border-gray-700 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white text-gray-800 dark:text-gray-300'
							>
								<div className='block'>
									<div className='w-full'>{option.label}</div>
								</div>
							</label>
						</li>
					);
				})}
			</ul>
		</>
	);
}
