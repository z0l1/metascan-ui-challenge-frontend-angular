import { Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { AuthService } from "../services/auth.service";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [NgIf],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {
	constructor(private authService: AuthService) {}

	get isLoggedIn() {
		return this.authService.isLoggedIn;
	}

	get userName() {
		return this.authService.getUser()?.username;
	}
}
