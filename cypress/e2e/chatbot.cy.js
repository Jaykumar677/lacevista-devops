describe('Chatbot API', () => {
  it('should return a valid chatbot response for "hello"', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/chatbot',
      body: {
        message: 'hello'
      },
      failOnStatusCode: false // prevents Cypress from failing test on 500
    }).then((res) => {
      // Log response for debugging
      cy.log('Chatbot response:', res.body);

      // Assert valid structure
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('text');
      expect(res.body.text).to.be.a('string');
      expect(res.body.text.length).to.be.greaterThan(0);
    });
  });
});
