/**
 * Created by sasha on 2/10/17.
 */
var schema = require('./../schemas');
var dropAllCollectionsBeforePopulation = false;

var activePortoflios = ["Bank", "Internal"];
var inactivePortfolios = ["Science"];

var activeProjects = ["Project One", "METR", "SIM$E^"];
var inactiveProjects = ["Portia", "Bamboo"];

var activeMetricGroups = ["Code Quality", "Process Quality"];
var inactiveMetricGroups = ["Process Compliance"];

var metricTypes = [
    {name: 'Whole Positive Number', validator: '/^[0-9]+$/'},
    {name: 'Percentage', validator: '/^[1-9][0-9]?$|^100$/'},
    {name: 'Single Letter', validator: '/^\w{1}$/'}
];

var metrics = [
    {metricgroup: 'Code Quality', metrictype: 'Single Letter', key: 'SQALE', name: 'SQALE Rating', description: ''},
    {metricgroup: 'Code Quality', metrictype: 'Whole Positive Number', key: 'LOC', name: 'Lines of Code', description: ''},
    {metricgroup: 'Code Quality', metrictype: 'Whole Positive Number', key: 'CI', name: 'Complexity Index', description: ''},
    {metricgroup: 'Code Quality', metrictype: 'Whole Positive Number', key: 'TI', name: 'Tangle Index', description: ''},
    {metricgroup: 'Code Quality', metrictype: 'Whole Positive Number', key: 'TD-D', name: 'Technical Debt, days', description: ''},
    {metricgroup: 'Code Quality', metrictype: 'Percentage', key: 'TD-%', name: 'Technical Debt, %', description: ''},
    {metricgroup: 'Process Quality', metrictype: 'Whole Positive Number', key: 'BF', name: 'Build Failures', description: ''},
    {metricgroup: 'Process Quality', metrictype: 'Whole Positive Number', key: 'SLARD', name: 'SLA Reporting Delay', description: ''}
];

module.exports = function(store) {
    var Portfolio, Project, MetricGroup, MetricType, Metric;
    Portfolio = store.model('Portfolio', schema.portfolioSchema);
    Project = store.model('Project', schema.projectSchema);
    MetricGroup = store.model('MetricGroup', schema.metricGroupSchema);
    MetricType = store.model('MetricType', schema.metricTypeSchema);
    Metric = store.model('Metric', schema.metricSchema);


    if (dropAllCollectionsBeforePopulation){
        Portfolio.collection.drop();
        Project.collection.drop();
        MetricGroup.collection.drop();
        MetricType.collection.drop();
        Metric.collection.drop();

    }


    activePortoflios.forEach(function (portfolio) {
        var p = new Portfolio();
        p.name = portfolio;
        p.isActive = true;
        p.save(function (err) {
            if (err) console.log(err);
        });
    });


    activeProjects.forEach(function (project) {
        const p = new Project();
        p.name = project;
        Portfolio.findOne({name:activePortoflios[0]},'_id',function (err, data) {
            p.portfolio = data._id;
            p.isActive = true;
            p.save(function (err) {
            if (err) console.log(err);
        });
        });
    });

    activeMetricGroups.forEach(function(item){
        const m = new MetricGroup();
        m.name = item;
        m.save(function(err){
            if (err) console.log(err);
        });
    });

    metricTypes.forEach(function(item){
        const t = new MetricType();
        t.name = item.name;
        t.validator = item.validator;
        t.save(function(err){
            if (err) console.log(err);
        });
    });

    metrics.forEach(function(item){
        const m = new Metric();
        MetricGroup.findOne({name: item.metricgroup}, '_id', function (err, data) {
            m.metricGroup = data._id;
            MetricType.findOne({name: item.metrictype}, '_id', function (err, data) {
                m.metricType = data._id;
                m.key = item.key;
                m.name = item.name;
                m.save(function(err){
                    if (err) console.log(err);
                });
            });
        });
    });

}

