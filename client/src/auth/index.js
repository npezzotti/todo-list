export const signup = user => {
    return fetch('/api/v1/auth/signup', {
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
    return fetch('api/v1/auth/signin', {
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
    return fetch("/api/v1/auth/signout", {
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
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth));
            next();
        };
    };
}

export const forgotPassword = email => {
    return fetch("/api/v1/auth/forgot-password", {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        return response.json()
    })
    .catch(error => { console.log(error) })

}

export const resetPassword = resetInfo => {
    return fetch("/api/v1/auth/reset-password", {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
}