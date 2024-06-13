// data-modal-visible="false"

export class Modal {
    constructor(modal) {
        this.modal = document.querySelector(modal);
        this.isOpen = false;
        this.modalLinks = this.modal.querySelector("#modal-links");
        this.modalImage = this.modal.querySelector("#project-image");
        this.modalTitle = this.modal.querySelector("#project-title");
        this.modalDesc = this.modal.querySelector("#project-description");
        this.modalRepoAnchor = this.modal.querySelector("#project-repo");
        this.modalLiveURL = this.modal.querySelector("#project-live");
        this.modalContainer = this.modal.querySelector("#modal-container");
        this.modalContainer.style.transition = `opacity 350ms ease`;
    }

    open(project) {
        this.modalImage.src = project.src;
        this.modalTitle.textContent = project.name;
        this.modalDesc.innerHTML = `<p>${project.description}</p>`;
        this.modalRepoAnchor.href = project?.repoURL;
        this.modalLiveURL.href = project?.liveSiteURL;
        this.isOpen = true;
        this.modal.setAttribute("data-modal-visible", "true");
        setTimeout(() => {
            this.modalContainer.style.opacity = 1;
            this.modalContainer.style.display = "block";
        }, 400);
        this.modalLinks.addEventListener("click", this.modalEvent);
    }

    // Using arrow functions to avoid having to bind this to the event handler

    modalEvent = (e) => {
        e.preventDefault();
        if (!e.target.closest("[data-modal-action]")) {
            return;
        }

        this.clicked = e.target.closest("[data-modal-action]");
        const action = this.clicked.getAttribute("data-modal-action");
        this[action](e);
    };

    goToURL() {
        const url = this.clicked.getAttribute("href");
        if (confirm(`Visit page ${url}`)) {
            // This only works if the user allows it
            window.open(url);
        } else {
            return;
        }
    }

    close() {
        this.isOpen = false;
        this.modalContainer.style.opacity = 0;
        setTimeout(() => {
            this.modal.setAttribute("data-modal-visible", "false");
            this.modalContainer.style.display = "none";
        }, 400);
    }
}
