# portfolio-front

Developed as the final project of my web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the backend repository [here](??????).

## About
Hi! We are Ross && Roberto! We are two developers at Iron Hack. This project was inspired by the lack of public toilets in Barcelona.  Although there are resources that show the facilities available in map format. There is a lot of important information missing. At what times are they open? Are they only available during the day? Are they safe? Are they clean? These are important factors that need to be taken in to account, that a lot of existing resources available do not do.   

![Project Image](https://cdn-icons-png.flaticon.com/512/194/194432.png "Project Image")

## Deployment
You can check the app fully deployed [here](???????). If you wish to view the API deployment instead, check [here](?????????).

## Work structure
This project was developed together as a team using [Trello](https://trello.com/home) to organize our workflow.

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd portfolio-front
$ npm install
$ npm start
```

## Routes
| Route                | Privacy         | Renders                  |
| -------------------- | :-------------: | ------------------------ |
| /                        | public               | HomePage                 |
| /signup             | public          | SignupPage               |
| /login                | public          | LoginPage                |
| /logout              | public          | LogoutPage                |
| /about               | public          | AboutPage               |
| /toilets              | public           | ToiletListPage    |
| /addtoilet          | private (user)      | NewToilet    |
| /toilets/:toiletId | public          | Toilet |
| /toilets/:toiletId/edit |  private (user)  /Admin         | Toilet |
| /profile/:profileId             | private (user)  | MyToilets|

## Components
- AddToilet
- Coment Table
- add comment
- edit comment
- edit table
- edit profile
- individualToilet (on map)
- Navbar
- Footer

---

Any doubts? Contact me!
https://github.com/gonsolvis
https://github.com/Beartoe7