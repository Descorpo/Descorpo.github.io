const findVisit = $('#findVisit');
const dataBase = new Users();
const initUrl = 'https://descorpo.github.io';

function onClickVisit() {
    const inputValue = $('#findUserInput').val();
    const allUsers = dataBase.getAllUsers();
    const user = allUsers.find(user => user.name.toLowerCase().trim() === inputValue.toLowerCase().trim());
    if (!user) {
        // todo show an error
    } else {
        window.open(`${initUrl}/${user.name}`,'_self');
    }
}

findVisit.on('click', onClickVisit);