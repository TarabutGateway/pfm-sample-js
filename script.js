'use strict';
// Here, "Token" comes from https://web-app.sandbox.token.io/token.js :
Token.styleButton({            // Sets up the Link with Token button
    id: 'tokenAccessBtn',
    label: 'Link with Token'
}).bindAccessButton(
    {
        alias: {
            type: 'EMAIL',
            value: '{alias}'        // address filled in by server.js
        },
        resources: [ // the button asks for permission to:
            { type: Token.RESOURCE_TYPE_ALL_ACCOUNTS }, // get list of accounts
            { type: Token.RESOURCE_TYPE_ALL_BALANCES }, // get balance of each account
        ]
    },
    function(data) { // success, have access token
        console.log('success callback got ' + JSON.stringify(data));
        if (data.tokenId) {
            $.post('/use-access-token', {tokenId: data.tokenId}); // pass token id to server.js code
        }
    },
    function(error) { // fail
        alert('Something\'s wrong! ' + error);
    }
);
