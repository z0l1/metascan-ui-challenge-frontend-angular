import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "stringsplit",
	standalone: true,
})
export class StringsplitPipe implements PipeTransform {
	transform(value: string | null | undefined, splitter: string = ","): string[] {
		if (typeof value !== "string") {
			return [];
		}

		return value.split(splitter);
	}
}
