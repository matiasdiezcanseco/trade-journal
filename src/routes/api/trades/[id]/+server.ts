import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private';
import { EditTrade } from '../../../../utils/schemas/trades';

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

export const PATCH: RequestHandler = async ({ url, request }) => {
	const id = url.pathname.split('/')[3] ?? '';
	const patch = await request.json();

	try {
		EditTrade.parse(patch);
		const response = await axios.patch(env.DB_ENDPOINT + '/trades' + `/${id}`, patch);
		return json(response.data);
	} catch (e: unknown) {
		if (axios.isAxiosError(e) && e.response) throw error(e.response.status, 'error');
		else throw error(500, 'error');
	}
};

export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.pathname.split('/')[3] ?? '';

	try {
		const response = await axios.delete(env.DB_ENDPOINT + '/trades' + `/${id}`);
		return json(response.data);
	} catch (e: unknown) {
		if (axios.isAxiosError(e) && e.response) throw error(e.response.status, 'error');
		else throw error(500, 'error');
	}
};
