class BeersController < ApplicationController

  def data
    render({json: Beer.all, methods: :average_score})
  end

  def show 
    @beer = Beer.find(params[:id])
    render json: @beer, methods: :average_score
  end

end