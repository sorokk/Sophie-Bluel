class Modal {
    modal
    
    constructor(modal) {
        this.modal = modal
    }
    
    hide(eventId) {
        if (eventId == "project-modal-container" || eventId == "project-modal-close" || eventId == "project-modal-close-icon") {
            this.modal.classList.replace("flex", "hidden")
        } 
    }
    
    show(){
        this.modal.classList.replace("hidden", "flex")
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