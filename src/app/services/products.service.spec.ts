import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;
  let httpMock: HttpTestingController;
  const baseURL = 'https://fakestoreapi.com/';
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'mouse',
      price: '100',
      description: 'mouse multilaser',
      category: 'eletronicos',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  /*
   * testa se o serviço será criado com sucesso
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
   * testa a busca por produtos cadastrados
   */
  it('should test getProducts', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });

  /*
   * testa a inclusão de um novo produto
   */
  it('should test saveProducts', () => {
    const newProduct: Product = {
      id: '1',
      title: 'mouse',
      price: '100',
      description: 'mouse multilaser',
      category: 'eletronicos',
    };
    service.saveProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });
  });

  /*
   * testa a alteração de um produto existente
   */
  it('should test updateProduct', () => {
    const updateProduct: Product = {
      id: '2',
      title: 'mouse',
      price: '200',
      description: 'mouse multilaser',
      category: 'eletronicos',
    };
    service.updateProduct(updateProduct).subscribe((product) => {
      expect(product).toEqual(updateProduct);
    });
  });

  /*
   * testa a exclusão de um produto existente
   */
  it('should test deleteProduct', () => {
    const productID = 1;
    service.deleteProduct(productID).subscribe((response) => {
      expect(response).toHaveBeenCalled();
    });
  });
});
