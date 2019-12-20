// import './style.css';
//
// var btn = document.createElement('button');
// btn.innerHTML = 'add';
// document.body.appendChild(btn);
// btn.onclick = function() {
//   var div = document.createElement('div')
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// };
//
//

import number from './number.js';
import counter from './counter.js';

counter();
number();

// 如果开启了热更新
if(module.hot) {
  // 如果 number.js 这个文件发生变化，那么就会执行后面的回调函数。
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  })
}
