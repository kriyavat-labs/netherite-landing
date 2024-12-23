<script>
	import '../app.css';
</script>

<div class="gradient-background">
	<slot />
</div>

<style>
	.gradient-background {
		min-height: 100vh;
		background: linear-gradient(
			-45deg,
			#9f3110,
			/* coral */ #e73c7e,
			/* pink */ #cf47df,
			/* blue */ #18997b,
			/* purple */ #09883e,
			/* emerald */ #266e9f /* sky blue */
		);
		background-size: 400% 400%;
		animation:
			gradient1 45s ease-in-out infinite,
			gradient2 35s ease-in-out infinite;
	}

	@keyframes gradient1 {
		0% {
			background-position: 0% 50%;
		}
		20% {
			background-position: 60% 20%;
		}
		40% {
			background-position: 20% 80%;
		}
		60% {
			background-position: 80% 10%;
		}
		80% {
			background-position: 40% 60%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes gradient2 {
		0% {
			background-position: 80% 20%;
		}
		25% {
			background-position: 30% 70%;
		}
		50% {
			background-position: 90% 40%;
		}
		75% {
			background-position: 10% 60%;
		}
		100% {
			background-position: 80% 20%;
		}
	}
</style>
