/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function showFullPage(list, page) {

    showPage(list,page)

    const pages = Math.ceil(list.length / 9); // I want to display 9 students per page.

    let link = document.querySelector('ul.link-list');

    link.innerHTML = '';

    let i = 0;
    while (i<pages) {
        let html = `
        <li>
            <button type="button">${i+1}</button>
        </li>`;
        link.insertAdjacentHTML('beforeend', html);
        i++;
    }


    let buttons = link.querySelectorAll('button');
    buttons[page-1].className = "active";
    link.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            buttons.forEach(button => {
                if (button !== e.target) {
                    button.classList.remove('active');

                }

            });

            e.target.classList.add('active');

        }

        const page = parseInt(e.target.textContent); // Gets the page number
        showPage(list,page)



    });



}



// Call functions

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

  if (itemsFound === 0 && searchInput.value.trim() !== '') {
    notFoundMessage();
  }

}



