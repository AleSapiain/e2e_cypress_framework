const testData = require('../../fixtures/fixtures_demo/edix_form.json')

describe('Matricula EDIX', () => {
  beforeEach( () => {
    //context(this, 'some context');
    cy.visit('/es/matricula/inscripcion/26')
    cy.wait(2000)
  })

  it('EDIX Title', ()=>{
    cy.title().should('eq', 'EDIX')
  })

  it('URL should be https://edix.preunir.net/es/matricula/inscripcion/26', ()=>{
    cy.url().should('eq', 'https://edix.preunir.net/es/matricula/inscripcion/26')
  })

  it('Website shoud use https', ()=>{
    cy.location('protocol').should('contain', 'https')
  })

  it('Website shoud have hostname www.edix.preunir.net', ()=>{
    cy.location('hostname').should('eq', 'edix.preunir.net')
  })
})