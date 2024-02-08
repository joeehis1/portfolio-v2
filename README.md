# portfolio-v2

This repository includes code for my portfolio website. .

It is based on a design which I created with heavy inspiration from my css mentor Kevin Powell. See link: https://www.figma.com/file/VL3hWBdECw5iZFDZgylXq3/Untitled?type=design&t=vLHZxRoUe35lTu5y-6. I made some last minute changes that are not reflected in the design file.

CSS done using sass for convenience due to the availabilty of nesting, modular styling, mixins etc

The navigation section is revealed by clicking on a button on the top left corner of the page. Smooth scrolling is also added to prevent a sudden jump to the section. This layout is used for both mobile and desktop versions of the website.

The portfolio projects section includes a modal which is used to give a summary of the project and allows a user to go to the repo url, the deployed website or to close the modal and continue exploration of other projects listed.
The portfolio section is referred to as Gallery in the JS files. It uses 2 classes, one for the portfolio and one for the modal. It also includes a keyboard event listener so that if its open pressing the 'Esc" key closes the modal/

The contact form works with the web3forms API to send emails on submission. I also included helpful messages in case of any issues while filling out the form.

Screenshots of the site for mobile and desktop are included below:
