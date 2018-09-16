import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Marvelervice } from './services/marvel.service';
import { HeaderComponent } from './core/header/header.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { OrderPipe } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharactersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Marvelervice, OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
