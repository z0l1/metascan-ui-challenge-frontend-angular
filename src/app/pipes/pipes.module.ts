import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UniquePipe } from "./unique.pipe";
import { StringsplitPipe } from "./stringsplit.pipe";

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [StringsplitPipe, UniquePipe],
})
export class PipesModule {}
