## API Reference

### Endpoint User

| method   | url                               | Description                         |
| :------- | :-------------------------------- | :---------------------------------- |
| `GET`    | `/api/v1/user`                    | get all users                       |
| `GET`    | `/api/v1/user/accountNumber`      | get user info by accountNumber      |
| `GET`    | `/api/v1/user/registrationNumber` | get user info by registrationNumber |
| `GET`    | `/api/v1/user/:id`                | get user info by id                 |
| `POST`   | `/api/v1/user`                    | create data user                    |
| `PUT`    | `/api/v1/user/:id`                | edit data user                      |
| `DELETE` | `/api/v1/user/:id`                | delete data user                    |

### Endpoint Account Login

| method   | url                                     | Description                                          |
| :------- | :-------------------------------------- | :--------------------------------------------------- |
| `GET`    | `/api/v1/account`                       | get all accounts                                     |
| `GET`    | `/api/v1/account/:last-login-date-time` | get account login info by lastLoginDateTime > 3 days |
| `POST`   | `/api/v1/account/login`                 | login account                                        |
| `GET`    | `/api/v1/account/:id`                   | get account login by id                              |
| `POST`   | `/api/v1/account`                       | create data account                                  |
| `PUT`    | `/api/v1/account/:id`                   | edit data account                                    |
| `DELETE` | `/api/v1/account/:id`                   | delete data account                                  |
