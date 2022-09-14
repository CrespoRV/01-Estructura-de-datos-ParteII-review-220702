/* global createArrIncrementedLetters getRandomInt graphDeepClone */

function graphGen (maxNeighbors, totalVertices) {
  var graph = {};
  var verticesArr = createArrIncrementedLetters(totalVertices);// ['a', 'b', 'c'... 'h']
  verticesArr.forEach((vertex) => {
    graph[vertex] = [];
  });// graph -> {a: [], b: [], c: [], ... h: []}
  var connectedGraph = connectAllVertices(graph, verticesArr, maxNeighbors); // connectedGraph -> {a: ['b', 'c', 'd', 'e'], b: ['f', 'g', 'h'], c: ['a'], d: ['a'], ... h: ['b']}
  var connectedGraphwithLoop = connectLeaves(connectedGraph); // connectedGraphwithLoop -> {a: ['b', 'c', 'd', 'e'], b: ['f', 'g', 'h'], c: ['a', 'd', 'h'], d: ['a', 'c', 'e'], ... h: ['b', 'g', 'b']}
  return connectedGraphwithLoop;
}

function connectAllVertices (graph, verticesToBranch, maxNeighbors) {
  // connectAllVertices devuelve un gráfico (variable 'connectedGraph' en la línea 9) que es "similar a un árbol", ¡sin bucles!
  var newGraph = graphDeepClone(graph);
  var unexploredVertices = verticesToBranch.slice(1, verticesToBranch.length);
  var start = true;
  while (unexploredVertices.length) {
    var currentVertex = verticesToBranch.splice(0, 1)[0];
    var numNewNeighbors = start ? maxNeighbors : getRandomInt(2, maxNeighbors);//comienza como máximo, pero más tarde en el ciclo while es aleatorio (entre 2 y máximo)
    start = false;
    var neighbors = unexploredVertices.splice(0, numNewNeighbors);
    connectMultipleVertices(newGraph, currentVertex, neighbors);
  }
  return newGraph;
}

function connectTwoVertices (graph, first, second) {
  graph[first].push(second);
  graph[second].push(first);
}

function connectMultipleVertices (graph, vertex, neighbors) {
  neighbors.forEach(neighboringVertex => {
    connectTwoVertices(graph, vertex, neighboringVertex);
  });
}

function connectLeaves (graph) {
  // connectLeaves toma un gráfico devuelto por connectAllVertices, clona
  // y devuelve un nuevo gráfico (variable 'connectedGraphwithLoop' en la línea 10)
  // con todos los vértices de las hojas conectados, haciendo un solo bucle a través de todos los
  // vértices más externos. Los vértices que antes eran los vértices de las hojas pasan
  // de tener 1 vecino, a tener 3 vecinos
  //
  // El bucle es necesario para comprobar si se activó una función optimizada 
  // de rutas más cortas
  

  var newGraph = graphDeepClone(graph);
  var graphKeys = Object.keys(newGraph);
  var connectSwitch = false;
  var firstLeaf;
  for (var i = 0; i < graphKeys.length; i++) {
    var key = graphKeys[i];
    var nextkey = graphKeys[i + 1];
    if (newGraph[key].length === 1) {
      firstLeaf = key;
      connectSwitch = true;
    }
    if (connectSwitch) {
      if (i === graphKeys.length - 1) {
        var finalLeaf = key;
        connectTwoVertices(newGraph, finalLeaf, firstLeaf);
      } else {
        connectTwoVertices(newGraph, key, nextkey);
      }
    }
  }
  return newGraph;
}
