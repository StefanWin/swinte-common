import { describe, expect, it } from 'vitest';
import { timeout } from '../timeout.js';

describe('timeout', () => {
	it('resolves if promise finishes before timeout', async () => {
		const result = await timeout(
			new Promise((res) => setTimeout(() => res('ok'), 50)),
			200,
		);
		expect(result).toBe('ok');
	});

	it('rejects if promise takes too long', async () => {
		await expect(
			timeout(new Promise((res) => setTimeout(() => res('late'), 200)), 50),
		).rejects.toThrow('Operation timed out after 50ms');
	});

	it('clears timer after resolution', async () => {
		let cleared = false;
		const originalClearTimeout = global.clearTimeout;

		global.clearTimeout = () => {
			cleared = true;
		};

		await timeout(Promise.resolve('done'), 100);
		expect(cleared).toBe(true);

		global.clearTimeout = originalClearTimeout;
	});
});
