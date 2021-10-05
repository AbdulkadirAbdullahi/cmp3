webpackJsonp([21],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendchatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_fire_storage__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_peerjs__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_peerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_peerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__friendlist_friendlist__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Generated class for the FriendchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let FriendchatPage = class FriendchatPage {
    constructor(alertCtrl, storage, loadingCtrl, db, af, fs, platform, navCtrl, navParams, sanitizer) {
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.db = db;
        this.af = af;
        this.fs = fs;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.page1 = __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */];
        this.page2 = __WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */];
        this.enableLiveChat = true;
        this.currentDate = new Date();
        this.EliveVideo = true;
        this.EliveChat = true;
        this.downloadableURL = '';
        this.basePath = '/files';
        this.updateDetail = false;
        this.peer = new __WEBPACK_IMPORTED_MODULE_10_peerjs___default.a();
        this.n = navigator;
        this.getPeerId = () => {
            //Generate unique Peer Id for establishing connection
            this.peer.on('open', (id) => {
                this.peerId = id;
                //  this.targetpeer =this.peerId
                this.lectureLink = id;
                // this.createURLToConnect(id);
            });
        };
        this.friend = navParams.get('student');
        this.studentid = this.friend.uid;
        this.getPeerId();
        this.af.authState.take(1).subscribe(data => {
            if (data && data.email && data.uid) {
                this.db.object('users/' + data.uid).valueChanges().subscribe(data => {
                    this.userData = data;
                    this.uid = this.af.auth.currentUser.uid;
                    this.itemsRef = db.list('/friendlist/' + this.uid);
                });
                this.chatRef = this.fs.collection('friendschat/' + data.uid + '/' + this.studentid, ref => ref.orderBy('timestamp')).valueChanges();
            }
            else
                this.enableLiveChat = false;
            //  alert(" No live chat because you are not authenticated");
        }); //authstatesmm ref=>ref.orderBy('timestamp')
    }
    call() {
        this.fs.collection('friendschat').doc(this.studentid).collection(this.uid).add({
            name: this.userData.name,
            userID: this.af.auth.currentUser.uid,
            userPhoto: this.userData.photourl,
            callLink: this.lectureLink,
            timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
        }).then(() => {
            this.fs.collection('friendschat').doc(this.uid).collection(this.studentid).add({
                name: this.userData.name,
                userID: this.af.auth.currentUser.uid,
                userPhoto: this.userData.photourl,
                videoLinkSent: "Video call sent waiting for friend to accept the call...",
                timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
            });
            this.scrollto();
        }).then(() => {
            /*
            let video = this.myVideo.nativeElement;
            video.width="100%";
            video.height="550px";
            */
            this.scrollto();
        });
        /*
              this.db.object('/live/lectureLink').set(this.lectureLink).then(()=>{
        
        
              })
        */
    }
    closecall() {
        let video = this.myVideo.nativeElement;
        video.remove();
        video.src = "";
    }
    acceptCall(peerid) {
        let video = this.myVideo.nativeElement;
        this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
        this.n.getUserMedia({ video: true, audio: true }, (stream) => {
            const call = this.peer.call(peerid, stream);
            call.on('stream', (remoteStream) => {
                let mediaStream = new MediaStream();
                mediaStream = remoteStream;
                video.srcObject = mediaStream;
                video.play();
                //   this.lvideo = URL.createObjectURL(remoteStream);
                // Show stream in some <video> element.
                //  this.myVideo.src = URL.createObjectURL(remoteStream);
                //    this.myVideo.srcObject = remoteStream;
                //   this.myVideo.play();
                /*
                 const video = document.createElement('video');
                 video.classList.add('video');
                 video.srcObject = remoteStream;
                 video.play();
                 document.getElementById('remote-video').append(video);
             */
                //  this.myVideo.nativeElement.src = window.URL.createObjectURL(remoteStream);
                //  this.stream = stream;
                //    this.myVideo.nativeElement.play();
            });
        }, (err) => {
            console.error('Failed to get local stream', err);
        });
    }
    send() {
        if (this.text != "") {
            this.fs.collection('friendschat').doc(this.uid).collection(this.studentid).add({
                name: this.userData.name,
                message: this.text,
                userID: this.af.auth.currentUser.uid,
                userPhoto: this.userData.photourl,
                timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
            }).then(() => {
                this.fs.collection('friendschat').doc(this.studentid).collection(this.uid).add({
                    name: this.userData.name,
                    message: this.text,
                    userID: this.af.auth.currentUser.uid,
                    userPhoto: this.userData.photourl,
                    timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
                });
                this.scrollto();
            }).then(() => {
                this.scrollto();
                this.text = "";
            });
        } //if
    } //send
    ionViewDidLoad() {
        console.log('ionViewDidLoad LivePage');
        this.content.scrollToBottom();
    }
    choosecover(event) {
        this.scrollto();
        if (event.target.files && event.target.files[0]) {
            this.selectedupload = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                this.imgcover = event.target.result;
                this.scrollto();
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this.scrollto();
    }
    ngOnInit() {
        let video = this.myVideo.nativeElement;
        this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
        this.peer.on('call', (call) => {
            this.n.getUserMedia({ video: true, audio: true }, (stream) => {
                call.answer(stream); // Answer the call with an A/V stream.
                //   stream.getTracks().forEach(track => track.stop());
                call.on('stream', (remoteStream) => {
                    let mediaStream = new MediaStream();
                    mediaStream = remoteStream;
                    video.srcObject = mediaStream;
                    video.play();
                });
            }, (err) => {
                console.error('Failed to get local stream', err);
            });
        });
        this.scrollto();
    }
    async uploadcover() {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'uploading cover image is in progress <br> Please Wait...'
        });
        loading.present();
        if (this.selectedupload) {
            const filePath = `${this.basePath}/${this.selectedupload.name}`;
            this.filepath2 = filePath; // inorder to get the path to delete file
            this.task = this.storage.upload(filePath, this.selectedupload);
            this.progressValue = this.task.percentageChanges(); // <<<<< Percentage of uploading 
            (await this.task).ref.getDownloadURL().then(url => {
                this.downloadableURL = url;
                try {
                    this.fs.collection('friendschat').doc(this.uid).collection(this.studentid).add({
                        name: this.userData.name,
                        userID: this.af.auth.currentUser.uid,
                        userPhoto: this.userData.photourl,
                        fileurl: this.downloadableURL,
                        filename: this.selectedupload.name,
                        timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
                    }).then(() => {
                        this.fs.collection('friendschat').doc(this.studentid).collection(this.uid).add({
                            name: this.userData.name,
                            userID: this.af.auth.currentUser.uid,
                            userPhoto: this.userData.photourl,
                            fileurl: this.downloadableURL,
                            filename: this.selectedupload.name,
                            timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
                        });
                        this.imgcover = "";
                        this.scrollto();
                        this.removeFile();
                        loading.dismiss();
                    }).then(() => {
                        this.imgcover = "";
                        alert("File Send");
                        this.scrollto();
                        this.removeFile();
                    });
                }
                catch (error) {
                    this.emailError = error.message;
                    alert(error.message);
                    console.error(error);
                }
            }); ///end of await  
        }
    }
    removeFile() {
        this.img1 = "";
        this.imgcover = "";
        this.selectedupload = "";
        this.selectedFile = "";
    }
    scrollto() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 3000);
    }
    unfriend() {
        let alert2 = this.alertCtrl.create({
            title: '<font color="red"><b>Warning! </b>You are deleting this notice ?, continue </font>',
            cssClass: "alert",
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Yes DELETE',
                    handler: data => {
                        this.itemsRef2 = this.db.list('/friendlist/' + this.studentid);
                        this.itemsRef.remove(this.studentid).then(() => {
                            this.itemsRef2.remove(this.userData.uid).then(() => {
                                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__friendlist_friendlist__["a" /* FriendlistPage */]);
                            });
                        });
                    }
                }
            ]
        });
        alert2.present();
    } //end deletefriend
}; //end of class
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], FriendchatPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('myvideo'),
    __metadata("design:type", Object)
], FriendchatPage.prototype, "myVideo", void 0);
FriendchatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-friendchat',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendchat\friendchat.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-buttons>\n        \n      <button  (click)="call()" ion-button item-end icon-left>\n        Start Live Video Call\n        <ion-icon name="ios-videocam-outline"></ion-icon>\n       </button>\n         <button  (click)="closecall()" ion-button item-end icon-left>\n          Close Live Video Call\n          <ion-icon name="ios-close-circle-outline"></ion-icon>\n         </button>\n       </ion-buttons>\n       <ion-buttons end>\n        \n        <button  (click)="unfriend()" end ion-button item-end icon-left>\n          Unfriend this person\n          <ion-icon name="ios-trash-outline"></ion-icon>\n         </button>\n         </ion-buttons>\n\n  </ion-navbar>\n \n</ion-header>\n\n\n\n<ion-content #content padding>\n\n            <div *ngIf="errMess">\n              <h2>Error</h2>\n              <h4>{{errMess}}</h4>\n            </div>\n\n     \n   \n\n                      <div *ngIf="chatRef">\n                        <div class="chat" *ngFor = "let chat of chatRef | async">\n                            <div class="me" *ngIf="uid==chat.userID">\n                             <div class="chatfile"> <img class="chat.fileurl"  src="{{chat.fileurl}}"/></div>\n                             <p>{{chat.filename}}</p>\n                              <a *ngIf="chat.fileurl" href="{{chat.fileurl}}" ion-button outilne target="_blank">File sent  <ion-icon *ngIf="chat.fileurl" name="ios-cloud-done-outline"></ion-icon></a>\n                              \n                              {{chat.message}}<br><br>\n                              <ion-icon *ngIf="chat.videoLinkSent" name="ios-cloud-done-outline"></ion-icon> {{chat.videoLinkSent}}<br><br>\n                              <span id="metimestamp" *ngIf="chat.timestamp">\n                              <p  *ngIf="chat.timestamp.toDate().getDate() != currentDate.getDate()">\n                                  {{chat.timestamp.toDate().toDateString()}}</p><p>{{chat.timestamp.toDate().toLocaleTimeString()}}</p> \n                              </span>\n                          \n                            </div>\n                            <div class="you" *ngIf ="uid!= chat.userID">\n                              <div class="chatuserimg" *ngIf="chat.userPhoto">\n                                <img clas="chatuserimg avatar" src="{{chat.userPhoto}}"/>\n                              </div>\n                              <span class="name">\n                                {{chat.name}}</span><br>\n                                {{chat.message}}<br><br>\n                                <div class="chatfile"> <img class="chat.fileurl"  src="{{chat.fileurl}}"/></div>\n\n                                <p>{{chat.filename}}</p>\n                                <p *ngIf="chat.callLink"> You have new incoming video call <ion-icon *ngIf="chat.callLink" name="ios-videocam-outline"></ion-icon> </p>\n                                <button ion-button  (click)="acceptCall(chat.callLink)" *ngIf="chat.callLink"> Accept call </button>\n                                <a href="{{chat.fileurl}}" *ngIf="chat.fileurl" ion-button  target="_blank"> Open     <ion-icon *ngIf="chat.fileurl" name="ios-cloud-download-outline"></ion-icon></a>\n                                <span id="youtimestamp" *ngIf="chat.timestamp">\n                                  <p  *ngIf="chat.timestamp.toDate().getDate() != currentDate.getDate()">\n                                    {{chat.timestamp.toDate().toDateString()}}</p><p>{{chat.timestamp.toDate().toLocaleTimeString()}}</p> \n                                  </span>\n                            </div>\n                        </div>\n                      \n                     </div>\n        <!--end of chart-->\n    \n        \n       \n          \n          <ion-card class="prev" *ngIf="imgcover">\n          <p *ngIf="imgcover">cover image preview </p>\n           \n            <img *ngIf="imgcover" [src]="imgcover"  onerror="this.onerror=null;this.src=\'assets/noimage.jpg\';"  width="350px" height="400px"/>\n            <button *ngIf="imgcover" class="button" ion-button  (click)="removeFile()">cancel upload</button>\n            <button  *ngIf="imgcover" class="button" ion-button  (click)="uploadcover()">Sent file</button>\n          \n   \n          \n          \n          <!-- Progresss Bar\n          \n          \n          \n          -->\n          \n          <div *ngIf="progressValue | async as val">\n          <progress type="warning"  [value]="val" style="height: 7mm; width: 50%" max="100" ></progress>\n          <br />\n          <span *ngIf="val<100" style="color:rgb(255, 60, 0); font-size: 17px; font-weight: 410;">{{ val | number}}% </span><span *ngIf="val == 100" style="color:rgb(1, 153, 34);  font-size: 17px; font-weight: 410;">Completed !</span>\n          </div>\n        </ion-card>\n          <!-- End  width="80%" height="550px" -->\n        \n          \n            <video #myvideo></video>\n    \n     \n \n</ion-content>\n<ion-footer id="footer">\n<ion-grid>\n  <ion-row>\n    <ion-col col-12 col-lg-6 col-sm-12 col-md-6>\n      \n<div *ngIf="!imgcover">\n  <label  for="coverinput" color="primary" style="font-size: 15pt; padding: 5px; color: blacks; text-transform: capitalize;">\n    <span id="p" ion-button outline round> Share file: </span>\n  </label>\n\n\n  <input id="coverinput" type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" (change)="choosecover($event)">\n</div>\n    </ion-col>\n    <ion-col col-12 col-lg-6 col-sm-12 col-md-6>\n      <ion-buttons end>\n\n         </ion-buttons>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n\n     <div>\n    <input type="text" [(ngModel)]="text"  placeholder="  type..."  pattern="[A-Za-z]+">\n    <ion-icon id="text-icon" (click)="send()" ios="ios-send" md="md-send" slot="end" end></ion-icon>\n     </div> \n</ion-footer>'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendchat\friendchat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__angular_fire_storage__["a" /* AngularFireStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */]])
], FriendchatPage);

