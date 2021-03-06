var express = require('express');
var router = express.Router();
const wreck = require('wreck');

var gateway_url = 'https://test-move.aa-aws-relay.com';

var authorization_code_client_id = 'b7f197f5';
var authorization_code_client_secret = '84649743be62a42e0a72e1afd3a88b83';
var authorization_code_redirect_url = 'http%3A%2F%2Flocalhost%3A3008%2FoauthCallback';


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Authorization_code example', gtw_url: gateway_url, client_id: authorization_code_client_id, authorization_code_redirect_url: authorization_code_redirect_url });
});

router.get('/oauthCallback', function(req, res) {

    const basic_auth = new Buffer(authorization_code_client_id + ':' + authorization_code_client_secret).toString('base64');
    if (req.query.error) {
        res.render('callback', { title: 'Callback', error: 'Something BAD happened while retrieving the auth code: ' + req.query.error });
        return;
    }

    const authCode = req.query.code;
    const url = gateway_url + '/auth/v1/token';
    const body = 'grant_type=authorization_code&code=' + authCode + '&redirect_uri=' + authorization_code_redirect_url;
    const option = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + basic_auth
        },
        payload: body,
        timeout: 50000,
        json: true
    };

    return wreck.post(url, option, (err, resp, payload) => {

        if (err) {
            res.render('callback', { title: 'Callback', tokenResponse: 'null', error: 'Something BAD happened while converting the auth code into a token: ' + JSON.stringify(err) });
            return;
        }

        if (resp.statusCode >= 400) {
            res.render('callback', { title: 'Callback', tokenResponse: 'null', error: 'Something BAD happened while converting the auth code into a token: ' + JSON.stringify(payload) });
            return;
        }

        res.render('callback', { title: 'Callback', code: authCode, tokenResponse: JSON.stringify(payload) });
    });


});

module.exports = router;
