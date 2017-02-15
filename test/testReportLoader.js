var schema = require('./../schemas');
var dropAllReports = false;
var Store, Project, MetricGroup, Metric, MetricReport;

function getRandomProject() {
    return new Promise(function (resolve, reject) {
        Project.count().exec(function (err, count) {
            var rand = Math.floor(Math.random() * count);
            Project.findOne().skip(rand).exec(function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    });
}

function getRandomMetricGroupAndMetrics() {
    return new Promise(function (resolve, reject) {
        let mGroup, metrics;
        MetricGroup.count().exec(function (err, count) {
            let rand = Math.floor(Math.random() * count);
            MetricGroup.findOne().skip(rand).exec(function (err, data) {
                if (err) reject(err);
                else {
                    mGroup = data;
                    Metric.find({metricGroup: data._id}).exec(function (err, data) {
                        if (err) reject(err);
                        else {
                            metrics = data;
                            resolve({metricGroup: mGroup, metrics: metrics});
                        }
                    });
                }
            });
        });
    });
}


function set(store) {
    Store = store;
    Project = Store.model('Project', schema.projectSchema);
    MetricGroup = Store.model('MetricGroup', schema.metricGroupSchema);
    Metric = Store.model('Metric', schema.metricSchema);
    MetricReport = Store.model('MetricReport', schema.metricReportSchema);
    return new Promise(function (resolve, reject) {
        resolve();
    });
}

module.exports = function (store, numberOfRecords) {
    set(store).then(function(){if (dropAllReports) MetricReport.collection.drop();}).then(


        getRandomProject().then(
            function (result) {
                console.log(result);
            },
            function (err) {
                console.log(err);
            }).then(
        getRandomMetricGroupAndMetrics().then(
            function (result) {
                console.log(result.metricGroup);
                console.log(result.metrics);
            },
            function (err) {
                console.log(err);
            }
        )
    ));
}