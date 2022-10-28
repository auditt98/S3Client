import React, { useState } from 'react';
import Stacked from '../../../base-components/stacked';

const Faqs = () => {
	const [isRotate, setIsRotate] = useState(false);

	const data = [
		{
			id: 1,
			title: 'Hướng dẫn nạp tiền vào tài khoản Ali33.asia',
			content:
				'Để thực hiện yêu cầu thanh toán của Quý khách, Quý khách cần nạp tiền vào tài khoản của mình trên Ali33.asia theo thông tin sau',
		},
		{
			id: 2,
			title: 'Hướng dẫn nạp tiền vào tài khoản Ali33.asia',
			content:
				'Để thực hiện yêu cầu thanh toán của Quý khách, Quý khách cần nạp tiền vào tài khoản của mình trên Ali33.asia theo thông tin sau',
		},
	];

	return (
		<div>
			<div role='list' className='divide-y divide-gray-200'>
				<div className='block border border-b-0'>
					{data.map((item) => (
						<Stacked dataDisplay={item} key={item.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Faqs;
