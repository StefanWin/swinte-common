import { describe, expect, it } from 'vitest';
import { tryCatch } from '../try-catch.js';

describe('tryCatch', () => {
	it('should return data on success', async () => {
		const promise = Promise.resolve(42);

		const result = await tryCatch(promise);

		expect(result).toEqual({
			data: 42,
			error: null,
		});
	});

	it('should return error on failure', async () => {
		const error = new Error('Something went wrong');
		const promise = Promise.reject(error);

		const result = await tryCatch(promise);

		expect(result).toEqual({
			data: null,
			error,
		});
	});

	it('should handle non-Error rejections', async () => {
		const promise = Promise.reject('string error');

		const result = await tryCatch(promise);

		expect(result).toEqual({
			data: null,
			error: 'string error',
		});
	});

	it('should work with async functions', async () => {
		const asyncFn = async () => {
			return 'hello';
		};

		const result = await tryCatch(asyncFn());

		expect(result).toEqual({
			data: 'hello',
			error: null,
		});
	});
});
