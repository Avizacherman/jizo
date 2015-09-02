class SettingsController < ApplicationController
    def create
     user = User.find_by(:access_token => session[:access_token])

     if (Setting.find_by(:user_id => user.id))
       settings = Setting.find_by(:user_id => user.id)
        if(params[:customLocation])
         settings.update ({transportation: params[:transportation], location: params[:location], custom_location: params[:custom_location]})
          else 
          settings.update ({transportation: params[:transportation], location: params[:location], custom_location: ""})
         end
     else 
        if(params[:customLocation])
         Setting.create ({transportation: params[:transportation], :location => params[:location], :custom_location => params[:custom_location], :user_id => user.id})
          else 
          Setting.create ({transportation: params[:transportation], :location => params[:location], :custom_location => "", :user_id => user.id})
         end
     end
      render nothing: true
    end
end