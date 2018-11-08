import { Component, ViewChild, Input } from '@angular/core';
import { Slides } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { TweenMax, TimelineMax, Circ, Power2 } from 'gsap';

/**
 * Generated class for the BudgetOverviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss']
})
export class BudgetOverviewComponent {

  @Input() childData: any;
  @ViewChild(Slides) slides: Slides;

  svg: HTMLElement;
  edit_budget_button: HTMLElement;
  budgetSliders: HTMLCollection;

  totalBudget: number = 0;
  maxBudget: number = 0;

  ns = 'http://www.w3.org/2000/svg';
  angles: Array<number> = [];
  colors:Array<String> = ["#FAF700", "#FFA9EA", "#EA4DC3", "#16E1D0", "#ffffff"];
  svgWidth: number;
  svgHeight: number;
  radius: number;
  waferHeight: number = 10;
  topSlices: any;
  totalSlices: number = 0;
  scaleSize: number = 1.2;

  graphX: number;
  graphY: number;

  constructor(public platform: Platform) {
    console.log('Hello BudgetOverviewComponent Component');
  }

  ngAfterViewInit() {
    console.log('BudgetOverviewComponent ngAfterViewInit()');
    this.initData();
    this.initAngleArray();
    this.drawShadow();
    this.buildChart();
    this.initCardColors();
    this.initSliders();
    this.slideWillChange();
  }

  initData() {
    console.log('childData: ', this.childData);
    this.svg = document.getElementById('svgCanvas');
    this.edit_budget_button = document.getElementById('edit-button');
    this.svgWidth = this.platform.width();
    this.svgHeight = this.platform.height() * .9;
    this.radius = this.svgWidth * .26;
    this.graphX = this.svgWidth / 2;
    this.graphY = this.svgHeight * .41;
  }

  initAngleArray() {
    this.totalBudget = 0;
    this.maxBudget = this.childData.budgetMax;
    this.angles = [];

    for (let category of this.childData.categories) {
      this.totalBudget += category.budgeted;
    }

    for (let i = 0; i < this.childData.categories.length; i++) {
      this.angles.push(this.childData.categories[i].budgeted / this.totalBudget * 360)
    }
  }

  drawShadow() {
    var g = document.createElementNS(this.ns, 'g');
    g.setAttributeNS(null, "id", "shadow");

    let rect = document.createElementNS(this.ns, 'rect');
    rect.setAttributeNS(null, 'x', String(this.graphX - this.radius));
    rect.setAttributeNS(null, 'y', String(this.graphY));
    rect.setAttributeNS(null, 'width', String(2 * this.radius));
    rect.setAttributeNS(null, 'height', String(this.svgHeight / 2));
    rect.setAttributeNS(null, 'fill', "#000000");
    rect.setAttributeNS(null, 'style', 'fill:url(#shadowfade); transform:45');
    rect.setAttributeNS(null, 'transform', "rotate(45 " + String(this.graphX) + " " + String(this.graphY) + ")");
    g.appendChild(rect);
    this.svg.appendChild(g);
  }

  buildChart() {
    this.buildit("bottom");
    this.drawSurfaceLayer();
    this.buildit("top");
    this.initializeTopSlices();
  }

  initCardColors() {
    let sliders = document.getElementsByClassName("categoryCard") as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < sliders.length; i++) {
      let name = this.childData.categories[i].name;

      switch(name) {
        case "spending money":
        
        break;

        case "saving":
        sliders[i].classList.add('categoryCard-pink');
        break;

        case "investing":
        sliders[i].classList.add('categoryCard-red');
        break;

        case "sharing":
        sliders[i].classList.add('categoryCard-green');
        break;
      }
      
    }
  }

  initSliders() {
    this.budgetSliders = document.getElementsByClassName('slider') as HTMLCollection;
    
    for (let i = 0; i < this.budgetSliders.length; i++) {
      let slider = this.budgetSliders[i] as HTMLInputElement;
      slider.value = this.childData.categories[i].budgeted;
      slider.style.backgroundSize = this.childData.categories[i].budgeted + "% 100%";
      slider.oninput = this.updateValues.bind(this);
    }
  }

  updateValues(e) {
    let tot = this.getTotal();
    if(tot > this.maxBudget)
    {
      let excess = tot - this.maxBudget;
      e.target.value = e.target.value - excess;
    } 

    e.target.style.backgroundSize = e.target.value + "% 100%";
    this.rebuildChart();
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.budgetSliders.length; i++) {
      let slider = this.budgetSliders[i] as HTMLInputElement;
      total += Number(slider.value);
    }

    return total;
  }

  // svg methods

  buildit(name) {
   let names = ["yo", "two", "three", "four", "five", "six"];

    var g = document.createElementNS(this.ns, 'g');
    g.setAttributeNS(null, "id", name);

    let startAngle = 0;

    for (let i = 0; i < this.angles.length; i++) {
      g.appendChild(this.drawTriangle(name + "_" + names[i], this.graphX, this.graphY, this.radius, this.waferHeight, startAngle, this.angles[i], this.colors[i]));
      startAngle += this.angles[i];
    }

    this.svg.appendChild(g);
  }

  drawSurfaceLayer() {
    let startAngle = 0;
    var g = document.createElementNS(this.ns, 'g');
    g.setAttributeNS(null, 'id', "surface");

    for (let i = 0; i < this.angles.length; i++) {
      g.appendChild(this.makePieSlice(this.graphX, this.graphY, this.radius, startAngle, this.angles[i], this.colors[i], 1));
      startAngle += this.angles[i];
    }

    this.svg.appendChild(g);
  }

  drawTriangle(name, originX, originY, radius, ht, angle, rotation, color) {

    var g = document.createElementNS(this.ns, 'g');
    g.setAttributeNS(null, "id", name);

    let path_1 = this.makePieSlice(originX, originY, radius, angle, rotation, color, 1);
    let path_2 = this.makePieSlice(originX, originY + ht, radius, angle, rotation, this.shade(color, -.4), 1);

    let sides = this.makePieSides(originX, originY, angle, radius, rotation, color)

    g.appendChild(path_2);
    g.appendChild(sides);
    g.appendChild(path_1);

    return g;
  }

  makePieSlice(originX, originY, radius, angle, rotation, color, opacity) {
    let r = radius;

    let arcFlag = rotation > 180 ? 1 : 0;
    let radians = angle / 180 * Math.PI;
    let x1 = originX + Math.cos(radians) * r;
    let y1 = originY + (Math.sin(radians) * r);

    angle += rotation;
    radians = angle / 180 * Math.PI;

    let x2 = originX + Math.cos(radians) * r;
    let y2 = originY + (Math.sin(radians) * r);

    var path = document.createElementNS(this.ns, 'path');

    let t1_str = `M ${x1}, ${y1}  A${r}, ${r}  0 ${arcFlag} 1 ${x2}, ${y2} L${originX}, ${originY}`;

    path.setAttributeNS(null, 'd', t1_str);
    path.setAttributeNS(null, 'style', `fill: ${color}`);
    path.setAttributeNS(null, 'fill-opacity', `${opacity}`);

    return path;
  }

  makePieSides(originX, originY, angle, radius, rotation, color) {
    let op = .9;
    let newColor = this.shade(color, -.4);
    
    let radians = angle / 180 * Math.PI;
    let x1 = originX + Math.cos(radians) * radius;
    let y1 = originY + (Math.sin(radians) * radius);

    angle += rotation;
    radians = angle / 180 * Math.PI;

    let x2 = originX + Math.cos(radians) * radius;
    let y2 = originY + (Math.sin(radians) * radius);

    var poly_1 = this.makePolygon(originX, originY, originX, originY + this.waferHeight, x1, y1 + this.waferHeight, x1, y1, newColor, op);
    var poly_2 = this.makePolygon(originX, originY, originX, originY + this.waferHeight, x2, y2 + this.waferHeight, x2, y2, newColor, op);

    var g = document.createElementNS(this.ns, 'g');

    g.appendChild(poly_1);
    g.appendChild(poly_2);

    return g;
  }

  makePolygon(x1, y1, x2, y2, x3, y3, x4, y4, color, opacity) {
    //<polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
    let polygon = document.createElementNS(this.ns, 'polygon');
    polygon.setAttributeNS(null, 'points', `${x1}, ${y1} ${x2}, ${y2} ${x3}, ${y3} ${x4}, ${y4}`);
    polygon.setAttributeNS(null, 'style', `fill:${color}; fill-opacity:${opacity}`);

    return polygon;
  }

  shade(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  // Show-Hide Pie Slices ------------------ 

  initializeTopSlices() {
    this.topSlices = document.getElementById('top').children;
    this.totalSlices = this.topSlices.length;
    for (let slice of this.topSlices) {
      TweenMax.set(slice, { opacity: 0 });
    }
  }

  
  showSlice(num) {
    // console.log('show slice:' + num);
    if (num >= this.angles.length) num = 0;
    let tl = new TimelineMax(/*{repeat:-1}*/);
    tl.to('#top', .3, { y: 0, scale: 1, opacity: 0, transformOrigin: "center center", ease: Circ.easeIn/*, onComplete: this.showSlice.bind(this), onCompleteParams: [num + 1] */ });
    tl.set('#top', { opacity: 0 });
    tl.set(this.topSlices, { opacity: 0 });
    tl.set(this.topSlices[num], { opacity: 1 });
    tl.to('#top', .6, { y: -this.waferHeight, scale: this.scaleSize, opacity: 1, transformOrigin: "center center", ease: Circ.easeOut });
  }

  // ------------------- Slide methods

  slideChanged() {

  }

  slideWillChange() {
    let slideIndex = this.slides.getActiveIndex();

    if (slideIndex == undefined) slideIndex = 0;
    // console.log('slideIndex: ', slideIndex);
    let slides: HTMLCollectionOf<Element> = document.getElementsByClassName('categoryCard');
    if (slideIndex >= slides.length) return;

    for (let i = 0; i < slides.length; i++) {
      let slide = slides[i];
      if (i != slideIndex) {
        slide.classList.add("categoryCardSmall");
      } else {
        if (slide.classList.contains("categoryCardSmall")) slide.classList.remove("categoryCardSmall");
      }
    }

    this.showSlice(slideIndex)
  }

  // ------------------- Button Handlers 

  edit_button_click_handler() {
    // console.log('edit_button_click_handler');
    this.animateChartOut();
  }

  save_button_click_handler() {
    this.rebuildChart();
    this.slideWillChange();
    this.animateChartIn();
  }

  // ------------------- Chart transitions

  animateChartOut() {
    let dur = .5;
    let newView = `${-this.svgWidth} 0 ${this.svgWidth * 2} ${this.svgHeight * 2}`;
    // console.log('newView: ' + newView)
    let s = document.getElementsByClassName('swiper-container');
    // console.log('slides container', s)
    let lst = document.getElementById('budget-sliders-container');
    let tl = new TimelineMax();
    tl.add("slideOut");

    tl.to('#top', .3, { y: 0, scale: 1, opacity: 0, transformOrigin: "center center", ease: Circ.easeIn/*, onComplete: this.showSlice.bind(this), onCompleteParams: [num + 1] */ });
    tl.set('#top', { opacity: 0 });

    tl.to(this.edit_budget_button, dur, { transformOrigin: "right top", scaleX: 0, scaleY: 0, opacity: 0, ease: Power2.easeInOut }, "slideOut");
    tl.to(this.svg, dur, { attr: { viewBox: newView }, ease: Power2.easeInOut }, "slideOut");
    tl.to(s, dur, { autoAlpha: 0, display: "none", y: -30, ease: Power2.easeInOut }, "slideOut");
    tl.fromTo(lst, dur, { y: 100, opacity: 0, ease: Power2.easeInOut }, { y: 0, autoAlpha: 1, display: "block", ease: Power2.easeOut }, "-=.4");
  }

  animateChartIn() {
    // console.log('save_button_click_handler');
    let dur = .5;
    let newView = `0 0 ${this.svgWidth} ${this.svgHeight}`;
    // console.log('newView: ' + newView)
    let s = document.getElementsByClassName('swiper-container');
    let lst = document.getElementById('budget-sliders-container');
    let tl = new TimelineMax();
    tl.add("slideIn")
    tl.to(this.edit_budget_button, dur, { transformOrigin: "right top", scaleX: 1, scaleY: 1, opacity: 1, ease: Power2.easeInOut }, "slideIn");
    tl.to(this.svg, dur, { attr: { viewBox: newView }, ease: Power2.easeInOut }, "slideIn");
    tl.to(lst, dur, { y: 100, autoAlpha: 0, display: "none", ease: Power2.easeInOut }, "slideIn");
    tl.to(s, dur, { autoAlpha: 1, display: "block", y: 0, ease: Power2.easeInOut }, "slideIn");
  }

  // ------------------- RESET chart stuff

  rebuildChart() {
    this.clearChart();
    this.updateBudgetAmounts();
    this.buildChart();
  }

  clearChart() {
    this.svg.removeChild(document.getElementById("top"));
    this.svg.removeChild(document.getElementById("bottom"));
    this.svg.removeChild(document.getElementById("surface"));
  }

  updateBudgetAmounts() {
    for (let i = 0; i < this.childData.categories.length; i++) {
      let slider = this.budgetSliders[i] as HTMLInputElement;
      this.childData.categories[i].budgeted = Number(slider.value);
    }

    this.initAngleArray();
  }

}
