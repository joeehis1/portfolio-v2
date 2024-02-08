const form = document.querySelector("#contact-form");

const formStatus = form.querySelector("#form-status");
const web3Url = `https://api.web3forms.com/submit`;

const emailRegEXP =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emailInput = form.querySelector(`input[type="email"]`);
const nameInput = form.querySelector(`input[type="text"]`);
const messageInput = form.querySelector(`textarea[name="message"]`);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { fieldsEmpty, nameValid, emailValid, messageValid } =
        validateData(formData);
    // See validateData below, it is for form data validation and returns an object that tells you
    if (fieldsEmpty || !nameValid || !emailValid || !messageValid) {
        return !nameValid
            ? showError(
                  "Entered name is too short",
                  formStatus,
                  nameInput,
                  e.target
              )
            : !emailValid
            ? showError(
                  "Email entered does not look like a valid email",
                  formStatus,
                  emailInput,
                  e.target
              )
            : !messageValid
            ? showError(
                  "Message is too short",
                  formStatus,
                  messageInput,
                  e.target
              )
            : showError("One of your fields is empty", formStatus, e.target);
    }

    sendMessage(formData, e.target, formStatus);
});

async function sendMessage(formData, contactForm, indicator) {
    contactForm.setAttribute("data-status-visible", "false");
    try {
        const responseObject = await fetchFunc(formData, web3Url);
        contactForm.reset();
        contactForm.setAttribute("data-status-visible", "true");
        indicator.textContent = responseObject.message;
        indicator.setAttribute("data-status", "success");
    } catch (error) {
        indicator.textContent = error.message;
    }
    setTimeout(() => {
        indicator.textContent = "";
        contactForm.setAttribute("data-status-visible", "false");
        indicator.setAttribute("data-status", "");
    }, 3500);
}

async function fetchFunc(data, url) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Message could not be sent");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

function showError(error, status, element, contactForm) {
    contactForm.setAttribute("data-shown", "true");
    status.setAttribute("data-status", "warning");
    status.textContent = error;
    element.focus();
}

function validateData(formData) {
    const { full_name: fullName, email, message } = formData;
    const hasData = Object.values(formData).every(Boolean);

    const nameValid = fullName.trim().length >= 5;
    const emailValid = emailRegEXP.test(email);
    const messageValid = message.trim().length >= 5;

    return {
        fieldsEmpty: !hasData,
        nameValid,
        emailValid,
        messageValid,
    };
}