//# sourceMappingURL=friendchat.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__friendchat_friendchat__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profiledetail_profiledetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the StudentlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let StudentlistPage = class StudentlistPage {
    constructor(menuCtrl, afAuth, db, navCtrl, navParams, alertCtrl) {
        this.menuCtrl = menuCtrl;
        this.afAuth = afAuth;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    ionViewDidLoad() {
        //  this.slides.startAutoplay();
    }
    ngOnInit() {
        this.db.list('/users').valueChanges().subscribe(data => {
            this.users = data;
        });
        this.db.list('/notices').valueChanges().subscribe(data => {
            this.messages = data;
            //     console.log(this.users);
        });
    }
    ionViewDidEnter() {
        // the root left menu should be disabled on this page
        this.menuCtrl.enable(true);
    }
    messageStudent(event, student) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__friendchat_friendchat__["a" /* FriendchatPage */], {
            student: student
        });
    } //end of module selected method
    viewProfile(event, student) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__profiledetail_profiledetail__["a" /* ProfiledetailPage */], {
            student: student
        });
    } //end of module selected method
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* Slides */])
], StudentlistPage.prototype, "slides", void 0);
StudentlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-studentlist',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\studentlist\studentlist.html"*/'<ion-header >\n  <ion-navbar color="primary">\n \n     <button ion-button menuToggle>\n       <ion-icon name="menu"></ion-icon>\n     </button>\n     <ion-title> <h1 class="sp">SocialPlus</h1></ion-title>\n\n   </ion-navbar>\n \n </ion-header>\n  \n \n <ion-content padding>\n    <ion-card id="containercard">\n \n      <ion-card-header  class="headr">\n        <h1 class="headText"> Latest notice from UDUS...</h1>\n      </ion-card-header>\n      <hr>\n      <br><br>\n      <ion-card-content>\n        <ion-slides *ngIf="messages" autoplay="4000" loop="true" speed="400"  effect="slide"  slidesPerView="3">\n\n          <ion-slide  *ngFor="let message of messages">\n      \n            <ion-card id="slide">\n              <img src="{{message.photourl}}"  style="width: 100%; max-height: 300px;">\n              <ion-card-content>\n                <div><p [innerHTML]="message.message">{{message.message}}</p></div>\n                <br>\n                <hr>\n                <ion-grid>\n                  <ion-row>\n                    <ion-col col-4>\n                      <div>Posted at: {{message.timestamp}}</div>\n                    </ion-col>\n                    <ion-col col-4>\n                      <div>Posted by : {{message.lecturer}}</div>\n                    </ion-col>\n                    <ion-col col-4 *ngIf="message.timestamp2">\n                      <div>Updated at : {{message.timestamp2}}</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n              </ion-card-content>\n            </ion-card>\n         \n          </ion-slide>\n      \n        </ion-slides>\n      \n        <br><br>\n      \n      </ion-card-content>\n    </ion-card>\n <br>\n<ion-card id="containercard">\n\n\n\n\n  <ion-card-header color="primary" class="heder">\n\n   <h1 class="headText"> Students You can Connect to</h1><hr>\n  </ion-card-header>\n  <ion-card-content>\n    <ion-searchbar id=searchBar  [(ngModel)]="term">\n    </ion-searchbar><br><hr>\n    \n    <ion-grid>\n      <ion-row>\n        <ion-col col-12 col-lg-6 col-md-12 col-sm-12 col-xm-6 *ngFor="let user of users | filter:term">\n\n          <ion-card class="membersCard" *ngIf="!user.islecturer">\n  \n            <img class="avatar" src="{{user.photourl}}" (click)="viewProfile($event, user)">\n            <div class="mdetail" (click)="viewProfile($event, user)">\n                  <h4 class="username">{{user.name}} <span *ngIf="user.admno" class="from">({{user.admno}})</span></h4>\n                  <p class="userambition"> <span class="from"> From: </span> {{user.department}} </p>\n          \n             </div>\n      \n        </ion-card>\n\n        </ion-col>\n      </ion-row>\n    </ion-grid>  \n\n\n    <!--\n    <ion-list *ngFor="let user of users | filter:term" no-lines>\n      <ion-card class="membersCard" *ngIf="!user.islecturer">\n    \n        <img class="avatar" src="{{user.photourl}}" (click)="viewProfile($event, user)">\n        <div class="mdetail" (click)="viewProfile($event, user)">\n              <h4 class="username">{{user.name}} <span *ngIf="user.admno" class="from">({{user.admno}})</span></h4>\n              <p class="userambition"> <span class="from"> From: </span> {{user.department}} </p>\n      \n         </div>\n  \n    </ion-card>\n    \n    </ion-list>\n  -->\n  </ion-card-content>\n</ion-card>\n\n \n \n \n \n \n \n <div [hidden]="users || errMess">\n   <ion-spinner></ion-spinner>\n   <h4>Loading . . . Please Wait</h4>\n </div>\n <div *ngIf="errMess">\n   <h2>Error</h2>\n   <h4>{{errMess}}</h4>\n </div>\n \n \n \n \n \n \n </ion-content>\n '/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\studentlist\studentlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
], StudentlistPage);

//# sourceMappingURL=studentlist.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__friendchat_friendchat__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profiledetail_profiledetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the FriendlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let FriendlistPage = class FriendlistPage {
    constructor(db, af, navCtrl, navParams) {
        this.db = db;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.friendlistids = [];
        this.friendlistids2 = [];
        this.allusers = [];
        this.friendlist = [];
        this.af.authState.take(1).subscribe(data => {
            if (data && data.uid) {
                this.db.list('/friendlist/' + data.uid).valueChanges().subscribe(data1 => {
                    this.friendlistids = data1;
                    this.friendlistids2 = this.friendlistids.map(a => a.uid);
                    this.db.list('/users').valueChanges().subscribe(data2 => {
                        this.allusers = data2;
                        const tep = this.allusers;
                        for (var j in this.friendlistids2) {
                            for (var key in tep) {
                                if (this.friendlistids2[j] === tep[key].uid) {
                                    this.friendlist.push(tep[key]);
                                }
                            }
                        }
                        this.friendlist = this.friendlist.filter((v, i, a) => a.findIndex(t => (t.uid === v.uid)) === i);
                    });
                });
            }
            else {
                alert("you are not authenticated");
            }
        }); //authstatesmm ref=>ref.orderBy('timestamp')
    } //end of contructor
    ngOnInit() {
    }
    viewProfile(event, student) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__profiledetail_profiledetail__["a" /* ProfiledetailPage */], {
            student: student
        });
    }
    messageStudent(event, student) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__friendchat_friendchat__["a" /* FriendchatPage */], {
            student: student
        });
    }
};
FriendlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-friendlist',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendlist\friendlist.html"*/'<ion-header >\n  <ion-navbar color="primary">\n \n     <button ion-button menuToggle>\n       <ion-icon name="menu"></ion-icon>\n     </button>\n     <ion-searchbar id=searchBar  [(ngModel)]="term">\n     </ion-searchbar>\n \n   </ion-navbar>\n \n </ion-header>\n\n<ion-content padding>\n\n  <ion-list *ngFor="let user of friendlist | filter:term" no-lines>\n    <ion-card class="membersCard" *ngIf="!user.islecturer">\n  \n      <img class="avatar" src="{{user.photourl}}" (click)="viewProfile($event, user)">\n      <div class="mdetail" (click)="messageStudent($event, user)">\n            <h4 class="username">{{user.name}} <span *ngIf="user.admno" class="from">({{user.admno}})</span></h4>\n            <p class="userambition"> <span class="from"> From: </span> {{user.department}} </p>\n    \n       </div>\n       <ion-buttons end>\n        <button (click)="viewProfile($event, user)" ion-button item-end outline icon-left>\n          View Profile\n        </button>\n        <button (click)="messageStudent($event, user)" ion-button item-end outline icon-left>\n          <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n          Send Message\n        </button>\n\n       </ion-buttons>\n  </ion-card>\n  \n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendlist\friendlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavParams */]])
], FriendlistPage);

//# sourceMappingURL=friendlist.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//export const baseURL = 'http://localhost:3000/';
const baseURL = 'https://fullstackabdul.herokuapp.com/';
/* harmony export (immutable) */ __webpack_exports__["a"] = baseURL;

//export const baseURL = 'http://192.168.43.73:3000/';
//# sourceMappingURL=baseurl.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessHttpmsgProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
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
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let ProcessHttpmsgProvider = class ProcessHttpmsgProvider {
    constructor(http) {
        this.http = http;
        console.log('Hello ProcessHttpmsgProvider Provider');
    }
    extractData(res) {
        let body = res;
        return body || {};
    }
    handleError(error) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    }
};
ProcessHttpmsgProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
], ProcessHttpmsgProvider);

//# sourceMappingURL=process-httpmsg.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModulesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_baseurl__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process_httpmsg_process_httpmsg__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
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
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let ModulesProvider = class ModulesProvider {
    constructor(http, processHTTPMsgService) {
        this.http = http;
        this.processHTTPMsgService = processHTTPMsgService;
        console.log('Hello CourseProvider Provider');
    }
    getmodules() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__shared_baseurl__["a" /* baseURL */] + 'modules')
            .map(res => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }
    getmodule(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__shared_baseurl__["a" /* baseURL */] + 'module/' + id)
            .map(res => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }
};
ModulesProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__process_httpmsg_process_httpmsg__["a" /* ProcessHttpmsgProvider */]])
], ModulesProvider);

//# sourceMappingURL=modules.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(46);
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
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let AppProvider = class AppProvider {
    constructor(storage) {
        this.storage = storage;
        this.activeTheme = "";
        this.storage.get('activetheme').then((val) => {
            if (val == null)
                this.activeTheme = "default";
            else
                this.activeTheme = val;
        });
    }
};
AppProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], AppProvider);

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let AboutPage = class AboutPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }
};
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\about\about.html"*/'<!--\n\n  Generated template fo the AboutPage pag.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>About Us</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\about\about.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







/**
 * Generated class for the BookdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info
 * Ionic pages and navigation.
 */
let BookdetailPage = class BookdetailPage {
    constructor(loadingCtrl, storage, alertCtrl, navCtrl, navParams, BaseURL, sanitizer) {
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.BaseURL = BaseURL;
        this.sanitizer = sanitizer;
        this.book = navParams.get('book');
        this.bookurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.book.src);
    }
    transform() {
        return this.sanitizer.bypassSecurityTrustHtml(this.book.src);
    }
    getSafeUrl() {
        return this.sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* SecurityContext */].URL, this.sanitizer.bypassSecurityTrustUrl(this.book.src));
    }
    ionViewDidLoad() {
        this.presentLoadingText();
    }
    onError($event) {
        alert("We encounter Some isssues");
    }
    pageRendered($event) {
        alert("page1 gggloaded");
        console.log($event);
    }
    callBackFn($event) {
        this.finish = true;
    }
    load() {
        alert("Document loaded");
    }
    presentLoadingText() {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'opening Document Please Wait...'
        });
        loading.present();
        setTimeout(() => {
            loading.dismiss();
        }, 6000);
    }
};
BookdetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-bookdetail',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\bookdetail\bookdetail.html"*/'<!--\n  Generated template for the BookdetailPage   page.\n\n\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /{allPaths=**} {\n        // CHOOSE EITHER ONE FROM THESE\n        allow read, write: if request.auth != null; // requires authentication\n        allow read, write: if true; // doesn\'t require authentication\n    }\n  }\n} \n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Book Contents</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id="cnt" overflow-scroll="true">\n\n  \n\n          <ngx-doc-viewer *ngIf="book" class="book" id="iframediv"  [url]="book.src" viewer="google" style="width:100%;min-height:100%;"\n          width="100%"\n          min-height= "100%"\n          disableContent=\'popout\'\n          disableContent=\'popout-hide\'\n          googleCheckContentLoaded = true\n          googleCheckInterval = 3000\n          loaded="load()"\n          ></ngx-doc-viewer>\n   \n  \n\n  \n\n  \n\n \n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\bookdetail\bookdetail.html"*/,
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'byPassSecurity'
    }),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('BaseURL')),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], Object, __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
], BookdetailPage);

//# sourceMappingURL=bookdetail.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let ContactPage = class ContactPage {
    constructor(navCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.user = {};
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactPage');
    }
    sendMessage(user) {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Sending Message <br> Please Wait...'
        });
        loading.present();
        Email.send({
            SecureToken: "58b749b1-df92-495b-860a-4a1424e0e732",
            To: 'abdulkadirfs71@gmail.com',
            From: user.email,
            Subject: "From E-madrisa",
            Body: user.message
        }).then(message => {
            alert(message);
            loading.dismiss();
        }); //end of email method
        setTimeout(() => {
            loading.dismiss();
        }, 5000);
    } //end of send msg
};
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\contact\contact.html"*/'<!--\n\n  Generated template for the ContactPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Contact Us</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card-content>\n\n      \n\n    <div id="formPadding">\n\n    </div>\n\n    <form  id="login-form"  color="primary">\n\n      <ion-card-header id="login-header">\n\n        <ion-label id="login-title">Contact Us</ion-label>\n\n      </ion-card-header>\n\n\n\n\n\n      <ion-item class="input"> \n\n        <ion-label floating color="primary">Full Name :</ion-label>     \n\n        <ion-input type="text" [(ngModel)]="user.name" name="name" required minlength="3" [(ngModel)]="user.name" #name="ngModel" pattern="[A-Za-z]+"> </ion-input>\n\n      </ion-item>\n\n      <div  *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">\n\n           <div *ngIf="name.errors.required" class="error">\n\n            Name is required.\n\n           </div>\n\n            \n\n             <div *ngIf="name.errors?.pattern" class="error">\n\n                Name should contain only alphabets\n\n             </div>\n\n           \n\n            <div *ngIf="name.errors.minlength" class="error">\n\n            Name must be at least 3 characters long.\n\n            </div>\n\n        </div>\n\n  \n\n  \n\n      <ion-item class="input"> \n\n        <ion-label floating color="primary">Email address :</ion-label>     \n\n        <ion-input type="text" [(ngModel)]="user.email" name="email" required email  #email="ngModel" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"> </ion-input>\n\n      </ion-item>\n\n      <div  *ngIf="emailError && (email.dirty || email.touched)" class="alert alert-danger">\n\n        <div class="error">\n\n          {{emailError}}\n\n         </div>\n\n     </div>\n\n    \n\n      <div  *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">\n\n          <div *ngIf="email.errors.required" class="error">\n\n            Email is required.\n\n          </div>\n\n  \n\n          <div *ngIf="email.errors?.pattern" class="error">\n\n            This is not a valid Email Address \n\n          </div>\n\n      </div>\n\n  \n\n  \n\n      <ion-item  class="input">\n\n        <ion-label position="floating">Your Message: </ion-label>\n\n        <ion-textarea  [(ngModel)]="user.message" name="message" required minlength="3" autosize #message="ngModel" pattern="[A-Za-z]+"></ion-textarea>\n\n      </ion-item>\n\n      <div  *ngIf="message.invalid && (message.dirty || message.touched)" class="alert alert-danger">\n\n        <div *ngIf="message.errors.required" class="error">\n\n         Message is required.\n\n        </div>\n\n         \n\n          <div *ngIf="message.errors?.pattern" class="error">\n\n            Message seems to contain some odd characters\n\n          </div>\n\n        \n\n         <div *ngIf="message.errors.minlength" class="error">\n\n         message should be at least 3 characters long.\n\n         </div>\n\n     </div>\n\n\n\n  \n\n      <ion-item class="buttons"> \n\n        <button class="button" ion-button *ngIf="name.invalid" id="invalid" end>Send Message</button>\n\n        <button  class="button" ion-button *ngIf="name.valid" (click)="sendMessage(user)">Send Message</button>\n\n      </ion-item>\n\n    \n\n     \n\n    </form>\n\n  \n\n\n\n  </ion-card-content>\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\contact\contact.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendrcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profiledetail_profiledetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FriendrcPage_1;





