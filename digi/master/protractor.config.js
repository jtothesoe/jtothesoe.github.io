exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName' : 'chrome',
        chromeOptions: {
            args: ['--window-size=375,812']
        }
    }, 
    specs: [
        'test/test.spec.js'
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    }, 
    allScriptsTimeout: 20000,
    onPrepare: function(){
        browser.driver.get('http://localhost:8100/');
    }
}