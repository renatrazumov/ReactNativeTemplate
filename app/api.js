/**
 * Created by saionara1 on 6/21/17.
 */
import Base64 from "./utils/Base64";
import consts from "./const";

// work with api goes here

export function getRepositories(token, page, limit) {
    console.log(page);
    return fetch('https://api.github.com/user/repos?access_token=' + token + '&page=' + page + '&per_page=' + limit, {
        method: 'GET',
        headers: consts.BASE_HEADER
    }).then((list) => {
        return list.json()
    })
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function getAccessToken(username, password) {
    baseString = Base64.btoa(username + ':' + password).replace('\n', '\\n');
    return fetch('https://api.github.com/authorizations/clients/' + consts.CLIENT_ID, {
        method: 'PUT',
        headers: {
            ...consts.BASE_HEADER,
            "Authorization": "Basic " + baseString
        },
        body: JSON.stringify({
            client_secret: consts.CLIENT_SECRET,
        })
    }).then((user) => {
        return user.json()
    })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function logOut(authorizationId) {
    return fetch(`https://api.github.com/authorizations/${authorizationId}`, {
        method: 'DELETE',
        headers: {
            ...consts.BASE_HEADER
            //   "Authorization": "Basic " + baseString
        }
    }).then((user) => {
        return user.json()
    })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}