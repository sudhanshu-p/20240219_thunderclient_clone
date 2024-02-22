/** Takes in an index and sets that tab as the primary tab
 * @param {String} side Left | Right side tab
 * @param {number} index
 */
function changeActiveTab(side, index) {
    let allTabs
    if (side === "left") {
        allTabs = document.querySelectorAll('.left-tab')
    }
    else {
        allTabs = document.querySelectorAll('.right-tab')
    }
    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("active-tab")
        if (i === index) {
            allTabs[i].classList.add("active-tab")
        }
    }

    showContent(index)
}

/** Takes in index and shows the content of that indexed tab */
function showContent(index) {
    // TODO
    const parentOfContentContainers = document.getElementById("content-container")

    

}


// Adding and Deleting Inputs based on template part JS
function addRowNextTo() {

}

// const addListeners


// FETCHING AND PARSING JS
function isValidUrl(url) {
    // const regex = /^(?:http?:\/\/)?(?:www\.)?[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
    // return regex.test(url);
    return true
}

function parseObjectToReadableString(objectToParse, numOfTabs) {
    const outputString = ""
    let responseOutput = "{<br>"
    const data = objectToParse

    // Prinitng each key in individual line
    Object.keys(data).forEach((key) => {
        // If the value of this key is an array,
        // We'll print each element of array in a different line too.
        if (Array.isArray(data[key])) {
            // &emsp; represents Tab
            responseOutput += `&emsp;"${key}" : [<br>`
            parseObjectToReadableString(data[key], numOfTabs + 2)
            data[key].forEach((element) => {
                responseOutput += `&emsp;&emsp;"${element}", <br>`
            })
            responseOutput += `&emsp;]<br>`
        }
        else if (data[key] === "[object Object]") {
            console.log("Ai'ght Imma cry now")
            responseOutput += parseObjectToReadableString(data[key], numOfTabs + 1)
        }
        else {
            responseOutput += `&emsp;"${key}" : "${data[key]}",<br>`
        }
    })
    responseOutput += "}"

    return responseOutput
}

async function sendRequest() {
    const searchBox = document.querySelector("#url-input")
    const urlToBeSearched = searchBox.value
    if (!isValidUrl(urlToBeSearched)) {
        // Show some visual errors
        console.log(urlToBeSearched)
        return
    }

    // Sending the request
    let headersList = {
        "Accept": "*/*"
    }
    let response = await fetch(urlToBeSearched, {
        method: "GET",
        headers: headersList
    });

    let data = await response.text();

    // These are the elements on the RHS where data is to be added
    const statusElementHTML = document.getElementById("status")
    const sizeElementHTML = document.getElementById("size")
    const timeElementHTML = document.getElementById("time")

    const newStatus = response.status.toString() + (response.ok ? " OK" : "")

    statusElementHTML.innerHTML = "Status: "
    statusElementHTML.innerHTML += newStatus

    // TODO: Size and Time data

    // This is the container for the entire JSON response
    const responseContainer = document.querySelector(".response-container")
    responseContainer.innerHTML = ""

    const responseOutput =
        parseObjectToReadableString(JSON.parse(data), 1)

    responseContainer.innerHTML = responseOutput
}