/**
 * Generated class for the FriendrqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let FriendrcPage = FriendrcPage_1 = class FriendrcPage {
    constructor(db, af, navCtrl, navParams) {
        this.db = db;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.friendsrcids = [];
        this.friendsrcids2 = [];
        this.allusers = [];
        this.friendsrc = [];
        this.af.authState.take(1).subscribe(data => {
            if (data && data.uid) {
                this.myid = data.uid;
                this.itemsRef = db.list('/friendrc/' + data.uid);
                this.db.list('/friendrc/' + data.uid).valueChanges().subscribe(data1 => {
                    this.friendsrcids = data1;
                    this.friendsrcids2 = this.friendsrcids.map(a => a.uid);
                    this.db.list('/users').valueChanges().subscribe(data2 => {
                        this.allusers = data2;
                        const tep = this.allusers;
                        for (var j in this.friendsrcids2) {
                            for (var key in tep) {
                                if (this.friendsrcids2[j] === tep[key].uid) {
                                    this.friendsrc.push(tep[key]);
                                }
                            }
                        }
                        this.friendsrc = this.friendsrc.filter((v, i, a) => a.findIndex(t => (t.uid === v.uid)) === i);
                    });
                });
            }
            else {
                alert("you are not authenticated");
            }
        }); //authstatesmm ref=>ref.orderBy('timestamp')
    } //end of contructor
    ngOnInit() {
    }
    viewProfile(event, student) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profiledetail_profiledetail__["a" /* ProfiledetailPage */], {
            student: student
        });
    }
    acceptRequest(event, userid) {
        this.db.object('/friendlist/' + userid + '/' + this.myid).set({ uid: this.myid }).then(() => {
            this.db.object('/friendlist/' + this.myid + '/' + userid).set({ uid: userid }).then(() => {
            }).then(() => {
                this.itemsRef.remove(userid).then(() => {
                    this.itemsRef2 = this.db.list('/friendrq/' + userid);
                    this.itemsRef2.remove(this.myid).then(() => {
                        this.navCtrl.push(FriendrcPage_1);
                    });
                });
                /*
                          this.db.object('/friendrq/'+userid+'/'+this.myid).remove().then(()=>{
                
                            this.db.object('/friendrc/'+this.myid+'/'+userid).remove().then((res)=>{
                      
                              alert("Request Accepted");
                
                    
                              })
                              
                    
                        })
                */
            });
        }); //adding 
    }
    cancelRequest(event, userid) {
        this.itemsRef.remove(userid).then(() => {
            this.itemsRef2 = this.db.list('/friendrc/' + userid);
            this.itemsRef2.remove(this.myid).then(() => {
                this.navCtrl.push(FriendrcPage_1);
                alert("request Cancelled");
            });
        });
        /*
        this.db.object('/friendrq/'+userid+'/'+this.myid).remove().then(()=>{
  
          this.db.object('/friendrc/'+this.myid+'/'+userid).remove().then((res)=>{
    
             alert("request canceled");
  
            })
            
  
      })
  
  */
    }
};
FriendrcPage = FriendrcPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-friendrc',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendrc\friendrc.html"*/'<!--\n  Generated template for the FriendrcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>My friend Request Recieve</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n\n\n\n<div [hidden]="friendsrc || errMess">\n  <ion-spinner></ion-spinner>\n  <h4>Loading . . . Please Wait</h4>\n</div>\n<div *ngIf="errMess">\n  <h2>Error</h2>\n  <h4>{{errMess}}</h4>\n</div>\n\n<ion-list *ngFor="let user of friendsrc" no-lines>\n  <ion-card class="membersCard" *ngIf="!user.islecturer">\n\n    <img class="avatar" src="{{user.photourl}}" (click)="viewProfile($event, user)">\n    <div class="mdetail" (click)="viewProfile($event, user)">\n          <h4 class="username">{{user.name}} <span *ngIf="user.admno" class="from">({{user.admno}})</span></h4>\n          <p class="userambition"> <span class="from"> From: </span> {{user.department}} </p>\n  \n     </div>\n     <ion-buttons end>\n        \n\n\n      <button  (click)="viewProfile($event, user)" ion-button item-end outline icon-left>\n        View Profile\n\n       </button>\n       <button  (click)="acceptRequest($event, user.uid)" ion-button item-end outline icon-left>\n        Accept request\n         <ion-icon name="ios-thumbs-up-outline"></ion-icon>\n       </button>\n       <button  (click)="cancelRequest($event, user.uid)" ion-button item-end outline icon-left>\n        Cancel request\n         <ion-icon name="ios-trash-outline"></ion-icon>\n       </button>\n     </ion-buttons>\n</ion-card>\n\n</ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendrc\friendrc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavParams */]])
], FriendrcPage);

//# sourceMappingURL=friendrc.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendrqPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profiledetail_profiledetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FriendrqPage_1;





/**
 * Generated class for the FriendrqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let FriendrqPage = FriendrqPage_1 = class FriendrqPage {
    constructor(db, af, navCtrl, navParams) {
        this.db = db;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.friendsrqids = [];
        this.friendsrqids2 = [];
        this.friendsrq = [];
        this.af.authState.take(1).subscribe(data => {
            if (data && data.uid) {
                this.myid = data.uid;
                this.itemsRef = db.list('/friendrq/' + data.uid);
                this.db.list('/friendrq/' + data.uid).valueChanges().subscribe(data1 => {
                    this.friendsrqids = data1;
                    this.friendsrqids2 = this.friendsrqids.map(a => a.uid);
                    this.keys = this.friendsrqids.map(a => a.id);
                    this.db.list('/users').valueChanges().subscribe(data2 => {
                        this.allusers = data2;
                        const tep = this.allusers;
                        for (var j in this.friendsrqids2) {
                            for (var key in tep) {
                                if (this.friendsrqids2[j] === tep[key].uid) {
                                    this.friendsrq.push(tep[key]);
                                }
                            }
                        }
                        this.friendsrq = this.friendsrq.filter((v, i, a) => a.findIndex(t => (t.uid === v.uid)) === i);
                    });
                });
            }
            else {
                alert("you are not authenticated");
            }
        });
    } //end of contructor
    ngOnInit() {
        console.log(this.keys);
    }
    viewProfile(event, student) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profiledetail_profiledetail__["a" /* ProfiledetailPage */], {
            student: student
        });
    }
    cancelRequest(event, userid) {
        this.itemsRef.remove(userid).then(() => {
            this.itemsRef2 = this.db.list('/friendrc/' + userid);
            this.itemsRef2.remove(this.myid).then(() => {
                this.navCtrl.push(FriendrqPage_1);
            });
        });
        /*
      this.db.object('/friendrq/'+userid+'/'+this.myid).remove().then(()=>{

        this.db.object('/friendrc/'+this.myid+'/'+userid).remove().then(()=>{
  
           alert("request canceled");

          })
         })
         */
    }
};
FriendrqPage = FriendrqPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-friendrq',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendrq\friendrq.html"*/'<!--\n  Generated template for the FriendrqPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>My friend Request</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n\n  <div [hidden]="allusers || errMess">\n    <ion-spinner></ion-spinner>\n    <h4>Loading . . . Please Wait</h4>\n  </div>\n  <div *ngIf="errMess">\n    <h2>Error</h2>\n    <h4>{{errMess}}</h4>\n  </div> \n\n  <ion-list *ngFor="let user of friendsrq" no-lines>\n    <ion-card class="membersCard" *ngIf="!user.islecturer">\n  \n      <img class="avatar" src="{{user.photourl}}" (click)="viewProfile($event, user)">\n      <div class="mdetail" (click)="viewProfile($event, user)">\n            <h4 class="username">{{user.name}} <span *ngIf="user.admno" class="from">({{user.admno}})</span></h4>\n            <p class="userambition"> <span class="from"> From: </span> {{user.department}} </p>\n    \n       </div>\n       <ion-buttons end>\n        \n      <button  (click)="viewProfile($event, user)" ion-button item-end outline icon-left>\n        View Profile\n         <ion-icon name="ios-chatboxes-outline"></ion-icon>\n       </button>\n         <button  (click)="cancelRequest($event, user.uid)" ion-button item-end outline icon-left>\n          Cancel request\n          <ion-icon name="ios-trash-outline"></ion-icon>\n         </button>\n       </ion-buttons>\n  </ion-card>\n  \n  </ion-list>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friendrq\friendrq.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavParams */]])
], FriendrqPage);

//# sourceMappingURL=friendrq.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__friendlist_friendlist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__friendrc_friendrc__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__friendrq_friendrq__ = __webpack_require__(184);
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

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let FriendsPage = class FriendsPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tabOne = __WEBPACK_IMPORTED_MODULE_2__friendlist_friendlist__["a" /* FriendlistPage */];
        this.tabTwo = __WEBPACK_IMPORTED_MODULE_3__friendrc_friendrc__["a" /* FriendrcPage */];
        this.tabThree = __WEBPACK_IMPORTED_MODULE_4__friendrq_friendrq__["a" /* FriendrqPage */];
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad FriendsPage');
    }
};
FriendsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-friends',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friends\friends.html"*/'<!--\n  Generated template for the FriendsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n\n\n  <ion-tabs tabsPlacement="top" tabsHighlight="true" tabsLayout="icon-start">\n    <ion-title>friends</ion-title>\n    <ion-tab tabIcon="ios-contacts-outline" [root]="tabOne"  tabTitle="Friends List" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab tabIcon="ios-redo-outline" [root]="tabTwo" tabTitle="Friend Request Recieved"  tabBadgeStyle="danger"></ion-tab>\n    <ion-tab tabIcon="ios-undo-outline" [root]="tabThree" tabTitle="Friend Request Sent"  tabBadgeStyle="danger"></ion-tab>\n  </ion-tabs>\n  \n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\friends\friends.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], FriendsPage);

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_books_books__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bookdetail_bookdetail__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * [ngStyle]="{'background-image': 'url(' + your url + ')'}"
 */
let LibraryPage = class LibraryPage {
    constructor(sanitizer, bookservice, navCtrl, navParams) {
        this.sanitizer = sanitizer;
        this.bookservice = bookservice;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ngOnInit() {
        this.bookservice.getbooks()
            .subscribe(books => this.books = books, errmess => this.errMess = errmess);
    }
    getSafeUrl(bookcover) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(bookcover);
    }
    ionViewDidLoad() {
        console.log('ionViewD');
    }
    bookSelected(event, book) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__bookdetail_bookdetail__["a" /* BookdetailPage */], {
            book: book
        });
    }
};
LibraryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-library',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\library\library.html"*/'<ion-header class="header">\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-searchbar id=searchBar [(ngModel)]="term" >\n    </ion-searchbar>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n  <br><br><br>\n    <div *ngIf="books">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-12 col-lg-3 col-md-4 col-sm-6 col-xs-6 *ngFor="let book of books  | filter:term">\n            <ion-card id="moduleCard" color="primary-pale">\n              <img *ngIf="book.cover" src=\'{{book.cover}}\' (click)="bookSelected($event, book)"/>\n              <ion-card-content (click)="bookSelected($event, book)">\n                <ion-card-title>\n                                \n                </ion-card-title>\n    \n                <p  id="h">\n                  {{book.name}}\n\n                </p>\n                <br>\n                <p *ngIf="book.author">Author: {{book.author}}</p><br>\n                <p *ngIf="book.pages">Number of Pages: {{book.pages}}</p>\n                \n              </ion-card-content>\n            \n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-grid>  \n      </div>\n      <div [hidden]="books || errMess">\n        <ion-spinner></ion-spinner>\n        <h4>Loading . . . Please Wait</h4>\n      </div>\n      <div *ngIf="errMess">\n        <h2>Error</h2>\n        <h4>{{errMess}}</h4>\n      </div>\n  </ion-content>'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\library\library.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_2__providers_books_books__["a" /* BooksProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], LibraryPage);

//# sourceMappingURL=library.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LivePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the LivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let LivePage = class LivePage {
    constructor(db, af, fs, platform, navCtrl, navParams, sanitizer) {
        this.db = db;
        this.af = af;
        this.fs = fs;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.page1 = __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */];
        this.page2 = __WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */];
        this.enableLiveChat = true;
        this.currentDate = new Date();
        this.EliveVideo = true;
        this.EliveChat = true;
        this.af.authState.take(1).subscribe(data => {
            if (data && data.email && data.uid) {
                this.db.object('users/' + data.uid).valueChanges().subscribe(data => {
                    this.userData = data;
                    this.uid = this.af.auth.currentUser.uid;
                    this.scrollto();
                });
                this.chatRef = this.fs.collectionGroup('chats', ref => ref.orderBy('timestamp')).valueChanges();
            }
            else
                this.enableLiveChat = false;
            //  alert(" No live chat because you are not authenticated");
        }); //authstatesmm ref=>ref.orderBy('timestamp')
        this.platform.ready().then(() => {
        });
    }
    scrollto() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 1000);
    }
    send() {
        if (this.text != "") {
            this.fs.collection('chats').add({
                name: this.userData.name,
                userPhoto: this.userData.photourl,
                message: this.text,
                userID: this.af.auth.currentUser.uid,
                timestamp: __WEBPACK_IMPORTED_MODULE_8_firebase__["firestore"].FieldValue.serverTimestamp()
            }); //collection add
            this.text = "";
            this.scrollto();
            this.content.scrollToBottom();
        } //if
    } //send
    ionViewDidLoad() {
        this.scrollto();
        console.log('ionViewDidLoad LivePage');
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 4000);
    }
    ngOnInit() {
        this.scrollto();
        this.type = 'deposit';
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl("https://abdulkadirabdullahi.github.io/imgg");
        this.db.object('/live').valueChanges().subscribe(data => {
            this.settings = data;
            this.EliveVideo = this.settings.enableLiveVideo;
            this.EliveChat = this.settings.enableLiveChart;
            // console.log(this.settings);
        });
    }
    segmentChanged(ev) {
        console.log('Segment changed', ev);
    } //methodfor changing segment
    ifr() {
        alert("error encountered ");
        console.log("iframe encountrederror");
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], LivePage.prototype, "content", void 0);
LivePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-live',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\live\live.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\nUDUS ROOM\n\n    <ion-searchbar id=searchBar [(ngModel)]="term" >\n\n    </ion-searchbar>\n\n\n\n\n\n  </ion-navbar>\n\n \n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content #content padding>\n\n\n\n\n\n        <!--   <seb-ng-magic-iframe id="magicIframe" [source]="\'https://abdulkadirabdullahi.github.io/img\'"\n\n          [styles]="\'body { background: white; }\'"\n\n          (error) ="loaded($event)">\n\n       PLACEHOLDER FOR LOADING CONTENT    <iframe id="appFrame" class="appFrame"\n\n          title="Inline Frame Example"\n\n          width="100%"\n\n          height="60%"\n\n          (onerror)="loaded()"\n\n          src="https://abdulkadirabdullahi.github.io/img">\n\n        </iframe>\n\n\n\n        </seb-ng-magic-iframe> -->\n\n   \n\n            <div [hidden]="src || errMess">\n\n              <ion-spinner></ion-spinner>\n\n              <h4>Loading . . . Please Wait</h4>\n\n            </div>\n\n            <div *ngIf="errMess">\n\n              <h2>Error</h2>\n\n              <h4>{{errMess}}</h4>\n\n            </div>\n\n\n\n     \n\n\n\n\n\n                      <div *ngIf="chatRef">\n\n                        <div class="chat" *ngFor = "let chat of chatRef | async |filter:term">\n\n                         \n\n                            <div class="me" *ngIf="uid==chat.userID">\n\n                              <div class="chatuserimg">\n\n                                <img clas="chatuserimg" src="{{chat.userPhoto}}"/>\n\n                              </div>\n\n                              {{chat.message}}<br><br>\n\n                              <span id="metimestamp" *ngIf="chat.timestamp">\n\n                              <p  *ngIf="chat.timestamp.toDate().getDate() != currentDate.getDate()">\n\n                                  {{chat.timestamp.toDate().toDateString()}}</p><p>{{chat.timestamp.toDate().toLocaleTimeString()}}</p> \n\n                              </span>\n\n                          \n\n                            </div>\n\n                            <div class="you" *ngIf ="uid!= chat.userID">\n\n                              <div class="chatuserimg">\n\n                                <img clas="chatuserimg" src="{{chat.userPhoto}}"/>\n\n                              </div>\n\n                              <span class="name">\n\n                                {{chat.name}}</span><br>\n\n                                {{chat.message}}<br><br>\n\n                                <span id="youtimestamp" *ngIf="chat.timestamp">\n\n                                  <p  *ngIf="chat.timestamp.toDate().getDate() != currentDate.getDate()">\n\n                                    {{chat.timestamp.toDate().toDateString()}}</p><p>{{chat.timestamp.toDate().toLocaleTimeString()}}</p> \n\n                                  </span>\n\n                            </div>\n\n                        </div>\n\n                      \n\n        </div>\n\n        \n\n\n\n\n\n\n\n \n\n</ion-content>\n\n<ion-footer id="footer" >\n\n     <div>\n\n    <input type="text" [(ngModel)]="text"  placeholder="  type..."  pattern="[A-Za-z]+">\n\n    <ion-icon id="text-icon" (click)="send()" ios="ios-send" md="md-send" slot="end" end></ion-icon>\n\n     </div> \n\n</ion-footer>'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\live\live.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */]])
], LivePage);

//# sourceMappingURL=live.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_modules_modules__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire_auth__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









