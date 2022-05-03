import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$lowApi: path.resolve('./src/backend/lowdb/api'),
					$routes: path.resolve('./src/routes'),
					$backend: path.resolve('./src/backend'),
					$frontend: path.resolve('./src/frontend'),
				}
			}
		}
	}
};

export default config;
