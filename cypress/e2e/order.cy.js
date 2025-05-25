describe('Order Flow with Auth', () => {
  it('should login and place an order through checkout page', () => {
    // Step 1: Login first
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('danishkumar271@gmail.com');
    cy.get('input[name="password"]').type('Australia12345.');
    cy.get('form').submit();

    // Step 2: Wait for redirect to /shop or home
    cy.url().should('include', '/shop');

    // Step 3: Now visit checkout
    cy.visit('http://localhost:3000/checkout');

    // Step 4: Fill checkout form
    cy.wait(1000); // for rendering
    cy.get('input[name="length"]').type('9');
    cy.get('input[name="width"]').type('4');
    cy.get('input[name="arch"]').type('2.5');

    cy.get('input[name="address"]').type('123 Test Street');
    cy.get('input[name="city"]').type('Melbourne');
    cy.get('input[name="zip"]').type('3000');
    cy.get('input[name="country"]').type('Australia');

    cy.get('input[name="card"]').type('4111111111111111');
    cy.get('input[name="expiry"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');

    cy.get('form').submit();

    // Step 5: Confirm order placed
    cy.contains('Order Successful!').should('exist'); // adjust text if needed
  });
});
