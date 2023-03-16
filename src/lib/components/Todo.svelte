<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	import type { TodoType } from '$lib/types/TodoType';
	import Form from './Form.svelte';

	export let todo: TodoType;

	const dispatch = createEventDispatcher();

	const dispatchEvent = (type: string) => {
		dispatch(type, {
			todo
		});
		showForm = false;
	};

	const markDone = () => {
		todo.done = !todo.done;
		dispatchEvent('edit');
	};

	let showForm = false;

	const confirm: ModalSettings = {
		type: 'confirm',
		title: 'Confirm',
		body: 'Are you sure you want to delete this todo?',
		response: (r: boolean) => (r ? dispatchEvent('delete') : modalStore.close())
	};
</script>

<div
	class="grid gap-3 p-8 shadow-2xl rounded-md h-min relative w-full"
	class:variant-soft-surface={!todo.done}
	class:bg-success-active-token={todo.done}
>
	<button
		class="btn variant-ghost absolute top-0 right-0 p-2 w-min h-min rounded-none rounded-tr-md"
		on:click={() => modalStore.trigger(confirm)}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-x-lg"
			viewBox="0 0 16 16"
		>
			<path
				d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
			/>
		</svg></button
	>
	{#if !showForm}
		<h1 class="font-bold">{todo.title}</h1>
		<h3>{todo.description}</h3>
		<button
			class="absolute right-0 bottom-0 btn variant-ghost w-min ml-auto p-2 rounded-none rounded-br-md"
			on:click={() => (showForm = true)}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-pencil-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
				/>
			</svg></button
		>
		<button
			class="absolute top-0 left-0 btn rounded-none rounded-tl-md p-2 variant-ghost"
			on:click={markDone}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-check2"
				viewBox="0 0 16 16"
			>
				<path
					d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
				/>
			</svg></button
		>
	{:else}
		<Form
			reset={false}
			bind:showForm
			bind:title={todo.title}
			bind:description={todo.description}
			on:submit={() => dispatchEvent('edit')}
		/>
	{/if}
</div>

<Modal />
