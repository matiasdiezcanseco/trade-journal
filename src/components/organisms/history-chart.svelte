<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { data } from '../../utils/data';
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

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let trades: Trade[];
</script>

<Line {data} options={{ responsive: true }} />
