import { StringsplitPipe } from "./stringsplit.pipe";

describe("StringsplitPipe", () => {
	const pipe = new StringsplitPipe();

	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it('should split a string by the default splitter (",")', () => {
		const result = pipe.transform("one,two,three");
		expect(result).toEqual(["one", "two", "three"]);
	});

	it("should split a string by a custom splitter", () => {
		const result = pipe.transform("one-two-three", "-");
		expect(result).toEqual(["one", "two", "three"]);
	});

	it("should handle an empty string", () => {
		const result = pipe.transform("");
		expect(result).toEqual([""]);
	});

	it("should return an empty array if the input is null", () => {
		const result = pipe.transform(null);
		expect(result).toEqual([]);
	});

	it("should return an empty array if the input is undefined", () => {
		const result = pipe.transform(undefined);
		expect(result).toEqual([]);
	});

	it("should handle a string with no matching splitter", () => {
		const result = pipe.transform("one two three", ",");
		expect(result).toEqual(["one two three"]);
	});

	it("should split using a complex splitter", () => {
		const result = pipe.transform("one<>two<>three", "<>");
		expect(result).toEqual(["one", "two", "three"]);
	});
});
