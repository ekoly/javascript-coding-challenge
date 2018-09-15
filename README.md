# Simple HTTP server

## Good-to-know before getting started

- No restriction on the use of any third party NPM packages.
- ES2015+ is preferable.
- Writing callback functions is old school. You should try using `Promises`, `async...await`, etc.
- Code formatting will be assessed as we value clean quality code.
- Comments do help sometimes to help others to understand your implementation.

## How to submit

1. You are required to have a [Bitbucket][bitbucket-url] to submission the coding test. Go create one if you haven't already.
2. Then, create a privte repo to host the assignment and commit all the changes to that repo. **Do note that you need commit the whole untouched project first (also known as `initial commit`) right after you do a cloning from the original private repo, this ensures that we can assess your submission based on the changes you committed to your own private repo. See [NEED_HELP_IN_GIT.md][need-help-in-git-url] if you don't know how to `git`.**
3. Grant access to the following individuals to assess your submission once you're done:

- jessica.spokoyny@zumata.com
- weijin.ho@zumata.com

1. Thank you and happy coding. :tada:

## Technical Challenges

1. `POST /data` is a simple endpoint that accepts a request paramter `uid` and returns any user data whose `id` matches the value of `uid`. Refactor `uid` so that it can accept an array of strings and return multiple user data.

### Single valued `uid`

```http
POST /data?uid=10

{
  "id": 10
  "message": "Aloha",
}
```

### Comma delimited `uid`s

```http
POST /data?uid=10,20,30

[
  { "id": 10, "message": "Aloha" },
  { "id": 20, "message": "Hello, World!" },
  { "id": 30, "message": "Bonjour" }
]
```

### Comma delimited `uid`s with whitespaces

_** Note that whitespace may present after a comma._

```http
POST /data?uid=20, 30

[
  { "id": 20, "message": "Hello, World!" },
  { "id": 30, "message": "Bonjour" }
]
```

1. Create a new endpoint named `GET /form` to render a HTML form that contains the following fields:

    ```js
    {
      firstName: 'Cash'
      lastName: 'Black'
      dob: '1989-03-03',
      email: 'cash.black@email.com',
      gender: 'male', // Possible values: male, female
      _csrf: '<UUID>', // This should be a UUID-based token.
    }
    ```

    A standard HTML form should always render with a [CSRF token][csrf-token-url] to prevent CSRF attacks.

2. Create a new endpoint for form submission named `POST /form-submission` when the user chooses to submit a filled form which can be accessed from `GET /form`. User should receive a message after the form submisison.

    _**Do note that is the form submission is not done via AJAX or `fetch`.**_

    - POST HTML form with the following `Content-Type`

      ```http
      POST /form-submission

      Host: example.com
      Content-Type: application/x-www-form-urlencoded
      Content-Length: 99

      firstName=Cash&lastName=Black&...

      ```

    - Success message after form submission

      ```txt
      Form submitted successfully
      ```

    This aims to test candidate's ability to retrieve the form data from all the fields in a submitted form.

3. `POST /mocky-api` is completely written using idomatic ES5 syntax. Do a refactoring on the API so that it uses the latest and greatest of ES2015+ features for the sake of readability.

## Good luck! :smile:

[csrf-token-url]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
[bitbucket-url]: https://bitbucket.org/
[need-help-in-git-url]: /NEED_HELP_IN_GIT.md
