import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, RouterOutlet, NgIf],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent {
	constructor(
		private api: ApiService,
		private authService: AuthService,
		private router: Router
	) {}

	serverError: null | string = null;

	registerForm = new FormGroup({
		username: new FormControl("", [Validators.required, Validators.minLength(5)]),
		email: new FormControl("", [
			Validators.required,
			Validators.email,
			Validators.minLength(5),
		]),
		password: new FormControl("", [Validators.required, Validators.minLength(8)]),
	});

	get formUsername() {
		return this.registerForm.get("username");
	}

	get formEmail() {
		return this.registerForm.get("email");
	}

	get formPassword() {
		return this.registerForm.get("password");
	}

	onSubmit() {
		if (this.registerForm.invalid) {
			return;
		}

		const username = this.formUsername?.value?.trim() ?? "";
		const email = this.formEmail?.value?.trim() ?? "";
		const password = this.formPassword?.value ?? "";

		this.api.register(username, email, password).subscribe({
			error: (err: HttpErrorResponse) => {
				console.warn(err);

				if (err.status === 401) {
					this.serverError = "Invalid credentials";
				} else if (err.status === 400) {
					if (err.error?.errors === undefined) {
						this.serverError = err.message ?? "Unknown request error";
						return;
					}

					const errors = Object.values(err.error?.errors ?? {});
					// const errorKeys = Object.keys(errors);
					// const formattedErrors = errorKeys.map((key) => `${key}: ${errors[key]}`);
					// this.serverError = `${err.error?.message}\n${formattedErrors.join("\n")}`;

					this.serverError = `${err.error?.message}\n${errors.join("\n")}`;
				} else {
					this.serverError = `${err.status}: ${err.message}`;
				}
			},
			next: (value) => {
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
