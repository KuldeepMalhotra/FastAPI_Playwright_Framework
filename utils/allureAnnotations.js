/**
 * Allure Annotations Utility
 * Provides common Allure annotations for consistent test reporting
 */

class AllureAnnotations {
  /**
   * Add description annotation
   * @param {string} description - Test description
   */
  static addDescription(description) {
    return {
      type: 'description',
      value: description
    };
  }

  /**
   * Add severity annotation
   * @param {string} severity - Test severity (critical, high, medium, low, trivial)
   */
  static addSeverity(severity) {
    return {
      type: 'severity',
      value: severity
    };
  }

  /**
   * Add epic annotation
   * @param {string} epic - Epic name
   */
  static addEpic(epic) {
    return {
      type: 'epic',
      value: epic
    };
  }

  /**
   * Add feature annotation
   * @param {string} feature - Feature name
   */
  static addFeature(feature) {
    return {
      type: 'feature',
      value: feature
    };
  }

  /**
   * Add story annotation
   * @param {string} story - User story
   */
  static addStory(story) {
    return {
      type: 'story',
      value: story
    };
  }

  /**
   * Add issue annotation
   * @param {string} issue - Issue ID or URL
   */
  static addIssue(issue) {
    return {
      type: 'issue',
      value: issue
    };
  }

  /**
   * Add test case annotation
   * @param {string} testCase - Test case ID
   */
  static addTestCase(testCase) {
    return {
      type: 'testCase',
      value: testCase
    };
  }

  /**
   * Add link annotation
   * @param {string} name - Link name
   * @param {string} url - Link URL
   */
  static addLink(name, url) {
    return {
      type: 'link',
      value: url,
      name: name
    };
  }

  /**
   * Add tag annotation
   * @param {string} tag - Tag name
   */
  static addTag(tag) {
    return {
      type: 'tag',
      value: tag
    };
  }

  /**
   * Add owner annotation
   * @param {string} owner - Test owner
   */
  static addOwner(owner) {
    return {
      type: 'owner',
      value: owner
    };
  }

  /**
   * Add lead annotation
   * @param {string} lead - Test lead
   */
  static addLead(lead) {
    return {
      type: 'lead',
      value: lead
    };
  }

  /**
   * Common annotations for API tests
   */
  static getCommonAPITestAnnotations() {
    return [
      this.addEpic('BookStore API'),
      this.addFeature('API Testing'),
      this.addTag('api'),
      this.addTag('automation')
    ];
  }

  /**
   * Common annotations for health check tests
   */
  static getHealthCheckAnnotations() {
    return [
      ...this.getCommonAPITestAnnotations(),
      this.addFeature('Health Monitoring'),
      this.addSeverity('critical'),
      this.addTag('health'),
      this.addTag('monitoring')
    ];
  }

  /**
   * Common annotations for CRUD operations
   */
  static getCRUDAnnotations() {
    return [
      ...this.getCommonAPITestAnnotations(),
      this.addFeature('CRUD Operations'),
      this.addTag('crud'),
      this.addTag('data-management')
    ];
  }

  /**
   * Common annotations for authentication tests
   */
  static getAuthAnnotations() {
    return [
      ...this.getCommonAPITestAnnotations(),
      this.addFeature('Authentication'),
      this.addSeverity('high'),
      this.addTag('auth'),
      this.addTag('security')
    ];
  }
}

module.exports = AllureAnnotations;
