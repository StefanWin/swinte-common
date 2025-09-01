import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { fetchJsonWithSchema } from '../fetch-json-with-schema.js';

describe('fetchJson', () => {
	it.skip('should fetch valid json', async () => {
		const schema = z.object({
			name: z.string(),
			full_name: z.string(),
		});
		const { data, error } = await fetchJsonWithSchema(
			'https://api.github.com/repos/vercel/next.js',
			undefined,
			schema,
		);
		expect(error).toBeNull();
		expect(data).toMatchObject({
			name: 'next.js',
			full_name: 'vercel/next.js',
		});
	});

	it.skip('should error on invalid schemas', async () => {
		const schema = z.object({
			name: z.boolean(),
		});
		const { data, error } = await fetchJsonWithSchema(
			'https://api.github.com/repos/vercel/next.js',
			undefined,
			schema,
		);
		expect(data).toBeNull();
		expect(error).toBeInstanceOf(z.ZodError);
	});
});
