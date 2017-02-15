var schema = require('./../schemas');
var dropAllReports = false;
var Store, Project, MetricGroup, Metric;


function getRandomProject(callBack) {
    Project.count().exec(function (err, count) {
        var rand = Math.floor(Math.random() * count);
        Project.findOne().skip(rand).exec(function (err, data) {
            if (err){
                callBack(err, undefined);
            }
            else{
                callBack(undefined, data);
            }
        });
    });
}

function getRandomMetricGroupAndMetrics(callBack){
    let mGroup, metrics;
    MetricGroup.count().exec(function(err, count){
        let rand = Math.floor(Math.random() * count);
        MetricGroup.findOne().skip(rand).exec(function(err, data){
            if (err){
                callBack(err, undefined);
            }
            else{
                mGroup = data;
                Metric.find({metricGroup: data._id}).exec(function(err, data){
                    if (err){
                        callBack(err, undefined);
                    }
                    else{
                        metrics = data;
                        callBack(undefined, {metricGroup: mGroup, metrics: metrics});
                    }
                });
            }
        });
    });
}



module.exports = function(store, numberOfRecords) {
    /*
    So all this stuff runs asynchronously,
    how do I just get the random project, random metrics
    and then take it from there into a loop for test metrics data creation?
     */

    Store = store;
    Project = Store.model('Project', schema.projectSchema);
    MetricGroup = Store.model('MetricGroup', schema.metricGroupSchema);
    Metric = Store.model('Metric', schema.metricSchema);

    let _project, _metrics;

    getRandomProject(function (err, data) {
        if (err) console.log(err);
        _project = data;
    });

    getRandomMetricGroupAndMetrics(function (err, data) {
        if (err) console.log(err);
        _metrics = data;
    });


    /*
    Both _project and _metrics are undefined at this point
     */
    console.log("Project:\n"+_project+"\nMetrics:\n"+_metrics);

    for(let x =0; x<numberOfRecords; x++){
        console.log("Starting rendering metrics");
    }

}