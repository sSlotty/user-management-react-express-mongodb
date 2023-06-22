
# User-management-react-express-mongodb 🚀

- Express Restful API
- Mongodb
- React > antd design
 


## API

#### Get all user

```http
  GET /api/users
```

#### Get user by ID

```http
  GET /api/users/:id
```

#### Add user

```http
  POST /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `string` | **Required** Base64encodeing image |
| `firstName`      | `string` | **Required** first name |
| `lastName`      | `string` | **Required** lastname name |
| `gender`      | `string` | **Required** Enum => `[male,female]` |
| `dateBirthday`      | `string` | **Required** Data type date|

#### Edit user

```http
  PUT /api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `string` | **Required** Base64encodeing image |
| `firstName`      | `string` | **Required** first name |
| `lastName`      | `string` | **Required** lastname name |
| `gender`      | `string` | **Required** Enum => `[male,female]` |
| `dateBirthday`      | `string` | **Required** Data type date|

#### Delete User
```http
  DELETE /api/users/:id
```
