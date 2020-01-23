export const signup = user => {
    return fetch('http://localhost:3001/signup', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
        .then(response => {
            return response.json
        })
        .catch(error => console.log(error))
    });
};