/**
 *
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let MenuPage = class MenuPage {
    constructor(afAuth, db, storage, navCtrl, navParams, alertCtrl, moduleservice, toastCtrl, BaseURL) {
        this.afAuth = afAuth;
        this.db = db;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.moduleservice = moduleservice;
        this.toastCtrl = toastCtrl;
        this.BaseURL = BaseURL;
    }
    ngOnInit() {
        this.moduleservice.getmodules()
            .subscribe(modules => this.modules = modules, errmess => this.errMess = errmess);
    }
    ionViewDidLoad() {
        this.afAuth.authState.take(1).subscribe(data => {
            if (data && data.email && data.uid) {
                this.db.object('users/' + data.uid).valueChanges().subscribe(data => {
                    this.userData = data;
                });
                //
                this.db.list('/users/' + data.uid + '/grades').valueChanges().subscribe(data1 => {
                    this.userGrades = data1;
                    console.log(this.userGrades);
                });
                this.db.list('/users/' + data.uid + '/unlocked').valueChanges().subscribe(data2 => {
                    this.unlock = data2;
                });
            }
            else
                alert("you are not authenticated");
        }); //authstates
    } //inview
    moduleProgress(event, module) {
        this.storage.get(module.id + "progress").then((val) => {
            this.gradeHistory = val;
            this.presentAlert();
        });
    }
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: '<h4><b>Your Prograss  info:</b></h4>',
            subTitle: '<h4>' + '' + '%' + '</h4>',
            message: '<p class="msg">' + this.gradeHistory + '</p>',
            cssClass: 'alertDanger',
            buttons: ['Dismiss', {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },]
        });
        alert.present();
    }
    Register() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    }
    login() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    }
};
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\menu\menu.html"*/'<!--\n\n  Generated template for the MenuPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>modules</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page">\n\n  <!--\n\n  <div *ngIf ="userData">\n\n    <p>Fullname: {{userData?.name}}</p>\n\n  </div>\n\n\n\n-->\n\n\n\n<ion-card *ngIf="userGrades">\n\n<ion-list >\n\n  <ion-item *ngFor= "let grade of userGrades" >\n\n    {{grade.grade}}\n\n  </ion-item>\n\n</ion-list>\n\n</ion-card>\n\n\n\n\n\n\n\n\n\n\n\n<!--\n\n  <div *ngIf="modules">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12 col-lg-4 *ngFor="let module of modules">\n\n          <ion-card color="primary">\n\n            <div class="card-title"></div>\n\n            <p (click)="moduleProgress($event, module)" >{{ module.name }}</p>\n\n          </ion-card>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>  \n\n    <button ion-button (click)="Register()">eRegister</button>\n\n    <button ion-button (click)="login()">Login</button>\n\n\n\n    </div>\n\n    -->\n\n    <div [hidden]="modules || errMess">\n\n      <ion-spinner></ion-spinner>\n\n      <h4>Loading . . . Please Wait</h4>\n\n    </div>\n\n    <div *ngIf="errMess">\n\n      <h2>Error</h2>\n\n      <h4>{{errMess}}</h4>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\menu\menu.html"*/,
    }),
    __param(8, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('BaseURL')),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_modules_modules__["a" /* ModulesProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], Object])
], MenuPage);

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuledetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quiz_quiz__ = __webpack_require__(190);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







/**
 * Generated class for the ModuledetailPage page.
 *
 *  for more info on
 * Ionic pages and navigation.
 */
//[src]="sanitizer.bypassSecurityTrustResourceUrl(module.videourl)" 
let ModuledetailPage = class ModuledetailPage {
    constructor(storage, alertCtrl, formBuilder, navCtrl, navParams, BaseURL, sanitizer) {
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.BaseURL = BaseURL;
        this.sanitizer = sanitizer;
        this.questions = [];
        this.module = navParams.get('module');
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.module.videourl);
        this.questions = this.module.questions;
        this.composersForm = this.formBuilder.group({
            listOptions: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
        });
    }
    scrollTo(_id) {
        let z = document.getElementById(_id);
        z.scrollIntoView();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ModuledetailPage');
    }
    showProgress() {
        alert(this.gradeHistory);
    }
    moduleSelected(event, module) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__quiz_quiz__["a" /* QuizPage */], {
            module
        });
    }
}; //end of the entire clas
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], ModuledetailPage.prototype, "content", void 0);
ModuledetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-moduledetail',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\moduledetail\moduledetail.html"*/'<!--\n\n\n\n   <ion-buttons end>\n\n      <button (click)="presentAlert()" ion-button icon-only>\n\n        <ion-icon name="more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>module detail</ion-title>\n\n    \n\n    <ion-buttons end>\n\n       \n\n    <ion-buttons end>\n\n      <button (click)="moduleSelected($event, module)" block outline ion-button>Take Quiz Here </button>\n\n    </ion-buttons>\n\n     \n\n   \n\n    </ion-buttons>\n\n\n\n\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div id="moduleName" *ngIf="module.name">\n\n    <h4 id="h">\n\n      {{module.name | uppercase}}\n\n    </h4>\n\n  </div>\n\n  <div id="moduleIframediv" id="moduleVideo" *ngIf="module.videourl">\n\n    <iframe width="100%" height="500px" id="YouTube1" src="https://www.youtube.com/embed/H3MlLUWxXqY?rel=0&amp;modestbranding=1&amp;showinfo=0&amp;autohide=0"></iframe>\n\n\n\n  </div>\n\n  <div id="moduleDetails" *ngIf="module">\n\n     \n\n  \n\n      <p id="nte" [innerHTML]="module.note">\n\n\n\n      </p>\n\n  </div>\n\n  <div [hidden]="module || errMess">\n\n    <ion-spinner></ion-spinner>\n\n    <h4>Loading . . . Please Wait</h4>\n\n  </div>\n\n  <div *ngIf="errMess">\n\n    <h2>Error</h2>\n\n    <h4>{{errMess}}</h4>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\moduledetail\moduledetail.html"*/,
    }),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('BaseURL')),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], Object, __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
], ModuledetailPage);

//# sourceMappingURL=moduledetail.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_auth__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







let QuizPage = class QuizPage {
    constructor(afAuth, db, storage, alertCtrl, formBuilder, navCtrl, navParams, BaseURL) {
        this.afAuth = afAuth;
        this.db = db;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.BaseURL = BaseURL;
        this.questions = [];
        this.correct = [];
        this.incorrect = [];
        this.showcard = false;
        this.gcHistory = "";
        this.giHistory = "";
        this.correctA = [];
        this.incorrectA = [];
        this.endslide = false;
        this.questionlenth = 0;
        this.module = navParams.get('module');
        if (parseInt(this.module.numberofQuestions) <= this.module.questions.length) {
            this.numberofQuestions = parseInt(this.module.numberofQuestions);
        }
        else {
            this.numberofQuestions = this.module.questions.length;
        }
        this.questions = this.module.questions.map(x => ({ ord: Math.random(), data: x }))
            .sort((a, b) => a.ord > b.ord ? 1 : a.ord < b.ord ? -1 : 0)
            .map(x => x.data);
        this.questions = this.questions.slice(0, this.numberofQuestions);
        this.moduleId = this.module._id;
        this.moduleName = this.module.name;
        this.passMark = parseInt(this.module.passMark);
        this.questionlenth = this.questions.length;
        this.composersForm = this.formBuilder.group({
            listOptions: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
        });
        this.correctCounter = 0;
        this.incorrectCounter = 0;
    }
    ionViewDidLoad() {
        // console.log('ionViewDidLoad ModuledetailPage'); 
    }
    //timer
    ngOnInit() {
    }
    //timer endhl
    /*
    verifyAnswer(question:any, answer : any, choice : any, option2 : any, option3 : any, option4 : any){
     
            if (choice==answer){
                      
                    if (this.correct.includes(answer)==true){
                      const index = this.correct.indexOf(answer);
                      this.correctA.pop();
                      if (index > -1) { this.correct.splice(index, 1) }
    
                    }
    
                    if(this.correct.includes(answer)==false){
                      console.log(answer)
                      this.correct.push(answer);
                      this.correctA.push(question+"correct Answer is = "+"<font color=green>"+answer+"</font><br><hr>"+"<br><font color=red>"+option2+"</font> Incorrect"+"<br><font color=red>"+option3+"</font> Incorrect"+"<br><font color=red>"+option4+"</font> Incorrect<hr>");
                      this.gcHistory = this.gcHistory+" "+question+" "+answer+" is correct";
    
                    }
    
                    if (this.correct.includes(option2)==true){
                      const index = this.correct.indexOf(option2)
                      if (index > -1) { this.correct.splice(index, 1) }
    
                      alert("remove "+option2);
    
    
                     }
                    if (this.correct.includes(option3)==true){
                      const index = this.correct.indexOf(option3)
                      if (index > -1) { this.correct.splice(index, 1) }
    
                      alert("remove "+option3);
    
                     }
                    if  (this.correct.includes(option4)==true){
                      const index = this.correct.indexOf(option4)
                      if (index > -1) { this.correct.splice(index, 1) }
    
                      alert("remove "+option4);
    
                     }
                   
                     if (this.incorrect.includes(choice)==true){
                      const index = this.incorrect.indexOf(choice)
                      if (index > -1) { this.incorrect.splice(index, 1) }
                      alert("remove choice "+choice);
    
                    }
                    if (this.incorrect.includes(option2)==true){
                      const index = this.incorrect.indexOf(option2)
                      if (index > -1) { this.incorrect.splice(index, 1) }
                         alert("remove "+option2);
                     }
                    if (this.incorrect.includes(option3)==true){
                      const index = this.incorrect.indexOf(option3)
                      if (index > -1) { this.incorrect.splice(index, 1) }
    
                      
                    alert("remove "+option3);
    
                     }
                     if  (this.incorrect.includes(option4)==true){
                      const index = this.incorrect.indexOf(option4)
                      if (index > -1) { this.incorrect.splice(index, 1) }
    
                     
                    alert("remove "+option4);
    
                     }
                   
    
          
             
            }else{
    
                      if (this.incorrect.includes(choice)==false){
                        this.incorrect.push(choice);
                        this.giHistory = this.giHistory+" "+question+" "+ choice+" is incorrect";
                        console.log(choice)
                      }
                      if (this.incorrect.includes(option2)==true){
                        const index = this.incorrect.indexOf(option2)
                        if (index > -1) { this.incorrect.splice(index, 1) }
                           alert("remove "+option2);
                       }
                      if (this.incorrect.includes(option3)==true){
                        const index = this.incorrect.indexOf(option3)
                        if (index > -1) { this.incorrect.splice(index, 1) }
    
                        
                      alert("remove "+option3);
    
                       }
                       if  (this.incorrect.includes(option4)==true){
                        const index = this.incorrect.indexOf(option4)
                        if (index > -1) { this.incorrect.splice(index, 1) }
    
                       
                      alert("remove "+option4);
    
                       }
                       if (this.correct.includes(answer)==true){
                        const index = this.correct.indexOf(answer);
                        this.correctA.pop();
                        if (index > -1) { this.correct.splice(index, 1) }
    
                        alert("remove ans");
                       }
    
            }
         
    
    }
    
    
    verifyAnswer(choice: any, answer : any, choice : any, option2 : any, option3 : any, option4 : any){
    */
    next() {
        this.slides.slideNext(500);
    }
    verifyAnswer(choice, answer, index) {
        //alert("my choice= "+choice+" answer = "+answer+" index ="+(index+1));
        if ((index + 1) < this.slides.length()) {
            if (choice == answer) {
                this.correctCounter++;
                this.composersForm.controls.listOptions.reset();
                this.slides.slideNext(500);
            }
            else {
                this.composersForm.controls.listOptions.reset();
                this.slides.slideNext(500);
            }
        }
        else if ((index + 1) == this.slides.length()) {
            if (choice == answer) {
                this.correctCounter++;
                this.percent = (this.correctCounter / this.questionlenth) * 100;
                this.showcard = true;
                if (this.percent >= this.passMark) {
                    this.remark = "You have passed the required marks You can now move to the next module of the course";
                    this.storage.set(this.module.passNo, true);
                    this.afAuth.authState.take(1).subscribe(data => {
                        if (data && data.email && data.uid) {
                            this.db.object('/users/' + data.uid + '/grades/' + this.module_id).set({ grade: Math.floor(this.percent) + '% in ' + this.moduleName }).then(() => {
                            });
                        }
                        else
                            alert("You are not authenthenticated your data is not submited to the database ");
                    });
                    /*
                           this.afAuth.authState.take(1).subscribe(data =>{
                            if(data && data.email && data.uid){
                                let uid = data.uid;
                                        //   this.db.list('users/'+uid+'/unlocked/'+ID).push(ID);
                      
                                          this.db.list('/users/'+data.uid+'/unlocked').valueChanges().subscribe(
                                            data2 => {
                                              this.db.list('users/'+uid+'/unlocked/').push(this.module.passNo);
                                              data2.indexOf(this.module.passNo) === -1 ? this.db.list('users/'+uid+'/unlocked/').push(this.module.passNo) : console.log("This Id already exists");
                                             
                                              this.storage.set(this.module.passNo,true);
                      
                                              
                                              this.db.object('/users/'+data.uid+'/grades/'+this.module_id).set({ grade: Math.floor(this.percent)+'% in '+this.moduleName}).then(()=>{
                                              //  alert("push done");
                                            
                                              })
                    
                                        });
                            }else
                            alert("You are not authenthenticated your data is not submited to the instructor");
                      })
                      
                    */
                }
                else {
                    this.remark = "Ohps you didint Passed the required Marks please read the material and try again ";
                }
                let alert1 = this.alertCtrl.create({
                    title: '<h1><b>Quiz Ended</b></h1>',
                    subTitle: '<h1>' + Math.floor(this.percent) + '%' + '</h1>',
                    message: this.remark,
                    cssClass: 'alertDanger',
                    buttons: ['OK', {
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        },]
                });
                alert1.present();
            }
            else {
                this.percent = (this.correctCounter / this.questionlenth) * 100;
                this.showcard = true;
                if (this.percent >= this.passMark) {
                    this.remark = "You have passed the required marks Congratulations!!!!";
                    this.storage.set(this.module.passNo, true);
                    this.afAuth.authState.take(1).subscribe(data => {
                        if (data && data.email && data.uid) {
                            this.db.object('/users/' + data.uid + '/grades/' + this.module_id).set({ grade: Math.floor(this.percent) + '% in ' + this.moduleName }).then(() => {
                            });
                        }
                        else
                            alert("You are not authenthenticated your data is not submited to the database ");
                    });
                }
                else {
                    this.remark = "Ohps you didint Passed the required Marks please read the material and try again ";
                }
                let alert1 = this.alertCtrl.create({
                    title: '<h1><b>Quiz Ended</b></h1>',
                    subTitle: '<h1>' + Math.floor(this.percent) + '%' + '</h1>',
                    message: this.remark,
                    cssClass: 'alertDanger',
                    buttons: ['OK', {
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        },]
                });
                alert1.present();
            }
        }
        /*
         if (choice==answer){
                   
                   if(this.correct.includes(answer)==false){
                       this.correct.push(answer);
                    }
                 if (this.correct.includes(answer)==true){
                   const index = this.correct.indexOf(answer);
                   this.correctA.pop();
                   if (index > -1) { this.correct.splice(index, 1) }
       
                 }
       
               
                 if (this.correct.includes(option2)==true){
                   const index = this.correct.indexOf(option2)
                   if (index > -1) { this.correct.splice(index, 1) }
       
                   alert("remove "+option2);
       
       
                  }
                 if (this.correct.includes(option3)==true){
                   const index = this.correct.indexOf(option3)
                   if (index > -1) { this.correct.splice(index, 1) }
       
                   alert("remove "+option3);
       
                  }
                 if  (this.correct.includes(option4)==true){
                   const index = this.correct.indexOf(option4)
                   if (index > -1) { this.correct.splice(index, 1) }
       
                   alert("remove "+option4);
       
                  }
                
                  if (this.incorrect.includes(choice)==true){
                   const index = this.incorrect.indexOf(choice)
                   if (index > -1) { this.incorrect.splice(index, 1) }
                   alert("remove choice "+choice);
       
                 }
                 if (this.incorrect.includes(option2)==true){
                   const index = this.incorrect.indexOf(option2)
                   if (index > -1) { this.incorrect.splice(index, 1) }
                      alert("remove "+option2);
                  }
                 if (this.incorrect.includes(option3)==true){
                   const index = this.incorrect.indexOf(option3)
                   if (index > -1) { this.incorrect.splice(index, 1) }
       
                   
                 alert("remove "+option3);
       
                  }
                  if  (this.incorrect.includes(option4)==true){
                   const index = this.incorrect.indexOf(option4)
                   if (index > -1) { this.incorrect.splice(index, 1) }
       
                  
                 alert("remove "+option4);
       
                  }
                
       
       
          
         }else{
       
                   if (this.incorrect.includes(choice)==false){
                     this.incorrect.push(choice);
                    
                     console.log(choice)
                   }
                   if (this.incorrect.includes(option2)==true){
                     const index = this.incorrect.indexOf(option2)
                     if (index > -1) { this.incorrect.splice(index, 1) }
                        alert("remove "+option2);
                    }
                   if (this.incorrect.includes(option3)==true){
                     const index = this.incorrect.indexOf(option3)
                     if (index > -1) { this.incorrect.splice(index, 1) }
       
                     
                   alert("remove "+option3);
       
                    }
                    if  (this.incorrect.includes(option4)==true){
                     const index = this.incorrect.indexOf(option4)
                     if (index > -1) { this.incorrect.splice(index, 1) }
       
                    
                   alert("remove "+option4);
       
                    }
                    if (this.correct.includes(answer)==true){
                     const index = this.correct.indexOf(answer);
                     this.correctA.pop();
                     if (index > -1) { this.correct.splice(index, 1) }
       
                     alert("remove ans");
                    }
                    
       
         }
       */
    }
    submit() {
        let alert3 = this.alertCtrl.create({
            title: '<h1><b>Your Prograss info:</b></h1>',
            subTitle: '<h1>' + "you got correct" + this.correct.length + "you got incorrect" + this.incorrect.length + '</h1>',
            message: this.remark,
            cssClass: 'alertDanger',
            buttons: ['OK', {
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },]
        });
        alert3.present();
        this.composersForm.controls.listOptions.reset();
        if (this.percent >= this.passMark) {
            if (this.percent || this.incorrect || this.correct) {
                this.remark = "You have passes with Excellent Grades <br>You can now move to the Next Module of the course";
            }
            else {
                this.remark = "You did'nt passe read the material and try again";
                this.composersForm.controls.listOptions.reset();
            }
            this.storage.set(this.moduleId + "progress", JSON.stringify(this.correctA));
            this.afAuth.authState.take(1).subscribe(data => {
                if (data && data.email && data.uid) {
                    let uid = data.uid;
                    //  this.db.list('users/'+uid+'/unlocked/'+ID).push(ID);
                    this.db.list('/users/' + data.uid + '/unlocked').valueChanges().subscribe(data2 => {
                        this.db.list('users/' + uid + '/unlocked/').push(this.module.passNo);
                        data2.indexOf(this.module.passNo) === -1 ? this.db.list('users/' + uid + '/unlocked/').push(this.module.passNo) : console.log("This Id already exists");
                        this.storage.set(this.module.passNo, true);
                        this.db.object('/users/' + data.uid + '/grades/' + this.module_id).set({ grade: Math.floor(this.percent) + '% in ' + this.moduleName }).then(() => {
                            alert("push done");
                        });
                        // place to add something if we need update
                    });
                }
                else
                    alert("You are not authenthenticated your data is not submited to the instructor");
            });
            this.presentAlert();
        }
    } //CHECKING IF PERCENT NEND
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: '<h1><b>Your Prograss info:</b></h1>',
            subTitle: '<h1>' + Math.floor(this.percent) + '%' + '</h1>',
            message: this.remark,
            cssClass: 'alertDanger',
            buttons: ['OK', {
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },]
        });
        alert.present();
    }
}; //end of the entire clas
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */])
], QuizPage.prototype, "slides", void 0);
QuizPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-quiz',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\quiz\quiz.html"*/'<!--\n\n\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>CBT test for {{moduleName}} </ion-title>\n\n    \n\n  </ion-navbar>\n\n  <h6 class="pmark" *ngIf="passMark">Require Pass Mark = {{passMark}}%</h6> \n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <br><br>\n\n<div *ngIf="showcard">\n\n<ion-card *ngIf="percent">\n\n  <ion-card-header class="scoreheader">\n\n    Your score\n\n  </ion-card-header>\n\n  <ion-card-content >\n\n    <h6 class="percent">{{percent}}%</h6>\n\n    <p class="scoreremark">{{remark}}</p>\n\n  </ion-card-content>\n\n</ion-card>\n\n</div>\n\n<div *ngIf="!showcard">\n\n  <form id="quizform" *ngIf="questions" [formGroup]="composersForm">\n\n\n\n    \n\n    <ion-slides pager="true" effect="flip" paginationType="fraction" slidesPerView="2">\n\n\n\n      <ion-slide  *ngFor="let question of questions let i = index">\n\n        <h4 class="qindex">{{i+1}}</h4> <p class="questiontext" ion-text> {{question.ask}}</p>\n\n        <hr>  \n\n<ion-card class="qbox" text-wrap>\n\n \n\n  <ion-card-header>\n\n\n\n  \n\n   \n\n  </ion-card-header>\n\n  <ion-card-content>\n\n    <ion-list radio-group [(ngModel)]="choice" ngDefaultControl formControlName="listOptions" no-lines>\n\n    <ion-item>\n\n      <ion-label> {{question.option1}}</ion-label>\n\n      <ion-radio (ionSelect)="verifyAnswer(choice,question.ans,i)"name="options" value="{{question.option1}}" ></ion-radio>\n\n \n\n    </ion-item>\n\n  <ion-item >\n\n    <ion-label> {{question.option2}}</ion-label>\n\n    <ion-radio (ionSelect)="verifyAnswer(choice,question.ans,i)" value="{{question.option2}}"></ion-radio>\n\n\n\n    </ion-item>\n\n  <ion-item >\n\n    <ion-label> {{question.option3}}</ion-label>\n\n    <ion-radio  (ionSelect)="verifyAnswer(choice,question.ans,i)" value="{{question.option3}}"></ion-radio>\n\n\n\n  </ion-item>\n\n<ion-item >\n\n  <ion-label> {{question.option4}}</ion-label>\n\n  <ion-radio (ionSelect)="verifyAnswer(choice,question.ans,i)" value="{{question.option4}}"></ion-radio>\n\n</ion-item>\n\n</ion-list>\n\n  </ion-card-content>\n\n</ion-card>\n\n<br><br>\n\n     \n\n      </ion-slide>\n\n \n\n    </ion-slides>\n\n<!--\n\n    <ion-list radio-group  *ngFor="let question of questions|slice:(numberofQuestions) let i = index" ngDefaultControl formControlName="listOptions" no-lines>\n\n\n\n      <ion-item >\n\n          <ion-label> {{question.option1}}</ion-label>\n\n          <ion-radio (ionSelect)="verifyAnswer(i,question.ans,question.option1,question.option2,question.option3,question.option4)"name="options" value="{{question.option1}}" ></ion-radio>\n\n     \n\n        </ion-item>\n\n      <ion-item >\n\n        <ion-label> {{question.option2}}</ion-label>\n\n        <ion-radio (ionSelect)="verifyAnswer(i,question.ans,question.option2,question.option1,question.option3,question.option4)" value="2"></ion-radio>\n\n\n\n        </ion-item>\n\n      <ion-item >\n\n        <ion-label> {{question.option3}}</ion-label>\n\n        <ion-radio  (ionSelect)="verifyAnswer(i,question.ans,question.option3,question.option1,question.option2,question.option4)" value="3"></ion-radio>\n\n\n\n      </ion-item>\n\n    <ion-item >\n\n      <ion-label> {{question.option4}}</ion-label>\n\n      <ion-radio (ionSelect)="verifyAnswer(i,question.ans,question.option4,question.option1,question.option2,question.option3)" value="4"></ion-radio>\n\n\n\n</ion-item>\n\n<ion-card id="iCard" *ngIf="showAnswer">\n\n<p>{{question.ans}} is the Answer</p>\n\n</ion-card>\n\n  </ion-list>\n\n  -->\n\n  </form>\n\n\n\n  <button  (click)="nextslide()" ion-button color="green" type="submit" end>\n\n    Next\n\n  </button>\n\n  <button  (click)="submit()" ion-button color="green" type="submit" end>\n\n      Submit Test\n\n  </button>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\quiz\quiz.html"*/,
    }),
    __param(7, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('BaseURL')),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], Object])
], QuizPage);

