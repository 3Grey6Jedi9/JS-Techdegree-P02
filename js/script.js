

// This function shows the page

function showPage(list, page) {
    let items = list.length;
    let num_pages = Math.ceil(items/9);
    let start_index = (page-1)*9 + 1;
    let end_index = ''

    if (page < num_pages) {

         end_index = 9*page

    } else {

        end_index = items

    }

    const students = document.querySelector('ul.student-list');
    students.innerHTML = '';

    let i = start_index;
    while (i<=end_index) {

        let html = `
        <li class="student-item cf">
    <div class="student-details">
      <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
      <h3>${list[i].name.first} ${list[i].name.last}</h3>
      <span class="email">${list[i].email}</span>
    </div>
    <div class="joined-details">
      <span class="date">${list[i].registered.date}</span>
    </div>
  </li>`;
        students.insertAdjacentHTML('beforeend', html);
        i++
    }

}


// Defining the function that creates the whole content of the web page. Page is the page that I will start showing.
// The data is the parameter that will allow me

function showFullPage(list, page=1) {

    showPage(list,page);

    const pages = Math.ceil(list.length / 9); // I want to display 9 students per page.

    let link = document.querySelector('ul.link-list');

    if (link.children.length !== pages) { // New code

        link.innerHTML = '';

        let i = 0;
        while (i < pages) {
            let html = `
        <li>
            <button type="button">${i + 1}</button>
        </li>`;
            link.insertAdjacentHTML('beforeend', html);
            i++;
        }

        let buttons = link.querySelectorAll('button');
        buttons[page - 1].className = "active";
        link.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') {
                buttons.forEach(button => {
                    if (button !== e.target) {
                        button.classList.remove('active');

                    }

                });

                e.target.classList.add('active');


            }

            if (searchInput.value !== '') {
                performSearch();

                         } else {

            const page = parseInt(e.target.textContent); // Gets the page number
            showPage(list, page) }

        });

    } // Closing the new if statement
     else {
    // If the number of buttons is already correct, update the active button
    let buttons = link.querySelectorAll('button');
    buttons.forEach((button, index) => {
      if (index === page - 1) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

}




// Calling functions

showFullPage(data, 1);


// Creating the searching container

const searchContainer = document.querySelector('header h2');
    searchContainer.innerHTML = `
    <label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;




const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.student-search button');

searchInput.addEventListener('keyup', performSearch);
searchButton.addEventListener('click', performSearch);


function notFoundMessage() {
  const message = document.querySelector('header');
  const html = `
    <h1>NO RESULTS FOUND</h1>
  `;
  const existingMessage = message.querySelector('h1');

  if (!existingMessage || existingMessage.textContent.trim() === '') {
    message.insertAdjacentHTML('beforeend', html);
  }
}

function deleteMessage() {
  const message = document.querySelector('header h1');
  if (message) {
    message.remove();
  }
}


let new_data = [];

// This the function that manages the search

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const studentsItems = document.querySelectorAll('.student-item');
  let itemsFound = 0;

  studentsItems.forEach(studentItem => {
    const fullName = studentItem.querySelector('h3').textContent.toLowerCase();

    if (fullName.includes(searchTerm)) {
      studentItem.style.display = 'block';
      itemsFound++
      deleteMessage()
      new_data.push(studentItem)
    } else {
      studentItem.style.display = 'none';

    }
  });

  updatePages(itemsFound)

    if(searchInput.value ==='') {

        showFullPage(data,1)

    }
  if (itemsFound === 0 && searchInput.value.trim() !== '') {
    notFoundMessage();
  }

}




// Update pagination buttons function. It takes all the items found and get the pages and create the buttons.

const initial_pages = Math.ceil(data.length / 9);

function updatePages() {

    const items = document.querySelectorAll('ul.link-list li');
    let current_pages = Math.ceil(items.length / 9);
    if (items.length === 0) {

        current_pages = 1;

    }
    if (searchInput !== '') {

        let link = document.querySelector('ul.link-list');

        link.innerHTML = '';

        let i = 0;
        while (i < current_pages) {
            let html = `
        <li>
            <button type="button">${i + 1}</button>
        </li>`;
            link.insertAdjacentHTML('beforeend', html);
            i++;


        }

    }

}


