<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { editTrade, fetchTrade } from '../../../../services/trades';
	import { page } from '$app/stores';
	import { EditTrade, type Trade } from '../../../../utils/schemas/trades';
	import { goto } from '$app/navigation';
	import TradeForm from '../../../../components/organisms/trade-form.svelte';

	const trade = createQuery({
		queryKey: ['trade', $page.params.id],
		queryFn: () => fetchTrade($page.params.id)
	});

	let errorMessage = '';

	const handleSubmit = async (formData: any) => {
		errorMessage = '';
		const { success } = EditTrade.safeParse(formData.detail);
		if (!success) {
			errorMessage = 'Fill the form';
			return;
		}
		try {
			await editTrade($page.params.id, formData.detail);
			handleReturn();
		} catch (e) {
			console.log(e);
		}
	};

	const handleReturn = () => goto(`/trades`);
</script>

{#if $trade.isLoading}
	<p>Loading...</p>
{:else if $trade.isError}
	<p>Error...</p>
{:else if $trade.isSuccess && $trade.data}
	<TradeForm
		trade={$trade.data}
		{handleReturn}
		on:submit={handleSubmit}
		title="Edit Trade"
		buttonLabel="Edit"
		{errorMessage}
	/>
{/if}
