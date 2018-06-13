const UI = (function () {
    const ul = document.querySelector('.list-group');
    const emptyAlert = document.querySelector('.empty-alert');

    const listTemplate = function (task) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let iEdit = document.createElement('i');
        let iDelete = document.createElement('i');

        span.textContent = task.text;

        li.setAttribute('data-id', task.id);

        li.className = 'list-group-item d-flex align-items-center';
        iEdit.className = 'fas fa-edit edit-item ml-auto';
        iDelete.className = 'fas fa-trash-alt delete-item ml-4';

        li.appendChild(span);
        li.appendChild(iEdit);
        li.appendChild(iDelete);

        return li;
    };

    const addTask = function (task) {
        ul.insertAdjacentElement('afterbegin', listTemplate(task));
    };

    const deleteTask = function (id) {
        const li = ul.querySelector(`[data-id="${id}"]`);

        li.remove();
    };

    const checkList = function () {
        if (!ul.children.length) {
            emptyAlert.classList.add('show');
        } else {
            emptyAlert.classList.remove('show');
        }
    };

    const deleteAll = function () {
        ul.innerHTML = '';
    };

    const checkFilter = function () {
        if(ul.innerHTML === ''){
            emptyFilter.style.display = 'block'
        } else {
            emptyFilter.style.display = 'none'
        }
    };

    return {
        addTask,
        deleteTask,
        checkList,
        deleteAll,
        checkFilter
    }
}());