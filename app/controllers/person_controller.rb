class PersonController < ActionController::Base

  def create
    if request.xhr?
      @person = Person.create(params[:person])
      @person.update_attribute("start_time", DateTime.now)
      render json: @person
    else
      redirect_to root_path
    end
  end

  def destroy
    if request.xhr?
      @person = Person.find(params[:id])
      @person.destroy
      head :ok
    else
      redirect_to root_path
    end
  end

end