class SessionsController < ApplicationController
  def new
  end

  def create
    auth_hash = request.env['omniauth.auth']

    #render :text => auth_hash.inspect
    redirect_to clients_path
  end

  def failure
  end
end
