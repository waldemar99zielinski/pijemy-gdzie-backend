# PijemyGdzie - backend
Node.js REST API with: 

[ExpressJS](https://expressjs.com/)

[MongoDB/MongooseJS](https://mongoosejs.com/) 

[PassportJS](http://www.passportjs.org/)


### Launching the application
```
$ npm install
$ npm start
```
### DB Models
##### Discount:
```
    title: {
        type: String,
        required: [true, 'Discount must have a title']
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: [true, 'Discount must have a place :o']

    },
    category: {
        type: String,
        enum: ['Beer', 'Vodka','Wine', 'Drinks', 'Food','Other']
        
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        min: 0
        
    },
    avaliableDays: [String],
    discountReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountReview',

    }
```
##### Discount Review:
```
 rating: {
        type: Number,
        min: 0,
        max: 100,
        default:0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
```
##### User:
```
  name: {type: String}, 

  facebookId: {
    type: String, 
    required: true, 
  },
  email: {
    type: String
  }
```
##### User Review:
```
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },

   discountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',

    },
    review: {
        type: String,
        enum: ['like', 'dislike']
    }
```
### API V1
##### Endpoints:
 - GET /api/v1/discounts/ 
 no auth required, returns all discounts

### API V2
#### Endpoints:
##### Auth Routes:
 - POST /api/v2/auth/facebook
 JSON: {
     "access_token": "facebookToken"
    }
successful facebook atuh return user's JWT, to auth other routes put JWT in header as Authorization
##### Discounts Routes:
 - GET /api/v2/discounts/
 no auth required, returns all discounts
 - GET /api/v2/discounts/:id
 optional auth, returns single discount (if authenticated returns info about userReview)
- POST /api/v2/discounts/:id/review
auth required
JSON: 
{
"review": "like" / "dislike" 
   }
if already review 
    - the same review option delete review
    - other review option change review

    returns review stats for discount
##### User Routes:
- GET /api/v2/user/
auth requried, returns user info
- GET /api/v2/user/reviews
auth requried, returns user's reviews
- GET /api/v2/user/fav
auth requried, returns user's favourite discounts ids
- POST /api/v2/user/fav
auth requried
JSON: 
{
"discountId":"5f68ba1418539d6fbfe5aa52"
   }
validate input, adds discount id to favourites if value is not present
- DELETE /api/v2/user/fav
auth requried
JSON: 
{
"discountId":"5f68ba1418539d6fbfe5aa52"
   }
validate input, deletes discount id from favourites


    
  

