class SfdcClientsController < ApplicationController
  include Databasedotcom::Rails::Controller

  def index
    @clients = Client__c.all()
    #@clients = Client.all()
    #@clients = SFDC_Models::Client.all()
    respond_to do |format|
      format.html
      format.json { render json: @clients }
    end
  end

  def show
    @client = Client__c.query("id__c = '#{params[:id]}'").first

    @name      = @client.Name
    @address   = @client.address__c
    @bio       = @client.bio__c
    @inquiries = @client.inquiries__c.to_i
    @price     = "$#{@client.price__c.to_i}"
    @rating    = @client.rating__c.to_i
    @email     = @client.email__c
    @phone     = @client.phone__c
    @industry  = @client.industry__c
    @primary_contact = @client.primary_contact__c
  end

# Routes to be utilized later
#   # GET /users/new
#   def new
#     @user = User.new
#   end

#   # GET /users/1/edit
#   def edit
#   end

#   # POST /users
#   # POST /users.json
#   def create
#     @user = User.new(user_params)

#     respond_to do |format|
#       if @user.save
#         format.html { redirect_to @user, notice: 'User was successfully created.' }
#         format.json { render :show, status: :created, location: @user }
#       else
#         format.html { render :new }
#         format.json { render json: @user.errors, status: :unprocessable_entity }
#       end
#     end
#   end

#   # PATCH/PUT /users/1
#   # PATCH/PUT /users/1.json
#   def update
#     respond_to do |format|
#       if @user.update(user_params)
#         format.html { redirect_to @user, notice: 'User was successfully updated.' }
#         format.json { render :show, status: :ok, location: @user }
#       else
#         format.html { render :edit }
#         format.json { render json: @user.errors, status: :unprocessable_entity }
#       end
#     end
#   end

#   # DELETE /users/1
#   # DELETE /users/1.json
#   def destroy
#     @user.destroy
#     respond_to do |format|
#       format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
#       format.json { head :no_content }
#     end
#   end

#   private
#     # Use callbacks to share common setup or constraints between actions.
#     def set_user
#       @user = User.find(params[:id])
#     end

#     # Never trust parameters from the scary internet, only allow the white list through.
#     def user_params
#       params[:user]
#     end
end
