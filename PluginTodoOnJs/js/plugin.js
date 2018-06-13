//HW6

let items = JSON.parse(localStorage.getItem('newItem')) || [];
let form = document.forms['formAddItem'];
let td = document.getElementsByClassName('td')
let tbody = document.querySelector('.tbody');
let inputName = form.elements['itemName'];
let inputPrice = form.elements['itemPrice'];
let notificationAlert = document.querySelector('.notification-alert');
let emptyList = document.querySelector('.empty-list');
let sortBtn = document.querySelector('.sort');
let sortBtnNum = document.querySelector('.sortBtnNum');
let sortGroup = document.querySelector('.sortGroup');
let numLess = document.querySelector('.numLess');
let numMore = document.querySelector('.numMore');
let sortArr = items.slice();
let newSort;
let sortVariable;
let btnGroup = document.querySelector('.btn-group');
let resetSort = document.querySelector('.reset-Sort');
let resetList = document.querySelector('.reset-list');


function generateId() {

    let id = '';

    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    for ( let i = 0; i < 15; i++ ) {

        let position = Math.floor(Math.random() * words.length);

        id += words[position];

    }

    return id;
};

function clearList() {

    tbody.innerHTML = '';

};

function generateList(item) {

    clearList();

    if ( item.length === 0 ) {

        sortBtn.classList.add('display-none');

        sortGroup.classList.add('display-none');

        resetSort.classList.add('display-none-reset');

        resetList.classList.add('display-none-reset');

        emptyListInfo({

            cssClass: 'alert-info',

            text: 'Empty list.'

        });

    };

    for ( let i = 0; i < item.length; i++ ){

        let template = `
        <tr data-id=${item[i].id}>
            <td>
            <span>
               ${item[i].name}
            </span>
            </td>
            <td class="td d-flex">
            <span>
                ${item[i].price}
            </span>
            </td>
        </tr>
        `;

        let icons = `
        <i class="fas fa-edit edit-item ml-auto"></i>
        <i class="fas fa-trash-alt delete-item ml-4"></i>
        `;

        tbody.insertAdjacentHTML('afterbegin', template);

        td[0].insertAdjacentHTML('beforeend', icons);

    };
};

function addList(list){

        let template = `
        <tr data-id=${list.id}>
            <td>
            <span>
               ${list.name}
            </span>
            </td>
            <td class="td d-flex">
            <span>
                ${list.price}
            </span>
            </td>
        </tr>
        `;


        let icons = `
            <i class="fas fa-edit edit-item ml-auto"></i>
            <i class="fas fa-trash-alt delete-item ml-4"></i>
        `;

        tbody.insertAdjacentHTML( 'afterbegin', template );

        td[0].insertAdjacentHTML( 'beforeend', icons );

        items.push(list);

        localStorage.setItem( 'newItem', JSON.stringify(items) );

        emptyList.classList.remove('show');

        sortBtn.classList.remove('display-none');

        sortGroup.classList.remove('display-none');

        resetSort.classList.remove('display-none-reset');

        resetList.classList.remove('display-none-reset');

        message({

            text: 'Товар добавлен',

            cssClass: 'alert-success',

            timeout: 4000

        });

};

function deleteListItem(id) {

    for ( let i = 0; i < items.length; i++ ) {

        if( items[i].id === id ) {

            items.splice(i,1);

            break;
        }
    };

    localStorage.setItem( 'newItem', JSON.stringify(items) );

    if ( items.length === 0 ) {

        sortBtn.classList.add('display-none');

        sortGroup.classList.add('display-none');

        resetSort.classList.add('display-none-reset');

        resetList.classList.add('display-none-reset');

        emptyListInfo({

            cssClass: 'alert-info',

            text: 'Empty list.'

        });

    };

    message({

        text: 'Товар удалено',

        cssClass: 'alert-danger',

        timeout: 4000

    });

};

function editListItem(id,newValue) {

    for ( let i = 0; i < items.length; i++ ) {

        if ( items[i].id === id ) {

            items[i].name = newValue[0].textContent;

            items[i].price = newValue[1].textContent;

            break;
        };
    };

    localStorage.setItem('newItem', JSON.stringify(items));

    message({

        text: 'Позиция редактирована',

        cssClass: 'alert-info',

        timeout: 4000

    });

};

function filterPrice (priceStart,priceEnd) {

    for ( let i = 0; i < sortArr.length; i++ ) {

        let val = sortArr[i].price;

        if ( val < priceStart || val > priceEnd ) {

            sortArr.splice(i--,1);
        };

    };

    sortArr.sort( function (prev,next) {

        return next.price - prev.price;

    });

    generateList(sortArr);

    newSort = sortArr;

    sortArr = items.slice();

};

