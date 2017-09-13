webpackJsonp([11],{

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_timer__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_throttletime__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_throttletime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_throttletime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http, afAuth, storage, db) {
        var _this = this;
        this.http = http;
        this.afAuth = afAuth;
        this.storage = storage;
        this.db = db;
        this.user = db.object('/users');
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.loggedUserId = user.uid;
                _this.updateOnConnect();
                _this.updateOnDisconnect();
                _this.updateOnIdle();
            }
        });
    }
    AuthProvider.prototype.loggedUser = function () {
        return this.afAuth.authState;
    };
    AuthProvider.prototype.loggedUserMetaData = function (uid) {
        return this.db.object('/users/' + uid);
    };
    AuthProvider.prototype.updateOnConnect = function () {
        var _this = this;
        return this.db.object('.info/connected').subscribe(function (connected) {
            if (connected) {
                var status_1 = connected.$value ? 'online' : 'offline';
                _this.updateStatus(status_1);
            }
        });
    };
    AuthProvider.prototype.updateOnDisconnect = function () {
        __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users/' + this.loggedUserId)
            .onDisconnect()
            .update({ status: 'offline' });
    };
    AuthProvider.prototype.updateOnIdle = function () {
        var _this = this;
        this.mouseEvent = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"]
            .fromEvent(document, "mouseMove")
            .throttleTime(2000)
            .subscribe(function () {
            _this.updateStatus('online');
            _this.resetTimer();
        });
    };
    AuthProvider.prototype.resetTimer = function () {
        var _this = this;
        this.timer.unsubscribe();
        this.timer = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].timer(5000)
            .subscribe(function () {
            _this.updateStatus('away');
        });
    };
    AuthProvider.prototype.updateStatus = function (status) {
        this.db.object('users/' + this.loggedUserId).update({ 'status': status });
    };
    AuthProvider.prototype.register = function (email, pass) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.login = function (email, pass) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    };
    AuthProvider.prototype.fbLogin = function () {
        var _this = this;
        var fbAuth = this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].FacebookAuthProvider());
        fbAuth.then(function (res) {
            var data = res.user;
            _this.db.object('/users/' + data.uid).set({ email: data.email, photo: data.photoURL, displayName: data.displayName, isVerified: true });
        });
        return fbAuth;
    };
    AuthProvider.prototype.googleLogin = function () {
        var _this = this;
        var googleAuth = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider());
        googleAuth.then(function (res) {
            var data = res.user;
            _this.db.object('/users/' + data.uid).set({ email: data.email, photo: data.photoURL, displayName: data.displayName, isVerified: true });
        });
        return googleAuth;
    };
    AuthProvider.prototype.createUser = function (uId, email, photo, name) {
        this.db.object('/users/' + uId).set({ email: email, photo: photo, displayName: name });
    };
    AuthProvider.prototype.loginVerified = function (uId) {
        var _this = this;
        // check first if user account already verified
        var user = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users/' + uId);
        user.once("value")
            .then(function (snapshot) {
            if (!snapshot.hasChild('isVerified')) {
                _this.db.object('/users/' + uId).update({ isVerified: true });
            }
        });
    };
    AuthProvider.prototype.loggedOut = function () {
        this.updateStatus('offline');
        this.afAuth.auth.signOut();
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/chat/chat.module": [
		467,
		10
	],
	"../pages/individual-chat/individual-chat.module": [
		468,
		9
	],
	"../pages/landing/landing.module": [
		469,
		8
	],
	"../pages/login/login.module": [
		470,
		7
	],
	"../pages/notifications/notifications.module": [
		471,
		6
	],
	"../pages/profile/profile.module": [
		472,
		5
	],
	"../pages/register/register.module": [
		473,
		4
	],
	"../pages/reset-password/reset-password.module": [
		474,
		1
	],
	"../pages/settings/settings.module": [
		475,
		3
	],
	"../pages/tabs/tabs.module": [
		476,
		2
	],
	"../pages/userslist/userslist.module": [
		477,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 207;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ChatProvider = (function () {
    function ChatProvider(http, db, afAuth) {
        var _this = this;
        this.http = http;
        this.db = db;
        this.afAuth = afAuth;
        this.usersRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users');
        afAuth.authState.subscribe(function (user) {
            _this.user = _this.db.object('/users/' + user.uid, { preserveSnapshot: true });
            _this.user.subscribe(function (userData) {
                _this.user = userData.val();
                var photo;
                if (!('photo' in _this.user)) {
                    photo = 'none';
                }
                else {
                    photo = userData.val().photo;
                }
                _this.getLoggedUserPhoto(photo);
                _this.loggedUserId = userData.key;
                _this.loggedUserName = userData.val().displayName;
            });
        });
    }
    ChatProvider.prototype.getUsers = function () {
        this.users = this.db.list('/users', {
            query: {
                orderByChild: 'isVerified',
                equalTo: true
            }
        });
        return this.users;
    };
    ChatProvider.prototype.getLoggedUserPhoto = function (photo) {
        this.loggedUserPhoto = photo;
    };
    ChatProvider.prototype.getLoggedUserId = function () {
        return this.loggedUserId;
    };
    ChatProvider.prototype.chatMember = function (user2Id, user2) {
        var user1Id = this.loggedUserId;
        var user1 = this.loggedUserName;
        // let user2 = receiverId;
        var roomName = (user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1);
        roomName = roomName.replace(/\ /g, '-');
        var obj = {};
        obj[user1] = true;
        obj[user2] = true;
        this.db.object('/chat_room/' + roomName).set(obj);
        return roomName;
    };
    ChatProvider.prototype.sendMessage = function (chatRoom, chatMsg, receiverId) {
        var _this = this;
        chatRoom = chatRoom.replace(/\ /g, '-');
        this.db.list('/chats/' + chatRoom).push({
            name: this.loggedUserName,
            senderPhoto: this.loggedUserPhoto,
            message: chatMsg,
            timestamp: __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"].ServerValue.TIMESTAMP
        });
        var unreadObj = {};
        unreadObj[chatRoom] = true;
        // check if unreadMsg already exist
        var ref = this.db.object('/users/' + receiverId + '/unreadMsg').$ref.transaction(function (currentValue) {
            if (currentValue === null) {
                _this.db.object('/users/' + receiverId + '/unreadMsg').update(unreadObj);
                var objToPush = {};
                objToPush[_this.loggedUserId] = true;
                _this.db.list('/users/' + receiverId + '/unreadMsg/' + chatRoom).push(objToPush);
            }
            else {
                var objToPush = {};
                objToPush[_this.loggedUserId] = true;
                _this.db.list('/users/' + receiverId + '/unreadMsg/' + chatRoom).push(objToPush);
            }
        });
        //this.db.object('/users/'+receiverId+'/unreadMsg').update(unreadObj);
    };
    ChatProvider.prototype.loadChats = function (chatRoom) {
        var chatsObservable = this.db.list('/chats/' + chatRoom);
        return chatsObservable;
    };
    return ChatProvider;
}());
ChatProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]])
], ChatProvider);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushnotifProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PushnotifProvider = (function () {
    function PushnotifProvider(db, afAuth) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.messaging = __WEBPACK_IMPORTED_MODULE_3_firebase__["messaging"]();
        this.currentMessage = new __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.afAuth.authState.subscribe(function (user) {
            _this.userLoggedId = user.uid;
        });
    }
    PushnotifProvider.prototype.updateToken = function (token) {
        var _this = this;
        this.afAuth.authState.take(1).subscribe(function (user) {
            console.log('updated . . .');
            if (!user)
                return;
            var data = (_a = {}, _a[user.uid] = token, _a);
            _this.db.object('/fcmTokens/').update(data);
            var _a;
        });
    };
    PushnotifProvider.prototype.getPermission = function () {
        var _this = this;
        this.messaging.requestPermission()
            .then(function () {
            console.log('Notification permission granted.');
            return _this.messaging.getToken();
        })
            .then(function (token) {
            console.log(token);
            _this.updateToken(token);
        })
            .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });
    };
    PushnotifProvider.prototype.receiveMessage = function () {
        var _this = this;
        this.messaging.onMessage(function (payload) {
            console.log("Message received. ", payload);
            _this.currentMessage.next(payload);
        });
    };
    return PushnotifProvider;
}());
PushnotifProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], PushnotifProvider);

