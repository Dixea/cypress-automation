/// <reference types="cypress"/>

describe("hr_utility_login", ()=>{
   beforeEach("login",()=>{
      cy.visit('http://192.168.50.140:9001/auth/realms/InfoDevelopers/protocol/openid-connect/auth?client_id=hr-utility-frontend&redirect_uri=http%3A%2F%2F192.168.50.172%3A3000%2Fmaster%2Fmeeting-hall&state=6f53d6ec-04d8-4561-8fc0-b0e96f7d79fc&response_mode=fragment&response_type=code&scope=openid&nonce=e73cb4e8-d5fe-4991-b61e-e45fc1993fc3')
      // cy.visit("http://192.168.50.172:3000")
      cy.get('#username').as('userName')
      cy.get('#password').as('pwd')
      cy.get("#kc-login").as('btn')


   })
   it.skip("login with null data", ()=>{
   
    cy.get("@btn").click()
    cy.wait(1000)
   
    //cy.reload()
   // cy.get(".alert alert-error").should(have.text, "Invalid username or password.")
    })
   it.skip("login with invalid data", ()=>{
      
        //cy.visit("http://192.168.50.172:3000")
        
        cy.get('@userName').type("dinesh")
        cy.get('@pwd').type("kathmandu")
        cy.get("@btn").click()
      //   cy.wait(2000)
      //   cy.reload()
      cy.get('.pficon').should('be.visible')
    })

    it.skip("login with valid data", ()=>{
      
      //.visit("http://192.168.50.172:3000")
      cy.fixture('login').then((logincred)=>{
         cy.get('#username').type(logincred.email)
         
         cy.get('#password').type(logincred.password)
         cy.get("@btn").click()
        // cy.wait(2000)
        // cy.reload()
         cy.url().should('eq','http://192.168.50.172:3000/master/meeting-hall')
      })     
  })
})