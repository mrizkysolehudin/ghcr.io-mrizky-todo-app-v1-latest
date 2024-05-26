## List Pages

- Register: '/register'
- Login: '/'
- Task: '/task'
- Profile: '/profile'
- Not Found


## Configuration

Docker Compose akan melakukan setup untuk 2 service berikut:
1. **App Service**: Runs your Todo application.
2. **Database Service**: Runs PostgreSQL database.


### Environment Variables

- DATABASE_URL="postgresql://postgres:12123434@db:5432/db-todo?schema=public"
- NEXT_PUBLIC_API_URL=http://localhost:3000/api


### Ports

- `3000`: Port Nextjs App.
- `5432`: Port PostgreSQL database.


## How to Run the Application

1. Pastikan Docker dan Docker Compose terinstall.
2. Clone repository ini 
    ```sh
    git clone (link-repository)
    ```
3. Masuk ke direktori di mana file `docker-compose.yml` berada.
4. Jalankan service-nya dengan perintah berikut:
    ```sh
    docker compose up --build -d
    ```
Akses di url berikut: `http://localhost:3000`.


### Stopping the Application

Jalankan perintah ini untuk menghentikan service:
```sh
docker-compose down
```


