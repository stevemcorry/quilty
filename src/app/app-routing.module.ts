import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CssFunComponent } from './pages/css-fun/css-fun.component';
import { HomeComponent } from './pages/home/home.component';
import { BoredComponent } from './pages/bored/bored.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PixelizeComponent } from './pages/pixelize/pixelize.component';
import { CustomGridComponent } from './pages/custom-grid/custom-grid.component';
import { MuscleBeachComponent } from './pages/muscle-beach/muscle-beach.component';
import { PlatformerComponent } from './pages/platformer/platformer.component';
import { PhaserComponent } from './pages/phaser/phaser.component';
import { CoupComponent } from './pages/coup/coup.component';
import { GamesComponent } from './pages/games/games.component';
import { CouphomeComponent } from './pages/couphome/couphome.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'css-fun', component: CssFunComponent },
  { path: 'bored', component: BoredComponent},
  { path: 'messaging', component: MessagesComponent },
  { path: 'pixelize', component: PixelizeComponent },
  { path: 'custom-grid', component: CustomGridComponent },
  { path: 'muscle-beach', component: MuscleBeachComponent },
  // { path: 'game', component: PlatformerComponent },
  { path: 'phaser', component: PhaserComponent },
  { path: 'games',  component: GamesComponent },
  { path: 'coup', component: CouphomeComponent },
  { path: 'coup/:id', component: CoupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
