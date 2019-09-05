class Board < ActiveRecord::Base
    has_many :tasks
    has_many :members, through: :tasks

end

class Task < ActiveRecord::Base
    belongs_to :board
    belongs_to :member

end

class Member < ActiveRecord::Base
    has_many :tasks
    has_many :boards, through: :tasks

end

