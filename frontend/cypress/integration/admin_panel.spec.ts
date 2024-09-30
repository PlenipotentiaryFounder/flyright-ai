describe('Admin Panel', () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit('/admin/login');
    cy.get('input[name=username]').type('admin');
    cy.get('input[name=password]').type('adminpassword');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/admin');
  });

  it('navigates through sidebar menu items', () => {
    cy.contains('Users').click();
    cy.url().should('include', '/admin/users');
    
    cy.contains('Mock Orals').click();
    cy.url().should('include', '/admin/mock-orals');
    
    cy.contains('Gouges').click();
    cy.url().should('include', '/admin/gouges');
    
    cy.contains('Flashcards').click();
    cy.url().should('include', '/admin/flashcards');
    
    cy.contains('Analytics').click();
    cy.url().should('include', '/admin/analytics');
  });

  it('manages users', () => {
    cy.contains('Users').click();
    
    // Create a new user
    cy.get('input[placeholder="Username"]').type('newuser');
    cy.get('input[placeholder="Email"]').type('newuser@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.contains('Create User').click();
    cy.contains('newuser').should('be.visible');

    // Edit the user
    cy.contains('tr', 'newuser').contains('Edit').click();
    cy.get('input[value="newuser"]').clear().type('updateduser');
    cy.contains('Update').click();
    cy.contains('updateduser').should('be.visible');

    // Delete the user
    cy.contains('tr', 'updateduser').contains('Delete').click();
    cy.on('window:confirm', () => true);
    cy.contains('updateduser').should('not.exist');
  });

  it('manages mock orals', () => {
    cy.contains('Mock Orals').click();
    
    // Create a new mock oral
    cy.get('input[placeholder="Examiner Name"]').type('New Examiner');
    cy.get('input[placeholder="Score"]').type('85');
    cy.get('select').select('pending');
    cy.contains('Create Mock Oral').click();
    cy.contains('New Examiner').should('be.visible');

    // Approve the mock oral
    cy.contains('tr', 'New Examiner').contains('Approve').click();
    cy.contains('tr', 'New Examiner').contains('approved').should('be.visible');

    // Delete the mock oral
    cy.contains('tr', 'New Examiner').contains('Delete').click();
    cy.on('window:confirm', () => true);
    cy.contains('New Examiner').should('not.exist');
  });

  it('manages gouges', () => {
    cy.contains('Gouges').click();
    
    // Create a new gouge
    cy.get('input[placeholder="Examiner Name"]').type('Gouge Examiner');
    cy.get('input[type="date"]').type('2023-06-01');
    cy.get('select').select('pass');
    cy.get('textarea').type('This is a test gouge');
    cy.contains('Create Gouge').click();
    cy.contains('Gouge Examiner').should('be.visible');

    // Edit the gouge
    cy.contains('tr', 'Gouge Examiner').contains('Edit').click();
    cy.get('input[value="Gouge Examiner"]').clear().type('Updated Examiner');
    cy.contains('Update').click();
    cy.contains('Updated Examiner').should('be.visible');

    // Delete the gouge
    cy.contains('tr', 'Updated Examiner').contains('Delete').click();
    cy.on('window:confirm', () => true);
    cy.contains('Updated Examiner').should('not.exist');
  });

  it('manages flashcards', () => {
    cy.contains('Flashcards').click();
    
    // Create a new flashcard deck
    cy.get('input[placeholder="Deck Name"]').type('Test Deck');
    cy.get('input[placeholder="Description"]').type('This is a test deck');
    cy.contains('Create Deck').click();
    cy.contains('Test Deck').should('be.visible');

    // View flashcards in the deck
    cy.contains('Test Deck').parent().contains('View Flashcards').click();

    // Create a new flashcard
    cy.get('input[placeholder="Question"]').type('What is this test for?');
    cy.get('input[placeholder="Answer"]').type('To verify flashcard functionality');
    cy.contains('Create Flashcard').click();
    cy.contains('What is this test for?').should('be.visible');

    // Delete the flashcard
    cy.contains('What is this test for?').parent().contains('Delete').click();
    cy.on('window:confirm', () => true);
    cy.contains('What is this test for?').should('not.exist');

    // Delete the deck
    cy.contains('Test Deck').parent().contains('Delete Deck').click();
    cy.on('window:confirm', () => true);
    cy.contains('Test Deck').should('not.exist');
  });
});