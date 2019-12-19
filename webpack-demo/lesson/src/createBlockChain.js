const blockchain = require('./blockchain.jpg');

function createBlockChain() {
  let img = new Image();
  img.src = blockchain.default;
  img.classList.add('blockChain');

  const root = document.getElementById('root');
  root.append(img);
}

export default createBlockChain;