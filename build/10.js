webpackJsonp([10],{

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__(479);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatPageModule = (function () {
    function ChatPageModule() {
    }
    return ChatPageModule;
}());
ChatPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */]),
        ],
    })
], ChatPageModule);

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_pushnotif_pushnotif__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatPage = (function () {
    function ChatPage(navCtrl, navParams, chatProvider, storage, authProvider, app, db, pushnotifProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatProvider = chatProvider;
        this.storage = storage;
        this.authProvider = authProvider;
        this.app = app;
        this.db = db;
        this.pushnotifProvider = pushnotifProvider;
        //this.pushnotifProvider.getPermission();
    }
    ChatPage.prototype.pushPage = function (page) {
        this.navCtrl.push('UserslistPage');
    };
    ChatPage.prototype.sendPushMsg = function () {
        this.db.list('messages').push({
            title: this.title,
            body: this.body
        });
        this.title = "";
        this.body = "";
    };
    return ChatPage;
}());
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-chat',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\chat\chat.html"*/'<ion-header>\n\n    <ion-navbar color="light-blue">\n\n      <ion-buttons left>\n\n        <button ion-button icon-only>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      <ion-title text-center>Chats</ion-title>\n\n      <ion-buttons right>\n\n          <button ion-button icon-only (click)="pushPage(UserslistPage)">\n\n            <ion-icon name="person-add"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n  <ion-content no-padding>\n\n    <form (submit)="sendPushMsg()">\n\n      <input type="text" [(ngModel)]="title" name="title">\n\n      <input type="text" [(ngModel)]="body" name="body">\n\n      <input type="submit" value="Send">\n\n    </form>\n\n  </ion-content>\n\n\n\n'/*ion-inline-end:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\chat\chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__["a" /* ChatProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_6__providers_pushnotif_pushnotif__["a" /* PushnotifProvider */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ })

});
//# sourceMappingURL=10.js.map