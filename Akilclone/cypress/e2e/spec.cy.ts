// cypress/e2e/jobcard_spec.js

describe('JobCard Component', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/');
  // Adjust the URL if necessary
  });

  it('should successfully log in with valid credentials and toggle the bookMark button', () => {
    
    cy.get('input#email').type('niyix60067@lisoren.com');
    cy.get('input[type="password"]').type('1234');
    
    cy.get('button[type="submit"]').click();

    // cy.intercept('GET', '/opportunities/search').as('getJobs');

  
    // // Wait for the API call to complete
    // cy.wait('@getJobs' );

    // Wait for the page to redirect after login
    cy.url().should('eq', "http://localhost:3000/");
    

     //Ensure that job cards are visible and contain the bookmark button
    cy.get('[data-testid^="bookmark-button"]', { timeout: 20000 }).should('exist');

    // Click the first bookmark button
    cy.get('[data-testid^="bookmark-button"]').first().click();



  });

  it('bookmarked card should exist in the bookmarkpage', () => {

    cy.visit('http://localhost:3000/bookmark');
    cy.intercept('GET', '/bookmarks').as('getBookmarks');
    cy.intercept('GET', '/opportunities/search').as('getJobs');
    cy.wait('@getBookmarks');
    cy.wait('@getJobs');

    cy.get('.flex.flex-col.mx-52 > div').should('exist');

  });
});
