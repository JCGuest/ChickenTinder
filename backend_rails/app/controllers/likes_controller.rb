class LikesController < ApplicationController

  def create
    user = User.find_by(name: params[:username])
    like = user.likes.find_by(yelp_id: params[:yelp_id])
      if !like 
        like = Like.new(name: params[:name], yelp_id: params[:yelp_id])
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
