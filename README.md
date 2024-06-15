![Platforms](https://img.shields.io/badge/platform-windows%20%7C%20osx%20%7C%20linux-lightgray.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Stackoverflow](https://img.shields.io/badge/ask-stackoverflow-yellow.svg)](https://stackoverflow.com/questions/ask?tags=%5bautodesk-platform-services)

# Description

The sample helps viewing, building custom reports and exporting usage query & export usage query API data in the form of tables, charts from Premium Reporting APIs.

Uses 2-legged oAuth2 with ADSK-PAT header which is a personal access token to authenticate with aps.

![thumbnail](thumbnail.PNG)

### Pre-requisites

- Autodesk Platform Services Account: Learn how to create a aps Account, activate subscription and create an app at [this tutorial](https://forge-tutorials.autodesk.io/)

- Visual Studio Code

- Go Live Extension in Visual Studio Code.

- Tested to be working on: Chrome, IE Edge

- When logging into the web dashboard, you should login with the ID of an administrator with premium benefits (EBA).If you login with a user that does not have such roles, the API will return no data.

- Get your personal access token token under security tab in your profile https://profile.autodesk.com/security

### Setup

- Create a [Autodesk Platform Services app](https://forge-tutorials.autodesk.io/) with access to the Premium Reporting API.

- Take note of the Client ID and Client Secret which you need to put in logIn() function in methods.js file

- Clone or download the folder. Open the folder inside in Visual Studio Code.

- Put http://localhost:5500 in the settings.json file under vscode folder

- Install live server extension inside vscode and then click on Go live at the bottom right corner of vscode.

![1663191439013](golive.png)

### Meta Data Mapping

- Save your metadata in the JSON format in the root folder.
- Here is the sample of metadata.
- Make changes as per your mapping in js/jsonToTable.js file.

## Support

For support, please contact aps.help@autodesk.com.

## License

This sample is licensed under the terms of the [MIT License](https://tldrlegal.com/license/mit-license).
Please refer to [LICENSE](LICENSE) for more details.

## Written by

Deepali Srivastava, Autodesk Platform Services Partner Development Group
