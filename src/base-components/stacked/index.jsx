import React, { useState } from 'react';
import './styles.css';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';

function Icon({ id, open }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
		</svg>
	);
}

const Stacked = (props) => {
	const [open, setOpen] = useState(0);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	return (
		<>
			<Accordion open={open} icon={<Icon id={1} open={open} />} className='border-b'>
				<AccordionHeader onClick={() => handleOpen(1)} className='text-base p-4'>
					{props?.dataDisplay?.title}
				</AccordionHeader>
				<AccordionBody className='p-4'>{props?.dataDisplay?.content}</AccordionBody>
			</Accordion>
		</>
	);
};

export default Stacked;
