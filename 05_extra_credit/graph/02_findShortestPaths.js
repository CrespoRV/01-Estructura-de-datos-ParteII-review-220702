// Poniendo enfasis en la optimización se va recorriendo el arbol por distintos niveles
// de manera tal que al realizar el primer match (identifica el patron mas corto) no se
// continúa con la recursión profunda en las demas ramas.

const shortestPaths = function (graph, start, end) {
  let nivel = 1;
  let finalMatches = [];
  while (true) {                                          // Se recorre el arbol variando el nivel
    const path = searchPath(graph, start, end, nivel);
    finalMatches = [...finalMatches, ...path];
    const matches = finalMatches.flat(nivel - 1);
    if (!matches.length) return matches;          // No encontro match
    if (matches.some((match) => match.length)) {      // Encontró match
      return matches.filter((match) => match.length); // Elimina arrays vacios
    }
    nivel++;
  }
};

/**
   
 * Devuelve un arreglo de patrones coincidentes
 * @param  {array} graph - arbol a tratar
 * @param  {string} start - elemento root
 * @param  {string} end - elemento elegido para match
 * @param  {number} lengthPath - profundidad o nivel de busqueda
 * @param  {number} count - contador de profundidad o nivel
 * @param  {array} history - historial de elementos
 * @return  {Array} - arreglo de patrones coincidentes
 
*/

function searchPath(graph, start, end, lengthPath, count = 1, history = []) {
  let matchesPaths = [];
  const newHistory = [...history, start];
  if (graph[start].includes(end)) return [...newHistory, end]; // Encuentra match
  if (!graph[start].length || count > lengthPath) return [];   // Termina la busqueda por nivel y no encontró
  count++;                                                     // Aumenta el nivel para la siguiente recursión
  for (element of graph[start]) {
    if (!newHistory.includes(element)) {              // Solo recorre elementos que no hayan sido analizados previamente (ciclicos)                                           
      const res = searchPath(graph,element,end,lengthPath,count,newHistory);
      matchesPaths = [...matchesPaths,res]
    }
  }
  return matchesPaths;
}
