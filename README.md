
An app to manage events as well as let users create events to stay up to date in the DMV.

# Features 
- Permissions using [spatie/laravel-permission](https://github.com/spatie/laravel-permission)
- Ziggy
- React
- Inertia
- Typescript



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
