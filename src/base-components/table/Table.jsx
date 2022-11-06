import React, { useMemo } from 'react';
import { useTable } from 'react-table';

export default function Table() {
	const data = useMemo(
		() => [
			{
				col0: 1,
				col1: 'Hello',
				col2: 'World',
			},
			{
				col0: 2,
				col1: 'react-table',
				col2: 'rocks',
			},
			{
				col0: 3,
				col1: 'whatever',
				col2: 'you want',
			},
		],
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: '',
				accessor: 'col0',
			},
			{
				Header: 'Column 1',
				accessor: 'col1', // accessor is the "key" in the data
			},
			{
				Header: 'Column 2',
				accessor: 'col2',
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
	const renderRowSubComponent = React.useCallback(
		({ row }) => (
			<pre
				style={{
					fontSize: '10px',
				}}
			>
				<code>{JSON.stringify({ values: row.values }, null, 2)}</code>
			</pre>
		),
		[]
	);
	return (
		<table className='table box' {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th key={column} {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<React.Fragment key={row} {...row.getRowProps()}>
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td key={cell} {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
							{row.isExpanded ? (
								<tr>
									<td colSpan={visibleColumns.length}>
										{/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
										{renderRowSubComponent({ row })}
									</td>
								</tr>
							) : null}
						</React.Fragment>
					);
				})}
			</tbody>
		</table>
	);
}
