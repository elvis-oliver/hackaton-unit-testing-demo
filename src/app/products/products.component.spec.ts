import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { mockProduct, mockProductEdit, Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  /*
   * testa se o componente é criado com sucesso
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
   * testa se o componente carrega as informações de produtos com sucesso e com erro
   */
  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      const mockProducts: Product[] = mockProduct;
      mockProductService.getProducts.and.returnValue(of(mockProduct));
      component.getProducts();
      fixture.detectChanges();
      expect(component.productData).toEqual(mockProducts);
      expect(component.showSpinner).toBeFalse;
    });

    it('should get product data initially on failure', () => {
      mockProductService.getProducts.and.returnValue(
        throwError(() => new Error('Error'))
      );
      component.getProducts();
      fixture.detectChanges();
      expect(component.showSpinner).toBeFalse;
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        { duration: 3000 }
      );
    });
  });

  /*
   * testa se o método openDialog abre o AddProductComponent com as opções de configurações * corretas
   */
  it('should test openDialog', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      width: '40%',
    });
  });

  /*
   * testa se o método openDialog abre o AddProductComponent com as informações do produto  * que será editado e as opções de configurações corretas
   */
  it('should test editDialog', () => {
    const product = mockProductEdit[0];
    component.editProduct(product);
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      data: product,
      width: '40%',
    });
  });

  /*
   * testa se o método deleteProduct exclui corretamente o produto e exibe a mensagem de  *  acordo com o resultado de sucesso ou erro
   */
  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      mockProductService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct({ id: 1 });
      fixture.detectChanges();
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Deleted Successfully!...',
        '',
        { duration: 3000 }
      );
    });

    it('should test deleteProduct on failure', () => {
      mockProductService.deleteProduct.and.returnValue(
        throwError(() => new Error('Error'))
      );
      component.deleteProduct({ id: 1 });
      fixture.detectChanges();
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        { duration: 3000 }
      );
    });
  });
});
