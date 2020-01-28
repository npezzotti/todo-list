export const signup = user => {
    return fetch('/auth/signup', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
    return fetch('/auth/signin', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
};

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else return false;
};

export const signout = (next) => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch("/auth/signout", {
        method: "GET"

    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
};

export const updateUser = (user, next) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            console.log(auth)
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth));
            next();
        };
    };
}

export const forgotPassword = email => {
    console.log("email: ", email)
    return fetch("/auth/forgot-password", {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        console.log("forgot password response: ", response)
        return response.json()
    })
    .catch(error => { console.log(error) })

}

export const resetPassword = resetInfo => {
    return fetch("/auth/reset-password", {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
}