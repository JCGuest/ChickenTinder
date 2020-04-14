class LikesController < ApplicationController
  def create
    like = Like.new
    like.name = params[:name]
    like.yelp_id = params[:yelp_id]
    user = User.find_by(name: params[:username])
    if user 
      like.user_id = user.id 
    end
    like.save 
    render json: LikeSerializer.new(like)
  end

  private

  def like_params
    params.permit(:name, :yelp_id, :username)
  end
end
