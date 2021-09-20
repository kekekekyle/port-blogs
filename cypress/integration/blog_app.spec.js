describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8000/api/testing/reset')
    const testUser = {
      username: 'test_user',
      password: 'password',
      name: 'Test User'
    }
    cy.request('POST', 'http://localhost:8000/api/users/', testUser)
    const anotherUser = {
      username: 'another_user',
      password: 'password',
      name: 'Another User'
    }
    cy.request('POST', 'http://localhost:8000/api/users/', anotherUser)
    cy.visit('http://localhost:8000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test_user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Successfully logged in as test_user')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test_user', password: 'password' })
    })

    it('A blog can be created', function () {
      // check that the blog list is empty
      cy.get('#blog-list').should('not.contain', 'a blog created by cypress')

      cy.contains('create new blog').click()
      cy.get('#create-blog-title').type('a blog created by cypress')
      cy.get('#create-blog-author').type('Test User')
      cy.get('#create-blog-url').type('www.cypress.com')
      cy.get('#create-blog-button').click()

      // now check that it is created
      cy.get('#blog-list').should('contain', 'a blog created by cypress')
    })
  })
})