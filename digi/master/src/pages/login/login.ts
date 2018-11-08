import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ErrorHandler } from '../../util/ErrorHandler';
import { JwtStoreProvider } from '../../providers/jwt-store/jwt-store';
import { GatekeeperPage } from '../gatekeeper/gatekeeper';
import { TweenMax, TimelineMax, Power2 } from 'gsap';

// temp, need to remove import below when GatekeeperPage is set up
import {MyWalletPage} from '../my-wallet/my-wallet';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = {
    username: null,
    password: null
  }

  error = new ErrorHandler();

  errorString = "You made an error.  Oink!!!"

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userService: UserProvider,
    private jwtStoreService : JwtStoreProvider
  ) {
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.showPiggy();
  }

  ionViewDidLeave() {
    this.stopAllAnimations();
  }

  showPiggy() {
    console.log('showPiggy');
    TweenMax.to("#svg-holder", .5,{delay:.5, height:'25%', ease:Power2.easeOut, onComplete:this.blinkPiggy.bind(this)});
  }

  blinkPiggy() {
    let tl = new TimelineMax({repeat: -1});
    tl.to("#left_eye", .1, {delay:2, scaleY:.1, transformOrigin:"center center"}, "blink");
    tl.to("#right_eye", .1, {delay:2, scaleY:.1, transformOrigin:"center center"}, "blink");
    tl.to("#left_eye", .1, {scaleY:1, transformOrigin:"center center"}, "open");
    tl.to("#right_eye", .1, {scaleY:1, transformOrigin:"center center"}, "open");
  }

  stopAllAnimations() {
    TweenMax.killAll();
  }

  login(){
    this.userService.login(this.loginData).subscribe(
      (res)=>{
        console.log('result: ', res);
        this.stopAllAnimations();
        this.jwtStoreService.setJwt(res.token);
        this.navCtrl.setRoot(GatekeeperPage);
        
      },
      (err)=>{
        this.error.setError(err);
        console.log('error:', err);
        this.showErrorMessage();
      }
    )
  }

  // stub method for testing only
  login_stub() {
    console.log('loginData:', this.loginData);
    if(this.loginData.username == null)
    {
      this.showErrorMessage();
      return;
    }
    this.navCtrl.setRoot(MyWalletPage);
  }

  clearError(){
    this.error.resetError();
  }

  showErrorMessage() {
    TweenMax.set('#speech-bubble', {scale:.1})
    TweenMax.to('#speech-bubble', .2, {autoAlpha:1, scale:1, ease:Power2.easeOut})
  }

  hideErrorMessage() {
    TweenMax.to('#speech-bubble', .2, {autoAlpha:0, scale:.1, ease:Power2.easeIn})
  }
}
