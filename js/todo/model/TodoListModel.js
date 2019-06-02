import { EventEmitter } from './EventEmitter.js'

/**
 * Todoリストを表現するモデル
 * @class TodoListModel
 */
export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor (items = []) {
    super()
    this.items = items
  }

  /**
   * TodoItemの合計個数を返す
   */
  getTotalCount () {
    return this.items.length
  }

  /**
   * 表示できるTodoItemの配列を返す
   */
  getTodoItems () {
    return this.items
  }

  /**
   * TodoListの状態が更新された時に呼び出されるリスナー関数を登録する
   * @param {Function} listener 
   */
  onChange (listener) {
    this.addEventListener('change', listener)
  }

  /**
   * TodoListの更新リスナーを解除する
   * @param {Function} listener 
   */
  offChange(listener) {
    this.removeEventListener('change', listener)
  }

  /**
   * 状態が更新された時に呼ぶ
   * 登録済みのリスナー関数を呼び出す
   */
  emitChange () {
    this.emit('change')
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem 
   */
  addTodo (todoItem) {
    this.items.push(todoItem)
    this.emitChange()
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id: number, completed: boolean }} 
   */
  updateTodo ({ id, completed }) {
    const todoItem = this.items.find(todo => todo.id === id)
    if (!todoItem) {
      return false
    }
    todoItem.completed = completed
    this.emitChange()
  }

  /**
   * 指定したidのTodoItemを削除
   * @param {{ id: number }}
   */
  deleteTodo ({ id }) {
    this.items = this.items.filter(todo => {
      return todo.id !== id
    })
    this.emitChange()
  }
}
