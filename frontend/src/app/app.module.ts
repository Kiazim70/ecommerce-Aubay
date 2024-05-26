import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './productManager/product/product.component';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { ProductListComponent } from './productManager/product-list/product-list.component';
import { AddProductComponent } from './productManager/add-product/add-product.component';
import { UpdateProductComponent } from './productManager/update-product/update-product.component';
import { SearchComponent } from './productManager/search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatePipe } from './services/translation/translate.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



export function setupTranslateServiceFactory(
  service: TranslateService
): Function {
  return () => service.use('en');
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        CartComponent,
        CheckoutComponent,
        ProductComponent,
        UserComponent,
        PaymentComponent,
        OrderComponent,
        ProductListComponent,
        ProductComponent,
        AddProductComponent,
        UpdateProductComponent,
        SearchComponent,
        TranslatePipe,
        PageNotFoundComponent,
        BrowserAnimationsModule,
        TranslateModule.forChild(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
      
        })


    ],
        providers: [
          TranslateService,
          {
            provide: APP_INITIALIZER,
            useFactory: setupTranslateServiceFactory,
            deps: [TranslateService],
            multi: true
          },
          { provide: LOCALE_ID, useValue: 'en-US' },
          provideAnimationsAsync()
        ],
  
        bootstrap: [AppComponent]
      })
export class AppModule {
}
