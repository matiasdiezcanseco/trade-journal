import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.pathname.split('/')[3] ?? '';
	try {
		const post = await axios.get(env.DB_ENDPOINT + '/trades' + `/${id}`);
		return json(post.data);
	} catch (e: unknown) {
		if (axios.isAxiosError(e) && e.response) throw error(e.response.status, 'error');
		else throw error(500, 'error');
	}
};
