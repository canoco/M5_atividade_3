# User API
This is an extremely simplified API intended for exercising essential  concepts. 

## Create user
##### Request: POST
##### Route: /users

##### *_NO authentication required_
### Request body:
```json
{
   "name": "userName",         // string, not null
   "email": "user@mail.com",   // string, not null, valid email
   "password": "userPassword"  // string, minimum length: 8
}
```

### Expected return:
**STATUS: 201 (Created)**

```json
{
   "id": 1,                  // sequential, auto-incremental, integer  
   "name": "userName",
   "email": "user@mail.com"

}
```

### Possible errors:

#### - Email already registered:
**STATUS: 409 (Conflict)**

```json
{
	"message": "User already registered"
}
```

#### - Invalid body:
**STATUS 400 (Bad Request)**

```json
{
	"message": [
		{
			"validation": "email",       // validation test that fails
			"code": "invalid_string",    // failure description
			"message": "Invalid email",  // failure message
			"path": [
				"email"                  // field that fails
			]
		}
	]
}
```