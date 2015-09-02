class SettingsController < ApplicationController
    def create
      puts params
     user = User.find_by(:access_token => session[:access_token])
     if (Setting.find_by(:user_id => user.id))
       settings = Setting.find_by(:user_id => user.id)
        if(params[:customLocation])
          geocodedLocation = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:customLocation]}&key=#{ENV['JIZO_MAP_S_KEY']}").parsed_response['results'][0]['geometry']['location']
          puts geocodedLocation
         settings.update ({transportation: params[:transportation], location: params[:location], custom_location: "#{geocodedLocation['lat'].to_s}, #{geocodedLocation['lng'].to_s}"})
          else 
          settings.update ({transportation: params[:transportation], location: params[:location], custom_location: ""})
         end
     else 
        if(params[:customLocation])
            geocodedLocation = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:customLocation]}&key=#{ENV['JIZO_MAP_S_KEY']}").parsed_response['results'][0]['geometry']['location']
         Settings.create ({transportation: params[:transportation], location: params[:location], custom_location: "#{geocodedLocation['lat'].to_s}, #{geocodedLocation['lng'].to_s}", :user_id => user.id})
          else 
          Setting.create ({transportation: params[:transportation], :location => params[:location], :custom_location => "", :user_id => user.id})
         end
     end
      render nothing: true
    end
end