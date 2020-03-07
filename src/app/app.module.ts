import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

import { ColorPickerModule } from 'ngx-color-picker';
import { CustomGridComponent } from './pages/custom-grid/custom-grid.component';
import { ToolsComponent } from './templates/tools/tools.component';
import { StepsComponent } from './templates/steps/steps.component';
import { PatternModalComponent } from './modals/pattern-modal/pattern-modal.component';
import { DelayModalComponent } from './modals/delay-modal/delay-modal.component';
import { MuscleBeachComponent } from './pages/muscle-beach/muscle-beach.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
