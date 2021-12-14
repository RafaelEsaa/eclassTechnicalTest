const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.listen(9000, function() {
    console.log('Server started on port 9000');
});


app.post('/login', function(req, res) {
    const code = req.body.code;

    var spotifyApi = new SpotifyWebApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI
    });

    spotifyApi.authorizationCodeGrant(code).then(({body}) => {
        spotifyApi.setAccessToken(body.access_token,);
        spotifyApi.setRefreshToken(body.refresh_token);
        return res.send({
            token: body.access_token,
            refreshToken: body.refresh_token,
            expiresIn: body.expires_in,
            scope: body.scope
        });
    })
    .catch((err) => {
        console.error('Something went wrong!', err);
    })
});

app.post('/search', function(req, res) {
    const data = req.body.data;
    const token = req.headers.authorization;

    var spotifyApi = new SpotifyWebApi({
        accessToken: token,
    });

    spotifyApi.searchTracks(data)
        .then(function({body}) {
            res.send(body)
        }, function(err) {
            console.error(err);
        });
})
