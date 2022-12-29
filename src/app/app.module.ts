import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FacebookModule } from 'ngx-facebook';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CssFunComponent } from './pages/css-fun/css-fun.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { BoredComponent } from './pages/bored/bored.component';

import { environment } from '../environments/environment';
import { MessagesComponent } from './pages/messages/messages.component';
import { PixelizeComponent } from './pages/pixelize/pixelize.component';

import { CustomGridComponent } from './pages/custom-grid/custom-grid.component';
import { ToolsComponent } from './templates/tools/tools.component';
import { StepsComponent } from './templates/steps/steps.component';
import { PatternModalComponent } from './modals/pattern-modal/pattern-modal.component';
import { DelayModalComponent } from './modals/delay-modal/delay-modal.component';
import { MuscleBeachComponent } from './pages/muscle-beach/muscle-beach.component';
import { IntroAnimationComponent } from './templates/intro-animation/intro-animation.component';
import { HomeCarouselComponent } from './templates/home-carousel/home-carousel.component';
import { ProjectShowComponent } from './templates/project-show/project-show.component';
import { JsCollisionComponent } from './templates/js-collision/js-collision.component';
import { PlatformerComponent } from './pages/platformer/platformer.component';
import { PhaserComponent } from './pages/phaser/phaser.component';
import { GamesComponent } from './pages/games/games.component';
import { CoupComponent } from './pages/coup/coup.component';
import { CouphomeComponent } from './pages/couphome/couphome.component';
import { AlertyComponent } from './templates/alerty/alerty.component';
import { DemoComponent } from './templates/demo/demo.component';
import { TravelStuffComponent } from './pages/travel-stuff/travel-stuff.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//colors
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorHueModule } from 'ngx-color/hue';
import { ColorShadeModule } from 'ngx-color/shade';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorSliderModule } from 'ngx-color/slider';

import { ChecklistComponent } from './pages/checklist/checklist.component';
import { InstaComponent } from './pages/insta/insta.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SwolecityComponent } from './pages/swolecity/swolecity.component';
import { NachoHeaderComponent } from './templates/nacho-header/nacho-header.component';
import { NachoGalleryComponent } from './pages/nacho-gallery/nacho-gallery.component';
import { ShowDemosComponent } from './pages/show-demos/show-demos.component';
import { JsFunComponent } from './pages/js-fun/js-fun.component';
import { CssPhotoColumnsComponent } from './templates/css-photo-columns/css-photo-columns.component';
import { SortPipe } from './pipes/sort.pipe';
import { PlantsComponent } from './pages/plants/plants.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlantPipe } from './pipes/plant.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CssFunComponent,
    BoredComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MessagesComponent,
    PixelizeComponent,
    CustomGridComponent,
    ToolsComponent,
    StepsComponent,
    PatternModalComponent,
    DelayModalComponent,
    MuscleBeachComponent,
    IntroAnimationComponent,
    HomeCarouselComponent,
    ProjectShowComponent,
    JsCollisionComponent,
    PlatformerComponent,
    PhaserComponent,
    GamesComponent,
    CoupComponent,
    CouphomeComponent,
    AlertyComponent,
    DemoComponent,
    TravelStuffComponent,
    ChecklistComponent,
    InstaComponent,
    AuthComponent,
    SwolecityComponent,
    NachoHeaderComponent,
    NachoGalleryComponent,
    ShowDemosComponent,
    JsFunComponent,
    CssPhotoColumnsComponent,
    SortPipe,
    PlantsComponent,
    PlantPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    ColorPickerModule,
    ColorHueModule,
    ColorShadeModule,
    ColorSliderModule,
    ColorChromeModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AlertyComponent, 
    ScreenTrackingService,
    UserTrackingService,
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
