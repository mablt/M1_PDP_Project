# Part 1 of the projet : JSON loading, parsing and creation of data required to 3D-Force Graph construction

This repository contains class files and some tests.  

* The first test consists to check if the class are well instanciate. For that, a HTML test file, call JS test file, is present in the `test` folder : `classTest.html`.
* The second test consists to check the JSON loading and parsing step.  
  1. A JSON file (`data.json`) is loaded in gross in the code and a JSON object is created.
  
  2. The JSON object is parsed and some objects (`Pathway`, `Reaction`, `Compound`) are instanciate thanks to the `parseJSON()` function.  

  3. With the `Patwhay`, data required for the 3D-Force Graph library are created thanks to the `create3dForceObject()` function.

  4. The graph is displayed in a HTML page.

## Installation

### Import of the repository

`git clone https://gitlab.gencovery.com/dev/internships/2020/m1-ubordeaux/testclass.git`

### Node installation and set up

`sudo apt-get install npm`

Then, the http-server package is needed :  

`sudo npm install -g http-server`

## Usage

To test this data, the use of a browser is required.  
Moreover, the use of a local server is needed to don't have 'CORS policy errors' du to the browser.  
The node local server is required (See below).  

Execution of the test :
`cd testClass/`

`http-server`

Then, open the fisrt link the browser (`http://127.0.0.1:8080`).  
Go to the `test` folder.  
Choose the test : `classTest.html` or `test3dForce.html`.  
Open the console in development tools (`CTRL+SHIFT+I`) if the `classTest.html` test is called.  

## Programs versions used

* Google Chrome 79.0.3945.117
* Firefox 72.0.1
* Node 6.13.4
