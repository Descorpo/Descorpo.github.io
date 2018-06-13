class Github {
    constructor() {
        this.client_id = 'e1c57cf7ccff838e9cb9';
        this.client_secret ='27141953515545105bda5479ed27dc877111a2e5';
    }

    getUser(name) {
        return new Promise((resolve,reject) => {

            fetch(`https://api.github.com/users/${name}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
                .then(res => res.json())
                .then(user => resolve(user))
                .catch(err => reject(err));
        })
    }

    getRepos(user) {
        return new Promise((resolve,reject) => {
            if (!user.login) return reject('User not found');

            fetch(`https://api.github.com/users/${user.login}/repos?per_page=${5}&sort=${'created: asc'}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
                .then(res => res.json())
                .then(user => resolve(user))
                .catch(err => reject(err));
        })
    }
}