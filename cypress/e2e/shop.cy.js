describe('Shop Filter', () => {
  it('Filters by color and price', () => {
    cy.visit('http://localhost:3000/shop?color=black&maxPrice=150');
    cy.contains('Black'); // Validate filtered results
  });
});
