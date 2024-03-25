export type User = {
	id: number;
	username: string;
	email: string;
	bio: string;
	image: string;
};

export type AuthUser = User & {
	token: string;
};
