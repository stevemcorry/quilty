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
import { TravelStuffComponent } from './pages/travel-stuff/travel-stuff.component';
import { ChecklistComponent } from './pages/checklist/checklist.component';
import { InstaComponent } from './pages/insta/insta.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SwolecityComponent } from './pages/swolecity/swolecity.component';
import { NachoGalleryComponent } from './pages/nacho-gallery/nacho-gallery.component';
import { ShowDemosComponent } from './pages/show-demos/show-demos.component';
import { JsFunComponent } from './pages/js-fun/js-fun.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'css-fun', component: CssFunComponent },
  { path: 'js-fun', component: JsFunComponent },
  { path: 'bored', component: BoredComponent},
  { path: 'messaging', component: MessagesComponent },
  { path: 'pixelize', component: PixelizeComponent },
  { path: 'custom-grid', component: CustomGridComponent },
  { path: 'muscle-beach', component: MuscleBeachComponent },
  { path: 'swolecity', component: SwolecityComponent },
  // { path: 'game', component: PlatformerComponent },
  { path: 'phaser', component: PhaserComponent },
  { path: 'games',  component: GamesComponent },
  { path: 'coup', component: CouphomeComponent },
  { path: 'coup/:id', component: CoupComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: 'insta', component: InstaComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'travel-track', component: TravelStuffComponent },
  { path: 'nacho-gallery', component: NachoGalleryComponent },
  { path: 'show-demos', component: ShowDemosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
