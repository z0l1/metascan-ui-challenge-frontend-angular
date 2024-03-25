## This is the Frontend solution for the metascan ui challenge backend

### Personal setup

- prettier (with my config)
- tailwind

### Notes

- for this small application for simplicity's sake I will be using a single `ApiService` but of course in a more complex application it could be broken down into smaller services like `[ApiAuthService, ApiArticleService, ApiUserService]`
- also I should have prepared the input values inside the ApiService (things like trimming)

### Things I have done

- I have set up an authentication service and an authentication interceptor that inserts the Bearer token into the request header if the client is authenticated
- All forms are created with Angular's Reactive forms and are validated on the frontend using Angular's built-in Validators.
- Backend errors are also displayed on auth forms (login and register) but not on Article forms.
  This is by design because:
  - Article routes only have 401, 404 errors
  - the 401s are irrelevant because the routes you can edit them on are protected
  - the 404s are irrelevant because if the article is first loaded and displays a 404 page therefore cannot be edited.
- Articles are CRUD-able
- Users are CRUD-able (user cannot delete itself)
- Tested
  - the AuthService
  - the Stringsplit pipe I use for parsing the tags (should have trimmed inside stringsplit in hindsight, because why would I want to return a non-trimmed string array)
  - the Register Component

### Things I have not done

- I have not tested most components
- I have not used SCSS (I used tailwind instead)
- I definitely have not mastered Angular but have gained a deeper inside knowledge during the project
- I just realised typing the 'how to run' section that I did not prepare the application to display error when API cannot be reached
- I did not implement sorting loaded articles by tags (probably will do)

### How to run

the application expects the api base url to be http://localhost:3000

after cloning, run:


- `git clone https://github.com/z0l1/metascan-ui-challenge-frontend-angular`
- `cd ./metascan-ui-challenge-frontend-angular`
- `npm ci`
- `ng serve`
