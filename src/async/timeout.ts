/**
 * Timeout a promise after a given number of milliseconds.
 * @param promise
 * @param ms
 * @param message
 */
export async function timeout<T>(
	promise: Promise<T>,
	ms: number,
	message = `Operation timed out after ${ms}ms`,
): Promise<T> {
	let timer: NodeJS.Timeout | null = null;

	const timeoutPromise = new Promise<never>((_, reject) => {
		timer = setTimeout(() => reject(new Error(message)), ms);
	});

	try {
		return await Promise.race([promise, timeoutPromise]);
	} finally {
		if (timer) {
			clearTimeout(timer);
		}
	}
}
