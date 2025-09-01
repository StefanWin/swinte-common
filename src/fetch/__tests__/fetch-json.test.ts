import { describe, expect, it } from 'vitest';
import { fetchJson } from '../fetch-json.js';

describe('fetchJson', () => {
	it.skip('should fetch valid json', async () => {
		await expect(
			fetchJson('https://api.github.com/repos/vercel/next.js'),
		).resolves.toMatchObject({
			name: 'next.js',
			full_name: 'vercel/next.js',
		});
	});

	it.skip('should fail with 404', async () => {
		await expect(
			fetchJson(
				'https://api.github.com/repos/vercel/i-hope-this-does-not-exits',
			),
		).rejects.toThrowError(`invalid response status: Not Found`);
	});

	it.skip('should fail with invalid JSON', async () => {
		await expect(
			fetchJson(
				'https://raw.githubusercontent.com/StefanWin/swinte-common/refs/heads/main/.npmrc',
			),
		).rejects.toThrow(SyntaxError);

		await expect(
			fetchJson(
				'https://raw.githubusercontent.com/StefanWin/swinte-common/refs/heads/main/.npmrc',
			),
		).rejects.toThrow(/is not valid JSON/);
	});
});
