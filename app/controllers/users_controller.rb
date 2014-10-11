class UsersController < ApplicationController
 
  def welcome
    @user = User.new
  end

  def create
    @user = User.new(params.require(:user).permit(:name, :username, :email, :company_name, :password, :password_confirmation))
    respond_to do |format|
      if @user.save
        # We would create a session here with create_session
        redirect_to container_path, notice: 'User was successfully created.' }
      else
        redirect_to :back
      end
    end
  end

  
  def signup
  	
  end 


  def container
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
