import { enhanceData } from '@/app/utils/enhanceData';
import { google } from 'googleapis';

type TCredential = {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	universe_domain: string;
};

export async function GET() {
	const credential: TCredential = JSON.parse(
		atob(process.env.GOOGLE_SERVICE_KEY ?? '')
	);

	const glAuth = await google.auth.getClient({
		projectId: credential.project_id,
		credentials: {
			type: credential.type,
			project_id: credential.project_id,
			private_key_id: credential.private_key_id,
			private_key: credential.private_key,
			client_email: credential.client_email,
			client_id: credential.client_id,
			universe_domain: credential.universe_domain,
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});
	const glSheets = google.sheets({ version: 'v4', auth: glAuth });

	const data: any = await glSheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range: 'A1:J',
	});

	return Response.json(enhanceData(data?.data?.values));
}
