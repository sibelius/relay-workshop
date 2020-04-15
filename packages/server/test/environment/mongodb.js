/* eslint-disable */
const MMS = require('mongodb-memory-server-global');
const NodeEnvironment = require('jest-environment-node');

const { default: MongodbMemoryServer, MongoMemoryReplSet } = MMS;

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    // TODO - enable replset if needed
    // this.mongod = new MongoMemoryReplSet({
    this.mongod = new MongodbMemoryServer({
      instance: {
        // settings here
        // dbName is null, so it's random
        // dbName: MONGO_DB_NAME,
      },
      binary: {
        version: '4.0.5',
      },
      // debug: true,
      autoStart: false,
    });
  }

  async setup() {
    await super.setup();
    // console.error('\n# MongoDB Environment Setup #\n');
    await this.mongod.start();
    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName();
    this.global.__COUNTERS__ = {
      user: 0,
      company: 0,
      companyFeedbackTopic: 0,
      industry: 0,
      jobPosting: 0,
      group: 0,
      groupFeedback: 0,
      userFeedback: 0,
      userFeedbackRequest: 0,
      complaintSubject: 0,
      file: 0,
      complaintAction: 0,
      roleGroup: 0,
      candidate: 0,
      candidateDependent: 0,
      jobRole: 0,
      costRevenueCenter: 0,
      businessDivision: 0,
      salaryRange: 0,
      jobExam: 0,
      jobExamQuestion: 0,
      goalGroup: 0,
      goal: 0,
      questionOption: 0,
      hiringReferral: 0,
      groupInterview: 0,
      groupInterviewRoom: 0,
      positionApplicationStatus: 0,
      complaintExternalAuthorData: 0,
      customEmoji: 0,
      performanceReview: 0,
      poll: 0,
      pollQuestion: 0,
      pollOption: 0,
      comment: 0,
      address: 0,
      application: 0,
      headCount: 0,
      rowNumber: 0,
      reviewTopic: 0,
    };
  }

  async teardown() {
    await super.teardown();
    // console.error('\n# MongoDB Environment Teardown #\n');
    await this.mongod.stop();
    this.mongod = null;
    this.global = {};
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
