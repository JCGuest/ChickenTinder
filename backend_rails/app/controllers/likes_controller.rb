class LikesController < ApplicationController
  def create
    like = Like.new(like_params)
    # like = Like.create(name: params[:name], yelp_id: params[:yelp_id])
    # like.game_id = params[:game_id]
    like.save 
    render json: LikeSerializer.new(like)
  end

  private

  def like_params
    params.permit(:name, :yelp_id, :game_id)
  end
end
