describe("Master Data",()=>{
    beforeEach("login",()=>{
        cy.visit('http://192.168.50.140:9001/auth/realms/InfoDevelopers/protocol/openid-connect/auth?client_id=hr-utility-frontend&redirect_uri=http%3A%2F%2F192.168.50.172%3A3000%2Fmaster%2Fmeeting-hall&state=6f53d6ec-04d8-4561-8fc0-b0e96f7d79fc&response_mode=fragment&response_type=code&scope=openid&nonce=e73cb4e8-d5fe-4991-b61e-e45fc1993fc3')
   //   cy.visit('http://192.168.50.172:3000/master/icon-setup')
 
        cy.login_hr()
      //   cy.get("#master").as("master")
        cy.contains('Dashboard').click()
        cy.get('.dropdown').eq(0).click()
        cy.contains('Logout').click()
      //    cy.get(".btn-primary").as("create")
      cy.reload()
    })
     it.skip("Meeting_hall_UI",()=>{
         cy.get("@master").click()
         cy.get("@meeting_hall",{force: true}).click()
         cy.get(".heading-05").should("have.text","Meeting Hall")
         cy.get(".card-meeting").should("be.visible")
         cy.get(".btn-primary").should("have.text", "Create")
         cy.get(".btn-group").should("be.be.visible")
     })
     it.skip("create button of meeting hall UI", ()=>{
        cy.get("@master").click()
        cy.get("@meeting_hall",{force: true}).click()
        cy.get("@create").click();
        //cy.get(".btn-primary").click()
        cy.get(".modal-title > p").should("have.text","Create Meeting Hall")
        cy.get(":nth-child(1) > .sc-ezbkAF").should("be.visible")
        cy.get(".preview").should("be.visible")
        cy.get(".col-lg-9").should("be.visible")
        cy.get(".col-3 > .sc-hKwDye > .btn").should("be.visible")
        cy.get(".modal-footer > .btn-outline-gray-32").should("be.visible").and("have.text", "Cancel")
        cy.get(".d-flex > .btn").should("be.visible").and("have.text", "Save")
        cy.get(".btn-close").should("be.visible")
        // cy.get("").should("be.visible").and("have.text", "")
     })
     it.skip("close icon of create pop op form", ()=>{
        cy.get("@master").click()
        cy.get("@meeting_hall",{force: true}).click()
        cy.get("@create").click()
        cy.get(".btn-close").click()
        cy.get(".heading-05").should("have.text","Meeting Hall")
        cy.get(".card-meeting").should("be.visible")
        cy.get(".btn-primary").should("have.text", "Create")
        cy.get(".btn-group").should("be.be.visible")
     })
       

     it.skip("cancel button of create pop op form", ()=>{
        cy.get("@master").click()
        cy.get("@meeting_hall",{force: true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        cy.get(".modal-footer > .btn-outline-gray-32").click()
        cy.get(".heading-05").should("have.text","Meeting Hall")
        cy.get(".card-meeting").should("be.visible")
        cy.get(".btn-primary").should("have.text", "Create")
        cy.get(".btn-group").should("be.be.visible")

     })
     it.skip("save button of create pop up with null data", ()=>{
        cy.get("@master").click()
        cy.get("@meeting_hall",{force: true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        cy.get(".d-flex > .btn").click()
        cy.get(".modal-body > :nth-child(1) > .error").should("have.text", "  Name is required.")
        cy.get(".file-upload > .error").should("have.text", "  Image is Required")
        cy.get(".w-75 > .error").should("have.text", "  Icon is required")
        cy.get(".sc-hKwDye > :nth-child(2) > .error").should("have.text", "  Description is required")
      
     })

     it.skip("save button of create pop up with valid data", ()=>{
        cy.get("@master").click()
        cy.intercept('GET','http://192.168.50.172:9000/api/icons/').as('icons')
        cy.get("@meeting_hall",{force: true}).click()
        cy.wait('@icons')
        cy.get("@create").click()
        cy.get(":nth-child(1) > .sc-ezbkAF").type("b")

        cy.get(".file-upload").within(()=>
         {
            cy.get('input[type="file"][name="cover_image"]')
            .selectFile("cypress/fixtures/hall image.jpg",{force:true})
          })
        
        cy.get("#react-select-2-input").type('TV{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[0].description"]').type(5)
        cy.get(".col-3 > .sc-hKwDye > .btn > .ic-add").click()
       
        cy.get("#react-select-3-input").type('Light{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[1].description"]').type(6)
        cy.get(".col-3 > .sc-hKwDye > .btn > .ic-add").click()
        cy.get("#react-select-4-input").type('Monitor{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[2].description"]').type(9)
        cy.contains("Save").click()
        cy.get(".heading-05").should("have.text","Meeting Hall")
        cy.get(".card-meeting").should("be.visible")
        //cy.contains("b").should("be.visible")
        cy.get(".btn-primary").should("have.text", "Create")
        cy.get(".btn-group").should("be.be.visible")
     })
    it.skip("save button with invalid data",()=>{
      cy.get("@master").click()
      cy.intercept('GET','http://192.168.50.172:9000/api/icons/').as('icons')
      cy.get("@meeting_hall",{force: true}).click()
      cy.wait('@icons')
      cy.get("@create").click()
      cy.get(":nth-child(1) > .sc-ezbkAF").type("123")

      cy.get(".file-upload").within(()=>
       {
          cy.get('input[type="file"][name="cover_image"]')
          .selectFile("cypress/fixtures/TV.svg",{force:true})
        })
        cy.get("#react-select-2-input").type('Light{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[0].description"]').type(6)
      cy.get(".error").should("be.visible").and('have.text',"  Only alphabets are allowed for this field")
      //cy.get("").should("be.visible")
    })
     it.skip("create meeting hall with duplicate data",()=>{
        cy.get("@master").click()
        cy.intercept('GET','http://192.168.50.172:9000/api/icons/').as('icons')
        cy.get("@meeting_hall",{force: true}).click()
       // cy.wait('@icons')
        cy.get("@create").click()
        cy.get(":nth-child(1) > .sc-ezbkAF").type("Ambience")

        cy.get(".file-upload").within(()=>
         {
            cy.get('input[type="file"][name="cover_image"]')
            .selectFile("cypress/fixtures/hall image.jpg",{force:true})
          })
        
        cy.get("#react-select-2-input").type('TV{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[0].description"]').type(5)
        cy.get(".col-3 > .sc-hKwDye > .btn > .ic-add").click()
       
        cy.get("#react-select-3-input").type('Light{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[1].description"]').type(6)
        cy.get(".col-3 > .sc-hKwDye > .btn > .ic-add").click()
        cy.get("#react-select-4-input").type('Monitor{enter}',{force:true})
        cy.get('input[type="text"][placeholder="Description"][name="iconDetails[2].description"]').type(9)
        cy.contains("Save").click()
        cy.get(".toast--message").should("be.visible").and('have.text', "SuccessfulHall Name already exists")
     })
//       beforeEach(" Delete meeting hall", ()=>{
      
//         // cy.reload()
//          cy.login_hr()
         
// })

it.only('delete final',()=>{
   // cy.reload()
   // cy.reload()
   
  // cy.login_hr()
   cy.get(":nth-child(4) > .collapse > .list > :nth-child(2) > .sc-llYSUQ").as("meeting_hall")

         cy.intercept('GET','http://192.168.50.172:9000/api/meeting-halls/').as('halls')
         cy.get('#master').click()
         
       //  cy.get("@master").click()
       cy.get("@meeting_hall").click()
       cy.wait('@halls').then((cat)=>{
        
         const dataread = cat.response.body.data
         dataread.forEach((element,i) => {
           if(element.hall_name=="Pacific"){
            cy.get(`:nth-child(${i+1}) > .card-meeting`).within(()=>{
               cy.get('.ic-delete').click({force:true})
               cy.get(".btn-danger" , {force:true}). click()
            //   cy.get(".modal-footer",{force:true}).within(()=>{
            //      cy.get(".btn btn-danger").click()
            //   })
            })
           }
         });
     })
})
//it.only(" Edit meeting hall", ()=>{
   //        cy.get("@master").click()
   //        cy.intercept('GET','http://192.168.50.172:9000/api/meeting-halls/').as('halls')
   //        cy.wait(1000)
   //        cy.get("@meeting_hall",{force: true}).click()
   //        cy.wait(1000)
   //        cy.wait('@halls').then((cat)=>{
            
   //          const dataread = cat.response.body.data
   //          dataread.forEach((element,i) => {
   //            if(element.hall_name=="Confluence"){
   //             cy.get(":nth-child(i+1) > .card-meeting").trigger('mouseover')
   //            }
   //          });
   //      })
   
   // })



      

})