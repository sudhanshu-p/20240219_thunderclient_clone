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

    const contentContainers = parentOfContentContainers.children

    for (let i = 0; i < contentContainers.length; i++) {
        contentContainers[i].classList.remove("active-container")
        if (i === index) {
            contentContainers[i].classList.add("active-container")
        }
    }
}


// Adding and Deleting Inputs based on template part JS

const template = document.getElementById("query-input-template")

function addRowNextTo(event) {
    const selectedNode = event.target.parentNode
    const parentNode = selectedNode.parentNode
    console.log(parentNode)
    const siblingNodes = parentNode.children
    // console.log(siblingNodes)
    let indexOfCurrNode;
    for (indexOfCurrNode = 0; indexOfCurrNode < siblingNodes.length;
        indexOfCurrNode++) {
        if (siblingNodes[indexOfCurrNode] === selectedNode) {
            console.log("AAAAAAA")
            parentNode.insertBefore(template.content.cloneNode(true),
                siblingNodes[indexOfCurrNode + 1])
            break;
        }
    }

    // Now we need to add event listener to this newly created node.
    const newSiblingNodes = parentNode.children
    // New node is at indexOfCurrNode + 1
    newSiblingNodes[indexOfCurrNode + 1].querySelector('.add-row')
        .addEventListener('click', (event) => {
            addRowNextTo(event)
        })

    newSiblingNodes[indexOfCurrNode + 1].querySelector('.delete-row')
        .addEventListener('click', (event) => {
            deleteThisRow(event)
        })
}

document.querySelector(".add-row").addEventListener('click', (event) => {
    addRowNextTo(event)
})

function deleteThisRow(event) {
    if (event.target.parentNode.parentNode.children.length === 1) {
        // maybe display an error.
    }

    event.target.parentNode.parentNode.removeChild(event.target.parentNode)



    // Edge case - when parent has only 1 child left, remove this event listener from all.
}


// Adding Params to the url

function inputQuery() {
    let queryRowParent = document.querySelector(".queries-input-container")

    const urlInputValue = document.getElementById('url-input').value


    // If the url is not given, do not process params
    if (!urlInputValue) {
        return
    }

    // Iterating over each input row
    const queryRows = queryRowParent.children

    let finalString = "?"

    for (const queryRow of queryRows) {
        const keyValue = queryRow.querySelector(".query-key").value
        const valueValue = queryRow.querySelector(".query-value").value
        finalString += `${keyValue}=${valueValue}`
    }

    if (urlInputValue.indexOf('?') === -1) {
        document.getElementById('url-input').value =
            urlInputValue + (finalString.length === 1 ? "" : finalString)
            return
    }

    const finalUrl = urlInputValue.substring(0, urlInputValue.indexOf('?')) +
        (finalString.length === 2 ? "" : finalString)

    document.getElementById('url-input').value = finalUrl
}

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

    const initial = performance.now()

    // Sending the request
    let headersList = {
        "Accept": "*/*"
    }
    let response = await fetch(urlToBeSearched, {
        method: "GET",
        headers: headersList
    });

    let data = await response.text();

    const final = performance.now()
    // These are the elements on the RHS where data is to be added
    const statusElementHTML = document.getElementById("status")
    const sizeElementHTML = document.getElementById("size")
    const timeElementHTML = document.getElementById("time")

    const newStatus = response.status.toString() + (response.ok ? " OK" : "")

    statusElementHTML.innerHTML = "Status: "
    statusElementHTML.innerHTML += newStatus

    timeElementHTML.innerHTML = final - initial

    // TODO: Size and Time data

    // This is the container for the entire JSON response
    const responseContainer = document.querySelector(".response-container")
    responseContainer.innerHTML = ""

    const responseOutput =
        parseObjectToReadableString(JSON.parse(data), 1)

    responseContainer.innerHTML = responseOutput
}

