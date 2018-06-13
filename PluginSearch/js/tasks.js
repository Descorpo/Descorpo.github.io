// Init Id module
const id = Id;

const Tasks = (function () {
    let tasks = [];
    let instance;
    
    const getTasks = function () {
        return tasks;
    };
    
    const setTasks = function (array) {
        tasks = array;

        return tasks;
    };
    
    const addTask = async function (task) {
        task.id = id.generate();

        await tasks.unshift(task);

        return task;
    };

    const removeTask = async function (id) {
        tasks = await tasks.filter(task => task.id !== id);

        return tasks;
    };

    const removeAll = async function () {
        tasks = [];
    };

    const editListItem = async function (id, newValue) {
        for ( let i = 0; i < ul.children.length; i++ ) {

            if ( tasks[i].id === id ) {
                tasks[i].text = newValue.textContent;
                break;
            }
        }
    };

    const createInstance = function () {
        return {
            getTasks,
            setTasks,
            addTask,
            removeTask,
            removeAll,
            editListItem
        }
    };

    return {
        getInstance: function () {
            return instance || (instance = createInstance());
        }
    }
}());