# Metabolic Mapping

Web application to visualise metabolic pathways in a 3-dimensional space. Uses [3D Force Graph](https://github.com/vasturiano/3d-force-graph) and [ThreeJS](https://github.com/mrdoob/three.js/) libraries.  

![example screenshot](./example_screenshot.png)  

## Install

### Repository import

`git clone https://gitlab.gencovery.com/dev/internships/2020/m1-ubordeaux/testclass.git`

### Node server installation & set up

Node installation :  
`sudo apt install npm`  
Server installation, with the `http-server` package :  
`sudo npm install -g http-server`  

## Usage

To run the web application, browser use is required. Only Chrome and Firefox browser are guaranteed. Local node server is required (See below).

```
cd testclass/
http-server
```

Open the first link to open the browser (`http://127.0.0.1:8080`).

## Authors  

Students of the Bioinformatics Master of the University of Bordeaux.  

> Marine ALVES DE BARROS - [marine.alves-de-barros@etu.u-bordeaux.fr](mailto:marine.alves-de-barros@etu.u-bordeaux.fr)  
> Mathieu BOLTEAU - [mathieu.bolteau1@gmail.com](mailto:mathieu.bolteau1@gmail.com)  
> Mélanie CARRIAT - [melanie.carriat@etu.u-bordeaux.fr](mailto:melanie.carriat@etu.u-bordeaux.fr)  
> Solweig HENNECHART - [solweig.hennechart@etu.u-bordeaux.fr](mailto:solweig.hennechart@etu.u-bordeaux.fr)  

## Programs versions used  

* Google Chrome 79.0.3945.117  
* Firefox 72.0.1  
* Node 6.13.4  

## Architecture  

Classes implemented are organised like this diagram :  

![UML](./UML.png)  

## API  

### Table of Contents  

<dl>
<dt><a href="#stringToJSON">stringToJSON()</a></dt>
<dd><p>Transforms each JSON file data as string from the list to JSON object</p>
</dd>
<dt><a href="#parseJSON">parseJSON()</a> ⇒ <code>Map</code></dt>
<dd><p>Parses the JSON object and instanciates the objects</p>
</dd>
<dt><a href="#putElementToPreviousElementCompound">putElementToPreviousElementCompound(pathway, idCompoundToSearch, idElementToAdd)</a></dt>
<dd><p>Adds the id of the reaction to the PreviousElement list of metabolites</p>
</dd>
<dt><a href="#putElementToNextElementCompound">putElementToNextElementCompound(patwhay, idCompoundToSearch, idElementToAdd)</a></dt>
<dd><p>Add the id of the reaction to the NextElement list of the metabolite</p>
</dd>
<dt><a href="#initCofact">initCofact(list, pathway)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates Cofactors list for duplication</p>
</dd>
<dt><a href="#getObjectById">getObjectById(list, id)</a> ⇒ <code>Element</code> | <code>boolean</code></dt>
<dd><p>Gets an element corresponding to an id if it&#39;s found
else, returns false</p>
</dd>
<dt><a href="#duplicreate3dForceObject">duplicreate3dForceObject(map, cofact_list)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates the 3D-Force object required to display the graph with the 3D-Force Graph library with duplication possibility</p>
</dd>
<dt><a href="#create3dForceObject">create3dForceObject(map)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates the 3D-Force object required to display the graph with 3D-Force Graph library</p>
</dd>
<dt><a href="#jsonFileToGraph">jsonFileToGraph()</a></dt>
<dd><p>Reads and parses JSON file, to display the graph</p>
</dd>
<dt><a href="#arrowlink">arrowlink(graph3D)</a></dt>
<dd><p>Sets links to arrows with chosen characteristics</p>
</dd>
<dt><a href="#particuleLink">particuleLink(graph3D)</a></dt>
<dd><p>Adds directional particles to links</p>
</dd>
<dt><a href="#formNode">formNode(value, sizeproportion)</a> ⇒ <code>Object</code></dt>
<dd><p>Allows the choice of the node geometry between TorusKnot, Sphere and Box.</p>
</dd>
<dt><a href="#displayGraph">displayGraph(object, map)</a></dt>
<dd><p>Displays graphs and loads elements information on click</p>
</dd>
<dt><a href="#graphChange">graphChange()</a></dt>
<dd><p>Applies custom changes</p>
</dd>
<dt><a href="#loadFileAsText">loadFileAsText()</a></dt>
<dd><p>Loads files selected by the user and calls conversion function</p>
</dd>
<dt><a href="#get3dForceObject">get3dForceObject()</a> ⇒ <code>Object</code></dt>
<dd><p>Gets and returns currently displayed graph</p>
</dd>
<dt><a href="#saveGraphToJSON">saveGraphToJSON()</a></dt>
<dd><p>Calls functions to save displayed graph as a new JSON file</p>
</dd>
<dt><a href="#createNewFile">createNewFile(SAVE_GRAPH_EXTENSION)</a></dt>
<dd><p>Creates JSON file(s) with modifications from the graph</p>
</dd>
<dt><a href="#modifyJSONObject">modifyJSONObject(object3dForce)</a></dt>
<dd><p>Modifies the coordinates in the JSON object with the coordinates of the graph</p>
</dd>
<dt><a href="#getCofactList">getCofactList()</a> ⇒ <code>Object</code></dt>
<dd><p>Return cofactors&#39; id in list with user selection on interface</p>
</dd>
</dl>

---


<a name="stringToJSON"></a>

## stringToJSON()
Transforms each JSON file data as string from the list to JSON object

**Kind**: global function  
<a name="parseJSON"></a>

## parseJSON() ⇒ <code>Map</code>
Parses the JSON object and instanciates the objects

**Kind**: global function  
**Returns**: <code>Map</code> - Map object which contains the elements  
<a name="putElementToPreviousElementCompound"></a>

## putElementToPreviousElementCompound(pathway, idCompoundToSearch, idElementToAdd)
Adds the id of the reaction to the PreviousElement list of metabolites

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pathway | <code>Pathway</code> | Pathway object which is created during the parsing |
| idCompoundToSearch | <code>String</code> | Id of the compound where the reaction id will be added in PreviousElements list |
| idElementToAdd | <code>String</code> | Id of the reaction to add |

<a name="putElementToNextElementCompound"></a>

## putElementToNextElementCompound(patwhay, idCompoundToSearch, idElementToAdd)
Add the id of the reaction to the NextElement list of the metabolite

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| patwhay | <code>Pathway</code> | Pathway object which is created during the parsing |
| idCompoundToSearch | <code>String</code> | Id of the compound where the reaction id will be added in next elements |
| idElementToAdd | <code>String</code> | Id of the reaction to add |

<a name="initCofact"></a>

## initCofact(list, pathway) ⇒ <code>Object</code>
Creates Cofactors list for duplication

**Kind**: global function  
**Returns**: <code>Object</code> - list of Cofactor objects  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Object</code> | array containing id of certain elements |
| pathway | <code>Pathway</code> | object which is created during the parsing |

<a name="getObjectById"></a>

## getObjectById(list, id) ⇒ <code>Element</code> \| <code>boolean</code>
Gets an element corresponding to an id if it's found
else, returns false

**Kind**: global function  
**Returns**: <code>Element</code> \| <code>boolean</code> - Element object or "false"(boolean)  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Object</code> | List containing objects |
| id | <code>String</code> | String corresponding to an element's id |

<a name="duplicreate3dForceObject"></a>

## duplicreate3dForceObject(map, cofact_list) ⇒ <code>Object</code>
Creates the 3D-Force object required to display the graph with the 3D-Force Graph library with duplication possibility

**Kind**: global function  
**Returns**: <code>Object</code> - 3D-Force object which contains nodes and links data  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | Map object which contains the pathways |
| cofact_list | <code>Object</code> | list of cofactor ids to duplicate |

<a name="create3dForceObject"></a>

## create3dForceObject(map) ⇒ <code>Object</code>
Creates the 3D-Force object required to display the graph with 3D-Force Graph library

**Kind**: global function  
**Returns**: <code>Object</code> - 3D-Force object which contains nodes and links data  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | Map object which contains the pathways |

<a name="jsonFileToGraph"></a>

## jsonFileToGraph()
Reads and parses JSON file, to display the graph

**Kind**: global function  
<a name="arrowlink"></a>

## arrowlink(graph3D)
Sets links to arrows with chosen characteristics

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| graph3D | <code>Object</code> | 3D-Force graph object |

<a name="particuleLink"></a>

## particuleLink(graph3D)
Adds directional particles to links

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| graph3D | <code>Object</code> | 3D-Force graph object |

<a name="formNode"></a>

## formNode(value, sizeproportion) ⇒ <code>Object</code>
Allows the choice of the node geometry between TorusKnot, Sphere and Box.

**Kind**: global function  
**Returns**: <code>Object</code> - 3D Force Graph Icon  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | corresponds to the choice of geometry we want to apply to our nodes |
| sizeproportion | <code>Number</code> | is useful in order to display bigger reaction nodes compared to the metabolites ones |

<a name="displayGraph"></a>

## displayGraph(object, map)
Displays graphs and loads elements information on click

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | 3D-Force object which contains nodes and links data |
| map | <code>Map</code> | Map object which contains the pathways data |

<a name="graphChange"></a>

## graphChange()
Applies custom changes

**Kind**: global function  
<a name="loadFileAsText"></a>

## loadFileAsText()
Loads files selected by the user and calls conversion function

**Kind**: global function  
<a name="get3dForceObject"></a>

## get3dForceObject() ⇒ <code>Object</code>
Gets and returns currently displayed graph

**Kind**: global function  
**Returns**: <code>Object</code> - ForceObject 3D Force Graph object which contains data  
<a name="saveGraphToJSON"></a>

## saveGraphToJSON()
Calls functions to save displayed graph as a new JSON file

**Kind**: global function  
<a name="createNewFile"></a>

## createNewFile(SAVE\_GRAPH\_EXTENSION)
Creates JSON file(s) with modifications from the graph

**Kind**: global function 

| Param | Type | Description |
| --- | --- | --- |
| SAVE\_GRAPH\_EXTENSION | <code>String</code> | new file name extension | 

<a name="modifyJSONObject"></a>

## modifyJSONObject(object3dForce)
Modifies the coordinates in the JSON object with the coordinates of the graph

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object3dForce | <code>Object</code> | 3D Force Graph object |

<a name="getCofactList"></a>

## getCofactList() ⇒ <code>Object</code>
Return cofactors' id in list with user selection on interface

**Kind**: global function  
**Returns**: <code>Object</code> - Cofactors List  
