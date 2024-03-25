import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "unique",
	standalone: true,
})
export class UniquePipe implements PipeTransform {
	transform(value: any[]): any[] {
		const map = new Map<any, number>();
		for (let i = 0; i < value.length; i++) {
			map.set(value[i], 0);
		}

		return Array.from(map.keys());
	}
}
