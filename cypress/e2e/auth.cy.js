describe('Auth Flow', () => {
  it('Signup user', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('input[name="first_name"]').type('John');
    cy.get('input[name="last_name"]').type('Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="mobile"]').type('1234567890');
    cy.get('input[name="password"]').type('Testpass123');
    cy.get('input[name="otp"]').type('0310'); // Simulate or mock OTP
    cy.get('form').submit();

    cy.url().should('include', '/createUser');
  });

  it('Login user', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="password"]').type('Testpass123');
    cy.get('form').submit();

    cy.url().should('include', '/loginUser');
  });
});
