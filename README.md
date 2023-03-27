## Do you want to contribute?

1. Fork this repository
2. Clone the forked repository to your computer
3. After making changes, commit and push your changes
4. Open a pull request to the main repository
5. Use sync fork to get changes from main repository
6. Happy contributing

## Docker Diagram
<img src="https://github.com/lil-id/expense-tracker-api/blob/08b643a02d941f43a2403bc103ca5330179fb53f/Simple%20Docker%20Diagram.png">

## Running Docker Compose

1. [Install Docker Desktop](https://www.docker.com/)
2. Buka Docker Desktop
3. Jalankan perintah berikut di Terminal / CMD
  ```bash
  docker compose up -d
  ```
4. Uji API ([Cek Dokumentasi API](https://documenter.getpostman.com/view/22678050/2s8YYMmKz8#bc21e5b4-fc04-4fce-999f-7138d154cd73))
5. Akses PhpMyAdmin di browser (server: **mysql**, username: **root**, password: **12345**)
  ```bash
  localhost:8080
  ```
6. Akses API di browser
  ```bash
  localhost:8000
  ```
