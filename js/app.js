$('.page').append('<div class="pagination"><ul></ul></div>');

/*=============-=============-=============-=============
                      CACHED VARIABLES
===============-=============-=============-===========*/
const $studentList = $('.student-item');

/*=============-=============-=============-=============
                        FUNCTIONS
===============-=============-=============-===========*/

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

function showPage($list, pageNum = 1) { // pageNum parameter has default value of 1;
  const pages = paginate($list);
  $list.hide();
  $(pages[pageNum - 1]).show(); // pageNum - 1 to match index numbers in pages array
}

showPage($studentList);