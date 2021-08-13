// This function creates an eventListener for the submit button on the new issue form
const issueForm = document.querySelector("#issueForm");
issueForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get form values
    let email = issueForm.elements.email.value;
    let description = issueForm.elements.description.value;
    let dateLogged = new Date().toISOString().slice(0, 10);
    let status = "New";

    // Set base url for use in fetch function
    let url = "/help";

    // Prepare payload object to send as body of POST request
    let payload = {
        email: email,
        description: description,
        dateLogged: dateLogged,
        status: status
    };

    // Set config variable to be used as 2nd paramter in fetch (fetch init object)
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),      // take payload object and create JSON to use in POST fetch request
    }


    // make Post request to url
    const res = await fetch(url, config);
    const data = await res.json();

    // Output to user that changes were submitted
    let oldDiv = document.querySelector("#updateDiv");
    let newDiv = document.createElement('DIV');
    newDiv.setAttribute("id", "updateDiv");
    let newMessage = document.createElement('P')
    newMessage.innerText = data.results;
    newDiv.appendChild(newMessage);

    // Replace div element with new data from server
    oldDiv.parentNode.replaceChild(newDiv, oldDiv);

    // clear inputs
    issueForm.elements.email.value = "";
    issueForm.elements.description.value = "";
})