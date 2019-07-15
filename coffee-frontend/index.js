document.addEventListener("DOMContentLoaded", () => {
    // Initial offset value set to 1, origin set to empty string
    let offset = 1
    let origin = ""

    // Sends GET request to coffee API and displays first 5 coffees
    fetch('https://flatiron-coffee-api.herokuapp.com/coffee/?limit=5', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json()).then(data => {
        displayFive(data, offset)
    })

    // Searches for coffees by origin
    document.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target

        const input = form.children[1].value.trim()
        origin = input
        offset = 1
        fetch(`https://flatiron-coffee-api.herokuapp.com/coffee/?origin=${origin}&limit=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(data => {
            displayFive(data, offset)
        })
    })

    // Gets next 5 coffees 
    // Uses LI's data attribute "id" to retrive and update offset value
    const next = document.getElementById('next-results')
    next.addEventListener('click', event => {
        const lis = document.querySelectorAll('li')
        const lastLi = lis[lis.length - 1]
        offset = parseInt(lastLi.dataset.id, 10)
        fetch(`https://flatiron-coffee-api.herokuapp.com/coffee/?origin=${origin}&offset=${offset}&limit=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(data => {
            offset += 1
            displayFive(data, offset)
        })
    })
})

// Displays 5 given coffees and assigns LI's data attribute "id" with given offset value
function displayFive(coffees, offset) {
    const coffeeList = document.getElementById('coffee-list')
    coffeeList.innerHTML = ""
    if (coffees === null) {
        coffeeList.innerHTML = "No coffee found."
    } else {
        coffees.forEach(coffee => {
            coffeeList.innerHTML += `<li data-id=${offset}>
            <h3>${coffee.name}</h3>
            <p>Origin: ${coffee.origin}</p>
            <p>Notes: ${coffee.notes}</p>
            </li>`
        })
    }   
}