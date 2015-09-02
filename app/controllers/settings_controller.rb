class SettingsController < ApplicationController
    
    #saves settings
    def save
     user = User.find_by(:access_token => session[:access_token])
     if (Setting.find_by(:user_id => user.id))
       settings = Setting.find_by(:user_id => user.id)
        if(params[:customLocation])
          geocodedLocation = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:customLocation].gsub(',', '')}&key=#{ENV['JIZO_MAP_S_KEY']}").parsed_response['results'][0]['geometry']['location']
         settings.update ({transportation: params[:transportation], location: params[:location], custom_location: params[:customLocation], geocoded_location: "#{geocodedLocation['lat'].to_s}, #{geocodedLocation['lng'].to_s}"})
          else 
          settings.update ({transportation: params[:transportation], location: params[:location], geocoded_location: '', custom_location: ""})
         end
     else 
        if(params[:customLocation])
            geocodedLocation = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:customLocation].gsub(',', '')}&key=#{ENV['JIZO_MAP_S_KEY']}").parsed_response['results'][0]['geometry']['location']
         Settings.create ({transportation: params[:transportation], location: params[:location], custom_location: params[:customLocation], geocoded_location: "#{geocodedLocation['lat'].to_s}, #{geocodedLocation['lng'].to_s}", :user_id => user.id})
          else 
          Setting.create ({transportation: params[:transportation], :location => params[:location], :geocoded_location => "", custom_location: "", :user_id => user.id})
         end
     end
      render nothing: true
    end

    def load
      user = User.find_by(:access_token => session[:access_token])
      render json: {settings: user.settings}
    end
end