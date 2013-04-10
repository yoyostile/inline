class LineController < ActionController::Base

	def index
		if request.xhr?
      @lines = Line.all
			render json: { 
				:lines => @lines
			}
		else
			render 	:template => 'layouts/_angular', 
							:layout => 'layouts/application'
		end
	end

  def create
    if request.xhr?
      @line = Line.create(params[:line])
      render json: @line.id
    else
      redirect_to root_path
    end
  end

end
