import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AirportsComponent } from './pages/airports/airports.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AirportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
