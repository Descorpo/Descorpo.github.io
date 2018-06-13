// Init Tasks module
const tasks = Tasks.getInstance();

// Init UI module
const ui = UI;

// Init Localstorage module
const localstorage = Localstorage;

// Init Notification
const notification = Notification;

//Init filter
const filtertask = FilterTask;

// Init Observers
const addTaskObserver = new EventObserver();
const removeTaskObserver = new EventObserver();
const removeAllTasksObserver = new EventObserver();
const editListItemObserver = new EventObserver();

// Subscribe on add task event
addTaskObserver.subscribe(localstorage.update);
addTaskObserver.subscribe(notification.show);
addTaskObserver.subscribe(ui.checkList);

removeTaskObserver.subscribe(localstorage.update);
removeTaskObserver.subscribe(notification.show);
removeTaskObserver.subscribe(ui.checkList);

removeAllTasksObserver.subscribe(localstorage.update);
removeAllTasksObserver.subscribe(notification.show);
removeAllTasksObserver.subscribe(ui.checkList);

editListItemObserver.subscribe(localstorage.update);
editListItemObserver.subscribe(notification.show);
editListItemObserver.subscribe(ui.checkList);

// Init elements
const form = document.forms['addTodoItem'];
const inputText = form.elements['todoText'];
const ul = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const searchBtn = document.getElementById('searchBtn');
let searchInput = document.getElementById('searchText');
const resetBtn = document.getElementById('resetBtn');
const emptyFilter = document.querySelector('.empty-filter');

window.addEventListener('load', function (e) {
    let ls = localstorage.getTasks();

    if (ls.length) {
        ls.forEach(task => {
            tasks.addTask(task)
                .then(oneTask => ui.addTask(oneTask));
        });
    } else {
        ui.checkList();
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!inputText.value) {
        inputText.classList.add('is-invalid')
    } else {
        tasks.addTask({ text: inputText.value })
            .then( task => ui.addTask(task) )
            .then(() => addTaskObserver.fire({
                text: 'Новая задача добавлена успешно!',
                class: 'alert alert-success'
            }));

        form.reset();
    }
});

ul.addEventListener('click', function (e) {
    if ( e.target.classList.contains('delete-item') ) {

        let id = e.target.closest('li').getAttribute('data-id');

        tasks.removeTask(id)
            .then( () => ui.deleteTask(id) )
            .then( () => removeTaskObserver.fire({
                text: 'Задача удалена успешно!',
                class: 'alert alert-warning'
            }))
    } else if ( e.target.classList.contains('edit-item') ) {
        e.target.classList.toggle('fa-save');

        let id = e.target.closest('li').dataset.id;
        let span = e.target.closest('li').querySelector('span');

        if ( e.target.classList.contains('fa-save') ) {
                span.setAttribute( 'contenteditable', true );
                span.classList.add('info-set');
                span.focus();
        }  else {
                span.setAttribute( 'contenteditable', false ) ;
                span.classList.remove('info-set');
                span.blur();
                tasks.editListItem( id, span )
                    .then( () => editListItemObserver.fire({
                        text: 'Задача редактирована успешно!',
                        class: 'alert alert-success'
                    }))
        }
    }
});

clearBtn.addEventListener('click', function (e) {
    tasks.removeAll()
        .then(() => ui.deleteAll())
        .then(() => removeAllTasksObserver.fire({
            text: 'Все задачи удалены успешно!',
            class: 'alert alert-warning'
        }))
});

inputText.addEventListener('keyup', function () {
    if ( inputText.value ){
        inputText.classList.remove('is-invalid');
    }
});

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    ul.innerHTML = '';

    let inputSearchText = searchInput.value.toLowerCase();
    let result = filtertask.newFilter(inputSearchText);

    if(!searchInput.value){
        searchInput.classList.add('is-invalid')
    }

    if ( searchInput.value ){
        searchInput.classList.remove('is-invalid');
    }

    for (let i = 0; i < result.length; i++) {
        ui.addTask(result[i]);
    }

    if(emptyFilter.previousElementSibling.classList.contains('show')){
        ul.innerHTML = '';
    }

    if(ul.innerHTML === '' && !emptyFilter.previousElementSibling.classList.contains('show')){
        emptyFilter.classList.add('show');
    } else {
        emptyFilter.classList.remove('show');
    }
});

searchInput.addEventListener('keyup', function () {
    if(searchInput.value){
        searchInput.classList.remove('is-invalid')
    }
});

resetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    ul.innerHTML = '';

    emptyFilter.classList.remove('show');

    let ls = localstorage.getTasks();

    ls.forEach(task => ui.addTask(task));

    ui.checkList();
});