import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./list/list.component").then((comp) => comp.ListComponent),
	},
	{
		path: "me",
		loadComponent: () => import("./me/me.component").then((comp) => comp.MeComponent),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRoutingModule {}
