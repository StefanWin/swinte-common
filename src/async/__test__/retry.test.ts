import { describe, expect, it } from 'vitest';
import { retry } from '../retry.js';

describe('retry', () => {
	it('resolves immediately if fn succeeds', async () => {
		const fn = async () => 'ok';
		const result = await retry(fn, { retries: 3 });
		expect(result).toBe('ok');
	});

	it('retries until success', async () => {
		let attempts = 0;
		const fn = async () => {
			attempts++;
			if (attempts < 3) throw new Error('fail');
			return 'success';
		};

		const result = await retry(fn, { retries: 5 });
		expect(result).toBe('success');
		expect(attempts).toBe(3);
	});

	it('throws after all retries fail', async () => {
		const fn = async () => {
			throw new Error('always fails');
		};

		await expect(retry(fn, { retries: 2 })).rejects.toThrow('always fails');
	});

	it('waits between retries if delay is set', async () => {
		let attempts = 0;
		const start = Date.now();

		const fn = async () => {
			attempts++;
			if (attempts < 2) throw new Error('fail');
			return 'ok';
		};

		const result = await retry(fn, { retries: 2, delay: 100 });
		const elapsed = Date.now() - start;

		expect(result).toBe('ok');
		expect(elapsed).toBeGreaterThanOrEqual(100);
	});
});
