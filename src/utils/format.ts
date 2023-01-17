export const formatCurrency = (amount: number | string | null) => {
	if (amount === '' || amount === null) return '';
	const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
	const value = typeof amount === 'string' ? parseFloat(amount) : amount;
	return formatter.format(value);
};
