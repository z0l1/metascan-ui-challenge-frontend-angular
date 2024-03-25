export type Article = {
	title: string;
	description: string;
	body: string;
	tagList: string[];
};

export type ArticleDto = Article & {
	id: number;
	slug: string;
	created: 1711374980745;
	updated: 1711374980746;
	comments: string[];
	favoriteCount: number;
};
