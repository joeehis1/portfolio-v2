const navBar = document.querySelector("#nav-menu");

const navToggler = document.querySelector("#nav-toggle");

navToggler.addEventListener("click", function (e) {
    const navClosed = navBar.getAttribute("data-open") === "false";
    if (navClosed) {
        this.setAttribute("data-menu-open", "true");
        navBar.setAttribute("data-open", "true");
        return;
    }
    this.setAttribute("data-menu-open", "false");
    navBar.setAttribute("data-open", "false");
});

navBar.addEventListener("click", function (e) {
    if (e.target.matches(`#nav-menu li a`)) {
        this.setAttribute("data-open", "false");
        navToggler.setAttribute("data-menu-open", "false");
    }
});
