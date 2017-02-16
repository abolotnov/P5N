var schema = require('./../schemas');
var dropAllReports = false;

function getRandomProject(project) {
    return new Promise(function (resolve, reject) {
        project.count().exec(function (err, count) {
            var rand = Math.floor(Math.random() * count);
            project.findOne().skip(rand).exec(function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    });
}

function getRandomMetricGroupAndMetrics(metricGroup, metric) {
    return new Promise(function (resolve, reject) {
        let mGroup, metrics;
        metricGroup.count().exec(function (err, count) {
            let rand = Math.floor(Math.random() * count);
            metricGroup.findOne().skip(rand).exec(function (err, data) {
                if (err) reject(err);
                else {
                    mGroup = data;
                    metric.find({metricGroup: data._id}).exec(function (err, data) {
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


module.exports = function (store, numberOfRecords) {
    const project = store.model('Project', schema.projectSchema);
    const metricGroup = store.model('MetricGroup', schema.metricGroupSchema);
    const metric = store.model('Metric', schema.metricSchema);
    const metricReport = store.model('MetricReport', schema.metricReportSchema);  
    
    //This also async - I don't really know why did you add it, so can't really refactor it much
    if (dropAllReports) metricReport.collection.drop(); 
    
    Promise
        .all([getRandomProject(project), getRandomMetricGroupAndMetrics(metricGroup, metric)])
        .then(([projectData, metricData]) => {
          //Here you can do you loop 
          //You have projectData available here, metricData available as well
        })
        .catch(e => 
            throw new Error(e);
        })
}
