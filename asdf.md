
# Hackmatch
##  Setup

First, we need to install the json-server package. We will do it globally so we can run it from anywhere in our laptops. Run the following code in your terminal: 

`$ npm install -g json-server`

Go to the terminal and inside the fake-server folder, run the following code:

`$ json-server --watch hackmatch.json --port 8000`

Now we are ready to start doing requests to our new API, so go ahead and launch a GET request from Postman, you should see all the data we just paste on the hackmatch.json file.

GET http://localhost:8000/candidates

##  Iteration 1

Display all the candidates in cards with the picture + name + surname + numberOfLikes + numberOfNexts in the homepage. When we click in the contact, we can access the information of the candidate.

## Iteration 2
Create a form and the proper method to add new candidates to our list.

# Iteration 3
Create a button to display a card with a random candidate. 
This card will include two buttons: 'Like' and 'Next'. When we click in 'Like', we will update the 'numberOfLikes' + 1 and we will display a new contact. If we click 'Next' we will update the 'numberOfNexts' + 1 and we will display a new contact.

# Extra resources
[JSON fake server](http://learn.ironhack.com/#/learning_unit/4397)