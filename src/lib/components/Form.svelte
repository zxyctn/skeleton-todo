<script lang="ts">
	export let reset: boolean = true;
	export let title: string = '';
	export let description: string = '';
	export let showForm: boolean;

	const resetFields = () => (title = description = '');
</script>

<form on:submit|preventDefault>
	<label class="label">
		<span>Title</span>
		<input
			class="input variant-form-material bg-transparent"
			type="text"
			placeholder="Title"
			bind:value={title}
			required
		/>
	</label>
	<label class="label">
		<span>Description</span>
		<textarea
			class="textarea variant-form-material bg-transparent"
			rows="4"
			placeholder="Description"
			bind:value={description}
			required
		/>
	</label>
	<div class="w-full flex flex-row-reverse mt-5 gap-3">
		<button class="btn variant-filled-success" type="submit">Save</button>
		<button
			class="btn variant-filled-error"
			type="button"
			on:click={() => {
				showForm = false;
				if (reset) resetFields();
			}}>Cancel</button
		>
	</div>
</form>
