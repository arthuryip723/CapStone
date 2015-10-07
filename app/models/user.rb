class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true

  attr_reader :password

  has_many :reviews
  has_many :shelves
  has_many :books, -> { distinct }, through: :shelves
  has_many :shelvings, through: :shelves
  has_many :tos, class_name: "Friendship", foreign_key: :to_id, primary_key: :id
  has_many :froms, class_name: "Friendship", foreign_key: :from_id, primary_key: :id
  has_many :followers, through: :tos, source: :from_user
  has_many :followees, through: :froms, source: :to_user
  has_many :from_requests, class_name: "FriendRequest", foreign_key: :from_id, primary_key: :id
  has_many :to_requests, class_name: "FriendRequest", foreign_key: :to_id, primary_key: :id

  # has_many(
  #   :links,
  #   class_name: "Link",
  #   foreign_key: :user_id,
  #   primary_key: :id
  # )

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.create!(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            fname: auth_hash[:info][:name].split.first,
            lname: auth_hash[:info][:name].split.last,
            email: auth_hash[:info][:nickname], #bad solution
            password: SecureRandom::urlsafe_base64)

      user.shelves.create(category: :to_read, name: "To Read")
      user.shelves.create(category: :reading, name: "Reading")
      user.shelves.create(category: :read, name: "Read")
    end

    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    # self.session_token = SecureRandom.urlsafe_base64(16)
    self.session_token = User.generate_token
    self.save!
    self.session_token
  end

  def friends
    self.followees.joins(:tos).where("tos_users.from_id = ?", self.id)
    # u.followees.joins(:tos).where("tos_users.from_id = ?", u.id)
  end

  private
  def ensure_session_token
    # self.session_token ||= SecureRandom.urlsafe_base64(16)
    self.session_token ||= User.generate_token
  end

  def self.generate_token
    begin
      token = SecureRandom.urlsafe_base64(16)
    end until !User.find_by_session_token(token)
    return token
  end
end
