// Unobtrusive JavaScript used to append html for pagination and search bar
$('.page').append('<div class="pagination"><ul></ul></div>');
$('.page-header').append(`<div class="student-search">
                            <input type="text">
                            <button id="searchButton" type="submit">Search</button>
                          </div>`);

/*=============-=============-=============-=============
                      CACHED VARIABLES
===============-=============-=============-===========*/
const $studentList = $('.student-item');
const $paginationUl = $('.pagination ul');
const $searchInput = $('.student-search input');
const $searchButton = $('#searchButton');

let filtered = false;

/*=============-=============-=============-=============
                        FUNCTIONS
===============-=============-=============-===========*/

// ---------- Paginate List ---------- //

// Split a copy of the student list into an array of paginated students
function paginate(list) {
  // Copy jQuery collection to avoid manipulating the original list of students
  const arrCopy = [...list]; // Use spread operator to make copy 
  const newArr = [];
  // Use splice method. While loop will end when arrCopy is empty
  while(arrCopy.length) {
    newArr.push(arrCopy.splice(0, 10));
  }
  return newArr;
}

// ---------- Create Pagination Buttons ---------- //

function createPaginationButtons(list, pages, currentPage) {
  let buttons = '';
  // Only create buttons if there is more than one page of students
  if(pages.length > 1) {
    for(let i = 1; i <= pages.length; i++) {
      if (i === currentPage) { // Current page is given the class 'active'
        buttons += `<li><a class="active" href="#">${i}</a></li>`;
      } else {
        buttons += `<li><a href="#">${i}</a></li>`;
      }
    }
  }
  $paginationUl.html(buttons);

  // The filtered variable helps determine if the show all button is displayed
  if (filtered) {
    $paginationUl.append(`<li><a class="show-all">Show All</a></li>`);
  }

  // --- Event Listeners --- //
  $('.pagination li').on('click', event => {
    // When button is clicked, it's parsed text number determines the displayed current page
    const currentPage = parseInt(event.target.textContent);
    showPage(list, currentPage);
  });
  // Clicking show all button clears input and resets page to show unfiltered paginated student list
  $('.show-all').on('click', () => {
    $searchInput.val('');
    filtered = false;
    showPage($studentList);
  });
}

// ---------- Show Pages ---------- //

// Function displays the current paginated page
function showPage(list, currentPage = 1) { // CurrentPage parameter has default value of 1;
  // Display html message if there are no students in list
  if(!list.length) {
    $('.page-header h2').text('No Students Found');
  } else {
      $('.page-header h2').text('Students');
  }

  const pages = paginate(list);
  createPaginationButtons(list, pages, currentPage);
  $studentList.hide();
  $(pages[currentPage - 1]).show(); // CurrentPage - 1 to match index numbers in pages array
}

// ---------- Filter List ---------- //

function filterList(event) {
  const value = $searchInput.val().toLowerCase().trim();
  // Input value is only emptied when event target is the clicked search button
  if(event.target.tagName === 'BUTTON') {
    $searchInput.val('');
  }
  // Student included in filtered array if input value found in that student's name or email
  const $filteredList = $studentList.filter(function() {
    const name = $(this).find('h3').text();
    const email = $(this).find('.email').text();
    return name.indexOf(value) !== -1 || email.indexOf(value) !== -1;
  });

  filtered = true;
  showPage($filteredList);
}

/*=============-=============-=============-=============
                      PROGRAM INIT
===============-=============-=============-===========*/

showPage($studentList);

/*=============-=============-=============-=============
                    EVENT LISTENERS
===============-=============-=============-===========*/
// Function filterList is fired every time a letter is entered into the search input
$searchInput.on('keyup', filterList);

$searchButton.on('click', filterList);