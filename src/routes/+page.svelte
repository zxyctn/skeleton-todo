<script lang="ts">
	import { blur } from 'svelte/transition';
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
			<div animate:flip transition:blur={{ duration: 200 }}>
				<Todo {todo} on:delete={deleteTodo} on:edit={editTodo} />
			</div>
		{/each}
		<div
			class="fixed bottom-5 right-5 rounded-md bg-secondary-500 max-w-max shadow-xl h-min transition-all ease-in-out duration-200"
			class:p-5={showForm}
		>
			{#if !showForm}
				<button class="btn variant-filled-secondary font-bold gap-1 text-xl p-3 shadow-2xl" on:click={() => (showForm = true)}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
						/>
					</svg>
				</button>
			{:else}
				<Form on:submit={addTodo} bind:showForm bind:title bind:description />
			{/if}
		</div>
	</div>
</div>
