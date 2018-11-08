import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';

// pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyWalletPage } from '../pages/my-wallet/my-wallet';
import { BudgetPage } from '../pages/budget/budget';
import { GoalsPage } from '../pages/goals/goals';
import { GatekeeperPage } from '../pages/gatekeeper/gatekeeper';
import { ChallengesPage } from '../pages/challenges/challenges';


//Qr page
import { QrCodePage } from '../pages/qr-code/qr-code';
import { QrReaderPage } from '../pages/qr-reader/qr-reader';

//Money Transfer Page
import { MoneyTransferInitPage } from '../pages/money-transfer-init/money-transfer-init';
import { MoneyTransferDatePage } from '../pages/money-transfer-date/money-transfer-date';
import { MoneyTransferRepeatPage } from '../pages/money-transfer-repeat/money-transfer-repeat';
import { MoneyTransferNamePage } from '../pages/money-transfer-name/money-transfer-name';
import { MoneyTransferCompletePage } from '../pages/money-transfer-complete/money-transfer-complete';
import { MoneyTransferPayPage } from '../pages/money-transfer-pay/money-transfer-pay';
import { ParentDashboardPage } from '../pages/parent-dashboard/parent-dashboard';

//Detail Page
import { ChildDetailPage } from '../pages/child-detail/child-detail';
import {MoneyMovePage} from '../pages/money-move/money-move';
import { InvestDetailPage } from '../pages/invest-detail/invest-detail';
import { SpendingDetailPage } from '../pages/spending-detail/spending-detail';
import { SavingDetailPage } from '../pages/saving-detail/saving-detail';
import { GivingDetailPage } from '../pages/giving-detail/giving-detail';

//Goal Create Page
import { CreateGoalInitPage } from '../pages/create-goal-init/create-goal-init';
import { CreateGoalCostPage } from '../pages/create-goal-cost/create-goal-cost';
import { CreateGoalPicturePage } from '../pages/create-goal-picture/create-goal-picture';
import { CreateGoalDatePage } from '../pages/create-goal-date/create-goal-date';
import { CreateGoalConfirmPage } from '../pages/create-goal-confirm/create-goal-confirm';
import { IncomeDepositedPage } from '../pages/income-deposited/income-deposited';

// Components
import { AccountDetailComponent } from '../components/account-detail/account-detail';
import { BudgetOverviewComponent } from '../components/budget-overview/budget-overview';
import { BalanceTitleComponent } from '../components/balance-title/balance-title';
import { QrReaderComponent } from '../components/qr-reader/qr-reader';
import { QrCodeComponent } from '../components/qr-code/qr-code';
import { MoneyPileComponent } from '../components/money-pile/money-pile';
import { MonthlyAccountDetailComponent } from '../components/monthly-account-detail/monthly-account-detail';
import { AvatarImageComponent } from '../components/avatar-image/avatar-image';
import { CardInputComponent } from '../components/card-input/card-input';
import { FooterComponent } from '../components/footer/footer';
import { AppProgressionComponent } from '../components/app-progression/app-progression';
import { AppHeaderTextComponent } from '../components/app-header-text/app-header-text';
import { AppInputComponent } from '../components/app-input/app-input';
import { SimpleCalendarComponent } from '../components/simple-calendar/simple-calendar';
import { AppButtonComponent } from '../components/app-button/app-button';
import { AppSelectComponent } from '../components/app-select/app-select';
import { AppListComponent } from '../components/app-list/app-list';
import { AppEditListComponent } from '../components/app-edit-list/app-edit-list';
import { MoneyPileMoveComponent} from '../components/money-pile-move/money-pile-move';
import { GlobalAlertComponent } from '../components/global-alert/global-alert';
import { ToolTipComponent } from '../components/tool-tip/tool-tip';
import { OverlayComponent } from '../components/overlay/overlay';
import { AppIconButtonComponent } from '../components/app-icon-button/app-icon-button';
import { AppImgCircleComponent } from '../components/app-img-circle/app-img-circle';
import { AppBottomSlideTabComponent } from '../components/app-bottom-slide-tab/app-bottom-slide-tab';
import { FlatsComponent } from '../components/flats/flats';

