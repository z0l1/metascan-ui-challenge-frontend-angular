import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { User } from "../../models/user.type";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-me",
	standalone: true,
	imports: [NgIf, ReactiveFormsModule, NgOptimizedImage],
	templateUrl: "./me.component.html",
	styleUrl: "./me.component.scss",
})
export class MeComponent {
	constructor(
		private authService: AuthService,
		private api: ApiService
		// , private router: Router
	) {}

	serverError: string | null = null;
	serverMessage: string | null = null;

	updateForm = new FormGroup({
		username: new FormControl(this.user?.username, [
			Validators.required,
			Validators.minLength(5),
		]),

		email: new FormControl(this.user?.email, [
			Validators.required,
			Validators.email,
			Validators.minLength(5),
		]),

		bio: new FormControl(this.user?.bio),
		image: new FormControl(this.user?.image),
	});

	get formUsername() {
		return this.updateForm.get("username");
	}
	get formEmail() {
		return this.updateForm.get("email");
	}
	get formBio() {
		return this.updateForm.get("bio");
	}
	get formImage() {
		return this.updateForm.get("image");
	}

	get user() {
		return this.authService.getUser();
	}

	onSubmit() {
		if (this.updateForm.invalid) {
			return;
		}

		const user: Partial<User> = {
			id: this.authService.getUser()?.id,
			image: this.formImage?.value ?? undefined,
			bio: this.formBio?.value ?? undefined,
			username: this.formUsername?.value ?? undefined,
			email: this.formEmail?.value ?? undefined,
		};

		this.api.updateUser(user).subscribe({
			error: (err: HttpErrorResponse) => {
				console.warn(err);
				this.serverError = err.message;
			},
			next: (val) => {
				const { id, ...newUser } = val;
				this.updateForm.setValue(newUser);
				this.authService.setUser({
					id,
					token: this.authService.getToken() ?? "",
					...newUser,
				});

				this.updateForm.markAsPristine();

				this.serverMessage = "update successful :)";
				// probably should unregister this, but wont
				setTimeout(() => {
					this.serverMessage = null;
				}, 5 * 1000);
			},
		});
	}
}
