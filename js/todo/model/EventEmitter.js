
/**
 * イベントの登録、ディスパッチ、解除のクラス
 * @class EventEmitter
 */
export class EventEmitter {
  constructor () {
    // 登録するイベント名とリスナー関数を管理するMap
    this._listeners = new Map()
  }

  /**
   * 指定したイベントが実行された時に呼び出されるリスナー関数を登録する
   * @param {string} type 
   * @param {Function} listener 
   */
  addEventListener (type, listener) {
    if (!this._listeners[type]) {
      // まだ登録されてないイベントの場合は新しくセットする
      this._listeners.set(type, new Set())
    }
    // イベントのセットを取り出して、リスナー関数を追加
    const listenerSet = this._listeners.get(type)
    listenerSet.add(listener)
  }

  /**
   * 指定したイベントをディスパッチする
   * @param {string} type 
   */
  emit (type) {
    const listenerSet = this._listeners.get(type)
    if (!listenerSet) {
      // 無ければ終わり
      return false;
    }
    // 紐づいている関数を全て実行
    listenerSet.forEach(listener => {
      listener.call(this)
    })
  }

  /**
   * 指定したイベントのリスナー関数を解除
   * @param {string} type 
   * @param {Function} listener 
   */
  removeEventListener (type, listener) {
    const listenerSet = this._listeners.get(type)
    if (!listenerSet) {
      return false;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
          listenerSet.delete(listener)
      }
    })
  }
}