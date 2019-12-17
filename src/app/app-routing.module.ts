import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CssFunComponent } from './pages/css-fun/css-fun.component';
import { HomeComponent } from './pages/home/home.component';
import { BoredComponent } from './pages/bored/bored.component';


const routes: Routes = [
  { path: 'css-fun', component: CssFunComponent },
  { path: 'bored', component: BoredComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
