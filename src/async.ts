/**
 * Sleep for a given number of milliseconds.
 * @param ms
 */
export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
