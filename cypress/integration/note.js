// cy.visit("")--  The Url you want to visit.
//cy.get("")-- Here we grab the element you want and can be done by id(#), class(.), tag name, name etc).type("")-- here we send the text in the selected field.
//cy.contains("")--  Find the element that conatin the text written.
//.click()// click the element
/**cy.get("").then(($element)=>{ doSomething($element)
}-- you grab the element and then play with that element. The code after then is never worked if element is not found.
**///cy.get(' ', { timeout: 10000 })-- time set for finding element(10sec). Default is 4 sec .  Also can be done globally from configuration (defaultCommandTimeout=10000)
//.blur()-- make element blur.
//.focus()-- make element focus
//.clear()--clear the input value of textarea
//.uncheck()--uncheck the checkbox/ radiobutton
//.check()--check the checkbox
//.dblclick()-- doubleclick
//.rightclick()--to rightclick



//(actual vs expected)--assertion
//Assertion(Assertions let you do things like ensuring an element is visible or has a particular attribute, CSS class, or state.)
//cy.get(':checkbox').should('be.disabled')-- checkbox should be disable

//cy.get('form').should('have.class', 'form-horizontal')-- this particular form should have class name form-horizontal

//cy.get('input').should('not.have.value', 'US')-- this input element should not have the text US.
//Using Aliases to Refer to Previous Subjects
/* cy.get('input').as('element').click()

cy.get('@element').click() */

//cy.find()-- find the element in the DOM.
//cy.screenshot()-- take the screenshot
//cy.get('.err').should('be.empty').and('be.hidden')-- and command
/*syntax of and--.
.and(chainers)
.and(chainers, value)
.and(chainers, method, value)
.and(callbackFn)*/




//cy.get('input[type="text"][name="username"][placeholder="Username or Email"]')-- if you cannoy find unique selector.
//cy.reload()

//cy.wait(1000)-- time taken to find the element.
 //cy.get('.my-slow-selector', { timeout: 10000 })--// take time to appera this element.

 // cy.screenshot()-- take ss when test fail.
 // it.only()-- only this particular testcase will execute
 //it.skip()-- testcase other than this will execute
 
