import React from 'react';
import ReactDatePicker from 'react-datepicker';

export default function DatePicker(props) {
	const [showYearPicker, setShowYearPicker] = React.useState(false);

	return <ReactDatePicker showMonthDropdown showYearDropdown showTimeInput />;
}
