# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## books
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
book_id     | integer   | not null, foreign key (references books)
reviewer_id | integer   | not null, foreign key (references users)
content     | text      | not null


## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
rater_id    | integer   | not null, foreign key (references users)
stars       | integer   | not null

## shelves
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
user_id     | integer   | not null, foreign key (references users)

## shelfings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
shelf_id    | integer   |
book_id     | integer   |

## friendships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
friend_id   | integer   | not null, foreign key (references users)
