import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	if (typeof window !== "undefined") {
		const token = window.localStorage.getItem("currentToken");
		if (token !== null) {
			const authReq = req.clone({
				headers: req.headers.set("Authorization", `Bearer ${token}`),
			});

			return next(authReq);
		}
	}

	return next(req);
};
