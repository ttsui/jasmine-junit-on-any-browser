var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('http://localhost:8080/test/jasmine-test-runner.html');
driver.wait(function() {
  return driver.isElementPresent(webdriver.By.className('bar'));
}, 1000);

driver.executeScript('return junitResults;').then(function(junitResults) {
    junitResults.map(function(result) {
        var fs = require("fs");
        var nodejs_path = require("path");

        var path = result.filename.substring(0, result.filename.lastIndexOf('/'));
        var filename = result.filename.substring(result.filename.lastIndexOf('/'));

        require("mkdirp").sync(path); // make sure the path exists
        var filepath = nodejs_path.join(path, filename);
        var xmlfile = fs.openSync(filepath, "w");
        fs.writeSync(xmlfile, result.content, 0);
        fs.closeSync(xmlfile);
    });
});

driver.quit();
