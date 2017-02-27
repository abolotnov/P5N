const schema = require('./../schemas');
let randomdate = require('randomdate');
const randomdateMin = new Date(2010,0,1);
const randomdateMax = new Date(Date.now());

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

function generateRandomMetricValue(type){
    return Math.floor(Math.random() * (1000 - 0));
}

module.exports = (store, numberOfRecords) => {
    const project = store.model('Project', schema.projectSchema);
    const metricGroup = store.model('MetricGroup', schema.metricGroupSchema);
    const metric = store.model('Metric', schema.metricSchema);
    const metricReport = store.model('MetricReport', schema.metricReportSchema);

    Promise
        .all([getRandomProject(project), getRandomMetricGroupAndMetrics(metricGroup, metric)])
        .then(([projectData, metricData]) => {
            //Here you can do you loop
            //You have projectData available here, metricData available as well
            for (let x=0; x < Math.floor(numberOfRecords/metricData.metrics.length); x++){
                const report = new metricReport();
                metricData.metrics.forEach(m => {
                    report.metrics.push({
                        metric: m,
                        value: generateRandomMetricValue(m.metricType)
                    });
                });
            report.project = projectData;
            report.reportDate = randomdate(randomdateMin, randomdateMax);
            report.save(err => {
                   if (err) console.log(err);
                });
            }
        })
        .catch(e => {
            throw new Error(e);
        });
};
