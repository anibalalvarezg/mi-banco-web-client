import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { CommunicationService } from './services/communication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CacheService } from './services/cache.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CommunicationService,
    CacheService
  ]
})
export class CoreModule { }
