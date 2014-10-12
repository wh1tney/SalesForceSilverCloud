class SessionsController < ApplicationController
  def index
    @clients = Client__c.all()
    #@clients = Client.all()
    #@clients = SFDC_Models::Client.all()
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
end
