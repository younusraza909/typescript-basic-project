import './style.css'

interface Todo {
  title: string;
  isCompleted: boolean;
  id: number
}

let todos: Todo[] = [];

const TodoForm = document.querySelector('#myForm') as HTMLFormElement;
const TodoContainer = document.querySelector('.todoContainer') as HTMLDivElement
const TodoInput = document.querySelector('input[type="text"]') as HTMLInputElement;

TodoForm.onsubmit = onSubmit

function onSubmit(e: SubmitEvent) {
  e.preventDefault()

  const todo: Todo = {
    title: TodoInput.value,
    isCompleted: false,
    id: Math.random() * 1000
  }

  todos.push(todo);
  TodoInput.value = ''

  // render ui
  renderUi()
}

function renderTodoItem(todo: Todo) {
  const div: HTMLDivElement = document.createElement('div')
  div.className = 'todo'

  // Checkbox
  const checkbox: HTMLInputElement = document.createElement("input")
  checkbox.setAttribute("type", 'checkbox')
  checkbox.className = 'isCompleted'
  checkbox.checked = todo.isCompleted
  checkbox.onchange = () => {
    todos = todos.map(t => t.id === todo.id ? { ...t, isCompleted: true } : { ...t })
    paragraph.className = checkbox.checked ? 'textCut' : ''
  }

  const paragraph: HTMLParagraphElement = document.createElement('p')
  paragraph.innerText = todo.title
  paragraph.className = todo.isCompleted ? 'textCut' : ""

  const button: HTMLButtonElement = document.createElement('button')
  button.className = 'deleteButton'
  button.innerText = "X"
  button.onclick = () => {
    todos = todos.filter(t => t.id !== todo.id)
    renderUi()
  }

  div.append(checkbox, paragraph, button)

  TodoContainer.append(div)
}

function renderUi() {
  TodoContainer.innerHTML = ''

  todos.forEach(todo => renderTodoItem(todo))
}