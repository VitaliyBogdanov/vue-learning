if (!window.APP) {
    window.APP = {};
}
window.APP.vueInst = new Vue({
    el: '#app',
    data: function () {
        return {
            title: 'Список друзей',
            isShown: true,
            users: [],
            isVKAuthorized: false,
            VK_APP_ID: 6065525,
            FRIENDS_LIST: {
                order: 'random',
                count: 5
            },
            FRIENDS_FIELDS: {
                user_ids: [],
                fields: 'photo_200,bdate,first_name,last_name,nickname',
            }
        }
    },
    filters: {
        uppercase: function (value) {
            return value ? value.toString().toUpperCase() : '';
        }
    },
    computed: {
        totalUsers : function () {
            return this.users.length;
        },
        toggleButtonTitle: function () {
            return this.isShown ? 'Свернуть' : 'Развернуть'
        }
    },
    created: function () {
        this.fillList();
    },
    methods: {
        vkInit: function () {
            return new Promise((resolve, reject) => {

                if(this.isVKAuthorized) {
                    resolve();
                    return;
                }

                VK.init({
                    apiId: this.VK_APP_ID
                });

                VK.Auth.login(data => {
                    if (data.session) {
                        this.isVKAuthorized = true;
                        resolve();
                    } else {
                        reject(new Error('Не удалось авторизоваться'));
                    }
                }, 2);
            });
        },
        vkRequest: function (method, options =  {}) {

            if (!options.v) {
                options.v = '5.64';
            }

            return new Promise((resolve, reject) => {
                VK.api(method, options, data => {
                    if (data.error) {
                        reject(new Error(data.error.error_msg));
                    } else {
                        resolve(data.response);
                    }
                });
            });
        },
        fillList: function () {
            this.getFriends().then((response) => {

                this.users = [];
                this.FRIENDS_FIELDS.user_ids = [...response.items];

                this.getFriendsInfo().then(friends => {
                    [...friends].forEach( friend => {
                        // Вероятно это можно изящнее сделать
                        friend.full_name = `${friend.first_name || ''} ${friend.last_name || ''} ${friend.nickname || ''}`;

                        if(!friend.photo_200) {
                            friend.photo_200 = 'https://vk.com/images/camera_200.png?ava=1';
                        }

                        this.users.push(friend);
                    });
                });
            })
        },
        getFriends: function () {

            return this.vkInit()
                .then(() => this.vkRequest('friends.get', this.FRIENDS_LIST))
                .catch(e => console.error('Ошибка: ' + e.message));

        },
        getFriendsInfo: function () {
            return this.vkRequest('users.get', this.FRIENDS_FIELDS)
                .catch(e => console.error('Ошибка: ' + e.message));
        },
        toggleList: function() {
            this.isShown = !this.isShown;
        }
    }
});