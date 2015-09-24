module Api
  class Api::StaticPagesController < ApplicationController
    def search
      # fail
      @search_results = PgSearch
        .multisearch(params[:query])
        .includes(:searchable)
        .page(params[:page])

      render :search
    end
  end
end
