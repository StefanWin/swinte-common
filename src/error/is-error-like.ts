export function isErrorLike(obj: unknown): obj is { message: string } {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'message' in obj &&
		// biome-ignore lint/suspicious/noExplicitAny: type-guard
		typeof (obj as any).message === 'string'
	);
}
