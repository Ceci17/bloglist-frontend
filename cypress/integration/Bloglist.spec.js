describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    let user1 = {
      name: 'Douglas Adams',
      username: 'douglas_adams',
      password: 'Gnab_Gib_42'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
      name: 'George Carlin',
      username: 'george_carlin',
      password: 'Sarcasm'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('h1').should('contain', 'Blogs')

    cy.get('button[type=submit]').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('douglas_adams')
      cy.get('#password').type('Gnab_Gib_42')
      cy.contains('login').click()

      cy.get('.success')
        .should('contain', 'Welcome, Douglas Adams')
        .and('have.css', 'color', 'rgb(34, 187, 51)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Douglas Adams logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('john')
      cy.get('#password').type('doe')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(187, 33, 36)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'douglas_adams', password: 'Gnab_Gib_42' })

      cy.createBlog({
        title: 'Created blog post with Cypress',
        author: 'Stefan',
        url: 'cypress.io'
      })
    })

    // it('Can create blog post', function () {
    // cy.contains('create new blog').click()
    // cy.get('#title').type('Created blog post with Cypress')
    // cy.get('#author').type('Stefan')
    // cy.get('#url').type('cypress.io')
    // cy.contains('add').click()

    // cy.contains('Created blog post with Cypress')
    // })

    it('A blog exists', function () {
      cy.contains('Created blog post with Cypress')
    })

    it('User can like a blog post', function () {
      cy.contains('view').click()
      cy.get('.btn-like').click()
      cy.get('.total-likes').should('contain', '1 like')
      cy.get('.btn-like').click()
      cy.get('.total-likes').should('contain', '2 like')
    })

    it('User can delete a blog post', function () {
      cy.get('html').should(
        'contain',
        'Created blog post with Cypress'
      )
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('.success')
        .should(
          'contain',
          'Successfully deleted Created blog post with Cypress by Stefan'
        )
        .and('have.css', 'color', 'rgb(34, 187, 51)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should(
        'not.contain',
        'Created blog post with Cypress'
      )
    })

    it('User cannot delete a blog post when not authorized', function () {
      cy.get('html').should(
        'contain',
        'Created blog post with Cypress'
      )

      cy.contains('logout').click()
      cy.login({ username: 'george_carlin', password: 'Sarcasm' })
      cy.contains('view').click()
      cy.get('html').should('not.contain', 'delete')
      cy.get('html').should(
        'contain',
        'Created blog post with Cypress'
      )
    })

    it('Blogs are sorted by number of likes', function () {
      cy.contains('view').click()
      cy.get('.btn-like').click()
      cy.get('.total-likes').should('contain', '1 like')
      cy.createBlog({
        title: 'Another blog about Cypress',
        author: 'Stefan',
        url: 'cypress.io'
      })
      cy.get('.btn-show').then((btn) => {
        cy.wrap(btn).click({ multiple: true })
      })

      function compare(arr1, arr2) {
        if (!arr1 || !arr2) return

        let result

        arr1.forEach((e1, i) =>
          arr2.forEach((e2) => {
            if (e1.length > 1 && e2.length) {
              result = compare(e1, e2)
            } else if (e1 !== e2) {
              result = false
            } else {
              result = true
            }
          })
        )

        return result
      }

      cy.get('.blog')
        .then(function (blog) {
          return cy.wrap(blog).children()
        })
        .then(function (data) {
          return cy.wrap(data).get('.total-likes')
        })
        .then(function (data) {
          return data
            .text()
            .split('like')
            .map(function (word) {
              return word.trim()
            })
            .filter(function (word) {
              return word !== 's'
            })
            .map(function (num) {
              return parseInt(num)
            })
        })
        .then(function (data) {
          const sorted = data.sort(function (a, b) {
            return b - a
          })
          return compare(data, sorted)
        })
        .then(function (data) {
          expect(data).to.be.true
        })
    })
  })
})
