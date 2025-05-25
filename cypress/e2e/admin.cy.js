describe('Admin Product Management', () => {
  it('Logs in as admin and accesses product panel', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('adminpass');
    cy.get('form').submit();

    cy.visit('http://localhost:3000/admin/products');
    cy.contains('Our Collection');
  });
});
