import { Component, OnInit } from "@angular/core";
import { ArticleDto } from "../../models/article.type";
import { ApiService } from "../../services/api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-list",
	standalone: true,
	imports: [NgIf, NgForOf, RouterLink, DatePipe],
	templateUrl: "./list.component.html",
	styleUrl: "./list.component.scss",
})
export class ListComponent implements OnInit {
	articles: ArticleDto[] = [];
	articlesCount: number = -1;
	articlesLoading: boolean = true;

	serverError: string | null = null;

	constructor(private api: ApiService) {}

	ngOnInit(): void {
		this.api.getArticles().subscribe({
			error: (err: HttpErrorResponse) => {
				console.warn(err);
				this.articlesLoading = false;
			},
			next: (val) => {
				this.articlesCount = val.articlesCount;
				this.articles = val.articles;
				this.articlesLoading = false;
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
					this.ngOnInit();
				}
			},
		});
	}
}
