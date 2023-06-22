class Works {
    works 
    
    async initialise() {
        let works = await fetch("http://localhost:5678/api/works")
        .then(function(response) {
            return response.json();
        })
        
        this.works = works
    }
    
    loadEvents() {
        document.querySelectorAll(".category")
        .forEach(element => {
            element.addEventListener("click", (event) => { 
                this.showCategory(event.target.dataset["category"])
            })
        })
    }
    
    show(works) {
        let gallery = document.querySelector(".gallery")

        gallery.innerHTML = ""

        works.map(work => {
            let figure = document.createElement("figure")
            let image = document.createElement("img")
            let figcaption = document.createElement("figcaption")
            
            image.src = work.imageUrl
            image.alt = work.title
            
            figcaption.innerText = work.title
            
            gallery.appendChild(figure)
            figure.appendChild(image)
            figure.appendChild(figcaption)
        })
    }
    
    showCategory(id) {
        let filtered = []

        if (id == 0) {
            filtered = this.works
        } else {
            filtered = this.works.filter(work => work.categoryId == id)
        }
        
        this.show(filtered)
    }
}

const works = new Works

window.addEventListener("load", function() {
    works.initialise().then(() => works.show(works.works))
    works.loadEvents()
})
