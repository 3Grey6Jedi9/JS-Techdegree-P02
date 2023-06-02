

// This function shows the page

function showPage(list, page) {
    let items = list.length;
    let num_pages = Math.ceil(items/9);
    let start_index = (page-1)*9;
    let end_index = ''

    if (page < num_pages) {

         end_index = 9*page - 1

    } else {

        end_index = items - 1

    }

    const students = document.querySelector('ul.student-list');
    students.innerHTML = '';

    let i = start_index;
    while (i<=end_index) {

        let html = `
        <li class="student-item cf">
    <div class="student-details">
      <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
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

// End of the function that shows the page











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

    if (searchInput.value !== '') {
      performSearch();
    } else {
      const page = parseInt(e.target.textContent);
      showPage(list, page);
    }
  }
});


    }
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

// End of the function that will create the main content




// Calling functions

showFullPage(data, 1);

// End of calling the main function








// Creating the searching container

const header = document.querySelector('.header');
const searchContainer = document.createElement('div');
searchContainer.innerHTML = `
  <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`;
header.appendChild(searchContainer);









const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.student-search button');

searchInput.addEventListener('keyup', performSearch);
searchButton.addEventListener('click', performSearch);

// End of the creation of the searching bar  and the definition of their actions



// This function will display a message if nothing is found

function notFoundMessage() {
  const message = document.querySelector('body');
  const html = `
    <h1 class="no-results">NO RESULTS FOUND</h1>
  `;
  const existingMessage = message.querySelector('h1');

  if (!existingMessage || existingMessage.textContent.trim() === '') {
    message.insertAdjacentHTML('beforeend', html);
  }
}


// End of the function that will display the message if nothing is found.







// This is the fucntion that deletes the NO FOUND message when is not necessary

function deleteMessage() {
  const message = document.querySelector('body h1');
  if (message) {
    message.remove();
  }
}

// End of the function





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
    let link = document.querySelector('ul.link-list');

        link.innerHTML = '';

  }

}

// End of the fucntion that performs the search






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

// End of the function that allows me to update the number of pagination buttons.
