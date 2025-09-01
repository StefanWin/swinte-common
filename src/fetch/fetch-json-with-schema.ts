import type { z } from 'zod';
import { tryCatch } from '../async/index.js';
import { defaultRequestInit, fetchJson } from './fetch-json.js';

export type SchemaResult<T> =
	| { data: T; error: null }
	| { data: null; error: Error };

export async function fetchJsonWithSchema<TSchema extends z.ZodTypeAny>(
	url: string,
	options: RequestInit = defaultRequestInit,
	schema: TSchema,
): Promise<SchemaResult<z.infer<TSchema>>> {
	const result = await tryCatch(fetchJson(url, options));

	if (result.error) {
		return { data: null, error: result.error };
	}

	const parsed = schema.safeParse(result.data);

	if (parsed.success) {
		return { data: parsed.data, error: null };
	}

	return { data: null, error: parsed.error };
}
