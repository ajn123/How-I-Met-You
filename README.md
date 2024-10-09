
An app to manage events as well as let users create events to stay up to date in the DMV.

# Features 
- Permissions using [spatie/laravel-permission](https://github.com/spatie/laravel-permission)
- Ziggy
- React
- Inertia
- Typescript


# Get Me Running
- Make sure you have Docker Desktop application and after you clone the app, cd into it and run the following command:
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs 
```

## Seeding
- Run the `sail artisan db:seed` command

## Run Tests
- tests will empty the database upon each run, reseed it to bring back testing data
```shell
sail test
```

## Run Pint
run `./vendor/bin/pint` for code formatting 

## Creating a MR
- All Merge Requests will be run against pint (currently version 1.17) and run all the tests, please check if they pass when you push a commit.