function message(settings) {

    notificationAlert.classList.add(settings.cssClass);

    notificationAlert.textContent = settings.text;

    notificationAlert.classList.add('show');

    setTimeout( function () {

        notificationAlert.classList.remove('show');

        notificationAlert.classList.remove(settings.cssClass);

    }, settings.timeout);

};

function emptyListInfo(settings) {

    emptyList.classList.add(settings.cssClass);

    emptyList.textContent = settings.text;

    emptyList.classList.add('show');

};

form.addEventListener('submit', function (e) {

    e.preventDefault();

    if ( !inputName.value ) {

        inputName.classList.add('is-invalid')

    };

    if ( !inputPrice.value ) {

        inputPrice.classList.add('is-invalid')

    };

    if ( inputName.value && inputPrice.value ) {

        let items =
            {
                id: generateId(),

                name:  inputName.value,

                price: inputPrice.value
            };

        addList(items);

        form.reset();

    };

});

tbody.addEventListener('click', function (e) {

    if( e.target.classList.contains('delete-item') ) {

        let parent = e.target.closest('tr');

        let id = parent.dataset.id;

        deleteListItem(id);

        parent.remove();

    } else if ( e.target.classList.contains('edit-item') ) {

        e.target.classList.toggle('fa-save');

        let id = e.target.closest('tr').dataset.id;

        let span = e.target.closest('tr').querySelectorAll('span');

        if( e.target.classList.contains('fa-save') ) {

            for ( let i = 0; i < span.length; i++ ) {

                span[i].setAttribute( 'contenteditable',true );

                span[i].classList.add('info-set');

                span[0].focus();
            }

        } else {

            for ( let i = 0; i < span.length; i++ ) {

                span[i].setAttribute( 'contenteditable',false );

                span[i].classList.remove('info-set');

                span[i].blur();
            }

            editListItem(id,span);
        }
    }

});

inputName.addEventListener('keyup', function (e) {

    if ( inputName.value ){

        inputName.classList.remove('is-invalid');

    };
});

inputPrice.addEventListener('keyup', function (e) {

    if ( inputPrice.value ) {

        inputPrice.classList.remove('is-invalid');

    };
});

numLess.addEventListener('keyup', function (e) {

    if(numLess.value) {

        numLess.classList.remove('border-red');

    }
});

numMore.addEventListener('keyup', function (e) {

    if(numMore.value){

        numMore.classList.remove('border-red');

    }
});

sortBtn.addEventListener('click',function (e) {

    sortBtn.classList.toggle('sortPrice');

    if( e.target.classList.contains('sortPrice') ) {

        sortVariable = true

    } else {

        sortVariable = false

    }

    if(newSort){

        if( sortVariable === true ) {

            newSort.sort(function (prev,next) {

                return prev.price - next.price;

            })

        } else {

            newSort.sort(function (prev,next) {

                return next.price -prev.price;

            })
        };

        generateList(newSort);

    } else {

        if( sortVariable === true ) {

            items.sort(function (prev,next) {

                return prev.price - next.price;

            })

        } else {

            items.sort(function (prev,next) {

                return next.price -prev.price;

            })

        };

        generateList(items);

        localStorage.setItem('newItem', JSON.stringify(items));

    }

});

sortBtnNum.addEventListener('click',function (e) {

    if(!numLess.value) {

        numLess.classList.add('border-red');

    };
    if(!numMore.value) {

        numMore.classList.add('border-red');

    };

    if( numLess.value && numMore.value ) {

        generateList(items);

        filterPrice(+numLess.value,+numMore.value);

    }

    if ( newSort.length === 0 ) {

        resetSort.classList.add('visible-reset-filtr');

    }
});

resetSort.addEventListener('click',function (e) {

    newSort = items;

    numLess.value = '';

    numMore.value = '';

    generateList(items);

    if( newSort.length !== 0 ) {

        sortBtn.classList.remove('display-none');

        sortGroup.classList.remove('display-none');

        resetList.classList.remove('display-none-reset');

        resetSort.classList.remove('display-none-reset');

        resetSort.classList.remove('visible-reset-filtr');

        emptyList.classList.remove('show');
    }

});

resetList.addEventListener('click', function (e) {

    for ( let i = items.length - 1; i > -1; i-- ) {

        items.shift();

    }

    localStorage.setItem( 'newItem', JSON.stringify(items) );

    generateList(items);

});

generateList(items);
