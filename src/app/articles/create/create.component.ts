import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { StringsplitPipe } from "../../pipes/stringsplit.pipe";
import { UniquePipe } from "../../pipes/unique.pipe";

@Component({
	selector: "app-edit",
	standalone: true,
	imports: [
		NgIf,
		FormsModule,
		ReactiveFormsModule,
		JsonPipe,
		StringsplitPipe,
		NgForOf,
		UniquePipe,
	],
	templateUrl: "./create.component.html",
	styleUrl: "./create.component.scss",
	providers: [StringsplitPipe, UniquePipe],
})
export class CreateComponent {
	serverError: string | null = null;

	editForm = new FormGroup({
		title: new FormControl("", [Validators.required]),
		body: new FormControl("", [Validators.required]),
		description: new FormControl("", [Validators.required]),
		tags: new FormControl(""),
	});

	get formTitle() {
		return this.editForm.get("title");
	}

	get formBody() {
		return this.editForm.get("body");
	}

	get formDescription() {
		return this.editForm.get("description");
	}

	get formTags() {
		return this.editForm.get("tags");
	}

	constructor(
		private router: Router,
		private api: ApiService,
		private _stringSplitPipe: StringsplitPipe,
		private _uniquePipe: UniquePipe
	) {}

	onSubmit() {
		if (this.editForm.invalid) {
			return;
		}

		const title = this.formTitle?.value?.trim() ?? "";
		const description = this.formDescription?.value?.trim() ?? "";
		const body = this.formBody?.value?.trim() ?? "";
		const tagList = this._uniquePipe
			.transform(this._stringSplitPipe.transform(this.formTags?.value))
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		this.api.createArticle({ title, description, body, tagList }).subscribe({
			error: (err) => {
				console.warn("create article error", err);
			},
			next: (val) => {
				this.router.navigate(["/articles"]);
			},
		});
	}
}
