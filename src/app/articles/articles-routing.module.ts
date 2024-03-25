import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./list/list.component").then((comp) => comp.ListComponent),
	},
	{
		path: "new",
		loadComponent: () =>
			import("./create/create.component").then((comp) => comp.CreateComponent),
	},
	{
		path: ":slug",
		loadComponent: () => import("./edit/edit.component").then((comp) => comp.EditComponent),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ArticlesRoutingModule {}
