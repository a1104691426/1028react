import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App'
import store from './redux/store';


// 读取local中保存user, 保存到内存中

ReactDOM.render((<Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter></Provider>),
document.getElementById('root'))


