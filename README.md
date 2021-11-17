<h1 align="center">
  Fennel
</h1>

<p align="center">
RESTful API for reviews for a product catalogue
</p>


# How To Use
To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer.

### From your command line:


#### Clone this repository
```
$ git clone https://github.com/SDC-Fennel/Fennel.git
```

#### Go into the repository
```
$ cd Fennel
```

#### Install dependencies
```
$ npm install
```

#### Run the server
```
$ npm start
```
# Database Schema
![Screen Shot 2021-10-22 at 3 10 28 PM](https://user-images.githubusercontent.com/81180232/138528439-161c5cdc-8c27-44c9-955a-4ee41d253bf6.png)

# REST API

## List Reviews
Returns a list of reviews for a particular product. This list _does not_ include any reported reviews

### Request
`GET /reviews/`<br/>

#### Query Parameters
Parameter | Type | Description
--- | --- | --- |
page | integer | Selects the page of results to return. Default 1
count | integer | Specifies how many results per page to return. Default 5.
sort | text | Changes the sort order of reviews to be based on "newest" or "helpful"
product_id | integer | Specifies the product for which to retrieve reviews.

### Response
`Status: 200 OK`

```
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}
```


## Get Review Metadata
Returns review metadata for a given product.

### Request
`GET /reviews/meta`<br/>

#### Query Parameters
Parameter | Type | Description
--- | --- | --- |
product_id | integer | Specifies the product for which to retrieve data.

### Response
`Status: 200 OK`

```
{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}
```


## Add a Review
Adds a review for the given product.

### Request
`POST /reviews`<br/>

#### Query Parameters
Parameter | Type | Description
--- | --- | --- |
product_id | integer | Specifies the product for post the review to
rating | integer | Integer (1-5) indicating the review rating
summary | text | Summary text of the review
body | text | Continued or full text of the review
recommend | boolean | Value indicating if the reviewer recommends the product
name | text | Username for question asker
email | text | Email address for question asker
photos | [text] | Array of text urls that link to images to be shown
characteristics | object | Object of keys representing characteristic_id and values representing the review value for that characteristic. {"14": 5, "15": 5 ... }

### Response
`Status: 201 CREATED`



## Mark Review as Helpful
Updates a review to show it was found helpful.

### Request
`PUT /reviews/:review_id/helpful`<br/>

#### Query Parameters
Parameter | Type | Description
--- | --- | --- |
review_id | integer | Specifies the review for which to update.

### Response
`Status: 204 NO CONTENT`



## Report Review
Updates a review to show it was reported. This action does not delete the review. Rather it will mark this review to not be returned in GET to /reviews

### Request
`PUT /reviews/:review_id/report`<br/>

#### Query Parameters
Parameter | Type | Description
--- | --- | --- |
review_id | integer | Specifies the review for which to update.

### Response
`Status: 204 NO CONTENT`
