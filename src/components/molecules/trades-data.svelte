<script lang="ts">
	import type { Trade } from '../../utils/schemas/trades';

	export let trades: Trade[];

	$: count = trades.length;
	$: closedTrades = trades.filter((trade) => trade.status === 'CLOSED').length;
	$: openTrades = count - closedTrades;
</script>

<section class="flex space-x-4 border-main border-[1px] border-opacity-60 p-2 rounded-md w-fit">
	<div class="border-r-[1px] border-main border-opacity-60 px-2">
		<p>Total Trades</p>
		<p class="text-right text-2xl">{count}</p>
	</div>
	<div class="border-r-[1px] border-main border-opacity-60 px-2">
		<p>Opened Trades</p>
		<p class="text-right text-2xl">{openTrades}</p>
	</div>
	<div>
		<p>Closed Trades</p>
		<p class="text-right text-2xl">{closedTrades}</p>
	</div>
</section>
