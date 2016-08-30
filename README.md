# Using AXA Assistance APIs - samples

This repository is organized as follows:

-   OAuth2-ROPC: you want to access AXA Assistance APIs using the OAuth2
Resource Owner Password Credentials grant? Then this sample is the one for you!
Beware that it means your end-user will have to enter his username/password
directly in your application.

This grant type is suitable in cases where the resource owner has a trust
relationship with the client, such as the device operating system or a highly
privileged application.

-   OAuth2-Authorization_Code: you want to access AXA Assistance APIs using the
OAuth2 Authorization Code grant? Then this sample is the one for you!
With this grant, your end-user will be redirected to an AXA Assistance login
screen, hosted on AXA Assistance servers. AXA Assistance authorization server
will then redirect your end-user back to your application.

This grant type is a redirection-based flow. Thus, your application must be
capable of interacting with the resource owner's user-agent (typically a web
browser) and capable of receiving incoming requests (via redirection) from the
authorization server.
