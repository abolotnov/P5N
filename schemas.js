/**
 * Created by sasha on 2/5/17.
 * Can we use this as admin? https://github.com/jedireza/aqua (probably not, I just need something much more simple)
 * Whole Positive Number: /^\d+$/g
 * Percentage: /^[1-9][0-9]?$|^100$/g
 * Single Letter: /^\w{1}$/gi
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


exports.portfolioSchema = new Schema({
    name: {type: String, required: true, unique: true},
    isActive: {type: Boolean, default: true}
});

exports.projectSchema = new Schema({
    name: {type: String, required: true, unique: true},
    isActive: {type: Boolean, required: true, default: true},
    portfolio: {type: mongoose.Schema.Types.ObjectId, ref: 'portfolioSchema', required: true},
    isCodeBaseFullyOwned: {type: Boolean, required: true, default: false}
});

exports.metricGroupSchema = new Schema({
    name: {type: String, required: true, unique: true},
    isActive: {type: Boolean, default: true},
    enforceAllGroupValues: {type: Boolean, default: true}
});

exports.metricTypeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    validator: {type: String, required: true}
});

exports.metricSchema = new Schema({
    metricGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'metricGroupSchema', required: true},
    metricType: {type: mongoose.Schema.Types.ObjectId, ref: 'metricTypeSchema', required: true},
    key: {unique: true, type: String, required: true},
    name: {type: String, required: true},
    description: String

});

exports.metricReportSchema = new Schema({
    metrics: [{
        metric: {type: mongoose.Schema.Types.ObjectId, ref: 'metricSchema', required: true},
        value: {type: String, required: true}
    }],
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'projectSchema', required: true},
    reportDate: Date
});

