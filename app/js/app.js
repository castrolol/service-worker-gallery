(function(w) {

    function Gallery() {
        this.photos = [];
        this.container = document.querySelector(".photo-container");
        this.template = document.querySelector(".template");

    }

    Gallery.prototype.render = function() {
        this.container.innerHTML = "";
        document.querySelector(".loader").style.display = "none";

        this.photos.forEach(photo => {

            var element = this.template.cloneNode(true);
            element.classList.remove("template");
            element.querySelector(".photo").src = photo.image;
            element.querySelector("h3").textContent = photo.title;
            this.container.appendChild(element);
            
        });

    }

    Gallery.prototype.load = function(url) {

        document.querySelector(".loader").style.display = "block";

        fetch(url)
            .then(res => res.json())
            .then(data => this.photos = data.photos)
            .then(() => this.render())
            .catch(err => console.log("Nooooooooooooooo....", err));

    }

    w.gallery = new Gallery();

} (window));