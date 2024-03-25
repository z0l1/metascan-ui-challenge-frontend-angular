import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);

	if (!authService.isLoggedIn) {
		return inject(Router).createUrlTree(["/auth/login"]);
	}

	return true;
};
