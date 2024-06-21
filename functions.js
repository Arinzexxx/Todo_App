// let form = document.getElementById('form');
// let input = document.getElementById('input');
// let msg = document.getElementById('msg');
// let post = document.getElementById('post');

// form.addEventListener('submit', (prevent) => {
//   prevent.preventDefault();
//   console.log('you clicked the button');
//   formvalidation();
// });

// let formvalidation = () => {
//   if (input.value === '') {
//     msg.innerHTML = 'Post cannot be blank'
//     console.log('faliure');
//   } else {
//     msg.innerHTML = '';
//     console.log('success');
//     acceptdata();
//   }
// };

// let data = {};

// let acceptdata = () => {
//   data['text'] = input.value;
//   console.log(data);
//   createpost();
// };

// let createpost = () => {
//   post.innerHTML +=
//     `<div>
//           <p>${data.text}</p>
//           <span class="options">
//             <i onClick ='deletepost(this)' class="fas fa-trash-alt"></i>
//             <i onClick ='editpost(this)' class="fas fa-edit"></i>
//           </span>
//         </div>`;
//   input.value = '';
// };

// let deletepost = (clean) => {
//   clean.parentElement.parentElement.remove();
// }

// let editpost = (edit)=>{
// input.value = edit.parentElement.previousElementSibling.innerHTML;
//   edit.parentElement.parentElement.remove();
// };

let form = document.getElementById('form');
let textinput = document.getElementById('textinput');
let dateinput = document.getElementById('dateinput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');



form.addEventListener('submit', (defult) => {
  defult.preventDefault();
  formvalidation();
});

let formvalidation = () => {
  if (textinput.value === '') {
    // , textarea.value === ''==========ask teacher
    console.log('faliure');
    msg.innerHTML = 'Task can Not be Blank!!!';
  } else {
    console.log('succses');
    msg.innerHTML = '';
    acceptdata();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })()
  }
};

// let data = {};
let data = [];

let acceptdata = () => {
  // data['text'] = textinput.value;
  // data['date'] = dateinput.value;
  // data['description'] = textarea.value;
  data.push({
    text: textinput.value,
    date: dateinput.value,
    description: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createtask();
};

let createtask = () => {
  tasks.innerHTML = '';

  data.map((x, y) => {
    return tasks.innerHTML +=
      `    <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>

        <span class="options">
          <i onClick='deletepost(this);createtask()' class="fas fa-trash-alt"></i>
          <i onClick='editpost(this)' data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        </span>
      </div>`
  })


  clearform();
};

let deletepost = (clean) => {
  clean.parentElement.parentElement.remove();
  data.splice(clean.parentElement.parentElement.id, 1)
  console.log(data);
  localStorage.setItem('data', JSON.stringify(data));
};

let editpost = (edit) => {
  let selectedtask = edit.parentElement.parentElement;

  textinput.value = selectedtask.children[0].innerHTML;
  dateinput.value = selectedtask.children[1].innerHTML;
  textarea.value = selectedtask.children[2].innerHTML;

  deletepost(edit);
};


let clearform = () => {
  textinput.value = '';
  dateinput.value = '';
  textarea.value = '';
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createtask();
  console.log(data);
})()