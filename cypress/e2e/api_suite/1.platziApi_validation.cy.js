const testData = require('../../fixtures/fixtures_demo/platzi_api.json')

const credentialObject = testData[0]
const productObject = testData[1]
const updateProductObject = testData[2]

  describe('API DEMO - TESTING', ()=>{
    it('Login - Platzi API', ()=>{
        cy.loginApi(credentialObject)
        cy.get('@credentials').then( ({ status }) => {
            expect(status).to.eq(201)
          })
        cy.get('@credentials').then( ({ body }) => {
          expect(body.access_token).length.greaterThan(0)
        })
    })

    it('Listar Productos', ()=>{
      cy.loginApi(credentialObject)
      
      cy.get('@credentials').then( ({ body }) => {
        cy.log(body.access_token).as('token')
      })
      
      cy.getProductsApi('@token')
      cy.get('@fullList').then((response)=>{
        cy.log(response.body)
        expect(response.status).to.eq(200)
      })
    })

    it('Obtener Producto Especifico', ()=>{
      cy.loginApi(credentialObject)
      
      cy.get('@credentials').then( ({ body }) => {
        cy.log(body.access_token).as('token')
      })

      cy.getProductById(2,'@token')
      cy.get('@product').then((response)=>{
        cy.log(response.body)
      })
    })

    it('Insertar Producto', ()=>{
      cy.createProduct(productObject)

      cy.get('@newObject')
      .then((response)=>{
        expect(response).have.property('status').to.eq(201)
        expect(response.body.id).be.not.NaN
      })
    })

    it('Actualizar Producto', ()=>{
      cy.updateProduct(2, updateProductObject)
      cy.get('@changedObject')
      .then((response)=>{
        expect(response).have.property('status').to.eq(200)
        expect(response.body.id).be.not.NaN
      })
    })

    it('Eliminar Producto', ()=>{
      cy.createProduct(productObject)

      cy.get('@newObject')
      .then((response)=>{
        cy.deleteProduct(response.body.id)
        cy.get('@removedObject')
        .then((response)=>{
          expect(response).have.property('status').to.eq(200)
        })
      })
    })
  })