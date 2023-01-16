import axios from 'axios';
import type { AddTrade, EditTrade, Trade } from '../utils/schemas/trades';

export const addTrade = async (params: AddTrade) => {
	try {
		const response = await axios.post('/api/trades', params);
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

export const editTrade = async (id: string, params: EditTrade) => {
	try {
		const response = await axios.patch(`/api/trades/${id}`, params);
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

export const fetchTrade = async (id: number | string) => {
	try {
		const response = await axios.get(`/api/trades/${id}`);
		return response.data as Trade;
	} catch (e) {
		console.log(e);
	}
};

export const deleteTrade = async (id: number | string) => {
	try {
		const response = await axios.delete(`/api/trades/${id}`);
		return response.data as Trade;
	} catch (e) {
		console.log(e);
	}
};
