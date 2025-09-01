import { isErrorLike } from './is-error-like.js';

/**
 * Extract an error message from the given value.
 *
 * If the value is an Error, the message property will be returned.
 *
 * If the value is a string, the value will be returned.
 *
 * If the value has a property 'message' of type string, the property will be returned.
 * @param err
 */
export function extractErrorMessage(err: unknown): string | undefined {
	if (!err) {
		return undefined;
	}

	if (err instanceof Error) {
		return err.message;
	}

	if (typeof err === 'string') {
		return err;
	}

	if (isErrorLike(err)) {
		return err.message;
	}

	return undefined;
}
