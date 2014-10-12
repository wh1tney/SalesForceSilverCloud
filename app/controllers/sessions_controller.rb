class SessionsController < ApplicationController
  include Databasedotcom::Rails::Controller
  def index
    @clients = Client__c.all()
    client = Databasedotcom::Client.new("config/databasedotcom.yml")
    client.authenticate :username=>"thesilvercloud2014@gmail.com", :password=>"Hackathon2014Brf4sVX9U09ooty81FYIECIM", :version=>"23.0"
    @posts = Databasedotcom::Chatter::NewsFeed.find(client)
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
