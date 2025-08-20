# Sequelize Introduction

## [What is Sequelize?](https://sequelize.org/)
Sequelize adalah Framework ORM (Object Relational Mapping) untuk Node.js yang mendukung berbagai database seperti MySQL, PostgreSQL, SQLite, dan MSSQL. Simplenya dengan Sequelize, kita dapat berinteraksi dengan database menggunakan JavaScript tanpa harus menulis query SQL secara manual.

## [Setup Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)
Untuk bisa menggunakan sequelize, kita perlu melakukan beberapa setup :

1. Install sequelize dan sequelize-cli (Command Line Interface) menggunakan npm:
   ```bash
   npm install sequelize sequelize-cli
   ```

2. Lakukan inisialisasi sequelize di project kita:
   ```bash
   npx sequelize-cli init
   ```
   Command ini akan membuat beberapa folder seperti `models`, `migrations`, dan `seeders`.  

3. Setelah itu kita perlu lakukan konfigurasi database pada file `config/config.json`. Contoh konfigurasi development untuk Postgres:
   ```json
    {
        "development": {
            "username": "postgres",
            "password": "postgres",
            "database": "database_development",
            "host": "127.0.0.1",
            "dialect": "postgres"
        }
    }
   ```

4. Lalu kita perlu membuat database sesuai dengan konfigurasi di atas menggunakan sequelize-cli:
   ```bash
   npx sequelize-cli db:create
   ```

5. Setelah membuat database, kita bisa membuat model & table sekaligus menggunakan migration. Misalnya kita ingin membuat model `Game`:
   ```bash
   npx sequelize-cli model:generate --name Game --attributes name:string,gameImg:string,releaseDate:date,developer:string
   ```
   Command ini akan membuat file migration untuk table `Games` dan model `Game` di folder `models`.

6. Sesuaikan file migration yang telah terbuat, setelah itu kita perlu menjalankan migration untuk membuat table di database:
   ```bash
   npx sequelize-cli db:migrate
   ```
   Command ini akan menjalankan semua migration yang belum dijalankan.

7. Jika kita ingin undo semua migration yang sudah dijalankan, kita bisa menggunakan command berikut:
    ```bash
    npx sequelize-cli db:migrate:undo
    ```
8. Setelah membuat table & model, kita bisa melakukan seeding data awal menggunakan command berikut:
   ```bash
   npx sequelize-cli seed:generate --name game-seeder
   ```
   Command ini akan membuat file seeder di folder `seeders`. Kita bisa mengedit file tersebut untuk menambahkan data awal ke table `Games`.

9. Sesuaikan file seeder yang sudah dibuat dengan kebutuhan data kita, setelah itu kita bisa menjalankan seeder menggunakan command berikut:
   ```bash
   npx sequelize-cli db:seed:all
   ```
   Command ini akan menjalankan semua seeder yang ada di folder `seeders`.

## [Model Querying Basic](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
Setelah setup selesai, kita bisa mulai menggunakan Sequelize untuk berinteraksi dengan database. Berikut adalah contoh penggunaan Sequelize untuk melakukan query `SELECT` pada model `Game`:

```js
const { Game } = require('./models'); // Import model Game

class Controller {
    static async read(req, res) {
        try {
            const games = await Game.findAll(); // Mengambil semua data dari table Games
            res.send(games); 
        } catch (error) {
            res.send({ error: error.message }); 
        }
    }
}

module.exports = Controller; // Export controller untuk digunakan di route
```

## Demo
Pada demo kali ini , kita akan menggunakan `sequelize`, `express`, dan `pg` untuk membuat aplikasi sederhana yang menampilkan daftar game dari database.

### Setup 
Database : game_app

```bash
npm init -y
npm i express pg sequelize  sequelize-cli
npm i -D nodemon
touch .gitignore
npx sequelize init
npx sequelize db:create
```

## Migration
Table Games

| Column name     | type      |
|-----------------|:---------:|
| name            | string    |
| gameImg         | string    |
| releaseDate     | date      |
| developer       | string    |

```
npx sequelize model:create --name Game --attributes name:string,gameImg:string,releaseDate:date,developer:string

npx sequelize db:migrate
```

## Custom Migration

Buat custom migration / migrasi tambahan untuk menambahkan table `genre`.
```
npx sequelize migration:create --name add-column-genre
```

## Seeder

Buatlah sebuah seed file untuk memasukan data ke tabel `Games`. Data berasal dari `games.json`.
```
npx sequelize seed:create --name seeder-games

npx sequelize db:seed:all
```