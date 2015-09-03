	#Introduction

## Project name: Jizo

This project is named Jizo in honor of the Japanese deity that is popular for it's cute and fun loving aura and role as the guardian of travelers. The project Jizo is a website that after a user logs into facebook will allow the webapp to pull in information from that user's facebook events and allow for a list of events to appear in front of the user. The user can select from that list of events and will be given directions to said event from their home location or a location the user inputs. In summary the app gives directions to users to get them to facebook events they are tied to. This creates an efficient way to get quick directions to facebook events and even allows for persisting events in case a user wants to get the same event location in the future.

# Setup

For Jizo the web app is setup using a number of frameworks, APIs, and Ruby gems. For starters, the framework we used for styling was done entirely in foundation. The APIs used are Facebook's Graph API and Google's Google's API. Within Google's APIs we used were geocoding, directions, and the Google Maps SDK. The gems used in Jizo are Omniauth-facebook for authorization and login verification as well as HTTParty for the Graph calls also pry for source code browsing.

#How to Use
To use this app the user must first sign into facebook by pressing on the facebook login button located at the top of our page. after the user have a list of events to pick and choose from, the user must then click on an event and will be prompted to choose current location or type in a starting location and pick between different means of transportation. After the user types in the location, on the lower left hand side of the page the user will be given directions to that event based on the starting location picked. The user will also have a map displaying the trip. Then if the user wants someone else to use this service then they should log out and re-log in with a different facebook account.
#Planing

###User Stories

######User should be able to log into facebook on the webpage to recieve a list of his/her current events
 
######User should get directions when he/she clicks on an event from the list of events
 
######User should have a visual map on the page showing the route from starting to end points

######Users should be able to log out

######Users should be able to chose their start location to an event

######Users should be able to chose their mode of transpertation

###Front-end Wireframes

[wireframe](http://i.imgur.com/5Iq66Cw.png)

###Routes
```
  get '/events' => 'events#index'
  get '/events/:id' => 'events#view'
  get '/auth/facebook', as: 'auth_provider'
  get '/auth/facebook/callback' => 'sessions#set_session'
  get '/auth/failure' => 'sessions#session_error'
  get '/logout' => 'sessions#end_session'

  get '/get_directions' => 'directions#get_directions'

  post '/deactivate_app' => 'users#delete'

  post '/save_directions' => 'directions#save_directions'

  
  post '/settings' => 'settings#save'
  get '/settings/load' => 'settings#load'

```
###Database Design(ERD)

[ERD](http://i.imgur.com/LfFpv9t.png)

###Trello
Link to board: https://trello.com/b/8jWxfMiI/jizo
#Contact

#####Aditi Parsad
  aditiprasad0301@gmail.com

##### Augustine Mudrak
  augustinemudrak@gmail.com

##### Spencer Denauski
  oxideous@hotmail.com

##### Avi Zacherman
  avizacherman@gmail.com
