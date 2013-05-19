class NamesController < ApplicationController
  # GET /names
  # GET /names.json
  def index
  @names = Name.search(params[:category],params[:lower_count],params[:upper_count],params[:start_letter],params[:start_year],params[:end_year])
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @names }
      format.js
    end
  end

end
