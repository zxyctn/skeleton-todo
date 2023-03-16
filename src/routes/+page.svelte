<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import todosStore from '$lib/stores';

	import Form from '$lib/components/Form.svelte';
	import Todo from '$lib/components/Todo.svelte';
	import type { TodoType } from '$lib/types/TodoType';

	let todos: TodoType[];
	todosStore.subscribe((value) => (todos = JSON.parse(value)));

	const addTodo = () => {
		todos = [{ title, description, done: false }, ...todos];
		title = description = '';
		showForm = false;
		todosStore.set(JSON.stringify(todos));
	};

	const editTodo = (e: any) => {
		const todo: TodoType = e.detail.todo;
		const index = todos.findIndex((item) => item === todo);
		todos[index] = todo;
		todosStore.set(JSON.stringify(todos));
	};

	const deleteTodo = (e: any) => {
		const todo: TodoType = e.detail.todo;
		todos = todos.filter((item) => item != todo);
		todosStore.set(JSON.stringify(todos));
	};

	let title: string = '';
	let description: string = '';
	let showForm = false;
</script>

<div class="container p-5 mx-auto">
	<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
		{#each todos as todo, index (index)}
			<div animate:flip transition:scale>
				<Todo {todo} on:delete={deleteTodo} on:edit={editTodo} />
			</div>
		{/each}

		<div class="p-8 rounded-md bg-surface-700 h-min">
			{#if !showForm}
				<button class="btn text-3xl w-full h-full" on:click={() => (showForm = true)}
					>+ add todo</button
				>
			{:else}
				<Form on:submit={addTodo} bind:showForm bind:title bind:description />
			{/if}
		</div>
	</div>
</div>
