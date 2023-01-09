<script>
	import '../app.css';
	import '../theme/_typography.scss';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '../utils/query-client';
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
