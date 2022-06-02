describe("Master Data",()=>{
    beforeEach("login",()=>{
        cy.visit('http://192.168.50.140:9001/auth/realms/InfoDevelopers/protocol/openid-connect/auth?client_id=hr-utility-frontend&redirect_uri=http%3A%2F%2F192.168.50.172%3A3000%2Fmaster%2Fmeeting-hall&state=6f53d6ec-04d8-4561-8fc0-b0e96f7d79fc&response_mode=fragment&response_type=code&scope=openid&nonce=e73cb4e8-d5fe-4991-b61e-e45fc1993fc3')
      
        cy.login_hr()
        cy.get("#master").as("master")
        cy.get(":nth-child(3) > .collapse > .list > :nth-child(1) > .sc-llYSUQ").as("iconsetup")
      
    })
    it.skip("Icon functionality and search field with invalid data",()=>{
        //cy.get("#master").children("@iconsetup").click();
        //cy.wait(2000)

       //cy.get("@iconsetup").click()
       // cy.get("ul. list ml-5").children(".")
       // cy.wait(2000)
       //cy.get("@iconsetup").click()
       //cy.get(". list ml-5").children(".sc-llYSUQ cbQNSR").click()
        cy.get("@master").click()
        cy.get("@iconsetup").click()
        cy.get(".form-control").type("asd")
        cy.get(".sc-ieecCq > .des").should('have.text',"No data available")
 
   })
   it.skip("Search functionality with valid data",()=>{
    cy.get("@master").click()
    cy.get("@iconsetup").click()
    cy.get(".form-control").type("TV")
    cy.get("tbody > tr > :nth-child(1)").should("have.text","TV")
    cy.get(":nth-child(2) > .sc-crHmcD").should("have.class","sc-crHmcD kIAgbB")
   // cy.get(":nth-child(3) > .list").should("have.descendants",".ic-edit").and("include.",":nth-child(2) > .btn")
     cy.get(".ic-edit").should("be.visible")
    cy.get(":nth-child(2) > .btn").should("be.visible")
   })
   it.skip(" verify icon setup click and Search functionality with null data",()=>{
   cy.get("@master").click()
    cy.get("@iconsetup").click()
    cy.get(".table ").should("be.visible")
    //cy.get(".form-control").click()
    //cy.get("").should()
    
   })
 //it.skip("scroll bar ",()=>{
   // cy.get("#master").click()
    //cy.get("@iconsetup").click()
    //cy.get("").scrollTo("bottom")
    //cy.get("").scrollTo("top")
 
   //})
   it.skip("create button click",()=>{
    cy.get("@master").click()
    cy.get("@iconsetup").click()
    cy.get(".section-header > .btn").click()
    cy.get(".modal-title").should("have.text",'Create Icon')
    cy.get(".mb-3 > .sc-ezbkAF").should("be.visible")
    cy.get('.preview').should("be.visible")
    cy.get(".edit > .ic-add").should("be.visible")
    cy.get(".btn-outline-gray-32").should("have.text","Cancel")
    cy.get(".d-flex > .btn").should("have.text","Save")

   })
   it.skip("create button with null data",()=>{
    cy.get("@master").click()
    cy.get("@iconsetup").click()
    cy.get(".section-header > .btn").click()
    cy.get(".d-flex > .btn").click()
    cy.get(".mb-3 > .error").should("be.visible").and("have.text","  Icon Name is Required")
    cy.get(".avatar-upload > .error").should("be.visible").and("have.text", "  Icon Image is Required")
   })

   it.skip("create button with valid data",()=>{
    cy.get("@master").click()
    cy.get("@iconsetup").click()
    cy.get(".section-header > .btn").click()
    //cy.get(".d-flex > .btn").click()
    cy.get(".mb-3 > .sc-ezbkAF").type("mouse")
    cy.get(".edit").within(()=>{
      cy.get('input[type="file"][name="icon"]')
      .selectFile("cypress/fixtures/cables.svg",{force:true})
    })
    cy.get(".d-flex > .btn").click()
    //cy.get(".mb-3 > .error").should("be.visible").and("have.text","Icon Name is Required")
    //cy.get(".avatar-upload > .error").should("be.visible").and("have.text", "Icon Image is Required")
   })

   it.skip("create button with invalid data",()=>{
    cy.get("@master").click()
    cy.get("@iconsetup").click()
    cy.get(".section-header > .btn").click()
    cy.get(".d-flex > .btn").click()
    cy.get(".mb-3 > .sc-ezbkAF").type("speaker")
    cy.get(".edit").within(()=>{
      cy.get('input[type="file"][name="icon"]')
      .selectFile("cypress/fixtures/hall image.jpg",{force:true})
    })
    cy.get(".d-flex > .btn").click()
    //cy.get(".mb-3 > .error").should("be.visible").and("have.text","Icon Name is Required")
    cy.get(".error").should("be.visible").and("have.text", "  Enter File in svg Format")
   })
   
   it.skip("edit icon of icon setup",() =>{
    cy.get("@master").click()
    cy.intercept('GET', 'http://192.168.50.172:9000/api/icons/').as ('des')
    cy.contains('Icon Setup').click({force:true})
    cy.wait('@des').then((cat)=>{
         
          const dataread = cat.response.body.data
          dataread.forEach((element,i) => {
            if(element.name =="Monitor"){
              cy.get(`:nth-child(${i +1}) > :nth-child(3) > .list > :nth-child(1) > .btn`).click()
              cy.get("input[name='name']").clear().type('abc')
              cy.get(".edit").within(()=>{
              cy.get('input[type="file"][name="icon"]')
                .selectFile("cypress/fixtures/TV.svg",{force:true})
              })
              
              cy.get("button[type='submit']").click()

            }
          });
      })
    })

    it.only("delete icon of icon setup", ()=>{

    cy.get("@master").click()
    cy.intercept('GET', 'http://192.168.50.172:9000/api/icons/').as ('des')
    cy.contains('Icon Setup').click({force:true})
    cy.wait('@des').then((cat)=>{
         
      const dataread = cat.response.body.data
      dataread.forEach((element,i) => {
        if(element.name =="asdx"){
          cy.get(`:nth-child(${i +1}) > :nth-child(4) > .list > :nth-child(2) > .btn`).click()
          cy.get(".btn-danger").click()
        
        }
      });
  })
  })
    })
