class Modal {
    modal
    
    constructor(modal) {
        this.modal = modal
    }

    hide(eventId) {
        // if (eventId == "project-modal-container" || eventId == "project-modal-close" || eventId == "project-modal-close-icon") {
            this.modal.classList.replace("grid", "hidden")
        // } 
    }
    
    show(){
        this.modal.classList.replace("hidden", "grid")
    }
}

const modalClose = document.getElementById("project-modal-close")
const projectModalContainer = document.getElementById("project-modal-container")
const projectModalButton = document.getElementById("modif-projet")
const modal = new Modal(projectModalContainer)

const modalCloseAddPhoto = document.getElementById("project-modal-add-photo-close")
const projectModalContainerAddPhoto = document.getElementById("project-modal-add-photo-container")
const projectModalButtonAddPhoto = document.getElementById("add-photo")
const modalAddPhoto = new Modal(projectModalContainerAddPhoto)

projectModalButton.addEventListener("click", () => {
    modal.show()
})
modalClose.addEventListener("click", (event) => {
    modal.hide(event.target.id)
})
// projectModalContainer.addEventListener("click", (event) => {
//     modal.hide(event.target.id)
// })

projectModalButtonAddPhoto.addEventListener("click", (event) => {
    modalAddPhoto.show()
    modal.hide(event.target.id)
})
modalCloseAddPhoto.addEventListener("click", (event) => {
    modalAddPhoto.hide(event.target.id)
})
// projectModalContainerAddPhoto.addEventListener("click", (event) => {
//     modalAddPhoto.hide(event.target.id)
// })

let imgPreviewPhoto = document.getElementById("previewPhoto")
let photoUrl = document.getElementById("photoUrl")
photoUrl.addEventListener("change", (event) => {
    const [file] = photoUrl.files
    if(file){
        imgPreviewPhoto.src = URL.createObjectURL(file)
    }
})

window.addEventListener("load", async function() {
    let modalBody = document.getElementById("modal-body");

    let works = await fetch("http://localhost:5678/api/works")
    .then(function(response) {
        return response.json();
    });

    works.map(work => {
        let figure = document.createElement("figure")
        let image = document.createElement("img")
        let figcaption = document.createElement("figcaption")
        
        image.src = work.imageUrl
        image.alt = work.title
        image.id = work.id

        let removeButton = document.createElement("div")
        removeButton.setAttribute("id", "remove-"+image.id)

        let trashIcon = document.createElement("i")
        trashIcon.setAttribute("class", "fa-solid fa-trash-can")

        removeButton.addEventListener("click", async function(){
            let token = localStorage.getItem("token");
            let response = await fetch("http://localhost:5678/api/works/"+image.id,
            {
                method: "DELETE",
                _headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                get headers() {
                    return this._headers
                },
                set headers(value) {
                    this._headers = value
                },
            }
        )
        .then(function(response){
            if(response.status == "201")
            location.reload();
        })
            figure.remove();
        
        })
        
        figcaption.innerText = "éditer"
        
        modalBody.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(removeButton)
        removeButton.appendChild(trashIcon)
        figure.appendChild(figcaption)
    })

    let selectCategories = document.getElementById("photoCategory")

    let categories = await fetch("http://localhost:5678/api/categories")
    .then(function(response){
        return response.json();
    })

    categories.map((category) => {
        const optionCat = document.createElement("option");
        optionCat.value = category.id;
        optionCat.text = category.name;

        selectCategories.appendChild(optionCat);
    })
})

function validateFileType(){
    var fileName = document.getElementById("photoUrl").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
        return true;
    }else{
        alert("Only jpg/jpeg and png files are allowed!");
    }   
}

const formPhoto = document.getElementById("form-add-photo");
formPhoto.addEventListener("submit", function(event){
    console.log("submitted");
    event.preventDefault();
    submitForm();
})
async function submitForm(){
    let photoUrl = document.getElementById("photoUrl");
    let token = localStorage.getItem("token");
    let title = document.getElementById("photoTitle").value;
    let category = document.getElementById("photoCategory").value;
    const file = photoUrl.files[0];

    let formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);
    if(file){
        let response = await fetch("http://localhost:5678/api/works",
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            }
        )
        .then(function(response){
            if(response.status == "201")
            location.reload();
        })
    }
}
