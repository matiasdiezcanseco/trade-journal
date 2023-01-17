<script lang="ts">
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import { getCoreRowModel, createSvelteTable, flexRender } from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import type { Trade } from '../../utils/schemas/trades';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import IconButton from '@smui/icon-button';
	import { deleteTrade } from '../../services/trades';
	import { createMutation } from '@tanstack/svelte-query';
	import { queryClient } from '../../utils/query-client';
	import { calculateTradeProfit } from '../../utils/profit';
	import { formatCurrency } from '../../utils/format';

	export let trades: Trade[] = [];

	const handleDelete = createMutation({
		mutationFn: (id: string) => deleteTrade(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['trades'] });
		}
	});

	const defaultColumns: ColumnDef<Trade>[] = [
		{
			accessorKey: 'id',
			id: 'id',
			header: () => 'id',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'symbol',
			id: 'symbol',
			header: () => 'Symbol',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'status',
			id: 'status',
			header: () => 'Status',
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
		data: trades,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: trades
		}));
	};

	$: {
		if (trades) rerender();
	}

	const table = createSvelteTable(options);
</script>

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
				<th class="py-1 px-2">Profit</th>
				<th class="py-1 px-2">Edit</th>
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows as row, i}
			<tr class={`${i % 2 === 1 ? 'bg-main bg-opacity-10' : ''}`}>
				{#each row.getVisibleCells() as cell}
					<td class="py-1 px-2">
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</td>
				{/each}
				<td class="py-1 px-2">
					{formatCurrency(
						calculateTradeProfit({
							entry: row.getValue('entry'),
							exit: row.getValue('exit'),
							side: row.getValue('side'),
							size: row.getValue('size'),
							status: row.getValue('status')
						})
					)}
				</td>
				<td class="py-1 px-2">
					<IconButton
						class="material-icons"
						on:click={() => goto(`/trades/edit/${row.getValue('id')}`)}
						>edit
					</IconButton>
					<IconButton
						class="material-icons"
						on:click={() => $handleDelete.mutate(row.getValue('id'))}
						>delete
					</IconButton>
				</td>
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
