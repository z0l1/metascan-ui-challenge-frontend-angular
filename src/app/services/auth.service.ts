import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthUser } from "../models/user.type";
import { ApiService } from "./api.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private api: ApiService) {
		this.loadInitialUser();
	}

	private currentUserSubject: BehaviorSubject<AuthUser | null> =
		new BehaviorSubject<AuthUser | null>(null);

	private USER_KEY = "currentUser";
	private TOKEN_KEY = "currentToken";

	private loadInitialUser() {
		const savedUser = localStorage.getItem(this.USER_KEY);
		if (savedUser === null) {
			this.currentUserSubject.next(null);
			return;
		}

		const parsedUser = JSON.parse(savedUser);
		if (!parsedUser) {
			this.currentUserSubject.next(null);
			return;
		}

		this.currentUserSubject.next(parsedUser as AuthUser);
	}

	get isLoggedIn() {
		return this.getUser() !== null;
	}

	getUser() {
		return this.currentUserSubject.value;
	}

	setUser(user: AuthUser) {
		localStorage.setItem(this.USER_KEY, JSON.stringify(user));
		localStorage.setItem(this.TOKEN_KEY, user.token);
		this.currentUserSubject.next(user);
	}

	clearUser() {
		localStorage.removeItem(this.USER_KEY);
		localStorage.removeItem(this.TOKEN_KEY);
		this.currentUserSubject.next(null);
	}

	getUserObservable() {
		return this.currentUserSubject.asObservable();
	}

	getToken() {
		return this.currentUserSubject.value?.token ?? null;
	}
}
