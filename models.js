const schemas = require('./schemas');
const mongoose = require('mongoose');

exports.portfolioModel = mongoose.model('Portfolio', schemas.portfolioSchema);
exports.projectModel = mongoose.model('Project', schemas.projectSchema);
exports.metricGroupModel = mongoose.model('metricGroup', schemas.metricGroupSchema);
exports.metricTypeModel = mongoose.model('metricType', schemas.metricTypeSchema);
exports.metricModel = mongoose.model('metric', schemas.metricSchema);
exports.metricReportModel = mongoose.model('metricReport', schemas.metricReportSchema);