//# sourceMappingURL=quiz.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_database__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let NoticePage = class NoticePage {
    constructor(db, navCtrl, navParams) {
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatafromDatabase();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoadNoticePage');
    }
    getDatafromDatabase() {
        this.db.list('/notices').valueChanges().subscribe(data => {
            this.messages = data;
            //     console.log(this.users);
        });
    }
};
NoticePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-notice',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\notice\notice.html"*/'<!--\n\n  Generated template for the NoticePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n\n\n<!--\n\n  Generated template for the MenuPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Notice Board</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page"  padding>\n\n  <div *ngIf="messages">\n\n    <ion-grid>\n\n      <ion-row>\n\n    <ion-col col-12 col-lg-4 *ngFor="let message of messages">\n\n  <ion-card>\n\n    <img src="{{message.photourl}}"  style="width: 100%; max-height: 300px;">\n\n    <ion-card-content>\n\n      <div><p [innerHTML]="message.message">{{message.message}}</p></div>\n\n      <br>\n\n      <hr>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-4>\n\n            <div>Posted at: {{message.timestamp}}</div>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <div>Posted by : {{message.lecturer}}</div>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <div>Updated at : {{message.timestamp2}}</div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-col>\n\n</ion-row>\n\n</ion-grid>\n\n \n\n</div>\n\n\n\n\n\n\n\n    <div [hidden]="messages || errMess">\n\n      <ion-spinner></ion-spinner>\n\n      <h4>Loading . . . Please Wait</h4>\n\n    </div>\n\n    <div *ngIf="errMess">\n\n      <h2>Error</h2>\n\n      <h4>{{errMess}}</h4>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\notice\notice.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], NoticePage);

//# sourceMappingURL=notice.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_storage__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProfilePage_1;







