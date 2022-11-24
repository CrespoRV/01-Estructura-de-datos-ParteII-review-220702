/* global graphGen shortestPaths performanceLoop */
/* eslint-disable id-length */


describe('`shortestPaths`', function(){
  const arrayContains = jasmine.arrayContaining;
  let undirectedGraph, largeGraph;

  beforeEach(function(){

    /*
    
    La función `shortestPaths` debe devolver un arreglo de rutas más cortas
    entre dos nodos en un gráfico no dirigido (a diferencia del gráfico dirigido en el
    problema `doesPathExist`, todos los bordes en un gráfico no dirigido son bidireccionales).
    El "undirectedGraph" prefabricado a continuación se utilizará para la mayoría de las especificaciones de prueba,
    y el gráfico generado (`largeGraph`) se utilizará para la especificación final.
    El gráfico generado es bastante grande, así que pensá detenidamente cómo deberías
    abordar este problema! Una búsqueda no optimizada puede terminar tomando una
    cantidad innecesaria de tiempo para terminar. Considerá cuidadosamente lo que aprendiste en el workshop de
    estructura de datos, y qué "tipo" de búsqueda sería más adecuado para este problema!

    */

    undirectedGraph = {
      a: ['q', 'b', 'c'],
      b: ['a', 'd'],
      c: ['a', 'd', 'y'],
      d: ['b', 'c', 'r', 'x'],
      q: ['a', 'r', 's', 't', 'u'],
      r: ['d', 'q', 'z'],
      s: ['v', 'q'],
      t: ['v', 'q'],
      u: ['v', 'q'],
      v: ['s', 't', 'u'],
      x: ['d'],
      y: ['c'],
      z: ['r']
    };

    largeGraph = graphGen(5, 35);
    /*
    `graphGen` crea un gráfico con 35 nodos en total, cada uno conectado a un
    número aleatorio de vecinos (máximo de 5).

    El gráfico también contiene un bucle gigante que conecta los nodos más externos,
    así que una vez más, ¡tené cuidado y asegurate de que tu función detecte ciclos!
    */
  });

  it('retorna un arreglo', function(){
    const returnedValue = shortestPaths(undirectedGraph, 'a', '!@#$%');
    expect(returnedValue).toEqual(jasmine.any(Array));
  });

  it('retorna un arreglo de longitud 0 si la ruta no existe', function(){
    const returnedValue = shortestPaths(undirectedGraph, 'a', '!@#$%');
    expect(returnedValue.length).toBe(0);
  });

  it('retorna un arreglo de arreglos si la ruta existe', function(){
    const returnedValue = shortestPaths(undirectedGraph, 'a', 'a');
    expect(returnedValue).toEqual(jasmine.any(Array));
    for (let element of returnedValue){
      expect(element).toEqual(jasmine.any(Array));
    }
  });

  describe('para los nodos iniciales y finales que tienen solo una ruta más corta', function(){
    it('retorna un arreglo con longitud igual a 1', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'y').length).toBe(1);
      expect(shortestPaths(undirectedGraph, 'd', 'z').length).toBe(1);
    });
    it('retorna la ruta mas corta', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'y')[0].toString()).toEqual('a,c,y');
      expect(shortestPaths(undirectedGraph, 'd', 'z')[0].toString()).toEqual('d,r,z');
    });
  });

  describe('para los nodos iniciales y finales que tienen mas de una ruta corta', function(){
    it('devuelve un arreglo cuya longitud coincide con el número de rutas más cortas', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'd').length).toBe(2);
      expect(shortestPaths(undirectedGraph, 'x', 'a').length).toBe(2);
      expect(shortestPaths(undirectedGraph, 'q', 'v').length).toBe(3);
    });

    it('retorna las rutas cortas correctas', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'd')).toEqual(arrayContains([['a', 'b', 'd'], ['a', 'c', 'd']]));
      expect(shortestPaths(undirectedGraph, 'x', 'a')).toEqual(arrayContains([['x', 'd', 'b', 'a'], ['x', 'd', 'c', 'a']]));
      expect(shortestPaths(undirectedGraph, 'v', 'q')).toEqual(arrayContains([['v', 'u', 'q'], ['v', 't', 'q'], ['v', 's', 'q']]));
    });
  });

  describe('dado un gráfico con más de 30 nodos', function(){
    it('tiene que estar optimizado y completar todo el calculo en un tiempo determinado (depende de qué tan rápida sea la computadora, pero generalmente menos de 50 milisegundos)', function(){
      // Esto prueba que tu función se escribió de manera óptima. No debería realizar cálculos innecesarios.
      // Eliminá la 'x' antes del "describe" (en la línea 95) para ejecutar esta prueba.

      const startBaseline = Date.now();
      performanceLoop(); // Esto es para establecer un tiempo de referencia para compararlo con el tiempo de `shortestPath` (`performanceLoop` normalmente tarda unos 6 milisegundos en ejecutarse).
      const elapsedTimeBaseline = Date.now() - startBaseline;

      const start = Date.now();
      const shortestPathsArr = shortestPaths(largeGraph, 'a', 'b');
      if (!shortestPathsArr) throw Error('la función "shortestPaths" no retorna ningun valor');
      const elapsedTime = Date.now() - start;

      // Implementado correctamente, `shortestPaths` debería tomar menos tiempo que el tiempo de referencia. Esta especificación va a comprobar si finaliza en menos del doble de tiempo de referencia. Una función `shortestPaths` que no esté correctamente optimizada probablemente tarde un par de segundos en completarse (y fallaría la especificación).

      expect(elapsedTime).toBeLessThan(elapsedTimeBaseline * 2);
    });
  });
});
