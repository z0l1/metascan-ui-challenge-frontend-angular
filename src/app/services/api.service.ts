import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, AuthUser } from "../models/user.type";
import { Article, ArticleDto } from "../models/article.type";

type GetArticlesResponse = {
	articles: ArticleDto[];
	articlesCount: number;
};

type GetArticleResponse = {
	article: ArticleDto;
};

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private httpClient: HttpClient) {}

	private API_BASE_URL = "http://localhost:3000";

	private apiUrl(path: string) {
		return `${this.API_BASE_URL}${path}`;
	}

	login(email: string, password: string) {
		const body = { email, password };
		return this.httpClient.post<{ user?: AuthUser }>(this.apiUrl("/api/login"), body, {});
	}

	register(username: string, email: string, password: string) {
		const body = {
			username,
			email,
			password,
		};
		return this.httpClient.post<{ user?: AuthUser }>(this.apiUrl("/api/users"), body);
	}

	getUsers() {
		return this.httpClient.get<User[]>(this.apiUrl("/api/users"));
	}

	updateUser(user: Partial<User>) {
		return this.httpClient.put<User>(this.apiUrl("/api/user"), user);
	}

	deleteUser(email: string) {
		return this.httpClient.delete<User>(this.apiUrl(`/api/users/${email}`));
	}

	createArticle(body: Article) {
		return this.httpClient.post<ArticleDto>(this.apiUrl(`/api/articles`), body);
	}

	getArticles() {
		return this.httpClient.get<GetArticlesResponse>(this.apiUrl(`/api/articles`));
	}

	getArticle(slug: string) {
		return this.httpClient.get<GetArticleResponse>(this.apiUrl(`/api/articles/${slug}`));
	}

	updateArticle(slug: string, body: Article) {
		return this.httpClient.put<ArticleDto>(this.apiUrl(`/api/articles/${slug}`), body);
	}

	deleteArticle(slug: string) {
		return this.httpClient.delete<{ raw: any[]; affected: number }>(
			this.apiUrl(`/api/articles/${slug}`)
		);
	}
}
