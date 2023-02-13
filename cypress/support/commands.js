// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const baseUrl = 'https://api.escuelajs.co/api/v1/'

 Cypress.Commands.add('loginApi',(credentialObject)=>{
    cy.request('POST', baseUrl+'auth/login', credentialObject).as('credentials')
 }) 

  Cypress.Commands.add('getProductsApi',(token)=>{
    cy.request({
        method: 'GET',
        url: baseUrl+'products',
        headers: {
          'ConrtentType' : 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      }).as('fullList')
  })

  Cypress.Commands.add('getProductById', (id, tokenValue)=>{
    cy.request({
        method: 'GET',
        url: baseUrl+'products/' + id,
        headers: {
          Authorization: 'Bearer' + tokenValue,
          ContentType: 'application/json',
          accept: 'application/json'
        }
      }).as('product')
  })

  Cypress.Commands.add('updateProduct', (id, updateProductObject)=>{
    cy.request({
        method: 'PUT',
        url: baseUrl+'products/' + id,
        body: updateProductObject
      }).as('changedObject')
  })

  Cypress.Commands.add('createProduct', (productObject)=>{
    cy.request({
        method: 'POST',
        url: baseUrl+'products/',
        body: productObject
      }).as('newObject')
  })

  Cypress.Commands.add('deleteProduct', (id)=>{
    cy.request({
        method: 'DELETE',
        url: baseUrl+'products/' + id
      }).as('removedObject')
  })
  