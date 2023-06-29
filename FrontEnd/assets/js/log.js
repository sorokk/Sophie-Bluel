class User {
    
    async login(email, password) {
        try {
            let data = await this._getToken(email, password);
            
            if (this._isValid(data)) {
                localStorage.setItem("token", data.token);
                location.href = "index_log.html";
            } else {
                const errDiv = document.getElementById("errDiv");
                errDiv.innerHTML = "Email ou mot de passe incorrect";
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    logout() {
        localStorage.removeItem('token');
        location.href = "index.html";
        console.log("coucou");
    }
    
    async _getToken(email, password) {
        let response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "password": password })
    });
    
    let data = await response.json();
    
    return data;
}

_isValid(data) {
    return data.token;
}

}

window.addEventListener("load", function() {
    if(localStorage.getItem("token") && location.href.split("/").slice(-1) != "index_log.html"){
        location.href = "index_log.html";
    }
})

const form = document.getElementById("login-form");
const user = new User;


if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("mdp").value;
        user.login(email, password);
    });
}

const logoutLink = document.getElementById("logout-link");
console.log(logoutLink);

if (logoutLink) { 
    logoutLink.addEventListener("click", function() {
        user.logout();
    })
}

const forgetPasswordButton = document.getElementById("forget-password_button");

if (forgetPasswordButton) {
    forgetPasswordButton.addEventListener("click", function() {
        let recoveryEmail = prompt("Veuillez entrer votre email.")

        if (recoveryEmail == "sophie.bluel@test.tld") {
            window.open('mailto:sophie.bluel@test.tld?subject=Votre mot de passe&body=Voici votre mot de passe: S0phie');
        }
    })
}