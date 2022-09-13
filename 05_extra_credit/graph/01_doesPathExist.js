/**
   
 * Devuelve un arreglo de patrones coincidentes
 * @param  {array} graph - arbol a tratar
 * @param  {string} start - elemento root parcial
 * @param  {string} end - elemento elegido para match
 * @param  {string} roots - elemento root principal (al inicio es igual a start)
 * @return  {boolean} - coincidencia
 
*/

const pathExists = function (graph, start, end, roots = start) {
  if (graph[start].includes(end)) return true;
  if (!graph[start].length || graph[start].includes(roots)) return false;
  for (element of graph[start]) {
    if (pathExists(graph, element, end, roots)) return true;
  }
  return false;
};
