class Works {
    works 
    
    async initialise() {
        let works = await fetch("http://localhost:5678/api/works")
        .then(function(response) {
            return response.json();
        })
        
        this.works = works
    }

    show() {
        this.works.map(work => {
            let figure = document.createElement("figure")
            let image = document.createElement("img")
            let figcaption = document.createElement("figcaption")
            
            image.src = work.imageUrl
            image.alt = work.title
            
            figcaption.innerText = work.title
            
            document.querySelector(".gallery")
            .appendChild(figure)
            
            figure.appendChild(image)
            figure.appendChild(figcaption)
            
        })
    }
}

const works = new Works

window.addEventListener("load", function(){
    works.initialise()
    .then(works.show())
})
