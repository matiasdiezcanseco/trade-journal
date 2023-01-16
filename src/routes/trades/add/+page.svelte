<script lang="ts">
	import { addTrade } from '../../../services/trades';
	import { AddTrade } from '../../../utils/schemas/trades';
	import { goto } from '$app/navigation';
	import TradeForm from '../../../components/organisms/trade-form.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { queryClient } from '../../../utils/query-client';

	let errorMessage = '';

	const handleSubmit = createMutation({
		mutationFn: (formData: any) => validateSubmit(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['trades'] });
		}
	});

	const validateSubmit = async (formData: any) => {
		errorMessage = '';
		const { success } = AddTrade.safeParse(formData.detail);
		if (!success) {
			errorMessage = 'Fill the form';
			return;
		}
		try {
			await addTrade(formData.detail);
			handleReturn();
		} catch (e) {
			console.log(e);
		}
	};

	const handleReturn = () => goto(`/trades`);
</script>

<TradeForm
	on:submit={(formData) => $handleSubmit.mutate(formData)}
	{handleReturn}
	title="Add Trade"
	buttonLabel="Add"
	{errorMessage}
/>