//Providers
import { NavigationProvider } from '../providers/navigation/navigation';
import { AccountProvider } from '../providers/account/account';
import { TransferProvider } from '../providers/transfer/transfer';
import { ParentProvider } from '../providers/parent/parent';
import { BucketProvider } from '../providers/bucket/bucket';

//util
import { RequestHandlerProvider } from '../providers/request-handler/request-handler';
import { JwtStoreProvider } from '../providers/jwt-store/jwt-store';
import { UserProvider } from '../providers/user/user';
import { FamilyRequestProvider } from '../providers/family-request/family-request';
import { OverlayProvider } from '../providers/overlay/overlay';
import { GoalProvider } from '../providers/goal/goal';

@NgModule({
  declarations: [

    MyApp,

    // pages
    HomePage,
    LoginPage,
    MyWalletPage,
    BudgetPage,
    GoalsPage,
    GatekeeperPage,
    QrCodePage,
    QrReaderPage,
    MoneyTransferInitPage,
    MoneyTransferDatePage,
    MoneyTransferRepeatPage,
    MoneyTransferNamePage,
    MoneyTransferCompletePage,
    MoneyTransferPayPage,
    ParentDashboardPage,
    ChildDetailPage,
    MoneyMovePage,
    InvestDetailPage,
    SpendingDetailPage,
    SavingDetailPage,
    GivingDetailPage,
    CreateGoalInitPage,
    CreateGoalPicturePage,
    CreateGoalDatePage,
    CreateGoalConfirmPage,
    CreateGoalCostPage,
    IncomeDepositedPage,
    ChallengesPage,

    // components
    FooterComponent,
    AccountDetailComponent,
    BudgetOverviewComponent,
    BalanceTitleComponent,
    QrReaderComponent,
    QrCodeComponent,
    MoneyPileComponent,
    MonthlyAccountDetailComponent,
    AppButtonComponent,
    AppProgressionComponent,
    AppHeaderTextComponent,
    AppInputComponent,
    SimpleCalendarComponent,
    AppSelectComponent,
    BalanceTitleComponent,
    AvatarImageComponent,
    AppListComponent,
    BalanceTitleComponent,
    AvatarImageComponent,
    AppEditListComponent,
    MoneyPileMoveComponent,
    CardInputComponent,
    GlobalAlertComponent,
    ToolTipComponent,
    OverlayComponent,
    AppIconButtonComponent,
    AppImgCircleComponent,
    AppBottomSlideTabComponent,
    FlatsComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MyWalletPage,
    BudgetPage,
    GoalsPage,
    GatekeeperPage,
    QrCodePage,
    QrReaderPage ,
    MoneyTransferInitPage,
    MoneyTransferRepeatPage,
    MoneyTransferDatePage,
    MoneyTransferNamePage,
    MoneyTransferCompletePage,
    MoneyTransferPayPage,
    ParentDashboardPage,
    ChildDetailPage,
    MoneyMovePage,
    CardInputComponent,
    InvestDetailPage,
    SpendingDetailPage,
    SavingDetailPage,
    GivingDetailPage,
    CreateGoalInitPage,
    CreateGoalPicturePage,
    CreateGoalDatePage,
    CreateGoalConfirmPage,
    CreateGoalCostPage,
    IncomeDepositedPage,
    ChallengesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NavigationProvider,
    AccountProvider,
    RequestHandlerProvider,
    JwtStoreProvider,
    UserProvider,
    FamilyRequestProvider,
    TransferProvider,
    ParentProvider,
    BucketProvider,
    OverlayProvider,
    GoalProvider,
  ]
})
export class AppModule {}
