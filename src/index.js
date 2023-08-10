document.addEventListener('DOMContentLoaded', () => {
    
const url = 'http://localhost:3000/dogs';
const table = document.querySelector('table');
const dogForm = document.getElementById('dog-form');
let currDog;

function renderTables(dog) {
    let row = document.createElement('tr');
    let dataName = document.createElement('td');
    let dataBreed = document.createElement('td');
    let dataSex = document.createElement('td');
    let dataButton = document.createElement('td');
    let btn = document.createElement('button');

    dataName.textContent = dog.name;
    dataBreed.textContent = dog.breed;
    dataSex.textContent = dog.sex;
    btn.textContent = 'Edit';

    row.appendChild(dataName);
    row.appendChild(dataBreed);
    row.appendChild(dataSex);
    dataButton.appendChild(btn);
    row.appendChild(dataButton);
    table.appendChild(row);

    btn.addEventListener('click', () => {
        currDog = dog;
        dogForm.name.value = dog.name;
        dogForm.breed.value = dog.breed;
        dogForm.sex.value = dog.sex;
    })
    
}

dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let obj = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }

    fetch(`${url}/${currDog.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })
})

fetch(url)
.then(resp => resp.json())
.then(data => {
    data.forEach(dog => {
        renderTables(dog);
    })
})


})