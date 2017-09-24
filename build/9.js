webpackJsonp([9],{

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatsPageModule", function() { return ChatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chats__ = __webpack_require__(478);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatsPageModule = (function () {
    function ChatsPageModule() {
    }
    return ChatsPageModule;
}());
ChatsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */]),
        ],
    })
], ChatsPageModule);

//# sourceMappingURL=chats.module.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_pushnotif_pushnotif__ = __webpack_require__(302);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatsPage = (function () {
    function ChatsPage(navCtrl, navParams, chatProvider, storage, authProvider, app, pushnotifProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatProvider = chatProvider;
        this.storage = storage;
        this.authProvider = authProvider;
        this.app = app;
        this.pushnotifProvider = pushnotifProvider;
        this.friends = [];
        this.friendOffline = [];
        this.storage.get('userId').then(function (userId) {
            _this.authProvider.loggedUserMetaData(userId).subscribe(function (userData) {
                _this.loadChatUsers(userId, userData.displayName);
            });
        });
    }
    ChatsPage.prototype.pushPage = function (page) {
        this.navCtrl.push('UserslistPage');
    };
    ChatsPage.prototype.loadChatUsers = function (userId, userName) {
        var _this = this;
        this.chatProvider.loadChatUsersFriendReq(userId).subscribe(function (users) {
            var friendArr = [];
            if ('friendReq' in users) {
                for (var friendKey in users.friendReq) {
                    if (friendArr.indexOf(friendKey) == -1) {
                        friendArr.push(friendKey);
                    }
                }
            }
            if ('friends' in users) {
                for (var friendKey in users.friends) {
                    if (friendArr.indexOf(friendKey) == -1) {
                        friendArr.push(friendKey);
                    }
                }
            }
            if (friendArr.length > 0) {
                for (var _i = 0, friendArr_1 = friendArr; _i < friendArr_1.length; _i++) {
                    var friendKey = friendArr_1[_i];
                    _this.chatProvider.getFriendMetaData(friendKey).subscribe(function (userData) {
                        var roomName = (userName < userData.displayName ? userName + '_' + userData.displayName : userData.displayName + '_' + userName);
                        roomName = roomName.replace(/\ /g, '-');
                        _this.chatProvider.loadChatUsersFriendReq(userId).subscribe(function (user) {
                            var unreadObj = user.unreadMessage;
                            var unreadCounter = 0;
                            for (var unreadKey in unreadObj) {
                                if (roomName in unreadObj[unreadKey]) {
                                    unreadCounter++;
                                }
                            }
                            userData['unreadCount'] = unreadCounter;
                            for (var key in _this.friends) {
                                var friends = _this.friends;
                                if (userData.$key == friends[key].$key) {
                                    _this.friends.splice(parseInt(key), 1);
                                }
                            }
                            _this.chatProvider.lastUreadMessage(roomName).subscribe(function (messages) {
                                var messageLength = Object.keys(messages).length;
                                var messageCounter = 1;
                                for (var messageKey in messages) {
                                    var messageObj = messages[messageKey];
                                    if (messageLength == messageCounter) {
                                        console.log('messageObj', messageObj);
                                        userData['lastMessage'] = messageObj.message;
                                        userData['lastMessageDate'] = messageObj.timestamp;
                                    }
                                    messageCounter++;
                                }
                            });
                            _this.friends.push(userData);
                            console.log('userData', userData);
                        });
                    });
                }
            }
        });
    };
    ChatsPage.prototype.pushChatRoom = function (user) {
        this.chatProvider.chatMember(user.$key, user.displayName);
        this.navCtrl.push('IndividualChatPage', user);
    };
    return ChatsPage;
}());
ChatsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-chat',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\chats\chats.html"*/'<ion-content no-padding>\n\n    <ion-item-divider color="light">Friends on FireChat</ion-item-divider>       \n\n    <ion-item *ngFor="let user of friends; let i = index" (click)="pushChatRoom(user)">\n\n        <ion-avatar item-start>\n\n          <img src="{{user.photo}}" *ngIf="user.photo;else photo;">\n\n          <ng-template #photo><span class="icon-circle">{{user.displayName.charAt(0)}}</span></ng-template>\n\n          <span [class]="user.status"></span>\n\n        </ion-avatar>\n\n        <ion-label>\n\n          <h3 [class.fwB]="user.unreadCount != 0">{{user.displayName}}</h3>\n\n          <p *ngIf="user.lastMessage == \'\'">No previous chat . . .</p>\n\n          <p [class.txtBlack]="user.unreadCount != 0" *ngIf="user.lastMessage != \'\'">{{user.lastMessage}}</p>\n\n          \n\n        </ion-label>\n\n        <ion-note item-end [class.top30]="user.status == \'offline\'" class="unreadCount" *ngIf="user.unreadCount != 0">{{user.unreadCount}}</ion-note>\n\n        <ion-note item-end class="timeStamp">{{user.lastMessageDate | date:\'shortTime\'}}</ion-note>\n\n    </ion-item>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\chats\chats.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__["a" /* ChatProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_5__providers_pushnotif_pushnotif__["a" /* PushnotifProvider */]])
], ChatsPage);

//# sourceMappingURL=chats.js.map

/***/ })

});
//# sourceMappingURL=9.js.map