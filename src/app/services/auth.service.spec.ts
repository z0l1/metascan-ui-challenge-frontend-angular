import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { ApiService } from "./api.service";
import { AuthUser } from "../models/user.type";

describe("AuthService", () => {
	let service: AuthService;
	let apiServiceSpy: jasmine.SpyObj<ApiService>;
	const mockUser: AuthUser = {
		id: 1,
		email: "asdasd@gmail.com",
		username: "asdasd",
		bio: "",
		image: "",
		token: "token123",
	};

	beforeEach(() => {
		const spy = jasmine.createSpyObj("ApiService", ["someMethod"]);

		TestBed.configureTestingModule({
			providers: [AuthService, { provide: ApiService, useValue: spy }],
		});
		service = TestBed.inject(AuthService);
		apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

		localStorage.clear();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should correctly load initial user from localStorage", () => {
		localStorage.setItem("currentUser", JSON.stringify(mockUser));
		service = TestBed.inject(AuthService);

		expect(service.getUser()).toEqual(mockUser);
	});

	it("should handle setting and clearing a user correctly", () => {
		service.setUser(mockUser);
		expect(service.getUser()).toEqual(mockUser);
		expect(localStorage.getItem("currentUser")).toEqual(JSON.stringify(mockUser));
		expect(localStorage.getItem("currentToken")).toEqual(mockUser.token);

		service.clearUser();
		expect(service.getUser()).toBeNull();
		expect(localStorage.getItem("currentUser")).toBeNull();
		expect(localStorage.getItem("currentToken")).toBeNull();
	});

	it("isLoggedIn should return true when user is set", () => {
		service.setUser(mockUser);
		expect(service.isLoggedIn).toBeTrue();
	});

	it("isLoggedIn should return false when user is cleared", () => {
		service.clearUser();
		expect(service.isLoggedIn).toBeFalse();
	});

	it("should return the correct token when user is set", () => {
		service.setUser(mockUser);
		expect(service.getToken()).toEqual("token123");
	});

	it("should return null as token when user is cleared", () => {
		service.clearUser();
		expect(service.getToken()).toBeNull();
	});
});
