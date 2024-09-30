describe('Admin Login', () => {
  it('successfully logs in as an admin', () => {
    cy.visit('/admin/login');

    cy.get('input[name=username]').type('admin');
    cy.get('input[name=password]').type('adminpassword');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/admin');
    cy.contains('Dashboard').should('be.visible');
  });

  it('shows an error message for invalid credentials', () => {
    cy.visit('/admin/login');

    cy.get('input[name=username]').type('wronguser');
    cy.get('input[name=password]').type('wrongpassword');
    cy.get('button[type=submit]').click();

    cy.contains('Invalid credentials or user is not an admin').should('be.visible');
  });
});