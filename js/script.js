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
    let items = Math.floor(list.length / page)

    let start_index = (page*items) - items
    let end_index = ''

    if (list.length % page === 0) {

        let end_index = page * items


    } else {


        let end_index = (page*items) + (list.length % page)
    }

    const students = document.querySelector('ul.student-list');
    students.innerHTML = '';

    let i = 0;
    while (i<list.length) {

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

function addPagination(list) {

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
    buttons[0].className = "active";
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
