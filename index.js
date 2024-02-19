/** Takes in an index and sets that tab as the primary tab
 * @param {number} index
 */
function changeActiveTab(index) {
    const allTabs = document.querySelectorAll(".tab")
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
}

// This reset makes sure every delete button only has 1 event listener, not 2.
function resetDeleteButton() {
    const deleteButtons = document.querySelectorAll('.delete-row')

    for (const deleteButton of deleteButtons) {
        deleteButton.removeEventListener('click', (event) => {
            console.log(event.target.parentNode)
            event.target.parentNode.remove()
        })
    }

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', (event) => {
            console.log(event.target.parentNode)
            event.target.parentNode.remove()
        })
    }
}

function insertBeforeAQuery(event) {
    const parentNode = event.target.parentNode.parentNode
    const currentNode = event.target.parentNode
    const childNodes = parentNode.children
    const nodeIndex = Array.from(childNodes).indexOf()
}

function resetAddButton() {
    const addButtons = document.querySelectorAll('.add-row')

    for (const addButton of addButtons) {
        addButton.removeEventListener('click', (event) => {
            // console.log(event.target.parentNode)
            // console.log(event.target.parentNode.parentNode)
            // Use insertOne to insert in parentNode.parentNode after parentNode
            insertBeforeAQuery(event)
        })
    }

    for (const addButton of addButtons) {
        addButton.addEventListener('click', (event) => {
            // console.log(event.target.parentNode)
            // console.log(event.target.parentNode.parentNode)
            // Use insertOne to insert in parentNode.parentNode after parentNode
            insertBeforeAQuery(event)
        })
    }
}