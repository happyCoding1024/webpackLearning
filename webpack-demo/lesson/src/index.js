import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
const blockchain = require('./blockchain.jpg');
import './index.scss'

let img = new Image();
img.src = blockchain.default;
img.classList.add('blockChain');

const root = document.getElementById('root');
root.append(img);

new Header();
new Sidebar();
new Content();
