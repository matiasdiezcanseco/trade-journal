import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private';
import { Trade } from '../../../utils/schemas/trades';
import { ZodError } from 'zod';

export const GET: RequestHandler = async () => {
	try {
		const posts = await axios.get(env.DB_ENDPOINT + '/trades');
		return json(posts.data);
	} catch (e: unknown) {
		if (axios.isAxiosError(e) && e.response) throw error(e.response.status, 'error');
		else throw error(500, 'error');
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const post = await request.json();
		Trade.parse(post);
		const response = await axios.post(env.DB_ENDPOINT + '/trades', post);
		return json(response.data);
	} catch (e: unknown) {
		console.log(e);
		if (axios.isAxiosError(e) && e.response) throw error(e.response.status, 'error');
		if (e instanceof ZodError) throw error(400, e);
		else throw error(500, 'error');
	}
};
