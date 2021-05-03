import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { CommunicationService } from './services/communication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CacheService } from './services/cache.service';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    AlertComponent
  ],
  providers: [
    CommunicationService,
    CacheService
  ]
})
export class CoreModule { }
