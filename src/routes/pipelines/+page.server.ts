import type { Pipeline } from 'models/pipeline';
import type { ItemsResponse } from 'models/response';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url, cookies }) => {
	const accessToken = cookies.get('accessToken');

	const res = await fetch('/api/pipelines?pid=' + url.searchParams.get('pid'), {
		method: 'GET'
	});

	if (res.status == 200) {
		const plRes: ItemsResponse<Pipeline> = await res.json();

		return {
			pipelines: plRes.payload.items,
			accessToken,
			pid: url.searchParams.get('pid')
		};
	}
}) satisfies PageServerLoad;
