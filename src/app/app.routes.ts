import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("./auth/auth.module").then((mod) => mod.AuthModule),
	},

	{
		path: "users",
		loadChildren: () => import("./users/users.module").then((mod) => mod.UsersModule),
		canActivateChild: [authGuard],
	},

	{
		path: "articles",
		loadChildren: () => import("./articles/articles.module").then((mod) => mod.ArticlesModule),
		canActivateChild: [authGuard],
	},

	{
		path: "",
		loadComponent: () => import("./home/home.component").then((comp) => comp.HomeComponent),
	},
];
