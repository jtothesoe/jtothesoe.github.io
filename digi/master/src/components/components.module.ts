import { NgModule } from '@angular/core';
import { AccountDetailComponent } from './account-detail/account-detail';
import { FooterComponent } from './footer/footer';
NgModule({
	declarations: [AccountDetailComponent, FooterComponent],
	imports: [],
	exports: [AccountDetailComponent, FooterComponent]
})
export class ComponentsModule {}
