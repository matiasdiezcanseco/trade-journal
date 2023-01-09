<script lang="ts">
	import Button, { Label } from '@smui/button';
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import { getCoreRowModel, createSvelteTable, flexRender } from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import { fetchTrades } from '../../services/trades';
	import type { Trade } from '../../utils/schemas/trades';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import { createQuery } from '@tanstack/svelte-query';

	const trades = createQuery({ queryKey: ['trades'], queryFn: () => fetchTrades() });

	const defaultColumns: ColumnDef<Trade>[] = [
		{
			accessorKey: 'symbol',
			id: 'symbol',
			header: () => 'Symbol',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'date',
			id: 'date',
			header: () => 'Date',
			cell: (info) => dayjs(info.getValue() as string).format('YYYY-MM-DD')
		},
		{
			accessorKey: 'entry',
			id: 'entry',
			header: () => 'Entry',
			cell: (info) => '$' + info.getValue()
		},
		{
			accessorKey: 'exit',
			id: 'exit',
			header: () => 'Exit',
			cell: (info) => '$' + info.getValue()
		},
		{
			accessorKey: 'size',
			id: 'size',
			header: () => 'Size',
			cell: (info) => '$' + info.getValue()
		},
		{
			accessorKey: 'side',
			id: 'side',
			header: () => 'Side',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'setups',
			id: 'setups',
			header: () => 'Setups',
			cell: (info) => info.getValue()
		}
	];

	const options = writable<TableOptions<Trade>>({
		data: ($trades.data || []) as Trade[],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: ($trades.data || []) as Trade[]
		}));
	};

	const table = createSvelteTable(options);

	$: {
		if ($trades.isSuccess)
			options.update((options) => ({
				...options,
				data: ($trades.data || []) as Trade[]
			}));
	}
</script>

<div class="p-2 space-y-4">
	{#if $trades.isLoading}
		<p>Loading...</p>
	{:else if $trades.isError}
		<p>Error...</p>
	{:else if $trades.isSuccess}
		<table>
			<thead>
				{#each $table.getHeaderGroups() as headerGroup}
					<tr class="border-b-[1px] border-main">
						{#each headerGroup.headers as header}
							<th class="py-1 px-2">
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each $table.getRowModel().rows as row, i}
					<tr class={`${i % 2 === 1 ? 'bg-main bg-opacity-10' : ''}`}>
						{#each row.getVisibleCells() as cell}
							<td class="py-1 px-2">
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
			<tfoot>
				{#each $table.getFooterGroups() as footerGroup}
					<tr>
						{#each footerGroup.headers as header}
							<th>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.footer, header.getContext())}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</tfoot>
		</table>
		<div>
			<Button variant="raised" on:click={() => goto(`/trades/add`)}>
				<Label>Add trade</Label>
			</Button>
		</div>
	{/if}
</div>
