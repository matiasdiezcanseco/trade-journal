<script>
	import '../app.css';
	import '../theme/_typography.scss';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '../utils/query-client';
	import Header from '../components/molecules/header.svelte';
</script>

<QueryClientProvider client={queryClient}>
	<div class="max-w-6xl mx-auto p-2">
		<Header />
		<br />
		<slot />
	</div>
</QueryClientProvider>
