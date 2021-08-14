const updateDiv = (value) => {
    // Output to user that changes were submitted
    let oldDiv = document.querySelector("#updateDiv");
    let newDiv = document.createElement('DIV');
    newDiv.setAttribute("id", "updateDiv");
    let newMessage = document.createElement('P')
    newMessage.innerText = value;
    newDiv.appendChild(newMessage);

    // Replace div element with new data from server
    oldDiv.parentNode.replaceChild(newDiv, oldDiv);
}


// This helper function takes a value as input and creates a 'td' element for the table using the value as the innerText.
const addTableCell = (value) => {
    let newCell = document.createElement('TD');
    newCell.innerText = value;
    return newCell;
}

// This helper function takes a value as input and creates a 'th' element for the table using the value as the innerText.
const addTableCellH = (value) => {
    let newCell = document.createElement('TH');
    newCell.innerText = value;
    return newCell;
}

// This function takes an array of objects and manipulates the DOM to reset the table in tbody
const addTableRow = (array) => {
    let old_tbody = document.querySelector("tbody");
    let new_tbody = document.createElement('TBODY');
    for (const obj of array) {
        let newRow = document.createElement('TR');
        new_tbody.appendChild(newRow);
        newRow.appendChild(addTableCellH(obj.logID));
        newRow.appendChild(addTableCell(obj.date));
        newRow.appendChild(addTableCell(obj.plannedProgress));
        newRow.appendChild(addTableCell(obj.actualProgress));
        newRow.appendChild(addTableCell(obj.plannedSpend));
        newRow.appendChild(addTableCell(obj.actualSpend));

        // Add in delete button, including eventListener
        let delBtn = document.createElement("BUTTON");
        delBtn.setAttribute("type", "submit");
        delBtn.setAttribute("class", "btn btn-danger deleteBtn");
        delBtn.setAttribute("value", obj.logID);
        delBtn.innerText = "Delete";
        addEventDelete(delBtn);
        let btnCell = document.createElement('TD');
        btnCell.appendChild(delBtn);
        newRow.appendChild(btnCell);
    }
    // Replace tbody element with new data from server
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

// This function takes a DOM element (delete button) and creates an event listener
const addEventDelete = (element) => {
    element.addEventListener('click', async (e) => {
        e.preventDefault();

        // get form values
        let logID = element.value;

        // set base url
        let location = window.location.href;
        let url = location + "/" + logID;


        // Set config variable to be used as 2nd paramter in fetch (fetch init object)
        const config = {
            method: 'GET',
        }

        // make request to url
        // make Post request to url
        const res = await fetch(url, config);
        const data = await res.json();

        addTableRow(data.results);

        updateDiv(data.message);
    })
}

// Select all the delete buttons using their class attribute and add eventListener
deleteBtnArray = document.querySelectorAll(".deleteBtn");
for (let button of deleteBtnArray) {
    addEventDelete(button);
}

// This function creates an eventListener for the submit button on the new daily log entry form
const newDailyLogEntry = document.querySelector("#newDataLogForm");
newDailyLogEntry.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get form values
    let dataDate = newDailyLogEntry.elements.dataDate.value;
    let plannedProgress = newDailyLogEntry.elements.plannedProgress.value;
    let actualProgress = newDailyLogEntry.elements.actualProgress.value;
    let plannedSpend = newDailyLogEntry.elements.plannedSpend.value;
    let actualSpend = newDailyLogEntry.elements.actualSpend.value;

    // Set base url for use in fetch function
    let url = window.location.href;

    // Prepare payload object to send as body of POST request
    let payload = {
        data: dataDate,
        plannedProgress: plannedProgress,
        actualProgress: actualProgress,
        plannedSpend: plannedSpend,
        actualSpend: actualSpend
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

    updateDiv(data.message);

    addTableRow(data.results);

    // clear form inputs
    newDailyLogEntry.elements.dataDate.value = "";
    newDailyLogEntry.elements.plannedProgress.value = "";
    newDailyLogEntry.elements.actualProgress.value = "";
    newDailyLogEntry.elements.plannedSpend.value = "";
    newDailyLogEntry.elements.actualSpend.value = "";
})