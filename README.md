# Flux-capacitr

[Heroku link][heroku]

[heroku]: http://flux-capacitr.herokuapp.com

## Minimum Viable Product
YouReads is a clone of GoodReads built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Add new books
- [ ] View reviews and ratings on book show page
- [ ] Review and rating books
- [ ] Add book to shelves
- [ ] Add customized shelves
- [ ] Friend other users, view their collection and comments
- [ ] Search for books

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Book Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create blogs using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Viewing Books and Reviews (~2 days)
I will add API routes to fetch and query book data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to view books and reviews. I will try to find third-
party book data to seeds the books and reviews tables in the database.

[Details][phase-two]

### Phase 3: Reviewing Books and Rating Books (~2 days)
I will add API routes to fetch and query review and rating data as JSON, then
add Backbone models and collections that fetch data from those routes. By the
end of this phase, users will be able to add reviews and rating from book show
pages.

[Details][phase-three]

### Phase 4: Adding Books to Shelves, Adding and Editing Shelves (~1-2 days)
I'll add the ability to create shelves, add books to a shelves, with three
default shelves: 'read', 'currently reading' and 'to read.' When a user reviews
a book, it's automatically added to the 'read' shelf. I'll need to add 'search'
routes to the Books controller, with a results view page.

[Details][phase-four]

### Phase 5: Friending Users and User Feed (~2 days)
I'll start by adding the ability to view user's show pages and add them as a
friend. I'll add a feed route that uses the current_user's friendships
associations to serve a list of friend's book reviews, ordered chronologically.
On the Backbone side, I'll make a FeedShow view whose collection fetches from
the new route. Ultimately, this will be the page users see after logging in.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] User reading plan and summary
- [ ] Book categories
- [ ] Book recommendations

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
