import axios from 'axios';

export function postUser(user) {
    axios.post('/api/users', {
        data: user
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}