/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let ProfilePage = ProfilePage_1 = class ProfilePage {
    constructor(loadingCtrl, storage, alertCtrl, afAuth, db, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.afAuth = afAuth;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.downloadableURL = '';
        this.basePath = '/profileimgs';
        this.updateDetail = false;
    }
    ionViewDidLoad() {
        this.afAuth.authState.take(1).subscribe(data => {
            if (data && data.email && data.uid) {
                this.userId = data.uid;
                this.db.object('users/' + data.uid).valueChanges().subscribe(data => {
                    this.userData = data;
                });
            }
            else
                alert("you are noauthenticated");
        }); //authstate
    } //inview/
    delete() {
        this.storage.storage.refFromURL(this.userData.photourl).delete();
    }
    toggleUpdateDetails() {
        this.updateDetail = !this.updateDetail;
    }
    deleteimg(photourl) {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'removing image in progress <br> Please Wait...'
        });
        loading.present();
        this.storage.storage.refFromURL(photourl).delete().then(async () => {
            this.userData.photourl = "";
            this.db.object('/users/' + this.userId).update(this.userData)
                .then(() => {
                loading.dismiss();
                this.enableimgupdate = true;
                let alert = this.alertCtrl.create({
                    title: '<font color="green"><b> </b>Cover Image Removed</font>',
                    cssClass: "alert",
                    buttons: [
                        {
                            text: 'Ok',
                            role: 'cancel',
                            handler: data => {
                                this.navCtrl.push(ProfilePage_1);
                            }
                        },
                    ]
                });
                alert.present();
            }); //end  update
        }); //end of delete
    }
    async update(user) {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Data updating in progress <br> Please Wait...'
        });
        loading.present();
        if (this.selectedFile) {
            const filePath = `${this.basePath}/${user.name.trim() + user.admno}`;
            this.filepath2 = filePath; // inorder to get the path to delete file
            this.task = this.storage.upload(filePath, this.selectedFile);
            this.progressValue = this.task.percentageChanges(); // <<<<< Percentage of uploading is
            (await this.task).ref.getDownloadURL().then(url => {
                this.downloadableURL = url;
                user.photourl = this.downloadableURL;
                try {
                    this.db.object('/users/' + this.userId).update(user)
                        .then(() => {
                        let alert2 = this.alertCtrl.create({
                            title: '<font color="green"><b> </b>Profile update Successful </font>',
                            cssClass: "alert",
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'cancel',
                                    handler: data => {
                                        this.updateDetail = !this.updateDetail;
                                        loading.dismiss();
                                    }
                                },
                            ]
                        });
                        alert2.present();
                        loading.dismiss();
                    });
                }
                catch (error) {
                    this.emailError = error.message;
                    alert(error.message);
                    console.error(error);
                }
            }); ///end of await  
        }
        else {
            var loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                dismissOnPageChange: true,
                content: 'Data updating in progress <br> Please Wait...'
            });
            loading.present();
            try {
                //user.photourl = "";;
                this.db.object('/users/' + this.userId).update(user)
                    .then(() => {
                    let alert2 = this.alertCtrl.create({
                        title: '<font color="green"><b> </b>Profile update Successful </font>',
                        cssClass: "alert",
                        buttons: [
                            {
                                text: 'Ok',
                                role: 'cancel',
                                handler: data => {
                                    this.updateDetail = !this.updateDetail;
                                    loading.dismiss();
                                    //  this.afAuth.auth.signOut().then(()=>{})
                                }
                            },
                        ]
                    });
                    alert2.present();
                    loading.dismiss();
                });
            }
            catch (error) {
                this.emailError = error.message;
                alert(error.message);
                console.error(error);
            }
        } //end of if file selected methodd
    } //end of update
    async updawte(user) {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Data uploading in progress <br> Please Wait...'
        });
        loading.present();
        if (this.userData.photourl != "") {
            this.storage.storage.refFromURL(this.userData.photourl).delete().then(async () => {
                if (this.selectedFile) {
                    const filePath = `${this.basePath}/${user.name.trim()}`;
                    this.filepath2 = filePath; // inorder to get the path to delete file
                    this.task = this.storage.upload(filePath, this.selectedFile);
                    this.progressValue = this.task.percentageChanges(); // <<<<< Percentage of
                    (await this.task).ref.getDownloadURL().then(url => {
                        this.downloadableURL = url;
                        user.photourl = this.downloadableURL;
                        try {
                            this.db.object('/users/' + this.userId).update(user)
                                .then(() => {
                                let alert2 = this.alertCtrl.create({
                                    title: '<font color="green"><b> </b>Profile update Successful </font>',
                                    cssClass: "alert",
                                    buttons: [
                                        {
                                            text: 'Ok',
                                            role: 'cancel',
                                            handler: data => {
                                                //  this.afAuth.auth.signOut().then(()=>{})
                                            }
                                        },
                                    ]
                                });
                                alert2.present();
                                loading.dismiss();
                            });
                        }
                        catch (error) {
                            this.emailError = error.message;
                            alert(error.message);
                            console.error(error);
                        }
                    }); ///end of await  
                }
                else {
                    try {
                        user.photourl = "";
                        this.db.object('/users/' + this.userId).update(user)
                            .then(() => {
                            let alert2 = this.alertCtrl.create({
                                title: '<font color="green"><b> </b>Profile update Successful </font>',
                                cssClass: "alert",
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: data => {
                                        }
                                    },
                                ]
                            });
                            alert2.present();
                            loading.dismiss();
                        });
                    }
                    catch (error) {
                        this.emailError = error.message;
                        alert(error.message);
                        console.error(error);
                    }
                } //end of if file selected method
            }); //end of delete
        } //end of if imgage
        else {
            if (this.selectedFile) {
                const filePath = `${this.basePath}/${user.name.trim()}`;
                this.filepath2 = filePath; // inorder to get the path to delete file
                this.task = this.storage.upload(filePath, this.selectedFile);
                this.progressValue = this.task.percentageChanges(); // <<<<< Percentage of uploading is
                (await this.task).ref.getDownloadURL().then(url => {
                    this.downloadableURL = url;
                    user.photourl = this.downloadableURL;
                    try {
                        this.db.object('/users/' + this.userId).update(user)
                            .then(() => {
                            let alert2 = this.alertCtrl.create({
                                title: '<font color="green"><b> </b>Profile update Successful </font>',
                                cssClass: "alert",
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: data => {
                                        }
                                    },
                                ]
                            });
                            alert2.present();
                            loading.dismiss();
                        });
                    }
                    catch (error) {
                        this.emailError = error.message;
                        alert(error.message);
                        console.error(error);
                    }
                }); ///end of await  
            }
            else {
                try {
                    user.photourl = "";
                    this.db.object('/users/' + this.userId).update(user)
                        .then(() => {
                        let alert2 = this.alertCtrl.create({
                            title: '<font color="green"><b> </b>Profile update Successful </font>',
                            cssClass: "alert",
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'cancel',
                                    handler: data => {
                                        //  this.afAuth.auth.signOut().then(()=>{})
                                    }
                                },
                            ]
                        });
                        alert2.present();
                        loading.dismiss();
                    });
                }
                catch (error) {
                    this.emailError = error.message;
                    alert(error.message);
                    console.error(error);
                }
            } //end of if file selected methodd
        } //if user not photo url
    } //end of update
    chooseFile(event) {
        if (event.target.files[0].size < 303110) {
            if (event.target.files && event.target.files[0]) {
                this.selectedFile = event.target.files[0];
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.img1 = event.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
        else {
            let alert = this.alertCtrl.create({
                title: '<font color="green"><b> </b> The image should be less then 301KB </font>',
                cssClass: "alert",
                buttons: [
                    {
                        text: 'Ok',
                        role: 'cancel',
                        handler: data => {
                            this.selectedFile = "";
                        }
                    },
                ]
            });
            alert.present();
            this.selectedFile = "";
        } //end of else state,
    }
};
ProfilePage = ProfilePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\profile\profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding *ngIf ="userData">\n  <div id="content" *ngIf="!updateDetail">\n    <div id="profile-info" *ngIf="userData.photourl">\n      <img  src=\'{{userData?.photourl}}\' id="profile-image" >\n    </div>\n   \n    <ion-card >\n     \n\n      <ion-grid id="data" class="ion-text-center">\n\n\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Name :</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.name}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Email :</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.email}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Admission No:</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.admno}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Department:</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.department}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >level:</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.level}}</ion-label>\n          </ion-col>\n        </ion-row>\n    \n        <ion-row>\n          <ion-col col-lg-6 class="udetail update">\n            <ion-label update>\n              <button ion-button color="secondary" round outline (click)="toggleUpdateDetails()">Update Details</button>\n            </ion-label>\n          </ion-col>\n          <ion-col col-lg-6 class="udetail update">\n            <ion-label update>\n              <button ion-button color="secondary" round outline (click)="presentProfileModal(user)">Reset Password</button>\n            </ion-label>\n          </ion-col>\n      </ion-row>\n    \n      </ion-grid>\n    <!--image uplaod prev start here-->\n    </ion-card>\n  </div>\n\n\n  \n\n\n  <ion-card  id="update_card" *ngIf="updateDetail">\n\n    <ion-card *ngIf="userData.photourl">\n\n      <img  src=\'{{userData?.photourl}}\' width="450px" height="350px"/>\n        <button ion-button (click)="deleteimg(userData.photourl)">Delete Image</button>\n    \n    \n     </ion-card>\n   \n    <ion-item class="input" *ngIf="!userData.photourl">\n      \n          <ion-label  color="primary">Module cover image (optional) :</ion-label>\n \n          \n      <ion-input type="file" name="inputFile"  (change)="chooseFile($event)"></ion-input>\n    </ion-item>\n    \n<div id="coverImage" *ngIf="img1">\n   <ion-card id="coverImage">\n\n    <p>Cover image preview</p>\n     \n      <img *ngIf="img1" [src]="img1"  onerror="this.onerror=null;this.src=\'assets/noimage.jpg\';"  width="450px" height="350px"/>\n      <button  class="button" ion-button  (click)="removeFile()">Remove image</button>\n\n   \n  \n  \n <!-- Progress Bar -->\n\n<div *ngIf="progressValue | async as val">\n<progress type="warning"  [value]="val" style="height: 7mm; width: 50%" max="100" ></progress>\n<br />\n  <span *ngIf="val<100" style="color:rgb(255, 60, 0); font-size: 17px; font-weight: 410;">{{ val | number}}% </span><span *ngIf="val == 100" style="color:rgb(1, 153, 34);  font-size: 17px; font-weight: 410;">Completed !</span>\n</div>\n\n<!-- End -->\n  </ion-card >\n</div>\n  <!--image uplaod end here-->\n    <form method="POST">\n\n        <ion-item class="input"> \n          <ion-label floating id="inputlabel">Admission No :</ion-label>     \n          <ion-input type="text" [(ngModel)]="userData.admno"  name="admno" required minlength="10" #admno="ngModel" pattern="[0-9]{10}"> </ion-input>\n        </ion-item>\n        <div  *ngIf="admno.invalid && (admno.dirty || admno.touched)" class="alert alert-danger">\n          <div *ngIf="admno.errors?.pattern" class="error">Admission Number should contain only a Number & must be at least 10 characters long. </div>\n        </div>\n        <div  *ngIf="admno.invalid && (admno.dirty || admno.touched)" class="alert alert-danger">\n          <div *ngIf="admno.errors.required" class="error">\n            Admission Number is required.\n          </div>\n           \n        </div>\n    \n        <ion-item class="input"> \n          <ion-label floating id="inputlabel">Full Name :</ion-label>     \n          <ion-input type="text" [(ngModel)]="userData.name" name="name" required minlength="4"  #name="ngModel" pattern="[A-Za-z]+"> </ion-input>\n        </ion-item>\n        <div  *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">\n             <div *ngIf="name.errors.required" class="error">\n              Name is required.\n             </div>\n              \n               <div *ngIf="name.errors?.pattern" class="error">\n                  Name should contain only alphabets\n               </div>\n             \n              <div *ngIf="name.errors.minlength" class="error">\n              Name must be at least 4 characters long.\n              </div>\n          </div>\n    \n        <ion-item class="input"> \n          <ion-label floating id="inputlabel">Department :</ion-label>     \n          <ion-input type="text" [(ngModel)]="userData.department"  name="department" required minlength="2"  #department="ngModel"  pattern="[A-Za-z]+"> </ion-input>\n        </ion-item>\n        <div  *ngIf="department.invalid && (department.dirty || department.touched)" class="alert alert-danger">\n              <div *ngIf="department.errors?.pattern" class="error">\n                Department should contain only alphabets\n            </div>\n            <div *ngIf="department.errors.required" class="error">\n              Department is required.\n              </div>\n              <div *ngIf="department.errors.minlength" class="error">\n              Department must be at least 2 characters long.\n              </div>\n       </div>\n\n       <ion-item class="input"> \n        <ion-label floating id="inputlabel">Level Of Study :</ion-label>     \n        <ion-select [(ngModel)]="userData.level" name="level">\n          <ion-option value="100 Level">100 Level </ion-option>\n          <ion-option value="200 Level">200 Level </ion-option>\n          <ion-option value="300 Level">300 Level </ion-option>\n          <ion-option value="400 Level">400 Level </ion-option>\n          <ion-option value="500 Level">500 Level </ion-option>\n        </ion-select>\n    </ion-item>\n    \n       <div id="login-buttons">\n    \n\n        <button round   color="primary" ion-button (click)="update(userData)">Update</button>\n     \n      </div>\n    \n    </form>\n\n  </ion-card>\n  \n\n\n      <div [hidden]="userData || errMess">\n        <ion-spinner></ion-spinner>\n        <h4>Loading . . . Please Wait</h4>\n      </div>\n      <div *ngIf="errMess">\n        <h2>Error</h2>\n        <h4>{{errMess}}</h4>\n      </div>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__angular_fire_storage__["a" /* AngularFireStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_app__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let SettingsPage = class SettingsPage {
    constructor(storage, navCtrl, navParams, app) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPag e');
    }
    dark() {
        this.app.activeTheme = "dark-theme";
        this.storage.set('activetheme', "dark-theme");
    }
    light() {
        this.app.activeTheme = "light-theme";
        this.storage.set('activetheme', "light-theme");
    }
    default() {
        this.app.activeTheme = "default";
        this.storage.set('activetheme', "default");
    }
};
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\settings\settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="ios-menu-outline"></ion-icon>\n    </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n \n<form id="login-form">\n<ion-label text-center>Themes</ion-label>\n  <ion-list radio-group  no-lines>\n\n       <ion-item >\n           <ion-label>Dark Theme</ion-label>\n           <ion-radio (ionSelect)="dark()" ></ion-radio>\n      \n         </ion-item>\n       <ion-item >\n         <ion-label> Light Theme</ion-label>\n         <ion-radio (ionSelect)="light()" value="2" ></ion-radio>\n \n         </ion-item>\n       <ion-item >\n         <ion-label> Default theme</ion-label>\n         <ion-radio  (ionSelect)="default()" value="3"></ion-radio>\n       </ion-item>\n  </ion-list>\n</form>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_app_app__["a" /* AppProvider */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 222:
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
webpackEmptyAsyncContext.id = 222;

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		569,
		20
	],
	"../pages/bookdetail/bookdetail.module": [
		570,
		19
	],
	"../pages/contact/contact.module": [
		571,
		18
	],
	"../pages/friendchat/friendchat.module": [
		572,
		17
	],
	"../pages/friendlist/friendlist.module": [
		574,
		16
	],
	"../pages/friendrc/friendrc.module": [
		573,
		15
	],
	"../pages/friendrq/friendrq.module": [
		575,
		14
	],
	"../pages/friends/friends.module": [
		576,
		13
	],
	"../pages/library/library.module": [
		577,
		12
	],
	"../pages/live/live.module": [
		578,
		11
	],
	"../pages/livevideo/livevideo.module": [
		579,
		10
	],
	"../pages/login/login.module": [
		580,
		9
	],
	"../pages/menu/menu.module": [
		581,
		8
	],
	"../pages/moduledetail/moduledetail.module": [
		582,
		7
	],
	"../pages/notice/notice.module": [
		583,
		6
	],
	"../pages/profile/profile.module": [
		584,
		5
	],
	"../pages/profiledetail/profiledetail.module": [
		585,
		4
	],
	"../pages/quiz/quiz.module": [
		586,
		3
	],
	"../pages/register/register.module": [
		587,
		2
	],
	"../pages/settings/settings.module": [
		588,
		1
	],
	"../pages/studentlist/studentlist.module": [
		589,
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
webpackAsyncContext.id = 264;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 287;

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_baseurl__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process_httpmsg_process_httpmsg__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
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
  Generated class for the BookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let BooksProvider = class BooksProvider {
    constructor(http, processHTTPMsgService) {
        this.http = http;
        this.processHTTPMsgService = processHTTPMsgService;
        console.log('Hello Books Provider Provider');
    }
    getbooks() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__shared_baseurl__["a" /* baseURL */] + 'books')
            .map(res => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }
    getbook(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__shared_baseurl__["a" /* baseURL */] + 'books/' + id)
            .map(res => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }
};
BooksProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__process_httpmsg_process_httpmsg__["a" /* ProcessHttpmsgProvider */]])
], BooksProvider);

//# sourceMappingURL=books.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_modules_modules__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__moduledetail_moduledetail__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_auth__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








