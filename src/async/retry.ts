/**
 * Retry a function a given number of times with an optional delay.
 * @param fn
 * @param options
 */
export async function retry<T>(
	fn: () => Promise<T>,
	options: { retries: number; delay?: number } = { retries: 3 },
): Promise<T> {
	const { retries, delay = 0 } = options;

	let lastError: unknown;

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			return await fn();
		} catch (err) {
			lastError = err;
			if (attempt < retries && delay > 0) {
				await new Promise((res) => setTimeout(res, delay));
			}
		}
	}

	throw lastError;
}
