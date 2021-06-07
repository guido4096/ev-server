import MongoDBStorage from '../../src/storage/mongodb/MongoDBStorage';
import StripeIntegrationTestData from './BillingStripeTestData';
import chai from 'chai';
import chaiSubset from 'chai-subset';
import config from '../config';
import global from '../../src/types/GlobalType';
import responseHelper from '../helpers/responseHelper';

chai.use(chaiSubset);
chai.use(responseHelper);

const testData: StripeIntegrationTestData = new StripeIntegrationTestData();

describe('Billing Test Data Cleanup', function() {
  // Do not run the tests when the settings are not properly set
  this.pending = !testData.isBillingProperlyConfigured();
  this.timeout(1000000);

  describe('With component Billing (tenant utbilling)', () => {
    before(async () => {
      global.database = new MongoDBStorage(config.get('storage'));
      await global.database.start();
      await testData.initialize();
      await testData.forceBillingSettings(true);
    });

    after(async () => {
      // Cleanup of the utbilling tenant is useless
      // Anyway, there is no way to cleanup the utbilling stripe account!
    });

    it('should cleanup all billing test data', async () => {
      await testData.checkTestDataCleanup();
    });
  });

});