class Gallery {
    constructor(container, modal, projectURL) {
        this.gallery = document.querySelector(container);
        this.projectURL = projectURL;
        this.initialise();
    }

    async initialise() {
        await this.getProjects();
    }

    async getProjects() {
        const response = await fetch(this.projectURL);
        const data = await response.json();
        this.list = data;
    }
}

const gallery = new Gallery("#portfolio", "#modal", "projects.json");
