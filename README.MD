# ServeRest Automation Tests

### Clone Project 

```
git clone https://github.com/Hrqlv/serveRest.git
```
### Install dependencies

```
npm install
```

### Install Playwright 

```
npx playwright install
```

## How run the tests

### Running all tests
```
npm run tests
```
### Running tests on a expecific browser
```
npm run chrome
```
#### Options:
- chrome
- safari
- firefox

### Running API Tests
```
npm run api
```
### Running E2E Tests
```
npm run e2e
```

### Running a test by Tag
```
npm run tests -- --grep @E2E
npm run tests -- --grep @API
```

#### Example Options:
- @API - Run tests with API tag
- @E2E - Run tests with E2E tag

### Running tests in headed mode (it will open the browser)
```
npm run headed
```

## Debugging tests

### Debugging all tests (It will open the playwright debug window)
```
npm run debug
```

### Debugging a test by Tag with a specific browser
```
npm run chrome -- --debug --grep @API
npm run chrome -- --debug --grep @E2E
```

### Show test report
```
npx playwright show-report
```
