import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FacebookModule } from 'ngx-facebook';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

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


//colors
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorHueModule } from 'ngx-color/hue';
import { ColorShadeModule } from 'ngx-color/shade';
import { ChecklistComponent } from './pages/checklist/checklist.component';
import { InstaComponent } from './pages/insta/insta.component';
import { AuthComponent } from './pages/auth/auth.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FacebookModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ColorPickerModule,
    ColorHueModule,
    ColorShadeModule,
  ],
  providers: [AlertyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
