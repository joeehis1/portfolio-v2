// projects stored in json file
// getting projects is asynchronous and no such thing as an async const func
// Initialise will call getProjects
// Initialise is async
// call initialise from constructor function
// rendering list items is also an intialisation operation
// event delegation on gallery

class Modal {
    constructor(modal) {
        this.modal = document.querySelector(modal);
    }

    open(project) {
        console.log(project);
    }
}

export class Gallery {
    constructor(container, modal, projectURL) {
        this.gallery = document.querySelector(container);
        this.projectURL = projectURL;
        this.modal = new Modal(modal);
        this.initialise();
    }

    async initialise() {
        await this.getProjects();
        const imageSrcPromise = this.list.map(async (item) => {
            const imagePromise = await fetch(`./assets/images/${item.src}`);
            const blob = await imagePromise.blob();
            const url = URL.createObjectURL(blob);
            return url;
        });
        const imageSrc = await Promise.all(imageSrcPromise);
        this.imgSRC = imageSrc;

        // This function will be used multiple times to generate the list
        this.render();

        this.gallery.addEventListener("click", (e) => {
            const shouldClick = e.target.getAttribute("data-action") === "open";
            if (!shouldClick) return;

            const projectId = e.target.dataset.projectId;
            const featuredProject = this.list.find(
                (item) => item.id === projectId
            );
            this.modal.open(featuredProject);
            this.setFeatured(projectId);
        });
    }

    render() {
        const listString = this.list
            .map((item, index) => {
                return `
                <li class="portfolio-item ${item.isFeatured ? "featured" : ""}">
                        <figure>
                            <img src="${this.imgSRC[index]}" alt="${
                    item.alt
                }" />
                            <figcaption>
                                <h3>${item.name}</h3>
                                ${
                                    item.isFeatured
                                        ? `<p>${item.description}</p>`
                                        : ""
                                }
                                <button class="btn-underline" data-action="open" data-project-id=${
                                    item.id
                                } >Read More</button>
                            </figcaption>
                        </figure>
                    </li>

            `;
            })
            .join("");
        this.gallery.innerHTML = listString;
    }

    setFeatured(id) {
        const newList = this.list.map((item) => {
            return {
                ...item,
                isFeatured: item.id === id ? true : false,
            };
        });
        this.list = newList;
        this.render();
    }

    async getProjects() {
        const response = await fetch(this.projectURL);
        const data = await response.json();
        this.list = data;
    }
}
