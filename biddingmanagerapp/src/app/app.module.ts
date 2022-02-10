import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: "",   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path:"home", component:HomeComponent},
];
@NgModule({
  declarations: [		
    AppComponent,
      HeaderComponent,
      HomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: false }
    ),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
     MatPaginatorModule//,
    // MatMomentDateModule,
    // NgxMatDatetimePickerModule,
    // NgxMatTimepickerModule,
    // NgxMatNativeDateModule

  ],
  providers: [DatePipe,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
