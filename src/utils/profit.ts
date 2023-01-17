import type { Trade } from './schemas/trades';

export const calculateTradeProfit = ({
	entry,
	exit,
	size,
	side,
	status
}: {
	entry: number;
	exit: number;
	size: number;
	side: Trade['side'];
	status: Trade['status'];
}) => {
	if (status === 'OPEN') return null;
	const profit = ((exit - entry) / entry) * size;
	if (side === 'LONG') return profit;
	else return -profit;
};
