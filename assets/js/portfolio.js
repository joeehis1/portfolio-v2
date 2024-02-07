import { Gallery } from "./GalleryClass.js";
1;

const gallery = new Gallery("#portfolio", "#modal", "projects.json");

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const isOpen = gallery.modal.isOpen;
        if (isOpen) {
            gallery.modal.close();
        }
    }
});
