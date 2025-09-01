import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: '@swinte/common',
			fileName: (format) => `index.${format}.js`,
			formats: ['es', 'umd'],
		},
		rollupOptions: {
			external: [],
			treeshake: {
				moduleSideEffects: false,
			},
		},
	},
});
