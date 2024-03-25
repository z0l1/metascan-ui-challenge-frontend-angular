import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, RouterOutlet, NgIf],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	public constructor(
		private authService: AuthService,
		private api: ApiService,
		private router: Router
	) {}

	serverError: null | string = null;

	pending: boolean = false;

	loginForm = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),
	});

	get formEmail() {
		return this.loginForm.get("email");
	}

	get formPassword() {
		return this.loginForm.get("password");
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}

		this.pending = true;

		const email = this.formEmail?.value?.trim() ?? "";
		const password = this.formPassword?.value ?? "";

		this.api.login(email, password).subscribe({
			error: (err: HttpErrorResponse) => {
				this.pending = false;

				console.warn(err);
				if (err.status === 401) {
					this.serverError = "Invalid credentials";
				} else if (err.status === 400) {
					this.serverError = "Input format error";
				} else {
					this.serverError = `${err.status}: ${err.message}`;
				}
			},
			next: (value) => {
				this.pending = false;

				if (!value.user) {
					console.warn("no user data");
					this.serverError = "unknown error";
					return;
				}

				this.authService.setUser(value.user);
				this.router.navigate(["/"]);
			},
		});
	}
}
