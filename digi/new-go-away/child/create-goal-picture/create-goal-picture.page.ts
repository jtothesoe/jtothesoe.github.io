import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateGoalDatePage } from '../create-goal-date/create-goal-date';
import { CreateGoalConfirmPage } from '../create-goal-confirm/create-goal-confirm';
/**
 * Generated class for the CreateGoalPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-goal-picture',
  templateUrl: 'create-goal-picture.html',
})
export class CreateGoalPicturePage {
  header = {
    text: 'Would you like to add a picture?',
    styles: {'color' : '#fff'}
  };

  skipButton = {
    text: `Skip`,
    styles: { 'border': '1px solid white' },
    color: 'pyggTransparent'
  };

  camera = {
    icon: 'camera',
    text: 'Add a photo'
  }

  goal = this.navParams.get('goal');
  image: any;
  reader = new FileReader();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGoalPicturePage');
  }

  next(file){
    let goal = Object.assign(this.goal, {img: file});
    
    if(this.goal.date){
      this.navCtrl.push(CreateGoalConfirmPage, {goal});
    }
    else{
      this.navCtrl.push(CreateGoalDatePage, {goal});
    }
  }

  formatChecker(file){
    return file.type.includes('image');
  }

  imageUpload(file){
    let fileUrl = file.srcElement.files[0];

    if(this.formatChecker(fileUrl)){
      this.reader.readAsDataURL(fileUrl);

      this.reader.onload = ()=> {
        this.next(this.reader.result);
      };
    }
    
   }

  skip(){
    delete this.goal.img;
    
    if(this.goal.date){
      this.navCtrl.push(CreateGoalConfirmPage, {goal: this.goal});
    }
    else{
      this.navCtrl.push(CreateGoalDatePage, {goal: this.goal});
    }
  }

}
