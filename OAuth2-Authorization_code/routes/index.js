var express = require('express');
var router = express.Router();
const wreck = require('wreck');

var config = {};

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/build', function(req, res) {
    config = req.body;
    res.send(200);
});

router.get(/.*callback$/, function(req, res) {

    const basic_auth = new Buffer(config.client_id + ':' + config.client_secret).toString('base64');
    if (req.query.error) {
        res.render('callback', { title: 'Callback', error: 'Something BAD happened while retrieving the auth code: ' + req.query.error });
        return;
    }

    const authCode = req.query.code;
    const url = config.gateway_url + '/token';
    const body = 'grant_type=authorization_code&code=' + authCode + '&redirect_uri=' + config.redirect_url;
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
            res.render('callback', { title: 'Callback', tokenResponse: 'null', error: '5xx - Something BAD happened while converting the auth code into a token: ' + JSON.stringify(err) });
            return;
        }

        if (resp.statusCode >= 400) {
            res.render('callback', { title: 'Callback', tokenResponse: 'null', error: '4xx - Something BAD happened while converting the auth code into a token: ' + JSON.stringify(payload) });
            return;
        }

        res.render('callback', { title: 'Callback', code: authCode, tokenResponse: JSON.stringify(payload) });
    });


});

module.exports = router;
