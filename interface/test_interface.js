import { parseJSON, create3dForceObject } from "./../src/utils.js";

function displayGraph(object){
  const Graph = ForceGraph3D()
    (document.getElementById('p3d-graph'))
    .nodeAutoColorBy('group')
      .linkOpacity(0.5)
      .graphData(object);
}


fetch('./ecoli_e_coli_core.json')
  .then (function(response){
      return response.json();
  })
  .then(function(data){
      console.log(data);
      var pathwayCreatedByParseJSON = parseJSON(data);

      console.log("\n\n\n PATHWAY CREATED \n\n");
      console.log(pathwayCreatedByParseJSON);
      var object = create3dForceObject(pathwayCreatedByParseJSON);
      console.log(object);
      displayGraph(object);
      
  })
  .catch(function(err){
      console.log("ERROR");
  }
  );
