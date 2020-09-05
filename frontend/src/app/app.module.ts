import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from '../app/components/header/header.component'
import { LoaderComponent } from './components/loader/loader.component';
import { reducers } from '../store'
import { environment } from 'src/environments/environment';
import { BookEffects } from '../store/effects/book.effects';
import { SearchInputComponent } from './components/search-input/search-input.component'
 
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    LoaderComponent,
    SearchInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([BookEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
