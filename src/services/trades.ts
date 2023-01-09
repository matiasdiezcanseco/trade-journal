import axios from 'axios';
import type { Trade } from '../utils/schemas/trades';

export const addTrade = async (params: Trade) => {
	try {
		const response = await axios.post('/api/trades', params);
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

export const fetchTrades = async () => {
	try {
		const response = await axios.get('/api/trades');
		return response.data as Trade[];
	} catch (e) {
		console.log(e);
	}
};
