/**
 * Metric Data Service
 */
const schema = require('../schemas');
const moment = require('moment');

/**
 * Retrieves metric data for a specific project
 * @param store - mongodb connection to use
 * @param metric - metric ID to retrieve
 * @param project - project ID to retrieve metric for
 * @param limit - number of records to retrieve
 */
module.exports = (store, metric, project, limit) => new Promise((resolve, reject) => {
    const Metric = store.model('Metric', schema.metricSchema);
    const MetricReport = store.model('MetricReport', schema.metricReportSchema);
    let metricData;
    Metric.findOne({_id: metric}, "key name description", function(err, data){
        if (err){
            reject(err);
        }
        else if (!data){
            reject("No such metric found");
        }
        else{
            metricData = data;
            //todo: have to figure out a way to keep the limit but PRESERVE the sorting
            MetricReport.find({"project": project}, {metrics: {$elemMatch: {metric: metric}}})
                .select({reportDate: 1})
                .sort("-reportDate")
                .limit(limit)
                .exec(function (err, data) {
                    if (err){
                        reject(err);
                    }
                else {
                    let myData = [];
                    let lines = {};
                    data.forEach(function (item) {
                        if (item.metrics[0]) {
                            lines[moment(item.reportDate).format("YYYY-MM-DD")] = item.metrics[0].value;
                        }
                    });
                    myData.push(lines);
                    let out = {metricKey: metricData.key,
                        metricName: metricData.name,
                        metricData: lines};
                    resolve(out);
            }
        });

        }
    });
});
