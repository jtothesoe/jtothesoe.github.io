var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(50);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Signing in', function(){

    beforeAll((done)=>{
        let loginbutton = element(by.id('login-button'));
        let username = element(by.id('username'));
        let innerUsername = username.element(by.css('input'));
        innerUsername.click();
        innerUsername.sendKeys('gabe1');

        let password = element(by.id('password'));
        let innerpassword = password.element(by.css('input'));
        innerpassword.click();
        innerpassword.sendKeys('password');
        loginbutton.click();
        done();
    })

    it('should start on sign-in view', function(done){
        try{
            expect(browser.getTitle()).toEqual('Ionic App');
            done();
        }
        catch(e){
            expect(e).toEqual('');
            done.fail("fail");
        }
        
    });

});