# User API Spec

## Registration

Endpoint: POST /api/users

Request body :
```json
 {
   "username" : "xfxalfn",
   "email": "xfxalfn@gmail.com",
   "password" : "123"
 }
```
Response body :
```json
 {
   "status": "success",
   "message": "User has been registered"
 }
```

## Login

Headers: Authorization

Request body :
```json
{
   "username": "xfxalfn",
   "password": "123"
}
```
Response body :
```json
{
   "status": "success",
   "message": "Login successfully",
   "data": {
      "id": 1,
      "username": "xfxalfn",
      "email": "xfxalfn@gmail.com",
      "bio": "Hola" || null,
      "image": "image.png" || null,
      "image_url": "image12323" || null,
      "website": "www.google.com" || null,
      "social_media1": "linkedin" || null,
      "social_media2": "instagram" || null,
      "social_media3": "facebook" || null,
      "gender": "male" || null,
      "country": "Indonesia" || null,
      "token": "123321123"
   }
}
```

## Get All Users

Headers: Authorization

Response body : 
```json
{
   "status": "success",
   "data": [
      {
         "id": 1,
         "username": "xfxalfn",
         "email": "xfxalfn@gmail.com",
         "bio": "Hola" || null,
         "image": "image.png" || null,
         "image_url": "image12323" || null,
         "website": "www.google.com" || null,
         "social_media1": "linkedin" || null,
         "social_media2": "instagram" || null,
         "social_media3": "facebook" || null,
         "gender": "male" || null,
         "country": "Indonesia" || null,
      },
      {
         "id": 2,
         "username": "john doe",
         "email": "john_doe@gmail.com",
         "image": "image.png",
         "image_url": "image123123",
         "bio": "Hola" || null,
         "image": "image.png" || null,
         "image_url": "image12323" || null,
         "website": "www.google.com" || null,
         "social_media1": "linkedin" || null,
         "social_media2": "instagram" || null,
         "social_media3": "facebook" || null,
         "gender": "male" || null,
         "country": "Indonesia" || null,
      },
   ]
}
```

## Update User

Header: Authorization

Request body :
```json
{
   "username": "xfxalfnz",
   "email": "xfx@gmail.com",
   "bio": "Hola" || null,
   "image": "image.png" || null,
   "image_url": "image12323" || null,
   "website": "www.google.com" || null,
   "social_media1": "linkedin" || null,
   "social_media2": "instagram" || null,
   "social_media3": "facebook" || null,
   "gender": "male" || null,
   "country": "Indonesia" || null,
}
```
Response body :
```json
{
   "status": "success",
   "message": "User has been updated successfully",
   "data": {
      "id": 1,
      "username": "xfxalfn",
      "email": "xfxalfn@gmail.com",
      "bio": "Hola" || null,
      "image": "image.png" || null,
      "image_url": "image12323" || null,
      "website": "www.google.com" || null,
      "social_media1": "linkedin" || null,
      "social_media2": "instagram" || null,
      "social_media3": "facebook" || null,
      "gender": "male" || null,
      "country": "Indonesia" || null,
      "token": "123321123"
   }
}
```