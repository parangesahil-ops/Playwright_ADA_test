import { test } from "@playwright/test";
import AddProductPage from "../pages/add-product-page";
import ProductsPage from "../pages/product-page";


test.describe('all tests using POM', () => {

    test.beforeEach(async ({ page }) => {
        const addProductPage = new AddProductPage(page)
        await addProductPage.webLink();
        await addProductPage.gotoProductPage();
    })

    test('Verify Add Product Page Base state @Smoke', async({page}) => {
        const addProductPage = new AddProductPage(page)
        await addProductPage.verifyPageSatate();
    })

    test('Add products @Regression', async({page}) =>{
        const addProductPage = new AddProductPage(page)
        await addProductPage.productFields('product 11', '440', '2025-02-08');

        const productsPage = new ProductsPage(page)
        await productsPage.verifyAddProduct();

    })

    test('Verify Name input field error @Smoke', async({page}) => {
        const addProductPage = new AddProductPage(page)
        await addProductPage.productFields('', '440', '2025-02-08');
        await addProductPage.checkNameError()
        await addProductPage.addValidProduct();
        const productsPage = new ProductsPage(page)
        await productsPage.verifyAddProduct();

    })

    test('Verify Price input field error @Regression', async({page}) => {
        const addProductPage = new AddProductPage(page)
        await addProductPage.productFields('product 11', '', '2025-02-08');
        await addProductPage.checkPriceError()
        await addProductPage.addValidProduct();
        const productsPage = new ProductsPage(page)
        await productsPage.verifyAddProduct();

    })

    test('Verify Date input field error @Regression', async({page}) => {
        const addProductPage = new AddProductPage(page)
        await addProductPage.productFields('product 11', '440', '');
        await addProductPage.checkDateError()
        await addProductPage.addValidProduct();
        const productsPage = new ProductsPage(page)
        await productsPage.verifyAddProduct();

    })

    test('Verify all inputs with empty fields @Regression', async({page}) => {
        const addProductPage = new AddProductPage(page)
        await addProductPage.clickSumbmitButton()
        await addProductPage.verifyEmptyFields()

    })

})
