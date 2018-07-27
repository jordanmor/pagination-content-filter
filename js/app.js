// Unobtrusive JavaScript used to append HTML for pagination and search bar
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

// split a copy of the student list into an array of paginated students
function paginate(list) {
  // copy jQuery collection to avoid manipulating the original list of students
  const arrCopy = [...list]; // use spread operator to make copy 
  const newArr = [];
  // using splice method, while loop will end when arrCopy is empty
  while(arrCopy.length) {
    newArr.push(arrCopy.splice(0, 10));
  }
  return newArr;
}

function createPaginationButtons(list, pages, currentPage) {
  let buttons = '';
  // only create buttons if there is more than one page of students
  if(pages.length > 1) {
    for(let i = 1; i <= pages.length; i++) {
      if (i === currentPage) { // the current page is given the class 'active'
        buttons += `<li><a class="active" href="#">${i}</a></li>`;
      } else {
        buttons += `<li><a href="#">${i}</a></li>`;
      }
    }
  }
  $paginationUl.html(buttons);

  // the filtered variable helps determine if the show all button is displayed
  if (filtered) {
    $paginationUl.append(`<li><a class="show-all">Show All</a></li>`);
  }
  // Event Listener
  $('.pagination li').on('click', event => {
    // when button is clicked, it's parsed text number determines the displayed current page
    const currentPage = parseInt(event.target.textContent);
    showPage(list, currentPage);
  });
  // clicking show all button clears input and resets page to show unfiltered paginated student list
  $('.show-all').on('click', () => {
    $searchInput.val('');
    filtered = false;
    showPage($studentList);
  });
}

// function displays the current paginated page
function showPage(list, currentPage = 1) { // currentPage parameter has default value of 1;
  // display html message if there are no students in list
  if(!list.length) {
    $('.page-header h2').text('No Students Found');
  } else {
      $('.page-header h2').text('Students');
  }

  const pages = paginate(list);
  createPaginationButtons(list, pages, currentPage);
  $studentList.hide();
  $(pages[currentPage - 1]).show(); // currentPage - 1 to match index numbers in pages array
}

function filterList() {
  const value = $searchInput.val().toLowerCase().trim();

  // a student is included in the filtered array 
  // if the input value is found in that student's name or email
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
// filterList() is fired every time a letter is entered into the search input
$searchInput.on('keyup', filterList);