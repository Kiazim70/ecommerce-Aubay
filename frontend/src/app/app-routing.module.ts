import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './productManager/product/product.component';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component'
import { OrderComponent } from './order/order.component';
import { ProductsComponent } from './productManager/products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './productManager/search/search.component';
import { AddProductComponent } from './productManager/add-product/add-product.component';
import { UpdateProductComponent } from './productManager/update-product/update-product.component';
import { ProductListComponent } from './productManager/product-list/product-list.component';

import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { CustomerListComponent } from './customerManager/customer-list/customer-list.component';
import { CustomerFormComponent } from './customerManager/customer-form/customer-form.component';
import { CustomerUpdateComponent } from './customerManager/customer-update/customer-update.component';
import { ItemsCatalogueComponent } from './catalogueManager/items-catalogue/items-catalogue.component';
import { CarComponent } from './catalogueManager/car/car.component';
import { CreateCategoryComponent } from './catalogueManager/create-category/create-category.component';
import { ConcessionnaireComponent } from './concessionnaireManager/concessionnaire/concessionnaire.component';
import { ConcessionnaireFormComponent } from './concessionnaireManager/concessionnaire-form/concessionnaire-form.component';
import { ConcessionnaireUpdateComponent } from './concessionnaireManager/concessionnaire-update/concessionnaire-update.component';
import { AddCarComponent } from './catalogueManager/add-car/add-car.component';
import { UpdateCarComponent } from './catalogueManager/update-car/update-car.component';
import { BillingComponent } from './billing/billing.component';
import { CarsListComponent } from './catalogueManager/cars-list/cars-list.component';
import { CategoryListComponent } from './catalogueManager/category-list/category-list.component';
import { UpdateCategoryComponent } from './catalogueManager/update-category/update-category.component';
import { CarsComponent } from './catalogueManager/cars/cars.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { BrandsComponent } from './toutelLesMarques/brands/brands.component';
import { CreateBrandComponent } from './toutelLesMarques/create-brand/create-brand.component';
import { UpdateBrandComponent } from './toutelLesMarques/update-brand/update-brand.component';
import { BrandsListComponent } from './toutelLesMarques/brands-list/brands-list.component';
import { ModelbrandsComponent } from './toutelLesMarques/modelbrands/modelbrands.component';
import { AddModelComponent } from './toutelLesMarques/add-model/add-model.component';
import { UpdateModelComponent } from './toutelLesMarques/update-model/update-model.component';
import { ModelListComponent } from './toutelLesMarques/model-list/model-list.component';
import { ModelComponent } from './toutelLesMarques/model/model.component';
import { ModelsComponent } from './toutelLesMarques/models/models.component';
import { RentcarComponent } from './toutelocation/rentcar/rentcar.component';

