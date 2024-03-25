import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.type";
import { ApiService } from "../../services/api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StringsplitPipe } from "../../pipes/stringsplit.pipe";
import { UniquePipe } from "../../pipes/unique.pipe";

@Component({
	selector: "app-list",
	standalone: true,
	imports: [NgIf, NgForOf, RouterLink],
	templateUrl: "./list.component.html",
	styleUrl: "./list.component.scss",
})
export class ListComponent implements OnInit {
	users: User[] = [];
	usersLoading: boolean = true;

	constructor(
		private api: ApiService,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.api.getUsers().subscribe({
			error: (err: HttpErrorResponse) => {
				console.warn(err);
				this.usersLoading = false;
			},
			next: (val) => {
				this.users = val.filter((u) => u.email !== this.authService.getUser()?.email);
				this.usersLoading = false;
			},
		});
	}

	deleteUser(email: string, username: string) {
		const res = confirm(`Are you sure you want to delete '${username}'`);
		if (!res) {
			return;
		}

		this.api.deleteUser(email).subscribe({
			error: (err: HttpErrorResponse) => {
				console.warn(err);
				if (err.status === 400) {
					alert("how did you do it?");
				} else if (err.status === 401) {
					alert("not logged in! (?)");
				} else {
				}
			},
			next: (value) => {
				this.ngOnInit();
			},
		});
	}
}
