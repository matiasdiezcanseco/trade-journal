<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { fetchTrades } from '../../services/trades';
	import { goto } from '$app/navigation';
	import { createQuery } from '@tanstack/svelte-query';
	import HistoryChart from '../../components/organisms/history-chart.svelte';
	import TradesTable from '../../components/organisms/trades-table.svelte';
	import TradesData from '../../components/molecules/trades-data.svelte';

	const trades = createQuery({ queryKey: ['trades'], queryFn: () => fetchTrades() });
</script>

<div class="space-y-4">
	{#if $trades.isLoading}
		<p>Loading...</p>
	{:else if $trades.isError}
		<p>Error...</p>
	{:else if $trades.isSuccess && $trades.data}
		<div class="space-y-4">
			<TradesData trades={$trades.data} />
			<HistoryChart trades={$trades.data} />
			<TradesTable trades={$trades.data} />
			<div>
				<Button variant="raised" on:click={() => goto(`/trades/add`)}>
					<Label>Add trade</Label>
				</Button>
			</div>
		</div>
	{/if}
</div>
