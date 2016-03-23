# corp-polymer-ng  

# Prerequisites 

* Node  
* Grunt

# Setup  

```
npm install -g polybuild
npm install -g app-dev
npm install
bower install
grunt install
```

# Development

```
grunt serve
```


# Grunt Tasks

|Task | Description  |
|---|---|
|`grunt install` | This task will register all the tasks found in `config.json` and install all the required npm modules inside each task. |
| `grunt help` | This will list the available tasks in grunt. |
| `grunt serve` | This will launch a server.

# Adding Polymer Components

Once you update the `import.html` file you need to run the following:

```
app-dev build import.html App/js/src
```


## Angular 

###Template URL

this is using template cache so your root folder starts from the module folder