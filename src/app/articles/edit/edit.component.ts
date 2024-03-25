import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ArticleDto } from "../../models/article.type";
import { ApiService } from "../../services/api.service";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
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
	templateUrl: "./edit.component.html",
	styleUrl: "./edit.component.scss",
	providers: [StringsplitPipe, UniquePipe],
})
export class EditComponent implements OnInit {
	paramSub: Subscription | null = null;
	articleLoading: boolean = true;
	articleDto: ArticleDto | null = null;

	serverError: string | null = null;
	serverMessage: string | null = null;

	editForm = new FormGroup({
		title: new FormControl(this.articleDto?.title, [Validators.required]),
		body: new FormControl(this.articleDto?.body, [Validators.required]),
		description: new FormControl(this.articleDto?.body, [Validators.required]),
		tags: new FormControl(this.articleDto?.tagList.join(", ")),
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
		private route: ActivatedRoute,
		private router: Router,
		private api: ApiService,
		private _stringSplitPipe: StringsplitPipe,
		private _uniquePipe: UniquePipe
	) {
		this.editForm.disable();
	}

	toggleEditing() {
		if (this.editForm.disabled) {
			this.editForm.enable();
		} else {
			this.editForm.disable();
		}
	}

	ngOnInit(): void {
		this.paramSub = this.route.params.subscribe((params) => {
			const articleId = params["slug"];

			if (articleId === undefined) {
				this.articleLoading = false;
				return;
			}

			this.api.getArticle(articleId).subscribe({
				error: (err: HttpErrorResponse) => {
					this.articleLoading = false;
					console.warn(err);
					if (err.status === 401) {
						alert("not logged in");
					}
				},
				next: (val) => {
					this.articleLoading = false;
					this.articleDto = val.article;
					this.editForm.setValue({
						body: val.article.body,
						description: val.article.description,
						tags: val.article.tagList?.join(", "),
						title: val.article.title,
					});
				},
			});
		});
	}

	onSubmit() {
		if (this.editForm.invalid || this.editForm.disabled) {
			return;
		}

		const title = this.formTitle?.value?.trim() ?? "";
		const description = this.formDescription?.value?.trim() ?? "";
		const body = this.formBody?.value?.trim() ?? "";
		const tagList = this._uniquePipe
			.transform(this._stringSplitPipe.transform(this.formTags?.value))
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		this.api
			.updateArticle(this.articleDto?.slug ?? "", {
				title,
				description,
				body,
				tagList,
			})
			.subscribe({
				error: (err) => {
					this.articleLoading = false;
					console.warn("update article error", err);
				},
				next: (val) => {
					this.articleLoading = false;
					this.ngOnInit();

					this.editForm.markAsPristine();

					this.serverMessage = "update successful :)";
					// probably should unregister this, but wont
					setTimeout(() => {
						this.serverMessage = null;
					}, 5 * 1000);
				},
			});
	}

	deleteArticle(slug: string) {
		if (!confirm(`Are you sure you want to delete '${slug}?'`)) {
			return;
		}

		this.api.deleteArticle(slug).subscribe({
			error: (err: HttpErrorResponse) => {
				alert(err);
				this.serverError = `could not delete article\n${err.message}`;
			},
			next: (val) => {
				if (val.affected === 0) {
					this.serverError = "could not delete article";
				} else {
					this.router.navigate(["/articles"]);
				}
			},
		});
	}
}
