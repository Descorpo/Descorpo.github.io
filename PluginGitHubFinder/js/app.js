const github = new Github();
const ui = new UI();
const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    if(userText !== '') {
        ui.showLoading();
        github.getUser(userText)
            .then(user => {
                if (user.message === 'Not Found') {
                    ui.showAlert(`User:${userText} not found`,'alert alert-danger');
                    ui.clearProfile();
                } else {
                    ui.showProfile(user);
                }
                return user
            })
            .then(user => github.getRepos(user))
            .then(repos => ui.showRepos(repos))
            .catch(err => console.log(err));
    } else {
        ui.clearProfile();
    }
});