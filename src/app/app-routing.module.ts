import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CssFunComponent } from './pages/css-fun/css-fun.component';
import { HomeComponent } from './pages/home/home.component';
import { BoredComponent } from './pages/bored/bored.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PixelizeComponent } from './pages/pixelize/pixelize.component';


const routes: Routes = [
  { path: 'css-fun', component: CssFunComponent },
  { path: 'bored', component: BoredComponent},
  { path: 'messaging', component: MessagesComponent },
  { path: 'pixelize', component: PixelizeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