let HomePage = class HomePage {
    constructor(afAuth, db, alertCtrl, storage, navCtrl, navParams, menuCtrl, moduleservice, modalCtrl, toastCtrl, BaseURL) {
        this.afAuth = afAuth;
        this.db = db;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.moduleservice = moduleservice;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.BaseURL = BaseURL;
    }
    ngOnInit() {
        this.moduleservice.getmodules()
            .subscribe(modules => this.modules = modules, errmess => this.errMess = errmess);
        this.storage.set("0", true);
        //  this.storage.set("2", false);
        /*
                this.storage.get("1").then((val) => {
        
                  console.log('Your grade is', val);
                });
                */
    }
    ionViewDidEnter() {
        // the root left menu should be disabled on this page
        this.menuCtrl.enable(true);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuPa');
        //  this.presentPrompt();
    }
    presentPrompt() {
        let alert = this.alertCtrl.create({
            title: 'Login',
            cssClass: "alertb",
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username'
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        this.presentPrompt();
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }
    moduleSelected(event, module, id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__moduledetail_moduledetail__["a" /* ModuledetailPage */], {
            module: module
        });
    }
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\home\home.html"*/'<ion-header class="header">\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-searchbar id=searchBar [(ngModel)]="term">\n\n \n\n    </ion-searchbar>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page">\n\n<!--  <button ion-button color="danger" block (click)="openSignupModal()">Signup ith slider</button>\n\n-->\n\n\n\n<br><br>\n\n<div *ngIf="modules">\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-12 col-lg-4 *ngFor="let module of modules | filter:term">\n\n        <ion-card id="moduleCard" color="primary-pale" (click)="moduleSelected($event, module, module.id)">\n\n          <img *ngIf="module.photourl" src=\'{{module.photourl}}\'/>\n\n\n\n          <h1 id="h">{{ module.name }}</h1>\n\n          <h1 id="h">{{ module.moduleEmail }}</h1>\n\n                  \n\n        </ion-card>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>  \n\n  </div>\n\n      <div [hidden]="modules || errMess">\n\n        <ion-spinner></ion-spinner>\n\n        <h4>Loading . . . Please Wait</h4>\n\n      </div>\n\n      <div *ngIf="errMess">\n\n        <h2>Error</h2>\n\n        <h4>{{errMess}}</h4>\n\n      </div>\n\n  </ion-content>'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\home\home.html"*/
    }),
    __param(10, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('BaseURL')),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_modules_modules__["a" /* ModulesProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], Object])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LivevideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_peerjs__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_peerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_peerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LivevideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let LivevideoPage = class LivevideoPage {
    constructor(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.peer = new __WEBPACK_IMPORTED_MODULE_2_peerjs___default.a();
        this.peerx = new __WEBPACK_IMPORTED_MODULE_2_peerjs___default.a();
        this.nolecture = false;
        this.n = navigator;
        this.getPeerId = () => {
            //Generate unique Peer Id for establishing connection
            this.peer.on('open', (id) => {
                this.peerId = id;
                //   this.targetpeer =this.peerId
                // this.createURLToConnect(id);
            });
        };
        this.getPeerId();
    }
    ngOnInit() {
        this.db.object('/live/lectureLink').valueChanges().subscribe(data => {
            this.targetpeer = data;
            if (!this.targetpeer) {
                this.nolecture = true;
            }
        });
    }
    ngOnInit1() {
        this.peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                // Will print 'hi!'
                console.log(data);
            });
            conn.on('open', () => {
                conn.send('hello!');
            });
        });
    } //end of ngoninit
    connect(id) {
        const conn = this.peer.connect(id);
        conn.on('open', () => {
            conn.send('hi!');
        });
    }
    call() {
        let video = this.myVideo.nativeElement;
        this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
        this.n.getUserMedia({ video: true, audio: true }, (stream) => {
            const call = this.peer.call(this.targetpeer, stream);
            call.on('stream', (remoteStream) => {
                let mediaStream = new MediaStream();
                mediaStream = remoteStream;
                video.srcObject = mediaStream;
                video.play();
                //   this.lvideo = URL.createObjectURL(remoteStream);
                // Show stream in some <video> element.
                //  this.myVideo.src = URL.createObjectURL(remoteStream);
                //    this.myVideo.srcObject = remoteStream;
                //   this.myVideo.play();
                /*
                 const video = document.createElement('video');
                 video.classList.add('video');
                 video.srcObject = remoteStream;
                 video.play();
                 document.getElementById('remote-video').append(video);
             */
                //  this.myVideo.nativeElement.src = window.URL.createObjectURL(remoteStream);
                //  this.stream = stream;
                //    this.myVideo.nativeElement.play();
            });
        }, (err) => {
            console.error('Failed to get local stream', err);
        });
    }
    answer() {
        let video = this.myVideo.nativeElement;
        this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
        this.peer.on('call', (call) => {
            this.n.getUserMedia({ video: true, audio: true }, (stream) => {
                call.answer(stream); // Answer the call with an A/V stream.
                //   stream.getTracks().forEach(track => track.stop());
                call.on('stream', (remoteStream) => {
                    let mediaStream = new MediaStream();
                    mediaStream = remoteStream;
                    video.srcObject = mediaStream;
                    video.play();
                });
            }, (err) => {
                console.error('Failed to get local stream', err);
            });
        });
    }
    initt() {
        let video = this.myVideo.nativeElement;
        this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
        // this.db.object('/live/lectureLink').set(this.peerId)
        this.peer.on('call', (call) => {
            this.n.getUserMedia({ video: true, audio: true }, (stream) => {
                call.answer(stream); // Answer the call with an A/V stream.
                //   stream.getTracks().forEach(track => track.stop());
                call.on('stream', (remoteStream) => {
                    let mediaStream = new MediaStream();
                    mediaStream = remoteStream;
                    video.srcObject = mediaStream;
                    video.play();
                });
            }, (err) => {
                console.error('Failed to get local stream', err);
            });
        });
    }
}; //end of the class
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('myvideo'),
    __metadata("design:type", Object)
], LivevideoPage.prototype, "myVideo", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('fire'),
    __metadata("design:type", Object)
], LivevideoPage.prototype, "fire", void 0);
LivevideoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-livevideo',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\livevideo\livevideo.html"*/'<!--\n  Generated template for the LivevideoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<!--<h1>Your Id = {{peerId}}</h1>\n<h1>lecture Id = {{targetpeer}}</h1>-->\n<div class="ldiv" *ngIf="!nolecture"><p class="lnotice">Lecture Is currently taking place<br>\n  Class Room ID = {{targetpeer}}</p>\n  <br><br><br>\n  <button ion-button  (click)="call()">Join Lecture</button>\n  </div>\n\n  <div class="ldiv" *ngIf="nolecture"><p class="lnotice">No lecture is currenty taking place<br>\n   </div>\n<video #myvideo  width="100%" height="800px"></video>\n<!--<input type="text" [(ngModel)]="targetpeer"/>-->\n\n<!--<button ion-button  (click)="call(targetpeer)">call video</button>\n<button ion-button  (click)="connect(targetpeer)">connect</button>\n<button ion-button  (click)="answer()">answer</button>\n\n<button ion-button  (click)="initt()">Init</button>-->\n<!--\n<div style="width: 400px; height: 300px; border: 2px solid" id="remote-video"></div>\n-->\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\livevideo\livevideo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */]])
], LivevideoPage);

//# sourceMappingURL=livevideo.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take__);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_baseurl__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_menu_menu__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_contact_contact__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_process_httpmsg_process_httpmsg__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_modules_modules__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_moduledetail_moduledetail__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_quiz_quiz__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_fire___ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_register_register__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_live_live__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_notice_notice__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_library_library__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_fire_firestore__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_settings_settings__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_app_app__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_books_books__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_bookdetail_bookdetail__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ng2_pdf_viewer__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_ngx_doc_viewer__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_ng2_pdfjs_viewer__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ng2_search_filter__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_profile_profile__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_fire_storage__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_livevideo_livevideo__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_studentlist_studentlist__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_friendchat_friendchat__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_profiledetail_profiledetail__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_friends_friends__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_friendlist_friendlist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_friendrc_friendrc__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_friendrq_friendrq__ = __webpack_require__(184);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























//import { AngularFireDatabaseModule } from '@angular/fire/database';










//import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
//import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";










/*
const GOOGLE_CLIENT_ID = "272483367188-aeqf15c6lhe3shfrc4alqc41cc87qlgh.apps.googleusercontent.com";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID)
  }

]);
*/
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAFQ7QYOHpcp2BdnpnjMwGIbPShOB7Kwvk",
    authDomain: "udusfinalyear.firebaseapp.com",
    databaseURL: "https://udusfinalyear.firebaseio.com",
    projectId: "udusfinalyear",
    storageBucket: "udusfinalyear.appspot.com",
    messagingSenderId: "579022321242",
    appId: "1:579022321242:web:87bf7cce5aef0905858a63",
    measurementId: "G-2R8C3JH5YH"
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_moduledetail_moduledetail__["a" /* ModuledetailPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_quiz_quiz__["a" /* QuizPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_live_live__["a" /* LivePage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_notice_notice__["a" /* NoticePage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_library_library__["a" /* LibraryPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_bookdetail_bookdetail__["a" /* BookdetailPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_livevideo_livevideo__["a" /* LivevideoPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_friendchat_friendchat__["a" /* FriendchatPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_profiledetail_profiledetail__["a" /* ProfiledetailPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_friends_friends__["a" /* FriendsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_studentlist_studentlist__["a" /* StudentlistPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_friendlist_friendlist__["a" /* FriendlistPage */],
            __WEBPACK_IMPORTED_MODULE_43__pages_friendrc_friendrc__["a" /* FriendrcPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_friendrq_friendrq__["a" /* FriendrqPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/bookdetail/bookdetail.module#BookdetailPageModule', name: 'BookdetailPage', segment: 'bookdetail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/contact/contact.module#ContactPageModule', name: 'ContactPage', segment: 'contact', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/friendchat/friendchat.module#FriendchatPageModule', name: 'FriendchatPage', segment: 'friendchat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/friendrc/friendrc.module#FriendrcPageModule', name: 'FriendrcPage', segment: 'friendrc', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/friendlist/friendlist.module#FriendlistPageModule', name: 'FriendlistPage', segment: 'friendlist', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/friendrq/friendrq.module#FriendrqPageModule', name: 'FriendrqPage', segment: 'friendrq', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/friends/friends.module#FriendsPageModule', name: 'FriendsPage', segment: 'friends', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/library/library.module#LibraryPageModule', name: 'LibraryPage', segment: 'library', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/live/live.module#LivePageModule', name: 'LivePage', segment: 'live', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/livevideo/livevideo.module#LivevideoPageModule', name: 'LivevideoPage', segment: 'livevideo', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/moduledetail/moduledetail.module#ModuledetailPageModule', name: 'ModuledetailPage', segment: 'moduledetail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notice/notice.module#NoticePageModule', name: 'NoticePage', segment: 'notice', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profiledetail/profiledetail.module#ProfiledetailPageModule', name: 'ProfiledetailPage', segment: 'profiledetail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/quiz/quiz.module#QuizPageModule', name: 'QuizPage', segment: 'quiz', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/studentlist/studentlist.module#StudentlistPageModule', name: 'StudentlistPage', segment: 'studentlist', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_15__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_18__angular_fire___["a" /* AngularFireModule */].initializeApp(FIREBASE_CONFIG),
            // IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),
            __WEBPACK_IMPORTED_MODULE_19__angular_fire_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_25__angular_fire_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_26__angular_fire_firestore__["b" /* AngularFirestoreModule */],
            __WEBPACK_IMPORTED_MODULE_36__angular_fire_storage__["b" /* AngularFireStorageModule */],
            __WEBPACK_IMPORTED_MODULE_31_ng2_pdf_viewer__["a" /* PdfViewerModule */],
            __WEBPACK_IMPORTED_MODULE_32_ngx_doc_viewer__["a" /* NgxDocViewerModule */],
            __WEBPACK_IMPORTED_MODULE_33_ng2_pdfjs_viewer__["a" /* PdfJsViewerModule */],
            __WEBPACK_IMPORTED_MODULE_34_ng2_search_filter__["a" /* Ng2SearchPipeModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_quiz_quiz__["a" /* QuizPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_moduledetail_moduledetail__["a" /* ModuledetailPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_live_live__["a" /* LivePage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_notice_notice__["a" /* NoticePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_library_library__["a" /* LibraryPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_bookdetail_bookdetail__["a" /* BookdetailPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_livevideo_livevideo__["a" /* LivevideoPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_studentlist_studentlist__["a" /* StudentlistPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_friendchat_friendchat__["a" /* FriendchatPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_profiledetail_profiledetail__["a" /* ProfiledetailPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_friends_friends__["a" /* FriendsPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_friendlist_friendlist__["a" /* FriendlistPage */],
            __WEBPACK_IMPORTED_MODULE_43__pages_friendrc_friendrc__["a" /* FriendrcPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_friendrq_friendrq__["a" /* FriendrqPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: 'BaseURL', useValue: __WEBPACK_IMPORTED_MODULE_3__shared_baseurl__["a" /* baseURL */] },
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_12__providers_process_httpmsg_process_httpmsg__["a" /* ProcessHttpmsgProvider */],
            __WEBPACK_IMPORTED_MODULE_36__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_13__providers_modules_modules__["a" /* ModulesProvider */],
            __WEBPACK_IMPORTED_MODULE_28__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_29__providers_books_books__["a" /* BooksProvider */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__studentlist_studentlist__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { AuthService } from "angular4-social-login";
//import {  GoogleLoginProvider } from "angular4-social-login";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let LoginPage = class LoginPage {
    constructor(loadingCtrl, afAuth, navCtrl, navParams, menuCtrl, modalCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.modalCtrl = modalCtrl;
        this.user = {};
        this.menuCtrl.enable(false);
    }
    // the root left menu should be disabled on this page
    ionViewWillEnter() {
    }
    presentLoadingText() {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Logging Please Wait...'
        });
        loading.present();
        setTimeout(() => {
            loading.dismiss();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__studentlist_studentlist__["a" /* StudentlistPage */]);
        }, 3000);
    }
    async login(user) {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Logging Please Wait...'
        });
        loading.present();
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                loading.dismiss();
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__studentlist_studentlist__["a" /* StudentlistPage */]);
            }
            else {
                setTimeout(() => {
                    loading.dismiss();
                }, 2000);
            }
        }
        catch (error) {
            console.error(error);
            this.errorMsg = error.message;
            alert(this.errorMsg);
            loading.dismiss();
        }
    }
    Register() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    }
    DemoLogin() {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__studentlist_studentlist__["a" /* StudentlistPage */]);
        //this.presentLoadingText();
    }
}; //end of classs
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n <ion-item  class="input">\n\n    <ion-label>password :</ion-label>\n\n    <ion-input type="password"> </ion-input>\n\n\n\n\n\n  </ion-item>\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header no-border>\n\n  <ion-navbar transparent>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <img class="logo" id="logo" src="assets/imgs/unilogo.png" />\n\n        <div id="formPadding">\n\n          <ion-label id="emadrisa">Social Plus</ion-label>\n\n        </div>\n\n        <form  color="primary" id="login-form">\n\n          <ion-card-header id="login-header">\n\n            <ion-label id="emadrisa"></ion-label>\n\n            <div (click)="Register()" id="login-buttons">\n\n              <span>Don\'t have an account? <strong>Sign up here</strong>.</span>\n\n            </div>\n\n          </ion-card-header>\n\n  \n\n  \n\n        <ion-item class="input"> \n\n          <ion-label floating id="inputlabel" >Email address :</ion-label>     \n\n          <ion-input type="text" [(ngModel)]="user.email" name="email" required email  #email="ngModel" > </ion-input>\n\n        </ion-item>\n\n       \n\n        <ion-item class="input">\n\n          <ion-label floating id="inputlabel">Password :</ion-label>\n\n          <ion-input type="password" [(ngModel)]="user.password"  name="password" required minlength="4" #password="ngModel"> </ion-input>\n\n        </ion-item>\n\n      \n\n        <div id="login-buttons">\n\n\n\n          <button round class="button" id="login-button" ion-button *ngIf="password.invalid || email.invalid" id="invalid">login</button>\n\n          <button round *ngIf="password.valid && email.valid" id="login-button" (click)="login(user)" ion-button color="primary">login</button>\n\n          <button round (click)="DemoLogin()"  id="login-button" ion-button color="primary">Demo Login</button>\n\n        </div>\n\n\n\n        <div class="strike">\n\n          <span>OR</span>\n\n        </div>\n\n        <div id="fbgoogle">\n\n         \n\n        <button ion-button block clear (click)="login()" color="light" class="login-button"> <ion-icon name="logo-facebook"></ion-icon> Login with Facebook</button>\n\n        <button ion-button block clear (click)="signInWithGoogle()" color="light" class="login-button"><ion-icon name="logo-google"></ion-icon> Login with Google</button>\n\n      \n\n      </div>\n\n        \n\n       \n\n      </form>\n\n      \n\n  </ion-content>\n\n  <ion-footer>\n\n    <ion-toolbar class="footer">\n\n      <div id="login-buttons">\n\n        <button id="footer-login" round outline  ion-button >About</button>\n\n        <button id="footer-login" round outline  ion-button >Contact</button>\n\n      </div>\n\n    </ion-toolbar>\n\n  </ion-footer>\n\n  '/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_live_live__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_notice_notice__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_app_app__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_library_library__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_profile_profile__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_studentlist_studentlist__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_friends_friends__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















