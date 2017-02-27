/**
 * Data Services to retrieve the list of all metrics that have data for a particular project
 */
const schema = require('../schemas');

/**
 * Returns all metrics (all their count) that have data for a project
 * @param store - mongoose store to get the data from
 * @param project - project to get the metrics counts for
 */
module.exports = (store, project) => new Promise(
    (resolve, reject) =>{
        //const Project = store.model('Project', schema.projectSchema);
        const Project = store.model('Project', schema.projectSchema);
        const MetricReport = store.model('MetricReport', schema.metricReportSchema);
        const projectId = store.Types.ObjectId(project);
        MetricReport.aggregate(
            {$match: {project: projectId}},
            {$unwind: "$metrics"},
            {$group: {_id: "$metrics.metric", count: {$sum:1}}},
            function(err, data){
                if (err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
            }
        );
    }
    );
