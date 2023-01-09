<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Autocomplete from '@smui-extra/autocomplete';
	import Textfield from '@smui/textfield';
	import { DateInput } from 'date-picker-svelte';
	import { addTrade } from '../../../services/trades';
	import { Trade } from '../../../utils/schemas/trades';
	import { goto } from '$app/navigation';

	import dayjs from 'dayjs';

	let date: Date = new Date();
	let symbol = '';
	let entry = '';
	let exit = '';
	let side = '' as Trade['side'];
	let setups = '';
	let size = '';

	let errorMessage = '';

	$: formData = {
		date: dayjs(date).toISOString(),
		symbol,
		entry: parseFloat(entry),
		exit: parseFloat(exit),
		side,
		setups,
		size: parseFloat(size)
	};

	$: if (formData) errorMessage = '';

	const resetForm = () => {
		date = new Date();
		symbol = '';
		entry = '';
		exit = '';
		side = '' as Trade['side'];
		setups = '';
		size = '';
	};

	const handleSubmit = async (e: any) => {
		errorMessage = '';
		const { success } = Trade.safeParse(formData);
		if (!success) {
			errorMessage = 'Fill the form';
			return;
		}
		try {
			await addTrade(formData);
			goto(`/trades`);
		} catch (e) {}
	};
</script>

<form class="p-2 space-y-4 max-w-xl mx-auto" on:submit|preventDefault={handleSubmit}>
	<h4>Add Trade</h4>
	<div>
		<p class="text-gray-400">Date</p>
		<DateInput bind:value={date} closeOnSelection />
	</div>
	<div>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			variant="standard"
			bind:value={symbol}
			label="Symbol"
		/>
	</div>
	<div>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			variant="standard"
			bind:value={entry}
			label="Entry"
			prefix="$"
			type="number"
			input$step="0.0001"
		/>
	</div>
	<div>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			variant="standard"
			bind:value={exit}
			label="Exit"
			prefix="$"
			type="number"
			input$step="0.0001"
		/>
	</div>
	<div>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			variant="standard"
			bind:value={size}
			label="Size"
			prefix="$"
			type="number"
			input$step="0.0001"
		/>
	</div>
	<div>
		<Autocomplete
			style="width: 100%;"
			options={['LONG', 'SHORT']}
			textfield$variant="standard"
			bind:value={side}
			label="Side"
		/>
	</div>
	<div>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			variant="standard"
			bind:value={setups}
			label="Setups"
		/>
	</div>
	<div>
		<Button variant="raised">
			<Label>Add</Label>
		</Button>
		<Button variant="outlined" on:click={() => goto(`/trades`)}><Label>Return</Label></Button>
	</div>
	{#if errorMessage}
		<p class="text-red-600">{errorMessage}</p>
	{/if}
</form>
