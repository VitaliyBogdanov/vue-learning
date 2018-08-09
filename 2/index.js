if (!window.APP) {
    window.APP = {};
}

Vue.component('users-list', {
    template: '#users-list',
    data: function () {
        return {
            APIpath: 'http://localhost:3000/users',
            usersTotal: 0,
            users: []
        }
    },
    asyncComputed: {
        users: {
            get: function () {
                return fetch(this.APIpath).then((response) => {
                    return response.json();
                })
            },
            default: 'Loading...'
        }
    },
    filters: {},
    computed: {
        title: function () {
            return `Users list (${this.usersTotal})`
        }
    },
    methods: {
        removeUser: function (userId) {

            userId = parseInt(userId, 10);

            let confirmation = confirm('Are you sure you want to delete the user?');
            if (confirmation) {

                let removeOptions = {
                    method: 'DELETE'
                };

                fetch(`${this.APIpath}/${userId}`, removeOptions)
                    .then(() => {
                        this.removeFromList(userId);
                    });
            }
        },
        removeFromList: function (userId) {
            // Подглядел это в статье :D
            // мой код содержал 7(!) строк
            this.users = this.users.filter(user => user.id !== userId);
        },
        showUser: function (userId) {
            this.$root.$emit('showUser', userId);
        }
    },
    watch: {
        users: function () {
            this.usersTotal = this.users.length;
            console.log('User data is loaded - ', this.users);
        }
    }
});

Vue.component('user-info', {
    template: '#user-info',
    data: function () {
        return {
            APIpath: 'http://localhost:3000/users',
            title: 'Error. User Id is undefined',
            userId: null
        }
    },
    props: ['user'],
    created: function () {
        this.userId = this.user;
    },
    asyncComputed: {
        userData: {
            get: function () {
                return fetch(`${this.APIpath}/${this.userId}`).then((response) => {
                    console.log('User data is loaded - ', response);
                    return response.json();
                })
            },
            shouldUpdate: function () {
                return this.userId !== null
            },
            watch: function() {
                this.userId
            }
        },

    },
    methods: {
        showUsersList: function () {
            this.$root.$emit('showUsersList');
        }
    },
    watch: {
        userData: function () {
            this.title = `User info - ${this.userData.firstName} ${this.userData.lastName} #${this.userData.id}`;
        }
    }
});

new Vue({
    el: '#app',
    data: function () {
        return {
            activeComponent: 'users-list',
            userId: 0
        }
    },
    created: function () {
        this.$on('showUsersList', function() {
            this.activeComponent = 'users-list'
        });

        this.$on('showUser', function(userId) {
            this.userId = userId;
            this.activeComponent = 'user-info';
        });

        let params = this.getUrlParam();
        if (params.userId) {
            this.userId = params.userId;
            this.activeComponent = 'user-info'
        }
    },
    methods: {
        getUrlParam: function () {
            return window
                .location
                .search
                .replace('?', '')
                .split('&')
                .reduce(
                    function (p, e) {
                        let a = e.split('=');
                        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                        return p;
                    },
                    {}
                );
        },
    }
});
