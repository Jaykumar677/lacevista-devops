describe('Cart Functionality', () => {
  it('Adds product to cart and views cart', () => {
    cy.visit('http://localhost:3000/shop');
    cy.get('[data-cy="add-to-cart-button"]').first().click(); // Add test `data-cy` attributes
    cy.visit('http://localhost:3000/cart');
    cy.contains('Total');
  });
});
