/* global createArrIncrementedLetters getRandomInt graphDeepClone */

function graphGen (maxNeighbors, totalVertices) {
  const graph = {};
  const verticesArr = createArrIncrementedLetters(totalVertices);// ['a', 'b', 'c'... 'h']
  verticesArr.forEach((vertex) => {
    graph[vertex] = [];
  });// graph -> {a: [], b: [], c: [], ... h: []}
  const connectedGraph = connectAllVertices(graph, verticesArr, maxNeighbors); // connectedGraph -> {a: ['b', 'c', 'd', 'e'], b: ['f', 'g', 'h'], c: ['a'], d: ['a'], ... h: ['b']}
  const connectedGraphwithLoop = connectLeaves(connectedGraph); // connectedGraphwithLoop -> {a: ['b', 'c', 'd', 'e'], b: ['f', 'g', 'h'], c: ['a', 'd', 'h'], d: ['a', 'c', 'e'], ... h: ['b', 'g', 'b']}
  return connectedGraphwithLoop;
}

function connectAllVertices (graph, verticesToBranch, maxNeighbors) {
  // connectAllVertices devuelve un gráfico (variable 'connectedGraph' en la línea 9) que es "similar a un árbol", ¡sin bucles!
  const newGraph = graphDeepClone(graph);
  const unexploredVertices = verticesToBranch.slice(1, verticesToBranch.length);
  let start = true;
  while (unexploredVertices.length) {
    const currentVertex = verticesToBranch.splice(0, 1)[0];
    const numNewNeighbors = start ? maxNeighbors : getRandomInt(2, maxNeighbors);//comienza como máximo, pero más tarde en el ciclo while es aleatorio (entre 2 y máximo)
    start = false;
    const neighbors = unexploredVertices.splice(0, numNewNeighbors);
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
  

  const newGraph = graphDeepClone(graph);
  const graphKeys = Object.keys(newGraph);
  let connectSwitch = false;
  let firstLeaf;
  for (var i = 0; i < graphKeys.length; i++) {
    const key = graphKeys[i];
    const nextkey = graphKeys[i + 1];
    if (newGraph[key].length === 1) {
      firstLeaf = key;
      connectSwitch = true;
    }
    if (connectSwitch) {
      if (i === graphKeys.length - 1) {
        const finalLeaf = key;
        connectTwoVertices(newGraph, finalLeaf, firstLeaf);
      } else {
        connectTwoVertices(newGraph, key, nextkey);
      }
    }
  }
  return newGraph;
}
