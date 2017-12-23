class DirectoriesController < ApplicationController
  before_action :set_directory, only: [:show, :edit, :update, :destroy]

    def index
      @directories = Directory.where(user_id: current_user.id).all
    end
    def show
    end

    def new
      @directory = Directory.new
    end

    def edit
    end

    def create
      @directory = Directory.new(directory_params)

      respond_to do |format|
        if @directory.save
          format.html { redirect_to root_path, notice: "Directory1個追加" }
          format.json { render :show, status: :created, location: @directory }
        else
          format.html { redirect_to root_path, notice: "失敗！"}
          format.json { render json: @directory.errors, status: :unprocessable_entity }
        end
      end
    end

    def update
      respond_to do |format|
        if @directory.update(directory_params)
          format.html { redirect_to @directory, notice: 'Directory was successfully updated.' }
          format.json { render :show, status: :ok, location: @directory }
        else
          format.html { render :edit }
          format.json { render json: @directory.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      @directory.destroy
      respond_to do |format|
        format.html { redirect_to directories_url, notice: 'Directory was successfully destroyed.' }
        format.json { head :no_content }
      end
    end


    private
      def set_directory
        @directory = Directory.where(user_id: current_user.id).find(params[:id])
      end

      def directory_params
        params.require(:directory).permit(:name).merge(user_id: current_user.id)
      end
end
