const result = document.getElementById('result');
const current = document.getElementById('current');
const clear = document.getElementById('clear');
const input = document.getElementById('input');
let operate = '';
let period = false;

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if (a == 0 || b == 0) return 'Error';
    return Math.round(a / b * 10000) / 10000;
}

const output = function(res, cur, op = '') {
    result.textContent = res;
    current.textContent = cur;
    operate = op;
}

const addAllEventListener = function() {

    input.addEventListener('click', function(e) {
        const content = e.target.textContent;
        const id = e.target.id;

        if (e.target.classList.contains('button')) {

            if (current.textContent === 'Error') current.textContent = '';

            if (
                (
                id === 'divide'
                || id === 'multiply'
                || id === 'subtract'
                || id === 'add'
                )
                && current.textContent === ''
                ) {
                current.textContent = '0';
                console.log('empty current');
            }

            switch (true) {
                case (!isNaN(content)):
                    current.textContent += content;
                    break;

                case id === 'add':
                    period = false;
                    if (operate === '') {
                        output(
                            `${current.textContent} ${content}`,
                            '',
                            add
                        );
                    } else if (operate && current.textContent == 0) {
                        output(
                            `${result.textContent.match(/^[\d\.]+/)} ${content}`,
                            '', 
                            add
                        );
                    } else {
                        output(
                            `${operate(
                                +result.textContent.match(/^[\d\.]+/), 
                                +current.textContent
                                )} ${content}`,
                            '', 
                            add
                        );
                    }      
                    break;

                case id === 'subtract':
                    period = false;
                    if (operate === '') {
                        output(
                            `${current.textContent} ${content}`,
                            '',
                            subtract
                        );
                    } else if (operate && current.textContent == 0) {
                        output(
                            `${result.textContent.match(/^[\d\.]+/)} ${content}`,
                            '', 
                            subtract
                        );
                    } else {
                        output(
                            `${operate(
                                +result.textContent.match(/^[\d\.]+/),
                                +current.textContent
                                )} ${content}`,
                            '',
                            subtract
                        );
                    }
                    break;
                
                case id === 'multiply':
                    period = false;
                    if (operate === '') {
                        output(
                            `${current.textContent} ${content}`,
                            '',
                            multiply
                        );
                    } else if (operate && current.textContent == 0) {
                        output(
                            `${result.textContent.match(/^[\d\.]+/)} ${content}`,
                            '', 
                            multiply
                        );
                    } else {
                        output(
                            `${operate(
                                +result.textContent.match(/^[\d\.]+/),
                                +current.textContent
                                )} ${content}`,
                            '',
                            multiply
                        );
                    }
                    break;
                
                case id === 'divide':
                    period = false;
                    if (operate === '') {
                        output(
                            `${current.textContent} ${content}`,
                            '',
                            divide
                        );
                    } else if (operate && current.textContent == 0) {
                        output(
                            `${result.textContent.match(/^[\d\.]+/)} ${content}`,
                            '', 
                            divide
                        );
                    } else {
                        output(
                            `${operate(
                                +result.textContent.match(/^[\d\.]+/),
                                +current.textContent
                                )} ${content}`,
                            '',
                            divide
                        );
                    }
                    break;

                case id === 'equal':
                    if (operate !== '') {
                        if (current.textContent !== '') {
                            output(
                                '',
                                operate(
                                    +result.textContent.match(/^[\d\.]+/),
                                    +current.textContent
                                    )
                            );
                        } else {
                            output(
                                '',
                                result.textContent.match(/^[\d\.]+/)
                            );
                            operate = '';
                        }
                        if (current.textContent.match(/\./g)) {
                            period = true;
                        } else {
                            period = false;
                        }
                    }
                    break;

                case id === 'period':
                    if (!period) {
                        current.textContent += content;
                        period = true;
                    }
            }
        }
    });

    clear.addEventListener('click', function(e) {
        const id = e.target.id;
        if (e.target.classList.contains('button')) {
            switch (id) {
                case 'ac':
                    output('', '');
                    period = false;
                    break;
                case 'del':
                    if (current.textContent.length > 0) {
                        if (current.textContent.slice(-1) === '.') {
                            period = false;
                        }
                        current.textContent = current.textContent.slice(0, -1);
                    }
                    break;
            }
        }
    });

    const clickEl = function(name) {
    document.getElementById(name).click()
    }
    window.addEventListener('keydown', function(e) {
        const key = e.key
        switch (true) {
            case !isNaN(key):
                clickEl(key);
                break;

            case key === '.':
                clickEl('period');
                break;

            case key === '/':
                clickEl('divide');
                break;
            
            case key === '*':
                clickEl('multiply');
                break;

            case key === '+':
                clickEl('add');
                break;

            case key === '-':
                clickEl('subtract');
                break;

            case key === 'Enter':
                clickEl('equal');
                break;
            
            case key === 'Backspace'
                && e.metaKey === true:
                clickEl('ac');
                break;
            
            case key === 'Backspace':
                clickEl('del');
                break;
        }
    });
}

addAllEventListener();