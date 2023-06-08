import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TargetComponent } from './target/target.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { MessageComponent } from './message/message.component';
import { NewComponent } from './new/new.component';
import { DropComponent } from './drop/drop.component';
import { UploadComponent } from './upload/upload.component';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    TargetComponent,
    ListComponent,
    FormComponent,
    MessageComponent,
    NewComponent,
    DropComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot( InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
