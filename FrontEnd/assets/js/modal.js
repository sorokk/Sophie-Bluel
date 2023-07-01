class Modal {
    modal
    
    constructor(modal) {
        this.modal = modal
    }

    hide(eventId) {
        if (eventId == "project-modal-container" || eventId == "project-modal-close" || eventId == "project-modal-close-icon") {
            this.modal.classList.replace("grid", "hidden")
        } 
    }
    
    show(){
        this.modal.classList.replace("hidden", "grid")
    }
}

const modalClose = document.getElementById("project-modal-close")
const projectModalContainer = document.getElementById("project-modal-container")
const projectModalButton = document.getElementById("modif-projet")
const modal = new Modal(projectModalContainer)

projectModalButton.addEventListener("click", () => {
    modal.show()
})
modalClose.addEventListener("click", (event) => {
    modal.hide(event.target.id)
})
projectModalContainer.addEventListener("click", (event) => {
    modal.hide(event.target.id)
})

window.addEventListener("load", async function() {
    let modalBody = document.getElementById("modal-body");

    console.log(modalBody);

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

        removeButton.addEventListener("click", function(){
            figure.remove();
        })
        
        figcaption.innerText = "éditer"
        
        modalBody.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(removeButton)
        removeButton.appendChild(trashIcon)
        figure.appendChild(figcaption)
    })

})

// ///////////////////////// Générer photo modale /////////////////////////////
// function genererPhotosModal(photosModal) {
//     for (let i = 0; i < photosModal.length; i++) {
//       const article = photosModal[i];
  
//       const sectionGallery = document.querySelector(".gallery");
  
//       const articleElement = document.createElement("article");
//       articleElement.classList.add("img");
//       articleElement.dataset.id = [i];
  
//       const idElement = document.createElement("p");
//       idElement.innerText = article.id;
  
//       const titleElement = document.createElement("p");
//       titleElement.innerText = "editer";
//     }}


// ////////////////////////// Ajout de l'icône supprimer /////////////////

// const iconeElement = document.createElement("div");
// iconeElement.classList.add("deletePhoto");
// iconeElement.innerHTML =
//   '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';

// const imageElement = document.createElement("img");
// imageElement.src = article.imageUrl;

// const categoryIdElement = document.createElement("p");
// categoryIdElement.innerText = article.categoryId;

// ////////////////////////// Ajout des balises ////////////////
// articleElement.appendChild(imageElement);
// articleElement.appendChild(titleElement);
// articleElement.appendChild(iconeElement);

// //////////////////////////////////////////////////////////////////

// //Ajout de articleElement dans sectionGallery

// sectionGallery.appendChild(articleElement);

// /////////// Suppression photo /////////////

// iconeElement.addEventListener("click", async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const iconeElement = article.id;
//     let monToken = localStorage.getItem("token");
//     console.log(iconeElement);
//     let response = await fetch(
//       `http://localhost:5678/api/works/${iconeElement}`,
//       {
//         method: "DELETE",
//         headers: {
//           accept: "*/*",
//           Authorization: `Bearer ${monToken}`,
//         },
//       }
//     );
//     if (response.ok) {
//       return false;

//     } else {
//       alert("Echec de suppression");
//     }
//   });

//   /////////////////////////////////////////////
