describe('Ecologea Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  describe('Initial Blog Page Load', () => {
    it('should view all blogs', () => {
      cy.visit(baseUrl);
      cy.get('#tableContent').contains('Testing').should('exist');
    });
  });

  describe('Filter date validation', () => {
    it('should display an error when the filter date field is empty', () => {
      cy.visit(baseUrl)
      cy.get('#filter_date').clear();
      cy.contains('button', 'Filter').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Filter field cannot be empty');
      });
    });

    it('should display an error for a future filter date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1); // Set a future date
      cy.visit(baseUrl)
      cy.get('#filter_date').type(futureDate.toISOString().split('T')[0]);
      cy.contains('button', 'Filter').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Filter date cannot be in the future');
      });
    });

    it('should display an error for a filter date older than one year', () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 2); // Set a date older than 1 year
      cy.visit(baseUrl)
      cy.get('#filter_date').type(oldDate.toISOString().split('T')[0]);
      cy.contains('button', 'Filter').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Filter date cannot be more than 1 year ago');
      });
    });
  });
  describe('Filter functionality', () => {
    it('should show a message that there are no posts when a valid filter date is applied if no posts are made on that day', () => {
      const validDate = new Date();
      validDate.setMonth(validDate.getMonth() - 3); // A date within the past 1 year
      cy.visit(baseUrl)
      cy.get('#filter_date').type(validDate.toISOString().split('T')[0]);
      cy.contains('button', 'Filter').click();
      cy.get('#tableContent').should('contain', 'There were no posts made on this day. Please try resetting your filter.');
    });

    it('should show filtered posts when a valid filter date is applied if there are posts are made on that day', () => {
      const validDate = new Date();
      cy.visit(baseUrl)
      cy.get('#filter_date').type('2024-11-10');
      cy.contains('button', 'Filter').click();
      cy.get('#tableContent').should('contain', 'Testing');
    });
  });
  describe('Clear filter functionality', () => {
    it('should check the clear filter button', () => {
      cy.visit(baseUrl);
      cy.reload();
      let initialRowCount = 0;
      cy.get('#tableContent td').should('contain', 'Testing') // To ensure that the body.onload function is called and the data is displayed
      cy.get('#tableContent td').then((rows) => {
        initialRowCount = rows.length;
        cy.log('Initial row count: ', initialRowCount);
      });
      cy.get('#filter_date').type('2024-11-10');
      cy.contains('button', 'Filter').click();
      cy.get('#tableContent td').then((rows) => {
        const filteredRowCount = rows.length;
        cy.log('Filtered row count: ', filteredRowCount);
        expect(filteredRowCount).to.be.lessThan(initialRowCount);
      });
      cy.contains('button', 'Clear Filter').click();
      cy.get('#tableContent td').then((rows) => {
        const clearedRowCount = rows.length;
        cy.log('Cleared row count: ', clearedRowCount);
        expect(clearedRowCount).to.equal(initialRowCount);
      });
    })
  });
});