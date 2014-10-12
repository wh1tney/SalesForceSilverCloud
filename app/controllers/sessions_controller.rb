class SessionsController < ApplicationController
  def new
  end

  def create
    auth_hash = request.env['omnitauth.auth']

    render :text => auth_hash.inspect
  end

  def failure
  end
end
