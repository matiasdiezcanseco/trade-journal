<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { Trade } from '../../utils/schemas/trades';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import dayjs from 'dayjs';
	import { calculateTradeProfit } from '../../utils/profit';
	import { COLORS } from '../../utils/colors';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let trades: Trade[];

	let labels: string[] = [];
	let dayProfit: number[] = [];
	let accProfit: number[] = [];

	const cumulativeSum = (
		(sum) => (value: number) =>
			(sum += value)
	)(0);

	$: {
		const _labels = trades.map((trade) => dayjs(trade.date).format('YYYY-MM-DD'));
		labels = [...new Set(_labels)].sort((a, b) => (new Date(a) as any) - (new Date(b) as any));
	}

	$: {
		dayProfit = labels.map((date) => {
			const dayTrades = trades.filter((trade) => dayjs(trade.date).format('YYYY-MM-DD') === date);
			let acc = 0;
			dayTrades.forEach(
				({ entry, exit, side, size, status }) =>
					(acc += calculateTradeProfit({ entry, exit, side, size, status }) || 0)
			);
			return acc;
		});
	}

	$: {
		accProfit = dayProfit.map(cumulativeSum);
	}
</script>

<Line
	data={{
		labels,
		datasets: [
			{
				label: 'Day Profit',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'white',
				borderColor: 'white',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'white',
				pointBackgroundColor: 'white',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'black',
				pointHoverBorderColor: 'white',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: dayProfit
			},
			{
				label: 'Acc Profit',
				fill: true,
				lineTension: 0.3,
				backgroundColor: COLORS.main,
				borderColor: COLORS.main,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: COLORS.main,
				pointBackgroundColor: COLORS.main,
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'black',
				pointHoverBorderColor: COLORS.main,
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: accProfit
			}
		]
	}}
	options={{ responsive: true }}
/>
