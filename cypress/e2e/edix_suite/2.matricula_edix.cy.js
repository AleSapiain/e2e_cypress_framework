const testData = require('../../fixtures/fixtures_demo/edix_form.json')

describe('Matricula EDIX', () => {
  beforeEach( () => {
    //context(this, 'some context');
    cy.visit('/es/matricula/inscripcion/26')
    cy.wait(2000)
  })

  testData.forEach(mock =>{
    it('Fill Form to ' + mock.nombre, ()=>{
      
      cy.title().should('contain', 'EDIX')
      
      cy.get('#nombre').type(mock.nombre)
      cy.get('#nombre').invoke('val').should('not.be.empty')

      cy.get('#apellido1').type(mock.primerApellido)
      cy.get('#apellido1').invoke('val').should('not.be.empty')

      cy.get('#apellido2').type(mock.segundoApellido)
      //cy.get('#fnacimiento').type(mock.fechaNacimiento)

      /**/

      cy.get('#fnacimiento').should('have.text', '')
      cy.get('#fnacimiento').click();
      cy.wait(2000)

      cy.get('.current+button.current>span').click();
      cy.get('.previous>span').click();
      cy.get('.previous>span').click();
      cy.contains('1994').click();
      cy.contains('diciembre').click();
      cy.contains('21').click();
      cy.get('#fnacimiento').invoke('val').should('not.be.empty')

      /**/

      cy.get('#email').type(mock.email)
      cy.get('#email').invoke('val').should('not.be.empty')

      cy.get('#emailConfirmacion').type(mock.email)
      cy.get('#emailConfirmacion').invoke('val').should('not.be.empty')
      
      cy.get('#domicilio').type(mock.direccion)
      cy.get('#domicilio').invoke('val').should('not.be.empty')
      
      cy.get('#cp').type(mock.cp)
      cy.get('#cp').invoke('val').should('not.be.empty')

      cy.get('ng-select[name="pais"]').type(mock.pais).then(()=>{
        cy.get('div.ng-option.ng-option-marked[role="option"]').click()
        cy.get('ng-select[name="pais"]').should('not.be.empty')  
      })

      cy.get('ng-select[name="provincia"]').type(mock.provincia).then(()=>{
        cy.get('div.ng-option.ng-option-marked[role="option"]').click()
        cy.get('ng-select[name="provincia"]').should('not.be.empty')  
      })

      cy.get('ng-select[name="poblacion"]').type(mock.municipio).then(()=>{
        cy.get('div.ng-option.ng-option-marked[role="option"]').click()
        cy.get('ng-select[name="poblacion"]').should('not.be.empty')  
      })

      cy.get('ng-select[name="movilpref"]').click()
      cy.get('div.ng-option.ng-star-inserted[role="option"][id$='+mock.prefijo_telefono+']').click()
      cy.get('ng-select[name="movilpref"]').should('not.be.empty')

      cy.get('#movil').type(mock.telefono_movil)
      cy.get('ng-select[name="documentType"][role="listbox"]').click()
      cy.get('div.ng-option.ng-star-inserted[role="option"][id$='+mock.documento+']').click()
      cy.get('#documentId').type(mock.nro_documento)
      
      cy.get('#data-protection+span.check-button__control').click().then(()=>{
        
       /* cy.get('body').then((body)=>{
          cy.wait(3000)
          if(body.find('app-identidad-facturacion').length > 0){
            
            cy.get('app-identidad-facturacion input[formcontrolname="documentId"]').type('AAAN9510188IA')
          }
        })*/
        cy.wait(3000)  
        cy.get('div.card.card-payment').first().click().then(()=>{
          
          cy.get('.radio-button__label').last().click()
          cy.get('#btn-pagar').click()
          })  
        }) 

        cy.location('hostname').should('contains', 'www.sandbox.paypal.com').then(()=>{
          cy.get('#email').should('be.visible')
          cy.get('#email').type('jol@unir.net')
          cy.get('#btnNext').click()
          cy.get('#password').type('12345678')
          //cy.get('#btnLogin').click()
        })
    })
  })
})