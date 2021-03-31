// document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.querySelector('.todoList');
  const todoForm = document.querySelector('.todoForm'); 
  const todoSearch = document.querySelector('.todoSearch');
  const taskNumber = document.querySelector('h1 span');
  const btn = document.querySelector(".add")
  const todoTextarea = todoForm.querySelector('textarea');
  const tasks = [];

  function addTask(text) {
      const element = document.createElement("div");
      element.classList.add("element");

      // pobieram zawartość templatki
     const elementInner = document.querySelector("#elementTemplate").content.cloneNode(true);

      //wrzucam do elementu
      element.append(elementInner);

      //tworzę datę
      const date = new Date();
      const dateText = `${date.getDate()} - ${date.getMonth()+1} - ${date.getFullYear()} godz.: ${date.getHours()}:${date.getMinutes()}`;
      element.querySelector(".element-date").innerText = dateText;

      //wstawiam tekst
      element.querySelector(".element-text").innerText = text;

      //i wrzucam element do listy
      todoList.append(element);
      tasks.push(element);
      taskNumber.textContent = tasks.length;
      alert("Dodales zadanie!");
      localStorage.setItem('todos',JSON.stringify(tasks)); //zmienia na stringa tablice i storuje
      
  }

  todoForm.addEventListener('submit', e => {
      e.preventDefault();

      if (todoTextarea.value !== '') {
          addTask(todoTextarea.value);
          todoTextarea.value = '';
      }
  });

  todoList.addEventListener("click", e => {
      if (e.target.classList.contains("element-delete")) {
          e.target.closest(".element").remove();
          tasks.splice(e.target.value,1)
          taskNumber.textContent = tasks.length;
          localStorage.removeItem(e.target.value);
      }
  });

  todoSearch.addEventListener("input", () => {
      const val = todoSearch.value;
      const elems = todoList.querySelectorAll(".element");

      for (const el of elems) {
          const text = el.querySelector(".element-text").innerText;

          if (text.includes(val)) {
              el.style.setProperty("display", "");
          } else {
              el.style.setProperty("display", "none");
          }
      }
  });
  function getFromLocalStorage() {  
      const reference = localStorage.getItem('todos')
      if(reference){
          todos = JSON.parse(reference) // wyjmuje i zmienia znowu na tablice
          return todos

      }
    }
    getFromLocalStorage();
// });

