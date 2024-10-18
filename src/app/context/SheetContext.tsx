import { useSearchParams } from 'next/navigation';
import {
	createContext,
	ReactElement,
	useContext,
	useEffect,
	useState,
} from 'react';

type TSheetContext = {
	fields: string[];
	data: string[][];
};

const SheetContext = createContext<TSheetContext>({
	fields: [],
	data: [],
});

const SheetContextProvider = ({ children }: any): ReactElement => {
	const searchParams = useSearchParams();
	const [glData, setGlData] = useState<{
		fields: string[];
		data: string[][];
	}>({ fields: [], data: [] });

	useEffect(() => {
		if (glData.data.length && !searchParams.get('refresh')) return;

		(async () => {
			const response = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + 'api/sheets'
			);
			const result = await response.json();
			setGlData(result);
		})();
	}, [searchParams.get('refresh')]);

	return (
		<SheetContext.Provider value={glData}>{children}</SheetContext.Provider>
	);
};

const useSheetContext = (): TSheetContext => useContext(SheetContext);

export { useSheetContext, SheetContextProvider };
