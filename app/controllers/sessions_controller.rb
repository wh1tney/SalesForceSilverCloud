class SessionsController < ApplicationController
  def new
  end

  def create
    auth_hash = request.env['omniauth.auth']
    session[:user_id] = auth_hash.user_id
    redirect_to root_url
    #render :text=> auth_hash.inspect
  end

  def failure
    render :text=> "Login failed!"
  end

  def destroy
    session[:user_id] = nil
    render :text => "You've logged out!"
  end
end
