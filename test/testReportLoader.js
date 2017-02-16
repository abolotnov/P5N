const schema = require('./../schemas');
const dropAllReports = false;

const getRandomProject = (project) => new Promise((resolve, reject) => {
    project.count().exec((err, count) => {
        const rand = Math.floor(Math.random() * count);
        project.findOne().skip(rand).exec((err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
});


const getRandomMetricGroupAndMetrics = (metricGroup, metric) => new Promise((resolve, reject) => {
    let mGroup, metrics;
    metricGroup.count().exec((err, count) => {
        let rand = Math.floor(Math.random() * count);
        metricGroup.findOne().skip(rand).exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                mGroup = data;
                metric.find({metricGroup: data._id}).exec((err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        metrics = data;
                        resolve({metricGroup: mGroup, metrics: metrics});
                    }
                });
            }
        });
    });
});


module.exports = (store, numberOfRecords) => {
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
        .catch(e => {
            throw new Error(e);
        });
};
