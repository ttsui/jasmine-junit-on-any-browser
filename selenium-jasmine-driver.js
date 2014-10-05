var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('http://localhost:8080/test/jasmine-test-runner.html');
driver.wait(function() {
  return driver.getTitle().then(function(title) {
    return title === 'Jasmine Test Runner';
  });
}, 1000);

driver.quit();
