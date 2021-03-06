# ES6モジュールでTODOアプリを作成する
* https://yuki-sakaguchi.github.io/vanilla-todo/index.html

# 今回の実装で学んだこと
* ES6 modules
  * type="modules"
  * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import
  * https://ics.media/entry/16511/
* templateタグ
  * https://developer.mozilla.org/ja/docs/Web/HTML/Element/template
* テンプレート文字列
  * タグ付けされたテンプレート文字列リテラル
  * タグ関数
  * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings#%E3%82%BF%E3%82%B0%E4%BB%98%E3%81%91%E3%81%95%E3%82%8C%E3%81%9FTemplate_literal
* モデルとビュー
  * Todoタスクに関する処理はModelを作ってそこに分けた
    * ListとItemをそれぞれ作って組み合わせた
  * ViewもModelと対になるように用意した
  * App.jsではView -> Model, Modle -> Viewの処理を紐づかせるだけに集中させた
    * 表示とロジックの管理者的な扱い
* removeEventListenerはaddEventListenerした時の関数を同じ参照を渡さないといけないので、変数に格納しておけばいい（classなどでthisで呼び出す関数の場合）
  * そもそも関数を変数に定義している場合は気にならない

# 参考
* [Todoアプリ · JavaScriptの入門書 #jsprimer](https://jsprimer.net/use-case/todoapp/)
  * 最新のJavaScript moduleを使ったtodoMVCの実装
* [todoMVC](http://todomvc.com/)
  * 色々なライブラリを使って作ったTodo実装のまとめ