# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150924142640) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "authors", ["name"], name: "index_authors_on_name", using: :btree

  create_table "books", force: :cascade do |t|
    t.string   "title",              null: false
    t.integer  "author_id",          null: false
    t.string   "isbn"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "books", ["author_id"], name: "index_books_on_author_id", using: :btree
  add_index "books", ["isbn"], name: "index_books_on_isbn", using: :btree
  add_index "books", ["title"], name: "index_books_on_title", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name",                        null: false
    t.text     "description"
    t.integer  "workspace_id",                null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "on_dashboard", default: true
  end

  add_index "projects", ["workspace_id"], name: "index_projects_on_workspace_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "book_id",    null: false
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "rating"
  end

  add_index "reviews", ["book_id"], name: "index_reviews_on_book_id", using: :btree
  add_index "reviews", ["user_id", "book_id"], name: "index_reviews_on_user_id_and_book_id", unique: true, using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "shelves", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "name",       null: false
    t.string   "category",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shelvings", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "book_id",    null: false
    t.integer  "shelf_id",   null: false
  end

  add_index "shelvings", ["book_id"], name: "index_shelvings_on_book_id", using: :btree
  add_index "shelvings", ["shelf_id"], name: "index_shelvings_on_shelf_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.string   "name",                        null: false
    t.text     "description"
    t.datetime "due_date"
    t.boolean  "completed",   default: false
    t.integer  "priority"
    t.integer  "creator_id",                  null: false
    t.integer  "assignee_id"
    t.integer  "project_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tasks", ["assignee_id"], name: "index_tasks_on_assignee_id", using: :btree
  add_index "tasks", ["creator_id"], name: "index_tasks_on_creator_id", using: :btree
  add_index "tasks", ["project_id"], name: "index_tasks_on_project_id", using: :btree

  create_table "user_workspaces", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "workspace_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "provider"
    t.string   "uid"
    t.string   "fname"
    t.string   "lname"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  create_table "workspaces", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
