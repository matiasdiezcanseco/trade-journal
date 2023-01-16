<script lang="ts">
	import Autocomplete from '@smui-extra/autocomplete/src/Autocomplete.svelte';
	import { Label } from '@smui/button';
	import Button from '@smui/button/src/Button.svelte';
	import Textfield from '@smui/textfield';
	import { DateInput } from 'date-picker-svelte';
	import type { Trade, EditTrade } from '../../utils/schemas/trades';
	import { createEventDispatcher } from 'svelte';
	import dayjs from 'dayjs';

	const dispatch = createEventDispatcher();

	const handleSubmit = (e: any) => {
		dispatch('submit', {
			symbol,
			entry,
			exit,
			setups,
			side,
			size,
			date: dayjs(date).toISOString()
		});
	};

	export let trade: EditTrade = {
		date: dayjs().toISOString(),
		symbol: '',
		entry: 0,
		exit: 0,
		setups: '',
		side: 'LONG',
		size: 0
	};

	let { symbol, entry, exit, setups, side, size } = trade;
	let date = trade ? new Date(trade.date as string) : new Date();

	export let title: string;
	export let buttonLabel: string;
	export let errorMessage: string;
	export let handleReturn: () => void;
</script>

<div class="p-2 space-y-4 max-w-xl mx-auto">
	<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
		<h4>{title}</h4>
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
				name="symbol"
				id="symbol"
			/>
		</div>
		<div>
			<Textfield
				style="width: 100%;"
				helperLine$style="width: 100%;"
				variant="standard"
				bind:value={entry}
				label="Entry"
				name="entry"
				id="entry"
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
				name="exit"
				id="exit"
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
				name="size"
				id="size"
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
				name="side"
				id="side"
			/>
		</div>
		<div>
			<Textfield
				style="width: 100%;"
				helperLine$style="width: 100%;"
				variant="standard"
				bind:value={setups}
				label="Setups"
				name="setups"
				id="setups"
			/>
		</div>
		<div>
			<Button variant="raised">
				<Label>{buttonLabel}</Label>
			</Button>
		</div>
	</form>
	<Button variant="outlined" type="submit" on:click={handleReturn}>
		<Label>Return</Label>
	</Button>
	{#if errorMessage}
		<p class="text-red-600">{errorMessage}</p>
	{/if}
</div>
