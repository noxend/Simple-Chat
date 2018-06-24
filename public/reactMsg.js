
import React from 'react';
import {render} from 'react-dom';

function helloDiv() {
    return(
        <div>hello world!</div>
    );
}

render(<helloDiv/>, document.getElementById('block_messageID'));

console.log('work');


