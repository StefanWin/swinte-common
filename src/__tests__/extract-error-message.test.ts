import { describe, expect, it } from "vitest";
import { extractErrorMessage } from "../extract-error-message.js";

describe("extractErrorMessage", () => {
	it("should return undefined for null", () => {
		expect(extractErrorMessage(null)).toBeUndefined();
	});

	it("should return undefined for undefined", () => {
		expect(extractErrorMessage(undefined)).toBeUndefined();
	});

	it("should return message from Error instance", () => {
		const err = new Error("boom");
		expect(extractErrorMessage(err)).toBe("boom");
	});

	it("should return the string if input is a string", () => {
		expect(extractErrorMessage("something went wrong")).toBe(
			"something went wrong",
		);
	});

	it("should return message if object has string message property", () => {
		const errLike = { message: "custom error" };
		expect(extractErrorMessage(errLike)).toBe("custom error");
	});

	it("should return undefined if object has non-string message property", () => {
		const errLike = { message: 123 };
		expect(extractErrorMessage(errLike)).toBeUndefined();
	});

	it("should return undefined for number input", () => {
		expect(extractErrorMessage(42)).toBeUndefined();
	});

	it("should return undefined for boolean input", () => {
		expect(extractErrorMessage(false)).toBeUndefined();
	});

	it("should return undefined for symbol input", () => {
		expect(extractErrorMessage(Symbol("err"))).toBeUndefined();
	});
});
