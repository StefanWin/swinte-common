import { tryCatch } from '../async/index.js';

/**
 * Fetch JSON data from a URL.
 *
 * @param url
 * @param options default method: `GET`, default Content-Type: `application/json`.
 */
export async function fetchJson<T = unknown>(
	url: string,
	options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	},
): Promise<T | Error> {
	const { error, data } = await tryCatch(fetch(url, { ...options }));

	if (error) return error;

	if (!data.ok) {
		return Promise.reject(
			new Error(`invalid response status: ${data.statusText}`),
		);
	}

	const json = await data.json();

	return json as T;
}
