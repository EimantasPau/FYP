<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
        <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
    </head>
    <body>

    <div id="app">
        <v-app>
            <v-toolbar app>
                <router-link to="/">Home</router-link>
                <router-link to="/users">Users</router-link>
            </v-toolbar>
            <v-content>
                <v-container fill-height justify-center>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </v-app>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
