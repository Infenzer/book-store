import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from '../app/components/header/header.component'
import { LoaderComponent } from './components/loader/loader.component';
import { reducers } from '../store'
import { environment } from 'src/environments/environment';
import { BookEffects } from '../store/effects/book.effects';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { ShortBookListComponent } from './components/short-book-list/short-book-list.component';
import { SliderComponent } from './components/slider/slider.component';
import { SlideDirective } from './components/slider/slide.directive';
import { FiltersComponent } from './components/filters/filters.component'
import { FiltersEffects } from './../store/effects/filters.effects';
import { CartPageComponent } from './pages/cart-page/cart-page.component'
 
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    LoaderComponent,
    SearchInputComponent,
    BookDetailsComponent,
    ShortBookListComponent,
    SliderComponent,
    SlideDirective,
    FiltersComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([BookEffects, FiltersEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
