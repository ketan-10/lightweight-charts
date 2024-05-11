import { resolve } from 'path';
import { defineConfig } from 'vite';
import { globby } from 'globby';

const paths = (await globby(['./src/**/*.html'])).map(path =>
	path.replace('./src/', '')
);

const input = {
	main: resolve(__dirname, '../index.html'),
};

let count = 0;
paths.forEach(p => {
	input[count++] = resolve(__dirname, p);
});

export default defineConfig({
	base: './',
	build: {
		rollupOptions: {
			input,
		},
	},
	resolve: {
		alias: {
			// Point lightweight-charts directly to the TypeScript source
			'lightweight-charts': resolve(__dirname, '../../src/index.ts'),
		},
	},
	optimizeDeps: {
		// Include dependencies that need pre-bundling
		include: ['fancy-canvas'],
	},
	server: {
		fs: {
			// Allow serving files from parent directory
			allow: ['../..'],
		},
	},
});
