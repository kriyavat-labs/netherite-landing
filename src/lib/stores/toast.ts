import { writable } from 'svelte/store';

type Toast = {
	message: string;
	type: 'success' | 'error';
};

export const toast = writable<Toast | null>(null);

export const showToast = (message: string, type: 'success' | 'error') => {
	toast.set({ message, type });
	setTimeout(() => toast.set(null), 3000); // Hide after 3 seconds
};
