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

const portfolio = document.querySelector("#portfolio-section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                console.log("shown");
                navBar.classList.remove("go-up");
                return;
            }
            navBar.classList.add("go-up");
        });
    },
    {
        root: null,
        threshold: 0.2,
    }
);

observer.observe(portfolio);
