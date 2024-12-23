<script lang="ts">
	import Airtable from 'airtable';
	import { onMount } from 'svelte';
	import { showToast } from '$lib/stores/toast';
	import Toast from '$lib/components/Toast.svelte';

	// Add state variables
	let isSubmitting = false;
	let lastSubmissionTime = 0;
	const SUBMISSION_COOLDOWN = 5000; // 5 seconds cooldown

	// Initialize Airtable
	const base = new Airtable({
		apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
	}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

	// Add email validation function
	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// @ts-ignore
	async function handleSubmit(event) {
		event.preventDefault();

		// Prevent multiple submissions while processing
		if (isSubmitting) return;

		const email = event.target.email.value;

		// Add email validation check
		if (!isValidEmail(email)) {
			showToast('Please enter a valid email address.', 'error');
			return;
		}

		// Check for spam (multiple rapid submissions)
		const now = Date.now();
		if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
			alert('Please wait a few seconds before submitting again.');
			return;
		}

		isSubmitting = true;

		try {
			await new Promise((resolve, reject) => {
				base('waitlist-responses').create(
					[
						{
							fields: {
								Email: email
							}
						}
					],
					// @ts-ignore
					function (err) {
						if (err) {
							reject(err);
							return;
						}
						resolve(void 0);
					}
				);
			});

			// Update submission time and clear form
			lastSubmissionTime = Date.now();
			event.target.reset();
			showToast('Thanks for joining the waitlist!', 'success');
		} catch (err) {
			console.error('Error submitting to Airtable:', err);
			showToast('Something went wrong. Please try again.', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Beaconite - Visual Bookmarking like never before</title>
	<meta name="title" content="Beaconite - Visual Bookmarking like never before" />
	<meta
		name="description"
		content="Write notes, drag and drop images, videos, tweets, and connect them to build your own knowledge garden without traditional folders."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://beaconite.xyz/" />
	<meta property="og:title" content="Beaconite - Visual Bookmarking like never before" />
	<meta
		property="og:description"
		content="Write notes, drag and drop images, videos, tweets, and connect them to build your own knowledge garden without traditional folders."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://beaconite.xyz/" />
	<meta property="twitter:title" content="Beaconite - Visual Bookmarking like never before" />
	<meta
		property="twitter:description"
		content="Write notes, drag and drop images, videos, tweets, and connect them to build your own knowledge garden without traditional folders."
	/>

	<!-- Additional SEO tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="keywords"
		content="visual bookmarking, knowledge garden, note-taking, digital brain, productivity"
	/>
	<meta name="robots" content="index, follow" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link rel="canonical" href="https://beaconite.xyz/" />
</svelte:head>

<Toast />

<main class="min-h-screen flex flex-col items-center justify-center px-4">
	<div class="text-white text-xs bg-white/30 px-2 py-1 rounded-full font-medium mb-4">
		alpha stage
	</div>

	<h1 class="text-2xl font-medium text-white text-center">
		visual bookmarking just like your <span class="bg-red-400 text-white px-3 py-0.5 rounded-full"
			>brain</span
		>
	</h1>
	<p class="text-center text-white/70 mt-2 text-base font-medium mb-10">
		write notes, drag and drop images, videos, tweets, basically anything <br /> and connect them to
		build your own knowledge garden without the need of traditional folders.
	</p>

	<form class="flex flex-col gap-4 w-full max-w-md" on:submit={handleSubmit}>
		<div class="relative w-full">
			<input
				name="email"
				type="email"
				placeholder="Enter your email"
				required
				class="flex-1 w-full p-3 rounded-xl border border-gray-300 focus:border-white focus:outline-none transition-colors bg-white/10 placeholder:text-white/50 text-white font-medium text-base"
			/>
		</div>

		<button
			type="submit"
			class="px-8 py-3 bg-white text-blue-500 hover:bg-gray-200 transition-colors font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			disabled={isSubmitting}
		>
			{#if isSubmitting}
				<svg
					class="animate-spin h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				<span>Submitting...</span>
			{:else}
				Join waitlist
			{/if}
		</button>
	</form>
	<div class="flex gap-2 mt-5 text-white/70 text-sm hover:text-white font-medium">
		<a href="https://x.com/sudorohan" class="underline" target="_blank">Updates </a>
	</div>
</main>