import { AddCategoryComponent } from './productManager/add-category/add-category.component';
import { CategoryUpdateComponent } from './productManager/category-update/category-update.component';
import { ListCategoryComponent } from './productManager/list-category/list-category.component';
import { BuyComponent } from './buy/buy.component';
import { CreditCardFormComponent } from './creditCardManager/credit-card-form/credit-card-form.component';
import { CreditcardListComponent } from './creditCardManager/creditcard-list/creditcard-list.component';
import { CreditCardUpdateComponent } from './creditCardManager/credit-card-update/credit-card-update.component';
import { BuymodelComponent } from './buymodel/buymodel.component';
import { BuyconcessComponent } from './buyconcess/buyconcess.component';
import { ModelCustomerComponent } from './model-customer/model-customer.component';
import { CarCustomerComponent } from './catalogueManager/car-customer/car-customer.component';
import { BuyCarComponent } from './catalogueManager/buy-car/buy-car.component';
import { SaveCustomerComponent } from './customerManager/save-customer/save-customer.component';
import { MessageModalComponent } from './messageManager/message-modal/message-modal.component';
import { AssuranceCarsComponent } from 'src/assurance/assurance-cars/assurance-cars.component';
import { AssuranceCarsFormComponent } from 'src/assurance/assurance-cars-form/assurance-cars-form.component';
import { TarifAutoComponent } from 'src/assurance/tarif-auto/tarif-auto.component';
import { TarifAutoListComponent } from 'src/assurance/tarif-auto-list/tarif-auto-list.component';
import { TarifAutoFormComponent } from 'src/assurance/tarif-auto-form/tarif-auto-form.component';
import { CarFilterPopupComponent } from './catalogueManager/car-filter-popup/car-filter-popup.component';
import { SearchCarComponent } from './catalogueManager/search-car/search-car.component';
//import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'saveCustomer', component: SaveCustomerComponent },
  { path: 'saveCustomer/:id', component: SaveCustomerComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'customer-update', component: CustomerUpdateComponent },
  { path: 'customer-update/:id', component: CustomerUpdateComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'concessionnaire', component: ConcessionnaireComponent },
  { path: 'concessionnaire-form', component: ConcessionnaireFormComponent },
  { path: 'concessionnaire-update/:id', component: ConcessionnaireUpdateComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'update-car', component: UpdateCarComponent },
  { path: 'update-car/:id', component: UpdateCarComponent }, 
  { path: 'cars-list', component: CarsListComponent },
  { path: 'cars-list/:id', component: CarsListComponent },
  { path: 'modelbrands', component: ModelbrandsComponent },
  { path: 'model-list', component: ModelListComponent },
  { path: 'model-list/:id', component: ModelListComponent },
  { path: 'add-model', component: AddModelComponent },
  { path: 'update-model', component: UpdateModelComponent },
  { path: 'update-model/:id', component: UpdateModelComponent },
  { path: 'models', component: ModelsComponent },
  { path: 'models/:id', component: ModelsComponent },
  { path: 'model', component: ModelComponent },
  { path: 'model/:id', component: ModelComponent },
  { path: 'modelCustomer', component: ModelCustomerComponent },
  { path: 'modelCustomer/:id', component: ModelCustomerComponent },
  { path: 'messageModal', component: MessageModalComponent },
  { path: 'messageModal/:id', component: MessageModalComponent },

  { path: 'assurancecars', component: AssuranceCarsComponent },
  { path: 'assurancecars/:id', component: AssuranceCarsComponent },
  { path: 'assurancecarsform', component: AssuranceCarsFormComponent },
  { path: 'assurancecarsform/:id', component: AssuranceCarsFormComponent },
  { path: 'tarifauto', component: TarifAutoComponent },
  { path: 'tarifauto/:id', component: TarifAutoComponent },
  { path: 'tarif-auto-list', component: TarifAutoListComponent },
  { path: 'tarifautoform', component: TarifAutoFormComponent },
  { path: 'tarifautoform/:id', component: TarifAutoFormComponent },


  { path: 'rentcar', component: RentcarComponent },
  { path: 'rentcar/:id', component: RentcarComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'category-update/:id', component: CategoryUpdateComponent },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'credit-card-form', component: CreditCardFormComponent },
  { path: 'credit-card-update/:id', component: CreditCardUpdateComponent },
  { path: 'creditcard-list', component: CreditcardListComponent },
  { path: 'car-filter-popup', component: CarFilterPopupComponent },
  { path: 'search-car', component: SearchCarComponent },


  { path: 'buy', component: BuyComponent },
  { path: 'buy/:id', component: BuyComponent },
  { path: 'buymodel', component: BuymodelComponent },
  { path: 'buymodel/:id', component: BuymodelComponent },
  { path: 'buyconcess', component: BuyconcessComponent },
  { path: 'modelCustomer/:id', component: ModelCustomerComponent },
  
  { path: 'carCustomer', component: CarCustomerComponent },
  { path: 'carCustomer/:id', component: CarCustomerComponent },
  { path: 'buyCar', component: BuyCarComponent },
  { path: 'buyCar/:id', component: BuyCarComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'prodlucts', component: ProductsComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'update-category/:id', component: UpdateCategoryComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'items-catalogue', component: ItemsCatalogueComponent },
  { path: 'brands-list', component: BrandsListComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'create-brand', component: CreateBrandComponent },
  { path: 'update-brand', component: UpdateBrandComponent },
  { path: 'update-brand/:id', component: UpdateBrandComponent },
 


  //{ path: 'items-catalogue/:id', component: ItemsCatalogueComponent },BrandsComponent
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:id', component: CarsComponent },
  { path: 'car', component: CarComponent },
  { path: 'car/:id', component: CarComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'user', component: UserComponent },
  { path: 'lang-selector', component: LangSelectorComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: '**', component: PageNotFoundComponent 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
