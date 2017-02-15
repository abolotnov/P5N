P5N is intended for storing, keeping and displaying of various metrics (primarily ones that relate to software development and SLA/KPI)

The concept is:

* Mongoose-based data schemas (can be schematically represented as Portfolio -> Project -> MetricReport[MetricType, Value])
* Only REST CRUD operations at backend, no page/views rendering - all this is going to be done with the clients
* Static material-ui based client web site to enable display and management of the data
* Not in progress (feel free to contribute):
** Authorization and Authentication at REST level
** User Management (user models and simple admin UI, again ideally REST-based)

routes and views will eventually get removed as well as the app.js (app-rest is already functional for REST API)