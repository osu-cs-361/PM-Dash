// This function creates an eventListener for the submit button on the new project form
const newProject = document.querySelector("#newProjectForm");
newProject.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get form values
    let projectName = newProject.elements.projectName.value;
    let budget = newProject.elements.budget.value;
    let startDate = newProject.elements.startDate.value;
    let endDate = newProject.elements.endDate.value;

    // Set base url for use in fetch function
    let url = "/projects/new";

    // Prepare payload object to send as body of POST request
    let payload = {
        projectName: projectName,
        budget: budget,
        startDate: startDate,
        endDate: endDate
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
    newProject.elements.projectName.value = "";
    newProject.elements.budget.value = "";
    newProject.elements.startDate.value = "";
    newProject.elements.endDate.value = "";
})

