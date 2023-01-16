import type { Trade } from './schemas/trades';

export const toLineData = (trades: Trade[]) => {
	const dates = trades.map((trade) => trade.date);
	const uniqueDates = [...new Set(dates)];
	const sortedDates = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

	const data = sortedDates.map((date, i) => {
		const dayTrades = trades.filter((trade) => trade.date === date) as Trade[];
		let dayTradesAcc = 0;
		dayTrades.forEach((trade) => (dayTradesAcc += trade.size));
		return dayTradesAcc;
	});
	const datasets = [
		{
			label: 'My First dataset',
			fill: true,
			lineTension: 0.3,
			backgroundColor: 'rgba(225, 204,230, .3)',
			borderColor: 'rgb(205, 130, 158)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgb(205, 130,1 58)',
			pointBackgroundColor: 'rgb(255, 255, 255)',
			pointBorderWidth: 10,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgb(0, 0, 0)',
			pointHoverBorderColor: 'rgba(220, 220, 220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data
		}
	];

	return {
		data: {
			labels: dates,
			datasets
		}
	};
};
