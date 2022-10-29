import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ label, register, required, inputClassName, labelClassName } = props) {
	return (
		<>
			<label className={labelClassName}>{label}</label>
			<input className={inputClassName} {...register} />
		</>
	);
}

Input.propTypes = {
	label: PropTypes.string,
	register: PropTypes.func,
	required: PropTypes.bool,
	inputClassName: PropTypes.string,
	labelClassName: PropTypes.string,
};
