### Aims Behind this mini project

## 1 ) EFFECTIVE ERROR HANDLIMG
*** 1.1 : Progarmmer Errors ***: 
- Programmer errors for eg logoc or syntax, trying to access property of undefined variables 
- Can be fixed by editing the source code

*** 1.2 : Operational Errors ***: 
- Error which occurs when an operation has potential to fail for eg **email not found, unauthorized access**.
- Can be fixed by determining what should be the action/ response when an operation fails
- They are generally repotred to the client

**Good Practices: Handling 1.2 Errors**
***try-catch***
=> When using asyc function which are liekly to deal promises use a **try-catch** block.
=> When not used try-catch or Express-async-handler your app will crash definitely and stop responding.
=> An error caught in try-catch will **freeze** response from postman.
=> To avoid this send erro message as response with 404 status

***Express-Async-Hanbdler***
=> An alternative is to use Express-Async-Handler which prevents your app from **crashing**
=> It throws / returns the error in **postman** as well as prints it in console while app is still running.
=> An error caught in async handler will **NOT freeze** response from postman rather error will be displayed.

## 2) FORM VALIDATION/ REGEX EXPRESSION
### JOI is used for validation
- We define the schemas fro each entity
- Then we pass the attributes to be validated to apprpriate validator and called **validate** method
### validate method
- Argument one is object consisting of attributes and values to be validated
- Argument two is object which accepts the following:
*** { abortEarly:false }*** : This prevent early abortion when we fail to validate one field
                              this makes sure that all validation erros are returned instead of 
                              pne at which validation failed

## 3) MYSQL CONNECTION WITH NODE.JS