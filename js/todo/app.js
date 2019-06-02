import { TodoListModel } from './model/TodoListModel.js'
import { TodoItemModel } from './model/TodoItemModel.js'
import { TodoListView } from './view/TodoListView.js'
import { render } from './view/util.js'

export class Todo {
  /**
   * Todoリストの初期化
   */
  constructor () {
    this.todoListView = new TodoListView()
    this.todoListModel = new TodoListModel()

    this.formElement = document.querySelector('#js-form')
    this.inputElement = document.querySelector('#js-form-input')
    this.containerElement = document.querySelector('#js-todo-list')
    this.todoItemCountElement = document.querySelector('#js-todo-count')
  }

  /**
   * Todoを追加時に呼ばれるリスナー関数
   * @param {string} strTitle 
   */
  handleAdd (strTitle) {
    const title = strTitle.trim()
    if (!title) {
      return false
    }
    this.todoListModel.addTodo(new TodoItemModel({ title, completed : false }))
  }

  /**
   * Todoの状態を更新時に呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate ({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed })
  }

  /**
   * Todoを削除時に呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete ({ id }) {
    this.todoListModel.deleteTodo({ id })
  }

  /**
   * TodoListModelを変更した時の処理
   */
  handleChange () {
    const todoItems = this.todoListModel.getTodoItems()
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed}) => {
        this.handleUpdate({ id, completed })
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id })
      }
    })
    render(todoListElement, this.containerElement)
    this.todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`
  }

  /**
   * formを送信された時の処理
   * @param {Event} event 
   */
  handleSubmit (event) {
    event.preventDefault()
    this.handleAdd(this.inputElement.value)
    this.inputElement.value = ''
  }

  /**
   * 処理をマウントする
   */
  mount () {
    this.onChangeFnc = this.handleChange.bind(this) // 解除の時に使うので変数に格納
    this.todoListModel.onChange(this.onChangeFnc)

    this.handleSubmitFnc = this.handleSubmit.bind(this) // 解除の時に使うので変数に格納
    this.formElement.addEventListener('submit', this.handleSubmitFnc)
  }

  /**
   * マウントを解除する
   */
  unmount () {
    this.todoListModel.offChange(this.onChangeFnc)
    this.formElement.removeEventListener('submit', this.handleSubmitFnc)
  }
}