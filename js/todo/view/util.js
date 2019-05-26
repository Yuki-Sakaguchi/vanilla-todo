/**
 * htmlEscape
 * @param {string} str 
 */
export function escapeSpecialChars (str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
}

/**
 * 文字列からElementを生成して返す
 * @param {string} html 
 * @return {Element}
 */
export function htmlToElement (html) {
  const tmp = document.createElement('template')
  tmp.innerHTML = html
  return tmp.content.firstElementChild
}

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 * @return {Element}
 */
export function element (strings, ...values) {
  const htmlStr = strings.reduce((result, string, i) => {
    const value = values[i - 1]
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + string
    } else {
      return result + String(value) + string
    }
  })
  return htmlToElement(htmlStr)
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function render (bodyElement, containerElement) {
  containerElement.innerHTML = ''
  containerElement.appendChild(bodyElement)
}
