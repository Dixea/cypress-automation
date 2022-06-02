describe("Master Data",()=>{
    beforeEach("login",()=>{
        cy.visit('http://192.168.50.140:9001/auth/realms/InfoDevelopers/protocol/openid-connect/auth?client_id=hr-utility-frontend&redirect_uri=http%3A%2F%2F192.168.50.172%3A3000%2Fmaster%2Fmeeting-hall&state=6f53d6ec-04d8-4561-8fc0-b0e96f7d79fc&response_mode=fragment&response_type=code&scope=openid&nonce=e73cb4e8-d5fe-4991-b61e-e45fc1993fc3')
      
        cy.login_hr()
        cy.get("#master").as("master")
        cy.get(":nth-child(4) > .collapse > .list > :nth-child(4) > .sc-llYSUQ").as("group_management")
        cy.get(".btn-primary").as("create")
      
    })
    it.skip("group management UI",()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get(".heading-05").should("have.text", "Group Management")
        cy.get(".sc-fKVqWL").should("be.visible")
        cy.get("@create").should("be.visible")
    })
     it.skip("Group management create button UI", ()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get("@create").click()
        cy.get(".modal-title").should("have.text", "Create Group")
        cy.get(".sc-ezbkAF").should("be.visible")
        cy.get(".css-2lg52e").should("be.visible")
        cy.get(".d-flex > .btn").should("be.visible")
        cy.get(".btn-outline-gray-32").should("be.visible")
     })
     it.skip("Group Management close icon of create pop up", ()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        cy.get(".btn-close").click()
        cy.get(".heading-05").should("have.text", "Group Management")
        cy.get(".sc-fKVqWL").should("be.visible")
        cy.get("@create").should("be.visible")
    
     })

     it.skip("Group Management cancel button of create pop up", ()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        // cy.get(".btn btn-outline-gray-32 ml-2").click()
        cy.get(".modal-footer").within(()=>{
            cy.get("button").eq(0).click()
        })
        cy.get(".heading-05").should("have.text", "Group Management")
        cy.get(".sc-fKVqWL").should("be.visible")
        cy.get("@create").should("be.visible")
    
     })

     it.skip("Group Management create button of create pop up with null data", ()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        // cy.get(".btn btn-outline-gray-32 ml-2").click()
        cy.get(".modal-footer").within(()=>{
            cy.get("button").eq(1).click()
        })
        cy.get(".mb-3 > .error").should("have.text", "  Group Name is Required")
        cy.get(":nth-child(2) > .error").should("have.text", "  Member Name is Required")
     })
     it.skip("Group Management create button of create pop up with duplicate data", ()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        cy.get("input[name='name']").type("React")
        cy.get(".css-0").within(()=>{
            cy.wait(1000)
            cy.get("input").type('dinesh Karki{enter}',{force:true})
            cy.get("input").type('Satish Mudbhari{enter}',{force:true})
            cy.get("input").type('sujan Adhikari{enter}',{force:true})
        })
        cy.get(".modal-footer").within(()=>{
            cy.get("button").eq(1).click()
        })
   
     })
     it.skip("Group Management create button of create pop up with valid data", ()=>{
        cy.get("@master").click()
        cy.get("@group_management", {force:true}).click()
        cy.get("@create").click()
        cy.wait(2000)
        cy.get("input[name='name']").type("abc")
        cy.get(".css-0").within(()=>{
            cy.wait(1000)
            cy.get("input").type('dinesh Karki{enter}',{force:true})
            cy.get("input").type('Satish Mudbhari{enter}',{force:true})
            cy.get("input").type('sujan Adhikari{enter}',{force:true})
        })
        cy.get(".modal-footer").within(()=>{
            cy.get("button").eq(1).click()
        })
       cy.get(".sc-ieecCq").should("be.visible")
   
     })
     it.skip("delete user list",()=>{
        cy.get("@master").click()
        cy.intercept('GET','http://192.168.50.172:9000/api/user-group/').as('userslist')
        cy.get("@group_management", {force:true}).click()
        cy.wait('@userslist').then((cat)=>{
        
            const dataread = cat.response.body.data
            dataread.forEach((element,i) => {
              if(element.name=="abc"){
               cy.get(`:nth-child(${i+1}) > :nth-child(5) > .list > :nth-child(2) > .btn > .ic-delete`).click()
               cy.get('.btn-danger').click()
              }
            })

        })
        cy.get(".toast--message").should("have.text","SuccessfulUser Group Has Been Deleted Successfully")
      })

      it.skip("edit user list with valid data",()=>{
        cy.get("@master").click()
        cy.intercept('GET','http://192.168.50.172:9000/api/user-group/').as('userslist')
        cy.get("@group_management", {force:true}).click()
        cy.wait('@userslist').then((cat)=>{
        
            const dataread = cat.response.body.data
            dataread.forEach((element,i) => {
              if(element.name=="cde"){
               cy.get(`:nth-child(${i+1}) > :nth-child(5) > .list > :nth-child(1)`).click()
               cy.get(".sc-ezbkAF").clear().type("fgh")
               
               cy.get(".css-0").within(()=>{
                cy.wait(1000)
                cy.get("input").type('dinesh Karki{enter}',{force:true})
                cy.get("input").type('Satish Mudbhari{enter}',{force:true})
                cy.get("input").type('sujan Adhikari{enter}',{force:true})
                
            })
            cy.get(".d-flex > .btn").click()
            cy.get(".heading-05").should("have.text", "Group Management")
            cy.get(".sc-fKVqWL").should("be.visible")
            cy.get("@create").should("be.visible")
            
              }
            })
          })
        
      })

      it.skip("edit user list with null data",()=>{
        cy.get("@master").click()
        cy.intercept('GET','http://192.168.50.172:9000/api/user-group/').as('userslist')
        cy.get("@group_management", {force:true}).click()
        cy.wait('@userslist').then((cat)=>{
        
            const dataread = cat.response.body.data
            dataread.forEach((element,i) => {
              if(element.name=="abc"){
               cy.get(`:nth-child(${i+1}) > :nth-child(5) > .list > :nth-child(1)`).click()
               cy.get(".sc-ezbkAF").clear()
               
               cy.get(".css-9dvwv4-indicatorContainer > svg > path").click()
            cy.get(".d-flex > .btn").click()
            cy.get(".mb-3 > .error").should("have.text", "  Group Name is Required")
            cy.get(":nth-child(2) > .error").should("have.text", "  Member Name is Required")
          
              }
            })
          })
      })
      it.only("edit user list with duplicate data",()=>{
        cy.get("@master").click()
        cy.intercept('GET','http://192.168.50.172:9000/api/user-group/').as('userslist')
        cy.get("@group_management", {force:true}).click()
        cy.wait('@userslist').then((cat)=>{
        
            const dataread = cat.response.body.data
            dataread.forEach((element,i) => {
              if(element.name=="fgh"){
               cy.get(`:nth-child(${i+1}) > :nth-child(5) > .list > :nth-child(1)`).click()
               cy.get(".sc-ezbkAF").clear().type("ghf")

             cy.get(".d-flex > .btn").click()
             cy.get(".toast--message").should("have.text", "SuccessfulThere is already a group with this name.")
            
              }
              
            })
          })
        
      })

   
})