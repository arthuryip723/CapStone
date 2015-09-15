# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
u1 = User.create(email: 'ripe@gmail.com', password: 'password')
u2 = User.create(email: 'thejamaicandave@gmail.com', password: 'password')
a1 = Author.create(name: 'Mark Twain')
a2 = Author.create(name: 'William Faulkner')
b1 = a1.books.create(title: 'The Adventures of Huckleberry Finn')
b2 = a1.books.create(title: 'The Adventures of Tom Sawyer')
b3 = a2.books.create(title: 'The Sound and the Fury')
b4 = a2.books.create(title: 'As I Lay Dying')
