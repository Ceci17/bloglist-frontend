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

    // it('Blogs are sorted by number of likes', function () {
    //   cy.contains('view').click()
    //   cy.get('.btn-like').click()
    //   cy.get('.btn-like').click()
    //   cy.get('.btn-like').click()
    //   cy.get('.total-likes').should('contain', '3 likes')
    //   cy.createBlog({
    //     title: 'Another blog about Cypress',
    //     author: 'Stefan',
    //     url: 'cypress.io'
    //   })
    //   cy.createBlog({
    //     title: 'Cypress again...',
    //     author: 'Stefan',
    //     url: 'cypress.io'
    //   })

    //   cy.get('.btn-show').then((btn) => {
    //     cy.wrap(btn).click({ multiple: true })
    //   })

    //   cy.get('.btn-like').eq(1).click()
    //   cy.get('.btn-like').eq(1).click()
    //   cy.get('.total-likes').eq(1).should('contain', '2 likes')

    //   cy.get('.btn-like:last').click()
    //   cy.get('article:last .total-likes').should('contain', '1 like')

    //   cy.get('.blog')
    //     .then(function (blog) {
    //       return cy.wrap(blog).children()
    //     })
    //     .then(function (data) {
    //       return cy.wrap(data).get('.total-likes')
    //     })
    //     .then(function (data) {
    //       return data
    //         .text()
    //         .split('likes')
    //         .map(function (word) {
    //           return word.trim()
    //         })
    //         .map(function (num) {
    //           return parseInt(num)
    //         })
    //     })
    //     .then(function (data) {
    //       expect(data).to.deep.eq([3, 2, 1])
    //     })
    // })

    it('Blogs are sorted by number of likes', function () {
      cy.contains('view').click()
      cy.get('.btn-like').click()
      cy.get('.btn-like').click()
      cy.get('.btn-like').click()
      cy.get('.total-likes').should('contain', '3 likes')
      cy.createBlog({
        title: 'Another blog about Cypress',
        author: 'Stefan',
        url: 'cypress.io'
      })
      cy.createBlog({
        title: 'Cypress again...',
        author: 'Stefan',
        url: 'cypress.io'
      })

      cy.get('.btn-show').then(function (btn) {
        return cy.wrap(btn).click({ multiple: true })
      })

      cy.get('.btn-like').eq(1).click()
      cy.get('.btn-like').eq(1).click()
      cy.get('.total-likes').eq(1).should('contain', '2 likes')

      cy.get('.btn-like:last').click()
      cy.get('article:last .total-likes').should('contain', '1 like')

      const blogs = cy
        .request('GET', 'http://localhost:3003/api/blogs')
        .then(function (blog) {
          return blog.body
        })

      function copyOfArray() {
        let arr = []
        return new Cypress.Promise((resolve) => {
          blogs
            .each((el) => {
              arr.push(el)
            })
            .then(() => resolve(arr))
        })
      }

      copyOfArray().then((arr) => {
        let actual = arr.slice()
        cy.wrap(actual).should(
          'deep.eq',
          arr.sort((a, b) => b.likes - a.likes)
        )
      })
    })
  })
})
