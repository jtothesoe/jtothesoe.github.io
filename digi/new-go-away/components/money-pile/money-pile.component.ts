import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import * as createjs from 'createjs-module';
import { TweenMax, TimelineMax, Circ, Bounce } from 'gsap';

/**
 * Generated class for the MoneyPileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'money-pile',
  templateUrl: './money-pile.component.html',
  styleUrls: ['./money-pile.component.scss']
})
export class MoneyPileComponent implements OnChanges {

  @Input() page: String;
  @Input() slideIndex: String; 
  @Input() childData: any;
  
  // createjs stuff
  canvasWidth: number;
  canvasHeight: number;
  pixelRatio: number;
  stage: any;
  activateRetina: boolean = false;
  loader: any;
  balanceContainer: any; // holds money
  historyContainer: any;
  balanceLastMonthContainer: any; // holds last months money
  spendingContainer: any; // holds spending
  incomeContainer: any; // holds income


  // money
  balance: number;
  balance_last_month: number;
  income_last_month: number;
  spending: number;
  denomination: number = 1;
  incr: number = -1;

  // visuals
  graphic_scale: number;
  stack_shadow: any;
  balance_array: Array<any> = [];
  past_balance_array: Array<any> = [];
  spending_array: Array<any> = [];
  income_array: Array<any> = [];

  startY: number // y point where stacking starts

  slideHistory: Array<number> = [0];

  // tween variables
  rainTween:any;

  constructor(public platform: Platform, public navCtrl: NavController) {
    console.log('Hello AccountDetailComponent Component');
    this.initCreateJS();
    this.initializeCanvas();
  }

  initDenomination() {

    let denom = 1;
    if(this.balance > 100){
      let num = Math.round(this.balance/100);
      if(num < 5)
      {
        denom = 5;
      } else if(num < 10) {
        denom = 10;
      } else {
        denom = 20;
      }
    }

    this.denomination = denom;
  }

  initData() {
    
    this.balance = this.childData.balance;
    this.income_last_month = this.childData.monthlyEarning ;
    this.spending = this.childData.monthlySpending;
    this.balance_last_month = this.balance - (this.income_last_month - this.spending);

    // temp hard coded data

    this.childData.buckets = [
      {id: 1, type: "spending", total: 112.59, percent:28, child_id: 1},
      {id: 2, type: "saving", total: 100, percent:24, child_id: 1},
      {id: 3, type: "investing", total: 100, percent:24, child_id: 1},
      {id: 4, type: "giving", total: 100, percent:24, child_id: 1},
      ];
    console.log('--------------------');
    console.log('account-detail chData:', this.childData);
    console.log('income_last_month:' + this.income_last_month);
    console.log('spending:' + this.spending);
    console.log('balance last month:' + this.balance_last_month);
    console.log('current balance:' + this.balance);
  }

  initCreateJS() {
    // hack so that the createjs loader will work.  See https://stackoverflow.com/questions/44828676/preloadjs-not-working-on-angular-createjs-module
    (<any>window).createjs = createjs;
  }

  initializeCanvas() {
    console.log('AccountDetailComponent initializeCanvas')
    this.pixelRatio = window.devicePixelRatio;
    console.log('pixelRatio: ' + this.pixelRatio);


    this.canvasWidth = this.platform.width();
    this.canvasHeight = this.platform.height();

    this.startY = this.canvasHeight * .7;
    console.log('canvas width: ' + this.canvasWidth);
    console.log('canvas height: ' + this.canvasHeight);
  }

  ngAfterContentInit() {
    console.log('AccountDetailComponent ngAfterViewInit()');
    this.initData();
    this.initDenomination();
    this.initStage();
    this.loadAssets();
  }

  initStage() {
    console.log('AccountDetailComponent initStage');
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

    if (this.activateRetina) {
      this.stage.scaleX = this.stage.scaleY = this.pixelRatio;

      // save original width & height into stage
      this.stage.width = this.canvasWidth;
      this.stage.height = this.canvasHeight;
    }
  }

  loadAssets() {
    console.log('AccountDetailComponent loadAssets')
    let manifest = [
      { src: "dollar_bill.png", id: "dollar_bill" },
      { src: "dollar_bill_HL.png", id: "dollar_bill_HL" },
      { src: "dollar_bill_income.png", id: "dollar_bill_income" },
      { src: "stack_shadow.png", id: "stack_shadow" }
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.on("complete", this.handleComplete.bind(this));
    this.loader.loadManifest(manifest, true, "assets/imgs/");
  }

  handleComplete() {
    console.log('AccountDetailComponent handleComplete');

    this.initMoneyContainers();
    this.initShadow();
    this.makeMoney();
    this.stackMoney(this.balance, true);
    this.stackPastBalance();
    this.stackIncome();
    this.stackSpending();
    this.initTicker();
  }

  initMoneyContainers() {
    console.log('AccountDetailComponent initMoneyContainers');
    this.balanceContainer = new createjs.Container();
    this.stage.addChild(this.balanceContainer);

    this.historyContainer = new createjs.Container();
    this.historyContainer.alpha = 0;
    this.stage.addChild(this.historyContainer);

    this.spendingContainer = new createjs.Container();
    this.historyContainer.addChild(this.spendingContainer);

    this.balanceLastMonthContainer = new createjs.Container();
    this.historyContainer.addChild(this.balanceLastMonthContainer);

    this.incomeContainer = new createjs.Container();
    this.historyContainer.addChild(this.incomeContainer);


  }

  initShadow() {
    this.stack_shadow = new createjs.Bitmap(this.loader.getResult("stack_shadow"));
    this.scaleBitmap(this.stack_shadow);
    this.stack_shadow.x = this.canvasWidth / 2;
    this.stack_shadow.y = this.startY;
    this.stage.addChildAt(this.stack_shadow, 0);
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

  scaleBill(dollar_bill, twist: boolean = true) {
    let currentWidth = dollar_bill.image.width;
    let currentHeight = dollar_bill.image.height;
    dollar_bill.regX = currentWidth / 2;
    dollar_bill.regY = currentHeight / 2;
    let targetWidth = this.canvasWidth * .4;
    let moneyScale = targetWidth / currentWidth;
    dollar_bill.scaleX = dollar_bill.scaleY = moneyScale;
    if (twist) dollar_bill.scaleX = moneyScale * Math.random() * -1;
  }

  makeMoney() {
    // current balance dollars
    let amount = this.balance;
    amount = Math.round(amount);
    for (let i = 0; i < amount; i++) {
      let dollar_bill = new createjs.Bitmap(this.loader.getResult("dollar_bill"));
      this.scaleBill(dollar_bill);
      this.balance_array.push(dollar_bill);
    }

    // spending dollars
    let amountSpent = this.spending;
    amountSpent = Math.round(amountSpent);
    for (let i = 0; i < amountSpent; i++) {
      let bill_hl = new createjs.Bitmap(this.loader.getResult("dollar_bill_HL"));
      this.scaleBill(bill_hl, false);
      this.spending_array.push(bill_hl);
    }

    // income dollars
    let amountIncome = this.income_last_month;
    amountIncome = Math.round(amountIncome);
    for (let i = 0; i < amountIncome; i++) {
      let dollar_bill_income = new createjs.Bitmap(this.loader.getResult("dollar_bill_income"));
      this.scaleBill(dollar_bill_income, false);
      this.income_array.push(dollar_bill_income);
    }

    // past balance + income
    let amountPastAndIncome = amountIncome + Math.round(this.balance_last_month);
    for (let i = 0; i < amountPastAndIncome; i++) {
      let dollar_bill_past_and_income = new createjs.Bitmap(this.loader.getResult("dollar_bill"));
      this.scaleBill(dollar_bill_past_and_income, false);
      this.past_balance_array.push(dollar_bill_past_and_income);
    }

  }

  stackMoney(amount, animate: boolean = true) {

    //this.clearMoney();
    console.log('AccountDetailComponent stackMoney')
    this.stack_shadow.alpha = 0;

    let startY = this.startY;

    amount = Math.round(amount / this.denomination);
    let delay = .01; // time gap between bill animations
    let dur = 1;
    let wait_to_start = 2; // animation start delay in milliseconds

    if (!animate) {
      delay = dur = 0;
    }

    this.rainTween = new TimelineMax({delay:wait_to_start});
    for (let i = 0; i < amount; i++) {
      let dollar_bill = this.balance_array[i];
      let currentWidth = dollar_bill.image.width;
      let currentHeight = dollar_bill.image.height;
      dollar_bill.regX = currentWidth / 2;
      dollar_bill.regY = currentHeight / 2;
      let targetWidth = this.canvasWidth * .4;
      let moneyScale = targetWidth / currentWidth;
      console.log('money scale: ' + moneyScale);
      dollar_bill.scaleX = dollar_bill.scaleY = moneyScale;
      dollar_bill.scaleX = moneyScale * Math.random() * -1;
      dollar_bill.x = Math.random() * this.canvasWidth; //this.canvasWidth/2;
      dollar_bill.y = -100; //startY;
      this.balanceContainer.addChild(dollar_bill);
      //TweenMax.to(dollar_bill, dur, { delay: (wait_to_start + i * delay), scaleX: moneyScale, x: this.canvasWidth / 2, y: startY, ease: Circ.easeOut })

      this.rainTween.to(dollar_bill, .5, { scaleX: moneyScale, x: this.canvasWidth / 2, y: startY, ease: Circ.easeOut }, "-=.48")
      
      startY += this.incr;

      this.balance_array.push(dollar_bill);
    }

    //createjs.Tween.get(this.stack_shadow).wait(dur).to({ alpha: 1 }, amount * delay);
    TweenMax.to(this.stack_shadow, amount * delay, { delay: (wait_to_start + amount * delay), alpha: 1 });

    
    //TweenMax.from(this, amount * delay, {delay:wait_to_start, balance:0})

  }

  cacheContainers() {
    this.balanceContainer.cache(0, 0, this.canvasWidth, this.canvasHeight);
    this.historyContainer.cache(0, 0, this.canvasWidth, this.canvasHeight);
  }

  resetIncomeDollars() {
    this.incomeContainer.uncache();
    
  }

  historyAnimation() {
    this.spendingContainer.alpha = 0;
    this.spendingContainer.x = 0;
    let tl = new TimelineMax();
    tl.call(this.resetPastBalance.bind(this));
    tl.call(this.cacheContainers.bind(this));
    tl.call(this.resetIncomeDollars.bind(this));
    
    // hide balance container
    tl.to(this.balanceContainer, .33, { alpha: 0 });
    tl.to(this.stack_shadow, .7, { alpha: 0 }, "-=.33");
    // show history container
    tl.to('#balance_last_month', 1, { alpha: 1 }, "+=.5");
    tl.to(this.historyContainer, .7, { alpha: 1 });
    tl.to(this.stack_shadow, .7, { alpha: 1 }, "-=.7");
    // position income container and "income last month" text
    tl.to(this.incomeContainer, 1, { alpha: 1, y: 0, onStart: function () { this.historyContainer.uncache() }.bind(this)});
    tl.to('#income_last_month', 1, { alpha: 1 });

    // animate dollars into place. NOTE the income dollars have already been
    // stacked in the stackIncome() method. Below I use a TweenMax "from" 
    // to move the dollars "off stage" and animate them to their current position
    let tot = Math.round(this.income_last_month / this.denomination);
    for (let i = 0; i < tot; i++) {
      let dollar_bill = this.income_array[i];
      tl.from(dollar_bill, 1, {scaleX: (dollar_bill.scaleX  * Math.random() * -1), x :Math.random() * this.canvasWidth, y: -100 }, "-=.95");
    }

    // show all the dollars, then fade out the income container which contains the highlighted income dollars
    tl.call(this.showAllPastBalanceDollars.bind(this))
    tl.to(this.incomeContainer, .5, { alpha: 0, onStart: function () { this.incomeContainer.cache(0, 0, this.canvasWidth, this.canvasHeight) }.bind(this), onComplete: function () { this.historyContainer.uncache() }.bind(this) }, "+=2")
    
    // show dollars in the spending container
    tl.set(this.spendingContainer, { alpha: 1 });
    let num = Math.round(this.spending / this.denomination);
    for (let i = 0; i < num; i++) {
      let spending_bill = this.spending_array[i];
      let dollar_bill = this.past_balance_array[i];
      tl.set(dollar_bill, { alpha: 0 }, "+=.05");
      tl.set(spending_bill, { alpha: 1 }, "-=.05");
    }

    // show the "spending" text
    tl.to('#spending', 1, { alpha: 1 });

    // move the spending container "off stage" and "drop" the balanceLastMonth container
    num = Math.round(this.spending / this.denomination);
    let yPos = num * -this.incr;
    tl.to(this.spendingContainer, .5, { x: this.canvasWidth }, "+=1");
    tl.to(this.balanceLastMonthContainer, .5, { y: yPos, ease: Bounce.easeOut }, "-=.3");
  }

  showAllPastBalanceDollars() {
    for (let i = 0; i < this.past_balance_array.length; i++) {
      let dollar_bill = this.past_balance_array[i];
      dollar_bill.alpha = 1;

    }
  }

  stackPastBalance() {
    // need to include past balance AND income for animation
    let startY = this.startY;

    let pastBalance = Math.round(this.balance_last_month / this.denomination);
    let totalAmount = Math.round((this.balance_last_month + this.income_last_month) / this.denomination);

    for (let i = 0; i < totalAmount; i++) {
      let dollar_bill = this.past_balance_array[i];
      if (i >= pastBalance) dollar_bill.alpha = 0;
      dollar_bill.x = this.canvasWidth / 2;
      dollar_bill.y = startY;
      this.balanceLastMonthContainer.addChild(dollar_bill);
      startY += this.incr;
    }
  }

  stackIncome() {
    console.log('stackIncome')
    let startY = this.startY - (this.balance_last_month / this.denomination) * -this.incr;

    this.incomeContainer.y = -this.startY - 100;

    let num = Math.round(this.income_last_month / this.denomination);
    for (let i = 0; i < num; i++) {
      let dollar_bill = this.income_array[i];
      dollar_bill.x = this.canvasWidth / 2;
      dollar_bill.y = startY;
      this.incomeContainer.addChild(dollar_bill);
      startY += this.incr;
    }
  }

  resetSpendingSummaryText() {

    TweenMax.set('#balance_last_month', { alpha: 0 });
    TweenMax.set('#income_last_month', { alpha: 0 });
    TweenMax.set('#spending', { alpha: 0 });
  }

  resetPastBalance() {
    console.log('resetPastBalance----------------------')
    this.balanceLastMonthContainer.y = 0;
    let pastBalance = Math.round(this.balance_last_month / this.denomination);
    let totalAmount = Math.round((this.balance_last_month + this.income_last_month) / this.denomination);


    for (let i = 0; i < totalAmount; i++) {
      let dollar_bill = this.past_balance_array[i];
      if (i >= pastBalance) {
        dollar_bill.alpha = 0;
      } else {
        dollar_bill.alpha = 1;
      }
    }
  }

  stackSpending() {
    console.log('stack spending')
    let startY = this.startY;

    let num = Math.round(this.spending / this.denomination);

    for (let i = 0; i < num; i++) {
      let dollar_bill = this.spending_array[i];
      dollar_bill.x = this.canvasWidth / 2;
      dollar_bill.y = startY;
      this.spendingContainer.addChild(dollar_bill);
      startY += this.incr;
    }

    this.spendingContainer.alpha = 0;
  }

  ngOnDestroy() {
    console.log('AccountDetailComponent ngOnDestroy');
    this.destroy();
  }

  destroy() {
    console.log('AccountDetailComponent destroy');
    createjs.Ticker.reset();
    TweenMax.killAll();
    if (this.stage) {
      this.balanceContainer.removeAllChildren();
      this.stage.removeAllChildren();
      this.stage.removeAllEventListeners();
    }

  }

  initTicker() {
    console.log('AccountDetailComponent initTicker');
    createjs.Ticker.addEventListener('tick', this.draw.bind(this));
    createjs.Ticker.setFPS(60);
  }

  draw() {
    this.stage.update();
  }



  // SLIDE stuff
  slideChanged(behaviorIndex) {
    if (behaviorIndex == 1) {
      this.rainTween.pause();
      this.historyAnimation();
      
    }

    if (behaviorIndex == 0) {
      
      this.balanceContainer.alpha = 1;
      this.balanceContainer.x = 0;
      this.historyContainer.alpha = 0;
      this.resetSpendingSummaryText();
      this.balanceContainer.uncache();
      if(this.rainTween.paused()) this.rainTween.play();
    }
  }

  ngOnChanges(changes: SimpleChanges){
    
    this.slideChanged(changes.slideIndex.currentValue)
  } 

  renderAmount(){
    switch(this.page){
      case 'wallet':
        return this.childData.balance;
      case 'transfer':
        return 1000;
    }
  }

}
