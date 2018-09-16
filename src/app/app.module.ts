import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarvelService } from './services/marvel.service';
import { HeaderComponent } from './core/header/header.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { OrderPipe } from 'ngx-order-pipe';
import { CharacterComponent } from './components/characters-list/character/character.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharactersListComponent,
    CharacterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [MarvelService, OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
