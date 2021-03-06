# oAuth2 Example Application

This example application demonstrates how to use the authorization code grant.

## Prerequisites

-   Install [nodejs](https://nodejs.org/en/), version 4.*
-   Clone this repository
```bash
git clone https://github.com/axa-assistance/move-samples.git
```
-   Download dependencies
```bash
cd move-samples
cd OAuth2-Authorization_code
npm install
```

## Description of the code

### routes/index.js:

This is the code that runs server side when an endpoint is accessed.
You can leave this file as is, or change the client_id and secret by
your own ones. You can also change the preconfigured callback url (this
is the `authorization_code_redirect_url` variable at the top of the file).

### views/index.hbs:

In this simple page, you can see how an api can be called from JavaScript
once the access token has been obtained.

## Run the application

-   Run the application
```bash
npm start
```
-   Browse to [http://localhost:3008/](http://localhost:3008/)

## Use the application

Once the main page is rendered, you can click on "Log in using
authorization_code grant".
You will be presented with a login page. This page is not hosted by the client
application, thus, the client application will not have access to the user
credentials.

Once you enter the credentials, for example: `johndoe`/`myComplexPsw!1`, you
will get redirected to 'http://localhost:3008/oauthCallback' with an
authorization code, which is then transformed into an access token by calling
the token endpoint. You can take a look at index.js oauthcallback route action.
The access token obtained afterwards is actually a JSON Web Token (JWT). You
can see it decoded by copy/pasting it at [jwt.io](https://jwt.io/).

For convenience, you can also click on it to see its unencoded content
directly.

With this token, you will now able to make api calls directly from JavaScript.
You can try this by clicking on the "GET '/travel/v1/countries'" button.
