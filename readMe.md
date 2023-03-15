## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. copy env-example and rename it to .env

## Run Locally

Clone the project

```bash
  git clone https://github.com/ibnuali/ibnuali-betest.git
```

Go to the project directory

```bash
  cd ibnuali-betest
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Run Docker

```bash
  docker-compose up (comming soon)
```

## Url API

```bash
  https://ibnuali-api-betest.vercel.app/
```

## API Reference

### Endpoint User

| method   | url                                                    | Description                         |
| :------- | :----------------------------------------------------- | :---------------------------------- |
| `GET`    | `/api/v1/user`                                         | get all users                       |
| `GET`    | `/api/v1/user/account-number/:accountNumber`           | get user info by accountNumber      |
| `GET`    | `/api/v1/user/registration-number/:registrationNumber` | get user info by registrationNumber |
| `GET`    | `/api/v1/user/:id`                                     | get user info by id                 |
| `POST`   | `/api/v1/user`                                         | create data user                    |
| `PUT`    | `/api/v1/user/:id`                                     | edit data user                      |
| `DELETE` | `/api/v1/user/:id`                                     | delete data user                    |

##### example body param for method `POST /api/v1/user`

```json
{
    "fullName": "string",
    "accountNumber": "string",
    "email": "example@example.com",
    "registrationNumber": "string",
    "userName": "string",
    "password": "string"
}
```

### Endpoint Account Login

| method   | url                                     | Description                                          |
| :------- | :-------------------------------------- | :--------------------------------------------------- |
| `GET`    | `/api/v1/account`                       | get all accounts                                     |
| `GET`    | `/api/v1/account/:last-login-date-time` | get account login info by lastLoginDateTime > 3 days |
| `POST`   | `/api/v1/account/login`                 | login account                                        |
| `GET`    | `/api/v1/account/:id`                   | get account login by id                              |
| `PUT`    | `/api/v1/account/:id`                   | edit data account                                    |
| `DELETE` | `/api/v1/account/:id`                   | delete data account                                  |

##### example body param for method `POST /api/v1/account/login`

```json
{
    "username": "string",
    "password": "string"
}
```
