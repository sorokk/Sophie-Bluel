const form = document.getElementById("login-form");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;

    try {
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "password": password })
        });

        const data = await response.json();

        if(response.status == "200"){
            localStorage.setItem("token", data.token);
            location.href = "index_log.html";
        } else if(response.status == "404"){
            const errDiv = document.getElementById("errDiv");
            errDiv.innerHTML = "Email ou mot de passe incorrect";
        }
    } catch(error) {
        console.log(error);
    }
});

window.addEventListener("load", function() {
    if(localStorage.getItem("token")){
        location.href = "index_log.html";
    }
})