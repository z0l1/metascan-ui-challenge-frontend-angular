import { Component } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, RouterLink, HttpClientModule, NgIf],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	title = "metascan-ui-challenge-frontend";
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	get isLoggedIn() {
		return this.authService.isLoggedIn;
	}

	get currentUser() {
		return this.authService.getUser();
	}

	logout() {
		this.authService.clearUser();
		this.router.navigate(["/auth/login"]);
	}
}
