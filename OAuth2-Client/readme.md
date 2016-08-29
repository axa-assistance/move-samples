# oAuth2 Example Application

This example application demonstrates how to use the authorization and resource
owner credentials grants.

## Prerequisites

-   Install [nodejs](https://nodejs.org/en/), version 4.*.
-   Download dependencies: open the console. Go to the project folder and run:
```bash
npm install
```
-   Make sure to have internet access without a proxy.

## Description of the code

### routes/index.js:

Is the code that runs server side when an endpoint is hit. You can leave this
file as is, or change the client_ids and secret for your own ones. You can also
change the preconfigured callback url.

### views/index.hbs:

In this simple page, you can see how an api can be called from javascript once
the access_token obtained.

## Run the application

Run the application:
```bash
npm start
```

## Use the application

Open a browser and navigate to: http://localhost:3008. The main page will be
displayed. If you click on "login with ROC", you will be presented with a
custom login page. This page is developed in the client app, in the file
roc_login.hbs.
Once you enter the credentials, for example: johndoe/myComplexPsw!1, you will
get an access token (JWT). You can click on it to see its unencoded content.
With this token, you are now able to make api calls directly from javascript.
You can try this by clicking on the "GET '/travel/v1/countries'" button.
