import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import * as createjs from 'createjs-module';
import { TweenMax, TimelineMax, Power2 } from 'gsap';
import { SavingDetailPage } from '../../pages/saving-detail/saving-detail';
import { SpendingDetailPage } from '../../pages/spending-detail/spending-detail';
import { GivingDetailPage } from '../../pages/giving-detail/giving-detail';
import { InvestDetailPage } from '../../pages/invest-detail/invest-detail';

/**
 * Generated class for the MoneyPileMoveComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'money-pile-move',
  templateUrl: 'money-pile-move.html'
})
export class MoneyPileMoveComponent {



  @Input() childData: any;
  @Output() transferSelected = new EventEmitter<any>();
  text: string;

  // createjs stuff
  canvasWidth: number;
  canvasHeight: number;
  pixelRatio: number;
  stage: any;
  activateRetina: boolean = false;
  loader: any;
  spendContainer: any;
  saveContainer: any;
  giveContainer: any;
  investContainer: any;
  allContainers: Array<any>;


  // money
  balance: any;
  denomination: number = 1;
  incr: number = -.5;

  // visuals
  graphic_scale: number;
  balance_array: Array<any> = [];

  // tween variables
  moveTween: any;

  // 
  fromBucket: any;
  toBucket: any;

  midline: number = 0;

  targetRadius: number;

  left_x: number;
  right_x: number;
  top_y: number;
  bottom_y: number

  dragging: boolean = false;



  constructor(public platform: Platform, public navCtrl: NavController) {
    console.log('Hello MoneyPileMoveComponent Component');
    this.text = 'Hello World';
    this.initCreateJS();
    this.initializeCanvas();
  }

  initDenomination() {

    let denom = 1;
    if (this.balance > 500) {
      let num = Math.round(this.balance / 500);
      if (num < 5) {
        denom = 5;
      } else if (num < 10) {
        denom = 10;
      } else {
        denom = 20;
      }
    }

    this.denomination = denom;

    console.log('denomination:' + this.denomination)
  }

  initData() {

    this.balance = this.childData.balance;
    // temp hard coded data
    /*this.childData.buckets = [
      { id: 1, type: "spending", total: 112, percent: 28, child_id: 1 },
      { id: 2, type: "saving", total: 50, percent: 24, child_id: 1 },
      { id: 3, type: "investing", total: 150, percent: 24, child_id: 1 },
      { id: 4, type: "giving", total: 100, percent: 24, child_id: 1 },
    ];*/
    console.log('--------------------');
    console.log('account-detail chData:', this.childData);
    console.log('current balance:' + this.balance);
  }

  initCreateJS() {
    // hack so that the createjs loader will work.  See https://stackoverflow.com/questions/44828676/preloadjs-not-working-on-angular-createjs-module
    (<any>window).createjs = createjs;
  }

  initializeCanvas() {
    console.log('MoneyPileMoveComponent initializeCanvas')
    this.pixelRatio = window.devicePixelRatio;
    console.log('pixelRatio: ' + this.pixelRatio);

    this.canvasWidth = this.platform.width();
    this.canvasHeight = this.platform.height();
    this.targetRadius = this.canvasWidth * 153 / 375;
    this.left_x = this.canvasWidth * .25;
    this.right_x = this.canvasWidth * 277 / 375;

    this.top_y = this.canvasHeight / 3;
    this.bottom_y = this.canvasHeight / 3 * 2;
    this.midline = this.top_y + 50;

    console.log('canvas width: ' + this.canvasWidth);
    console.log('canvas height: ' + this.canvasHeight);
  }

  ngAfterContentInit() {
    console.log('MoneyPileMoveComponent ngAfterViewInit()');
    this.initData();
    this.initDenomination();
    this.initStage();
    this.loadAssets();
  }

  initStage() {
    console.log('MoneyPileMoveComponent initStage');
    if (this.activateRetina) {
      let canvas = document.getElementById("dashboardCanvas");
      console.log('canvas: ', canvas);
      canvas.setAttribute('width', String(Math.round(this.canvasWidth * this.pixelRatio)));
      canvas.setAttribute('height', String(Math.round(this.canvasHeight * this.pixelRatio)));

      // Set CSS
      canvas.style.width = this.canvasWidth + "px";
      canvas.style.height = this.canvasHeight + "px";
    }


    this.stage = new createjs.Stage("transactionCanvas");
    createjs.Touch.enable(this.stage);

    if (this.activateRetina) {
      this.stage.scaleX = this.stage.scaleY = this.pixelRatio;

      // save original width & height into stage
      this.stage.width = this.canvasWidth;
      this.stage.height = this.canvasHeight;
    }
  }

  loadAssets() {
    console.log('MoneyPileMoveComponent loadAssets')
    let manifest = [
      { src: "dollar_bill_small.png", id: "dollar_bill" },
      { src: "dollar_bill_HL.png", id: "dollar_bill_HL" },
      { src: "dollar_bill_income.png", id: "dollar_bill_income" },
      { src: "stack_shadow.png", id: "stack_shadow" }
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.on("complete", this.handleComplete.bind(this));
    this.loader.loadManifest(manifest, true, "assets/imgs/");
  }

  handleComplete() {
    console.log('MoneyPileMoveComponent handleComplete');

    this.initMoneyContainers();
    this.initShadow();
    this.makeMoney();
    this.stackMoney();
    this.cacheContainers();
    this.initTicker();
  }

  addBase(container, color) {
    let cw = this.targetRadius;
    let ch = this.targetRadius / 2;
    let sh = new createjs.Shape();
    sh.alpha = .7;
    sh.graphics.beginFill(color);
    sh.graphics.drawEllipse(-cw / 2, -ch / 2, cw, ch);
    container.addChild(sh);

    /*var text = new createjs.Text("Hello World", "14px Arial", "#ffffff");
    text.x = 0;
    text.y = 50;
    text.textAlign = "center"
    text.textBaseline = "alphabetic";
    container.addChild(text)*/
  }

  initMoneyContainers() {
    console.log('MoneyPileMoveComponent initMoneyContainers');
    this.spendContainer = new createjs.Container();
    this.stage.addChild(this.spendContainer);
    this.spendContainer.name = "spending";
    this.addBase(this.spendContainer, '#2EFAE9');

    this.saveContainer = new createjs.Container();
    this.stage.addChild(this.saveContainer);
    this.saveContainer.name = "saving";
    this.addBase(this.saveContainer, '#FFA9EA');

    this.giveContainer = new createjs.Container();
    this.stage.addChild(this.giveContainer);
    this.giveContainer.name = "giving";
    this.addBase(this.giveContainer, '#009EFF');

    this.investContainer = new createjs.Container();
    this.stage.addChild(this.investContainer);
    this.investContainer.name = "investing";
    this.addBase(this.investContainer, '#EA4DC3');

    this.allContainers = [this.spendContainer, this.saveContainer, this.giveContainer, this.investContainer];
  }

  fromSelect(e) {
    this.reset();
    this.dragging = true;

    let xPos = e.touches[0].clientX;
    let yPos = e.touches[0].clientY;
    console.log(xPos, yPos);
    let left = xPos < this.canvasWidth / 2 ? true : false;
    let top = yPos < this.midline ? true : false;

    if (left && top) {
      this.fromBucket = this.spendContainer;
    } else if (!left && top) {
      this.fromBucket = this.saveContainer;
    } else if (left && !top) {
      this.fromBucket = this.giveContainer;
    } else if (!left && !top) {
      this.fromBucket = this.investContainer;
    }

    this.fadeInBase(this.fromBucket);
  }

  touchMove(e) {
    //console.log(e.changedTouches[0].clientX);
    this.hitTest(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }

  hitTest(xPos, yPos) {
    let num = this.allContainers.length;
    let hit: boolean = false;
    for (let i = 0; i < num; i++) {
      let bucket = this.allContainers[i];
      if ((Math.abs(xPos - bucket.x) < this.targetRadius/2) && (Math.abs(yPos - bucket.y) < this.targetRadius/2)) {
        if (bucket != this.fromBucket) {
          hit = true;
          if (bucket != this.toBucket) {
            this.toBucket = bucket;
            this.highlightBase(bucket, true);

          }
        } else {return}
      } else {if(bucket != this.fromBucket) this.highlightBase(bucket, false)};
    }

    if (!hit) {
      this.toBucket = null;
    }
  }

  toSelect(e) {
    console.log(e);
    this.dragging = false;
    if (this.toBucket != null) {
      this.fadeInBase(this.toBucket);
      this.stage.addChild(this.toBucket);
      this.transferMoney();
    } else if(this.fromBucket != null){
      console.log('tap');
      this.openPage();
    }

  }

  openPage(){
    console.log('openPage');
    switch(this.fromBucket.name) {
      case "saving":
      this.navCtrl.push(SavingDetailPage);
      break;

      case "spending":
      this.navCtrl.push(SpendingDetailPage);
      break;

      case "giving":
      this.navCtrl.push(GivingDetailPage);
      break;

      case "investing":
      this.navCtrl.push(InvestDetailPage);
      break;
    }
    /*if(this.fromBucket.name == "saving") {
      this.navCtrl.push(SavingDetailPage);
    }*/
      
  }

  highlightBase(container, on: Boolean = true) {
    container.uncache();
    let base = container.getChildAt(0);
    on ? base.alpha = 8. : base.alpha = .7;
  }

  fadeInBase(container) {
    container.uncache();
    let base = container.getChildAt(0);
    TweenMax.to(base, .3, { alpha: 1 })

  }

  fadeOutBase(container) {
    container.uncache();
    let base = container.getChildAt(0);
    TweenMax.to(base, .3, { alpha: .7 })

  }

  initShadow() {
    /*
    this.stack_shadow = new createjs.Bitmap(this.loader.getResult("stack_shadow"));
    this.scaleBitmap(this.stack_shadow);
    this.stack_shadow.x = this.canvasWidth / 2;
    this.stack_shadow.y = this.startY;
    this.stage.addChildAt(this.stack_shadow, 0);*/
  }

  scaleBitmap(bm) {
    //bm = new createjs.Bitmap(this.loader.getResult(billString));
    let currentWidth = bm.image.width;
    bm.regX = currentWidth;
    bm.regY = 0;
    let targetWidth = this.canvasWidth * .4;
    let moneyScale = targetWidth / currentWidth;
    console.log('money scale: ' + moneyScale);
    bm.scaleX = bm.scaleY = moneyScale;
  }

  scaleBill(dollar_bill, twist: boolean = false) {
    let currentWidth = dollar_bill.image.width;
    let currentHeight = dollar_bill.image.height;
    dollar_bill.regX = currentWidth / 2;
    dollar_bill.regY = currentHeight / 2;
    let targetWidth = this.canvasWidth * 70 / 375;
    let moneyScale = targetWidth / currentWidth;
    dollar_bill.scaleX = dollar_bill.scaleY = moneyScale;
    if (twist) dollar_bill.scaleX = moneyScale * Math.random() * -1;
  }

  makeMoney() {
    // current balance dollars
    let amount = eval(this.balance) + 10;
    //console.log('going to make ', amount, ' bills')
    amount = Math.round(amount);
    for (let i = 0; i < amount; i++) {
      //console.log('making bill:', i)
      let dollar_bill = new createjs.Bitmap(this.loader.getResult("dollar_bill"));
      this.scaleBill(dollar_bill);
      this.balance_array.push(dollar_bill);
    }

  }

  stackMoney() {
    //console.log('total bills:', this.balance_array.length)
    let spending = Math.round(this.childData.buckets[0].total / this.denomination);
    console.log('-------- spending: ', spending)
    let saving = Math.round(this.childData.buckets[1].total / this.denomination);
    let giving = Math.round(this.childData.buckets[2].total / this.denomination);
    let investing = Math.round(this.childData.buckets[3].total / this.denomination);
    


    // spending
    let start_y = 0;
    this.spendContainer.x = this.left_x;
    this.spendContainer.y = this.top_y;
    for (let i = 0; i < spending; i++) {
      let bill = this.balance_array[i];
      this.spendContainer.addChild(bill);
      bill.x = 0;
      bill.y = start_y;
      start_y += this.incr;
    }

    // saving
    start_y = 0;
    this.saveContainer.x = this.right_x;
    this.saveContainer.y = this.top_y;
    for (let i = spending; i < spending + saving; i++) {
      let bill = this.balance_array[i];
      this.saveContainer.addChild(bill);
      bill.x = 0;
      bill.y = start_y;
      start_y += this.incr;
    }

    // giving
    start_y = 0;
    this.giveContainer.x = this.left_x;
    this.giveContainer.y = this.bottom_y;
    console.log('^^^^^^^^^^^total giving dollars: ', spending, saving, giving);
    for (let i = spending + saving; i < spending + saving + giving; i++) {
      let bill = this.balance_array[i];
      this.giveContainer.addChild(bill);
      bill.x = 0;
      bill.y = start_y;
      start_y += this.incr;
    }

    // investing
    start_y = 0;
    this.investContainer.x = this.right_x;
    this.investContainer.y = this.bottom_y;
    console.log('from ' + (spending + saving + giving) + ' to ' + (spending + saving + giving + investing) )
    for (let i = spending + saving + giving; i < spending + saving + giving + investing; i++) {
      //console.log(i);
      let bill = this.balance_array[i];
      this.investContainer.addChild(bill);
      bill.x = 0;
      bill.y = start_y;
      start_y += this.incr;
    }
  }

  cacheContainers() {
    this.spendContainer.cache(-this.canvasWidth / 3, -this.canvasHeight / 2, this.canvasWidth / 3 * 2, this.canvasHeight);
    this.saveContainer.cache(-this.canvasWidth / 3, -this.canvasHeight / 2, this.canvasWidth / 3 * 2, this.canvasHeight);
    this.giveContainer.cache(-this.canvasWidth / 3, -this.canvasHeight / 2, this.canvasWidth / 3 * 2, this.canvasHeight);
    this.investContainer.cache(-this.canvasWidth / 3, -this.canvasHeight / 2, this.canvasWidth / 3 * 2, this.canvasHeight);
  }

  updateTo(amount, bucket) {
    console.log('updteTo', amount, bucket.name)
    var target = 0;
    switch (bucket) {
      case this.spendContainer:
        //this.childData.buckets[0].total += amount;
        target = this.childData.buckets[0].total + amount;
        console.log('target: ', target);
        //this.childData.buckets[0].total = target;
        TweenMax.to(this.childData.buckets[0], 1, { delay: .5, total:  target})
        break;

      case this.saveContainer:
        //val = this.childData.buckets[1].total  += amount ;
        //TweenMax.to(this.childData.buckets[1], 1, { delay: 1,  total: this.childData.buckets[1].total + amount })
        target = this.childData.buckets[1].total + amount;
        console.log('savings target: ', target);
        
        //this.childData.buckets[1].total = target;
        TweenMax.to(this.childData.buckets[1], 1, { delay: .5, total:  target})
        break;

      case this.giveContainer:
        //val = this.childData.buckets[2].total += amount ;
        //TweenMax.to(this.childData.buckets[2], 1, { delay: 1,  total: this.childData.buckets[2].total + amount })
        target = this.childData.buckets[2].total + amount;
        console.log('target: ', target);
        
        //this.childData.buckets[2].total = target;
        TweenMax.to(this.childData.buckets[2], 1, { delay: .5, total:  target})
        break;

      case this.investContainer:
        //val = this.childData.buckets[3].total += amount;
        //TweenMax.to(this.childData.buckets[3], 1, { delay: 1,  total: this.childData.buckets[3].total + amount })
        target = this.childData.buckets[3].total + amount;
        console.log('invest target: ', target);
        //this.childData.buckets[3].total = target;
        TweenMax.to(this.childData.buckets[3], 1, { delay: .5, total:  target})
        break;

      default:
        console.log('nothing to update')
    }
    //val += amount;

  }

  animateTransfer(amount:number){
    this.updateTo(amount, this.toBucket);
    this.updateTo(-amount, this.fromBucket);
    amount = Math.round(amount / this.denomination);
    let start_y = (this.toBucket.numChildren - 1) * this.incr;
    this.moveTween = new TimelineMax({ delay: 1 });
    let index = (this.fromBucket.numChildren) - amount;
    for (let i = 0; i < amount; i++) {

      let bill = this.fromBucket.getChildAt(index);
      let point = this.fromBucket.localToLocal(bill.x, bill.y, this.toBucket);

      bill.x = point.x;
      bill.y = point.y;
      let center = this.toBucket.globalToLocal(this.canvasWidth / 2, this.canvasHeight / 2)
      this.toBucket.addChildAt(bill, this.toBucket.numChildren);
      //this.moveTween.to(bill, .75, {x:0, y:start_y, ease: Power2.easeInOut}, "-=0.7");
      this.moveTween.to(bill, .75, { bezier: [{ x: bill.x, y: bill.y }, { x: center.x, y: point.y - 20 }, { x: 0, y: start_y }], ease: Power2.easeInOut }, "-=0.7");

      start_y += this.incr;
    }
  }

  reset() {
    this.toBucket = null;
    this.fromBucket = null;
  }

  transferMoney() {
    // event stuff
    this.transferSelected.emit({from:this.fromBucket.name, to:this.toBucket.name});

    /*
    this.updateTo(amount, this.toBucket);
    this.updateTo(-amount, this.fromBucket);
    amount = Math.round(amount / this.denomination);
    let start_y = (this.toBucket.numChildren - 1) * this.incr;
    this.moveTween = new TimelineMax({ delay: .5 });
    let index = (this.fromBucket.numChildren) - amount;
    for (let i = 0; i < amount; i++) {

      let bill = this.fromBucket.getChildAt(index);
      let point = this.fromBucket.localToLocal(bill.x, bill.y, this.toBucket);

      bill.x = point.x;
      bill.y = point.y;
      let center = this.toBucket.globalToLocal(this.canvasWidth / 2, this.canvasHeight / 2)
      this.toBucket.addChildAt(bill, this.toBucket.numChildren);
      //this.moveTween.to(bill, .75, {x:0, y:start_y, ease: Power2.easeInOut}, "-=0.7");
      this.moveTween.to(bill, .75, { bezier: [{ x: bill.x, y: bill.y }, { x: center.x, y: point.y - 20 }, { x: 0, y: start_y }], ease: Power2.easeInOut }, "-=0.7");

      start_y += this.incr;
    }*/
  }

  ngOnDestroy() {
    console.log('MoneyPileMoveComponent ngOnDestroy');
    this.destroy();
  }

  destroy() {
    console.log('MoneyPileMoveComponent destroy');
    createjs.Ticker.reset();
    TweenMax.killAll();
    if (this.stage) {
      this.spendContainer.removeAllChildren();
      this.saveContainer.removeAllChildren();
      this.giveContainer.removeAllChildren();
      this.investContainer.removeAllChildren();
      this.stage.removeAllChildren();
      this.stage.removeAllEventListeners();
    }

    createjs.Touch.disable(this.stage);
  }

  initTicker() {
    console.log('MoneyPileMoveComponent initTicker');
    createjs.Ticker.addEventListener('tick', this.draw.bind(this));
    createjs.Ticker.setFPS(60);
  }

  draw() {
    this.stage.update();
  }

}


