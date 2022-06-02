describe('asd',()=>{

//              realm: 'auth/realms/InfoDevelopers/protocol/openid-connect/token',

    // cy.request('POST', 'http://192.168.50.119:3000/auth/login',{username:"dinesh.karki@infodevelopers.com.np", password:"kathmandu@123"})
    beforeEach(() => {
      cy.kcLogin('dinesh.karki@infodevelopers.com.np', 'kathmandu@123');

})

it('delete',()=>{
  cy.visit('http://192.168.50.172:3000/master/meeting-hall')
})

})