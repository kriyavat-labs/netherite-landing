<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';
</script>

{#if $toast}
	<div
		transition:fly={{ duration: 200, y: 20 }}
		class="fixed bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
		class:bg-blue-400={$toast.type === 'success'}
		class:bg-red-500={$toast.type === 'error'}
	>
		<p class="text-white">{$toast.message}</p>
	</div>
{/if}
