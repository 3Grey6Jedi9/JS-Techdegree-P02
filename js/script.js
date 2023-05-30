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

    if (list.length % page === 0) {

        let end_index = page * items


    } else {


        let end_index = (page*items) + (list.length % page)
    }

    const students = document.querySelector('ul.student-list');
    students.innerHTML = '';

}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
