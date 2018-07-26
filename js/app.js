$('.page').append('<div class="pagination"><ul></ul></div>');

/*=============-=============-=============-=============
                      CACHED VARIABLES
===============-=============-=============-===========*/
const $studentList = $('.student-item');
const $paginationUl = $('.pagination ul');

/*=============-=============-=============-=============
                        FUNCTIONS
===============-=============-=============-===========*/

// split a copy of the $studentList into an array of paginated students
function paginate($list) {
  // copy jQuery collection to avoid manipulating the original list of students
  const arrCopy = [...$list]; // use spread operator to make copy 
  const newArr = [];
  // using splice method, while loop will end when arrCopy is empty
  while(arrCopy.length) {
    newArr.push(arrCopy.splice(0, 10));
  }
  return newArr;
}

function createPaginationButtons($list, pages, currentPage) {
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

  // Event Listener
  $('.pagination li').on('click', event => {
    // when button is clicked, it's parsed text number determines the displayed current page
    const currentPage = parseInt(event.target.textContent);
    showPage($list, currentPage);
  });
}

// function displays the current paginated page
function showPage($list, currentPage = 1) { // currentPage parameter has default value of 1;
  const pages = paginate($list);
  createPaginationButtons($list, pages, currentPage);
  $list.hide();
  $(pages[currentPage - 1]).show(); // currentPage - 1 to match index numbers in pages array
}

/*=============-=============-=============-=============
                      PROGRAM INIT
===============-=============-=============-===========*/

showPage($studentList);