let MyApp = class MyApp {
    constructor(loadingCtrl, platform, statusBar, splashScreen, app, afAuth, db) {
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.afAuth = afAuth;
        this.db = db;
        // rootPage: any = LoginPage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation  
        this.pages = [
            { title: 'UDUS Students', icon: 'ios-people-outline', component: __WEBPACK_IMPORTED_MODULE_18__pages_studentlist_studentlist__["a" /* StudentlistPage */] },
            { title: 'My Friends', icon: 'ios-chatbubbles-outline', component: __WEBPACK_IMPORTED_MODULE_19__pages_friends_friends__["a" /* FriendsPage */] },
            { title: 'My Profile', icon: 'ios-contact-outline', component: __WEBPACK_IMPORTED_MODULE_15__pages_profile_profile__["a" /* ProfilePage */] },
            { title: 'Students Room', icon: 'ios-school-outline', component: __WEBPACK_IMPORTED_MODULE_10__pages_live_live__["a" /* LivePage */] },
            { title: 'E-Notice Board', icon: 'ios-clipboard-outline', component: __WEBPACK_IMPORTED_MODULE_11__pages_notice_notice__["a" /* NoticePage */] },
            { title: 'E-Library', icon: 'ios-book-outline', component: __WEBPACK_IMPORTED_MODULE_14__pages_library_library__["a" /* LibraryPage */] },
            { title: 'Courses & Write-ups', icon: 'ios-create-outline', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
            { title: 'My Quiz Progress', icon: 'ios-school-outline', component: __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__["a" /* MenuPage */] },
            { title: 'Customize UI', icon: 'ios-color-palette-outline', component: __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Help Desk', icon: 'ios-send-outline', component: __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */] },
            { title: 'About', icon: 'ios-information-circle-outline', component: __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */] }
        ];
    }
    initializeApp() {
        this.platform.ready().then(() => {
            /* Okay, so the platform is ready and our plugins are available.
            ,error => {
              alert(error);
              loading.dismiss();
              }
             Here you can do any higher level native things you might need.*/
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            /*
                  let loading = this.loadingCtrl.create({
                    spinner: 'bubbles',
                    dismissOnPageChange: true,
                    content: 'Please Wait...'
                  });
                
                  loading.present();
            
                  this.afAuth.authState.take(1).subscribe(data => {
                    if(data && data.email && data.uid){
                      this.db.object('users/'+data.uid).valueChanges().subscribe(
                        data => {
                          this.userData = data;
                          loading.dismiss()
                         this.nav.setRoot(StudentlistPage);
                        });
                    }else
              
                    this.nav.setRoot(StudentlistPage);
              
                  },error => {
                    this.nav.setRoot(StudentlistPage);
                    })//authstate
            
            
            
                },error => {
                  this.nav.setRoot(StudentlistPage);
                  */
        });
    }
    logout() {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Logging out Please Wait...'
        });
        loading.present();
        this.afAuth.auth.signOut().then(() => {
            loading.dismiss();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
        });
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\app\app.html"*/'<ion-split-pane  *ngIf="app.activeTheme" [ngClass]="app.activeTheme">\n\n  <ion-menu [content]="content" type="overlay" menuId="custom" >\n\n    <ion-header>\n\n      <ion-toolbar color="primary">\n\n  \n\n        <div >\n\n          <br>\n\n         \n\n            <img  item-center src="assets/imgs/unilogo.png" alt="UDUS LOGO" id="profile-image" />\n\n          <br>\n\n        \n\n        </div>\n\n \n\n    \n\n      </ion-toolbar>\n\n    </ion-header>\n\n    \n\n\n\n    <ion-content  id="left-menu">\n\n\n\n      <ion-list  no-lines>\n\n        <button color="primary-pale" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n          <ion-icon [name]="p.icon" item-left></ion-icon>\n\n            {{p.title}}\n\n        </button>\n\n        <button color="primary-pale" menuClose ion-item (click)="logout()">\n\n          <ion-icon name="ios-power-outline" item-left></ion-icon>\n\n            Logout\n\n        </button>\n\n      </ion-list>\n\n    <!--      <img class="img" item-center src="assets/imgs/unilogo.png" alt="UDUS LOGO">\n\n    <h2 id="h">The most peaceful university in Nigeria</h2>\n\n    -->\n\n\n\n    </ion-content>\n\n\n\n  </ion-menu>\n\n\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus klklk -->\n\n  <ion-nav [root]="rootPage" [ngClass]="app.activeTheme" #content swipeBackEnabled="false" main></ion-nav>\n\n\n\n</ion-split-pane>'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_13__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_17__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_16__angular_fire_database__["a" /* AngularFireDatabase */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 557:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 559:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 560:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 561:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_firestore__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let RegisterPage = class RegisterPage {
    constructor(alertCtrl, loadingCtrl, firestore, db, afAuth, navCtrl, navParams, menuCtrl) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.firestore = firestore;
        this.db = db;
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.user = {};
        this.itemsRef = db.list('users');
        this.collection = this.firestore.collection('users');
    }
    ionViewDidEnter() {
        // the root left menu should be disabled on this page
        this.menuCtrl.enable(false);
    }
    ngOnInit() {
        // this.deleteBook();
        // this.queryBooks();
        // this.firestore.doc('users/xmo5eCLmZ7842A3haLkB').update({"st": "firestore"});
        //this.db.object('users/-MM5t2qi-bB9AQCd1VrJ').update({"st": "firestore"});
        // this.firestore
        //.collection("users")
        //.get()
        // .subscribe((ss) => {
        //  ss.docs.forEach((doc) => {
        // console.log(doc.data);
        ////  });
        // });
        // console.log(this.myArray);
        // this.results = this.firestore.collection('Users').valueChanges();
        //const result=   this.firestore.collectionGroup('users').get
        // console.log(this.results);
    }
    presentLoadingText() {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Generating login details <br> Please Wait...'
        });
        loading.present();
        setTimeout(() => {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }, 5000);
        setTimeout(() => {
            loading.dismiss();
        }, 5000);
    }
    addItem(newName) {
        this.itemsRef.push({ text: newName });
    }
    updateItem(key, newText) {
        this.itemsRef.update(key, { text: newText });
    }
    deleteItem(key) {
        this.itemsRef.remove(key);
    }
    deleteEverything() {
        this.itemsRef.remove();
    }
    queryBooks() {
        return this.db.list('/users', ref => {
            return ref.orderByChild('email').equalTo('aab@gmail.com');
        }).push({ "usa": "uausus" });
    }
    async register(user) {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            dismissOnPageChange: true,
            content: 'Registrating new user in progress <br> Please Wait...'
        });
        loading.present();
        try {
            this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((auth) => {
                this.db.object('users/' + auth.user.uid).set({ name: user.name, uid: auth.user.uid, email: user.email, admno: user.admno, department: user.department })
                    .then(() => {
                    loading.dismiss();
                    let alert2 = this.alertCtrl.create({
                        title: '<font color="green"><b> </b>Registration Successfull Redirect to login page ?</font></font>',
                        cssClass: "alert",
                        buttons: [
                            {
                                text: 'No',
                                handler: data => {
                                }
                            },
                            {
                                text: 'Yes',
                                handler: data => {
                                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                                }
                            }
                        ]
                    });
                    alert2.present();
                });
            }); //end db.authstarte
            //  this.itemsRef.push({ name: user.name, email : user.email, admno: user.admno, department: user.department });
            //  this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            //   var  userg = firebase.auth().currentUser;
            // userg.updateProfile({
            // displayName: "Shanwili",
            //photoURL: "klslsls"
            // });
        }
        catch (error) {
            this.emailError = error.message;
            alert(error.message);
            console.error(error);
        }
        //end of register 
    }
};
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\register\register.html"*/'<!--\n\n  Generated template for the RegisterPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n\n\n<ion-content padding class="transparent-header">\n\n  <ion-header>\n\n    <ion-navbar>\n\n     \n\n    </ion-navbar>\n\n  </ion-header>\n\n  <div id="formPadding">\n\n    <img class="logo" id="logo" src="assets/imgs/unilogo.png" />\n\n  </div>\n\n  <form  id="login-form"  color="primary">\n\n    <ion-card-header id="login-header">\n\n      <ion-label id="emadrisa">Sign up</ion-label>\n\n    </ion-card-header>\n\n\n\n    <ion-item class="input"> \n\n      <ion-label floating id="inputlabel">Email address :</ion-label>     \n\n      <ion-input type="text" [(ngModel)]="user.email" name="email" required email  #email="ngModel"> </ion-input>\n\n    </ion-item>\n\n\n\n  \n\n    <div  *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">\n\n        <div *ngIf="email.errors.required" class="error">\n\n          Email is required.\n\n        </div>\n\n\n\n        <div *ngIf="email.errors?.pattern" class="error">\n\n          This is not a valid Email Address \n\n        </div>\n\n    </div>\n\n    <ion-item  class="inpt">\n\n      <ion-label floating id="inputlabel">Password :</ion-label>\n\n      <ion-input type="password" [(ngModel)]="user.password"  name="password" required minlength="4" #password="ngModel"> </ion-input>\n\n    </ion-item>\n\n    <div  *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">\n\n      <div *ngIf="password.errors.required" class="error">\n\n        Password is required.\n\n        </div>\n\n        <div *ngIf="password.errors.minlength" class="error">\n\n        Password must be at least 4 characters long.\n\n        </div>\n\n    </div>\n\n\n\n    <ion-item class="input"> \n\n      <ion-label floating id="inputlabel">Admission No :</ion-label>     \n\n      <ion-input type="text" [(ngModel)]="user.admno"  name="admno" required minlength="10" #admno="ngModel" pattern="[0-9]{10}"> </ion-input>\n\n    </ion-item>\n\n    <div  *ngIf="admno.invalid && (admno.dirty || admno.touched)" class="alert alert-danger">\n\n      <div *ngIf="admno.errors?.pattern" class="error">Admission Number should contain only a Number & must be at least 10 characters long. </div>\n\n    </div>\n\n    <div  *ngIf="admno.invalid && (admno.dirty || admno.touched)" class="alert alert-danger">\n\n      <div *ngIf="admno.errors.required" class="error">\n\n        Admission Number is required.\n\n      </div>\n\n       \n\n    </div>\n\n\n\n    <ion-item class="input"> \n\n      <ion-label floating id="inputlabel">Full Name :</ion-label>     \n\n      <ion-input type="text" [(ngModel)]="user.name" name="name" required minlength="4" [(ngModel)]="user.name" #name="ngModel" pattern="[A-Za-z ]+"> </ion-input>\n\n    </ion-item>\n\n    <div  *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">\n\n         <div *ngIf="name.errors.required" class="error">\n\n          Name is required.\n\n         </div>\n\n          \n\n           <div *ngIf="name.errors?.pattern" class="error">\n\n              Name should contain only alphabets\n\n           </div>\n\n         \n\n          <div *ngIf="name.errors.minlength" class="error">\n\n          Name must be at least 4 characters long.\n\n          </div>\n\n      </div>\n\n\n\n    <ion-item class="input"> \n\n      <ion-label floating id="inputlabel">Department :</ion-label>     \n\n      <ion-input type="text" [(ngModel)]="user.department"  name="department" required minlength="2"  #department="ngModel"  pattern="[A-Za-z ]+"> </ion-input>\n\n    </ion-item>\n\n    <div  *ngIf="department.invalid && (department.dirty || department.touched)" class="alert alert-danger">\n\n          <div *ngIf="department.errors?.pattern" class="error">\n\n            Department should contain only alphabets\n\n        </div>\n\n        <div *ngIf="department.errors.required" class="error">\n\n          Department is required.\n\n          </div>\n\n          <div *ngIf="department.errors.minlength" class="error">\n\n          Department must be at least 2 characters long.\n\n          </div>\n\n   </div>\n\n   <ion-item class="input"> \n\n    <ion-label floating id="inputlabel">Level Of Study :</ion-label>     \n\n    <ion-select [(ngModel)]="user.level" name="level" >\n\n      <ion-option value="100 Level">100 Level </ion-option>\n\n      <ion-option value="200 Level">200 Level </ion-option>\n\n      <ion-option value="300 Level">300 Level </ion-option>\n\n      <ion-option value="400 Level">400 Level </ion-option>\n\n      <ion-option value="400 Level">500 Level </ion-option>\n\n    </ion-select>\n\n</ion-item>\n\n   <div id="login-buttons">\n\n\n\n    <button round  id="login-button" color="primary" ion-button *ngIf="name.invalid" id="invalid" end>Register</button>\n\n    <button round  id="login-button"  color="primary" ion-button *ngIf="name.valid" (click)="register(user)">Register</button>\n\n \n\n  </div>\n\n\n\n   \n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\register\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__angular_fire_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfiledetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_firestore__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_database__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


 //


/**
 * Generated class for the ProfiledetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let ProfiledetailPage = class ProfiledetailPage {
    constructor(fs, af, db, navCtrl, navParams) {
        this.fs = fs;
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = navParams.get('student');
        this.af.authState.take(1).subscribe(data => {
            if (data && data.uid) {
                this.uid = data.uid;
                //   this.chatRef = this.fs.collection('friendschat/'+data.uid+'/'+this.studentid, ref=>ref.orderBy('timestamp')).valueChanges();
            }
            else {
                alert("you are not authenticated");
            }
            //  alert(" No live chat because you are not authenticated");
        }); //authstatesmm ref=>ref.orderBy('timestamp')
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfiledetailPage');
    }
    sendFriendRequest() {
        this.db.object('/friendrc/' + this.userData.uid + '/' + this.uid).set({ uid: this.uid }).then(() => {
            this.db.object('/friendrq/' + this.uid + '/' + this.userData.uid).set({ uid: this.userData.uid }).then((res) => {
                alert("Request sent");
            });
        });
        /*
          this.db.list('/friendrc/'+this.userData.uid).push({uid: this.uid}).then((res)=>{
            this.db.object('/friendrc/'+this.userData.uid+'/'+res.key).set({id: res.key, uid: this.uid}).then(()=>{
             
            }).then(()=>{
      
              this.db.list('/friendrq/'+this.uid).push({uid: this.uid}).then((res)=>{
                this.db.object('/friendrq/'+this.uid+'/'+res.key).set({id: res.key, uid: this.userData.uid}).then(()=>{
                 alert("request send1");
      
                })
      
            })
        
            })//adding notice
      
          })
      /*
          
          this.db.list('/friendrc/'+this.userData.uid).push({uid: this.uid}).then(()=>{
           
            this.db.list('/friendrq/'+this.uid).push({uid: this.userData.uid }).then(()=>{
              alert("friend request");
      
            }).then(()=>{
            //  alert("friend request 2");
      
            })
      
      
            })//adding object
        */
        //adding notice to the list
    }
    sendFriendRequest1() {
        /*
          this.fs.collection('friendrclist').doc(this.userData.uid).collection("friendrc").add({
            userID: this.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
    
          }).then(()=>{
    
            this.fs.collection('friendrqlist').doc(this.uid).collection("friendrq").add({
              userID: this.userData.uid,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        
        
          }).then(()=>{
            alert("request send");
          })
    
    
    
    /*
          this.db.list('/notices/').push({uid : ).then(()=>{
          this.db.list('/notices/').push({id: notice.key }).then(()=>{
              
              loading.dismiss();
            })//adding object
        
            })//adding notice to the list
    
    
    
    
            this.db.list('/users/'+data.uid+'/unlocked').valueChanges().subscribe(
              data2 => {
                data2.indexOf(this.module.passNo) === -1 ? this.db.list('users/'+uid+'/unlocked/').push(this.module.passNo) : console.log("This Id already exists");
               
    
                
                this.db.object('/users/'+data.uid+'/grades/'+this.module_id).set({ grade: Math.floor(this.percent)+'% in '+this.moduleName}).then(()=>{
                  alert("push done");
              
                })
    
              
         
    */
    } //end of send requist
};
ProfiledetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-profiledetail',template:/*ion-inline-start:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\profiledetail\profiledetail.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title> Student Details</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding *ngIf ="userData">\n  <div>\n\n\n      <img  *ngIf = "userData.photourl" src=\'{{userData.photourl}}\' id="profile-image" >\n\n\n    \n<div class="request" (click)="sendFriendRequest()">\n  <button ion-button outline icon-left>\n    <ion-icon name="ios-person-add-outline" ></ion-icon>\n    Send Friend Request\n  </button>\n</div>\n\n<ion-card>\n      <ion-grid id="data" class="ion-text-center">\n\n\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Name :</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.name}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Email :</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.email}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Admission No:</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.admno}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >Department:</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.department}}</ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row >\n          <ion-col col-lg-2 class="header-row udetail">\n            <ion-label >level:</ion-label>\n          </ion-col>\n          <ion-col col-lg-10 class="udetail">\n            <ion-label >{{userData?.level}}</ion-label>\n          </ion-col>\n        </ion-row>\n    \n \n    \n      </ion-grid>\n    <!--image uplaod prev start here-->\n    </ion-card>\n  </div>\n  \n\n\n      <div [hidden]="userData || errMess">\n        <ion-spinner></ion-spinner>\n        <h4>Loading . . . Please Wait</h4>\n      </div>\n      <div *ngIf="errMess">\n        <h2>Error</h2>\n        <h4>{{errMess}}</h4>\n      </div>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Fullstack projects\COMPLETE FINAL YEAR PROJECT\UDUS_Compete_app\src\pages\profiledetail\profiledetail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_fire_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ProfiledetailPage);

//# sourceMappingURL=profiledetail.js.map

/***/ })

},[338]);
//# sourceMappingURL=main.js.map