<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar padding="p-5">
			<svelte:fragment slot="lead">
				<h1 class="font-bold">todos</h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch ring="bg-neutral-400" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
