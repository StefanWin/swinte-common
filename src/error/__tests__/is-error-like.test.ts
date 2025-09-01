import { describe, expect, it } from 'vitest';
import { isErrorLike } from '../is-error-like.js';

describe('isErrorLike', () => {
	it('returns true for Error objects', () => {
		expect(isErrorLike(new Error('fail'))).toBe(true);
	});

	it('returns true for plain objects with message string', () => {
		expect(isErrorLike({ message: 'oops' })).toBe(true);
	});

	it('returns false for objects without message', () => {
		expect(isErrorLike({})).toBe(false);
	});

	it('returns false for null', () => {
		expect(isErrorLike(null)).toBe(false);
	});

	it('returns false for non-objects', () => {
		expect(isErrorLike('error')).toBe(false);
		expect(isErrorLike(123)).toBe(false);
	});
});
