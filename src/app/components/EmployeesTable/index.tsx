import { keysIndex } from '@/app/constants';
import { useSearchDataContext } from '@/app/context/SearchDataContext';
import { useSheetContext } from '@/app/context/SheetContext';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

const EmployeesTable = (): ReactElement => {
	const router = useRouter();
	const { fields } = useSheetContext();
	const { filteredData: data } = useSearchDataContext();

	const onRowClick = (id: string, rowIndex: number) => {
		router.push(`/people/${rowIndex + 2}-${id}`);
	};

	return (
		<table className='w-full table-auto border-2 text-left text-sm text-gray-500 shadow-md rtl:text-right'>
			<thead className='border-b-4 bg-blue-50 text-xs uppercase text-gray-700'>
				<tr>
					{fields.map((field, index) => (
						<th className='border-r-[2px] p-3' key={index}>
							{field}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((empDetails: string[], rowIndex) => (
					<tr
						className='cursor-pointer border-b-[1px] hover:bg-pink-50'
						key={empDetails[keysIndex.id]}
						onClick={() => onRowClick(empDetails[keysIndex.id], rowIndex)}
					>
						<>
							{empDetails.map((value: string, index: number) => (
								<td className='border-r-[1px] p-3' key={index}>
									{value}
								</td>
							))}
						</>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default EmployeesTable;
