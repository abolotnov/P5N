var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose,
    schemas = require('./schemas'),
    path = require('path');
var apprest = express();
var testDataLoader = require('./test/dataLoader');

apprest.use(express.static(path.join(__dirname, 'public/p5client/build')));
apprest.use(morgan('dev'));
apprest.use(bodyParser.urlencoded({'extended':'true'}));
apprest.use(bodyParser.json());
apprest.use(bodyParser.json({type:'application/vnd.api+json'}));
apprest.use(methodOverride());

mongoose.connect("mongodb://localhost/metricsKeeper");

const defaultRestMethods = ['get', 'post', 'put', 'delete'];
const readOnlyRestMethods = ['get'];

var PortfolioResource = apprest.resource = restful.model('Portfolio', schemas.portfolioSchema)
    .methods(defaultRestMethods);
PortfolioResource.route('loadTestData', function (req, res, next) {
   testDataLoader(mongoose);
   res.send("Completed test data load");
});

PortfolioResource.register(apprest, '/rest/portfolios');
var ProjectResource = apprest.resource = restful.model('Project', schemas.projectSchema)
    .methods(defaultRestMethods);
ProjectResource.register(apprest, '/rest/project');

var MetricGroupResource = apprest.resource = restful.model('MetricGroup', schemas.metricGroupSchema)
    .methods(defaultRestMethods);
MetricGroupResource.register(apprest, '/rest/metricgroup');

var MetricTypeResource = apprest.resource = restful.model('MetricType', schemas.metricTypeSchema)
    .methods(defaultRestMethods);
MetricTypeResource.register(apprest, '/rest/metrictype');

var MetricResource = apprest.resource = restful.model('Metric', schemas.metricSchema)
    .methods(defaultRestMethods);
MetricResource.register(apprest, '/rest/metric');

var MetricReportResource = apprest.resource = restful.model('MetricReport', schemas.metricReportSchema)
    .methods(defaultRestMethods);
MetricReportResource.register(apprest, '/rest/metricreport');

apprest.listen(3000);