import type { Writable } from 'svelte/store';
import type { TodoType } from './types/TodoType';

import { localStorageStore } from '@skeletonlabs/skeleton';

const todosStore: Writable<string> = localStorageStore('todos', '[]');

export default todosStore;