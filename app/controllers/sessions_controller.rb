class SessionsController < ApplicationController
  include Databasedotcom::Rails::Controller

  INDUSTRIES = ['Education', 'Accounting', 'Entertainment & Leisure']

  def index
    @clients    = Client__c.all()
    @industries = INDUSTRIES

    respond_to do |format|
      format.html
      format.json { render json: @clients }
    end
  end

  def new
  end

  def create
    auth_hash = request.env['omniauth.auth']
    session[:user_id] = auth_hash.user_id
    redirect_to clients_path
  end

  def failure
    render :text=> "Login failed!"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  def filter_industry

  end
end
