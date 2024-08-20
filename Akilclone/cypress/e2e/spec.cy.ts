describe('Bookmarking functionality', () => {
  let firstJobId: string;
  let accessToken: string;

  before(() => {
    // Visit the login page
    cy.visit('http://localhost:3000/');

    // Log in with valid credentials
    cy.get('input#email').type('niyix60067@lisoren.com');
    cy.get('input[type="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    // Wait for the session to be established
    cy.intercept('GET', '**/api/auth/session').as('sessionRequest');
    cy.wait('@sessionRequest').then((interception) => {
      // Capture the access token from the session response if available
      const session = interception.response.body;
      accessToken = session.user.accessToken;
      Cypress.env('accessToken', accessToken); // Store token in Cypress environment variable
    });
  });

  beforeEach(() => {
    // Intercept requests and add the Bearer token to the Authorization header
    const token = Cypress.env('accessToken');
    cy.intercept('GET', '**/bookmarks', (req) => {
      req.headers['Authorization'] = `Bearer ${token}`;
    }).as('getBookmarks');
  });

  it('should successfully log in with valid credentials and toggle the bookmark button', () => {
    // Ensure that job cards are visible and contain the bookmark button
    cy.get('[data-testid^="bookmark-button"]', { timeout: 20000 }).should('exist');

    // Capture the ID of the first job card
    cy.get('[data-testid^="job-card"]').first().then(($card) => {
      firstJobId = $card.attr('data-job-id');
      
      // Ensure the ID is properly captured
      expect(firstJobId).to.be.a('string').and.not.be.empty;

      // Click the first bookmark button
      cy.get('[data-testid^="bookmark-button"]').first().click();
    });
  });

  it('should visit the bookmark page and verify that the job card is visible', () => {
    cy.visit('http://localhost:3000/bookmark');
    cy.wait('@getBookmarks'); // Wait for the intercepted request

    // Ensure the job card with the captured ID is visible on the bookmark page
    cy.get(`[data-testid="job-card-${firstJobId}"]`, { timeout: 10000 }).should('exist');
  });
});
