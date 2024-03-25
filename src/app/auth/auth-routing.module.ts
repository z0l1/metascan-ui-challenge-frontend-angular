import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "login",
		loadComponent: () => import("./login/login.component").then((comp) => comp.LoginComponent),
	},

	{
		path: "register",
		loadComponent: () =>
			import("./register/register.component").then((comp) => comp.RegisterComponent),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