//# sourceMappingURL=pushnotif.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserProvider = (function () {
    function UserProvider(http, afAuth) {
        var _this = this;
        this.http = http;
        this.afAuth = afAuth;
        this.usersRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('users/');
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.loggedUserId = user.uid;
            }
        });
    }
    UserProvider.prototype.users = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.usersRef.once('value', function (snapshot) {
                var userData = snapshot.val();
                var userArr = [];
                for (var userKey in userData) {
                    if (userKey != _this.loggedUserId) {
                        if (!("friends" in userData[userKey])) {
                            userArr.push(userData[userKey]);
                            userData[userKey]['key'] = userKey;
                        }
                        else {
                            var friendArr = [];
                            for (var friendKey in userData[userKey].friends) {
                                friendArr.push(friendKey);
                            }
                            var friendReqArr = [];
                            for (var friendReqKey in userData[_this.loggedUserId].friendReq) {
                                friendArr.push(friendReqKey);
                            }
                            if (friendArr.indexOf(_this.loggedUserId) == -1) {
                                userArr.push(userData[userKey]);
                                userData[userKey]['key'] = userKey;
                            }
                        }
                    }
                }
                resolve(userArr);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.sendFriendRequest = function (recipient) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // add friendReq node to the sender user
            __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("users/" + _this.loggedUserId + "/friendReq/" + recipient.key).set('false');
            // add friend node to the recipient user
            var friendReq = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("users/" + recipient.key + "/friends/" + _this.loggedUserId).set('false');
            resolve(friendReq);
        });
        return promise;
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
], UserProvider);

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(319);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_chat_chat__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_user_user__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_pushnotif_pushnotif__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// Firebase Imports



// Auth Service



// Providers



// Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyAAGkJZJsX9QGUEkKzx_ZEEzQWFJJ27oEs",
    authDomain: "ionicapp-2e811.firebaseapp.com",
    databaseURL: "https://ionicapp-2e811.firebaseio.com",
    storageBucket: "ionicapp-2e811.appspot.com",
    messagingSenderId: "1063432282060"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                tabsPlacement: 'top',
                tabsHideOnSubPages: true
            }, {
                links: [
                    { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/individual-chat/individual-chat.module#IndividualChatPageModule', name: 'IndividualChatPage', segment: 'individual-chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordPageModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/userslist/userslist.module#UserslistPageModule', name: 'UserslistPage', segment: 'userslist', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_pushnotif_pushnotif__["a" /* PushnotifProvider */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, authProvider, storage) {
        var _this = this;
        this.authProvider = authProvider;
        this.storage = storage;
        this.rootPage = 'LandingPage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        storage.get('userId').then(function (user) {
            if (user != null) {
                _this.rootPage = 'TabsPage';
            }
            else {
                _this.rootPage = 'LandingPage';
            }
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\ph2150108\Desktop\angular4\FireChat\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\ph2150108\Desktop\angular4\FireChat\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[303]);
//# sourceMappingURL=main.js.map