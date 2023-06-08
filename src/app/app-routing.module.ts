import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { UploadComponent} from './upload/upload.component';
import { DropComponent } from './drop/drop.component';
import { TargetComponent } from './target/target.component';

const routes: Routes = [
  { path: '', redirectTo: '/target', pathMatch: 'full'},
  {path: 'target', component: TargetComponent },
  {path: 'new', component: NewComponent },
  {path: 'list', component: ListComponent },
  {path: 'update/:id', component: UploadComponent},
  {path: 'drop/:id', component: DropComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
