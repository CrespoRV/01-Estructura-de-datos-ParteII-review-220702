// la linea comentada `global pathExists` (en la línea 6) le dice a ciertos linters
// que estas variables vienen de otros archivos
// la linea comentada `eslint-disable id-length` (en la línea 7) obliga a
// los linters a no imponer nombres de variables de longitud máxima/mínima

/* global pathExists */
/* eslint-disable id-length */

describe("Extra credit: `pathExists`", function () {
  var binaryTree, generalTree, graph, graphWithCycles;

  // La función, `pathExists`, debe determinar si existe una ruta entre dos nodos
  // en un árbol o gráfico

  describe("dado un árbol binario", function () {
    beforeEach(function () {
      /*        Binary Tree

                      +-+
                      |A|
                      +-+
                       |
                 +-----+-----+
                 |           |
                 v           v
                +-+         +-+
                |B|         |C|
                +-+         +-+
                 |           |
              +--+--+     +--+---+
              |     |     |      |
              v     v     v      v
             +-+   +-+   +-+    +-+
             |D|   |E|   |F|    |G|
             +-+   +-+   +-+    +-+
              |           |      |
              |           |      |
           +--+        +--+--+   +--+
           |           |     |      |
           v           v     v      v
          +-+         +-+   +-+    +-+
          |H|         |I|   |J|    |K|
          +-+         +-+   +-+    +-+

      Este árbol binario es similar al árbol de búsqueda binaria (BST) que se
      estuvo trabajando en el workshop, pero hay dos diferencias claves:

      1. Se representa como una "lista de adyacencia". Toda la
      la información sobre los nodos y sus nodos secundarios se almacena en un
      solo objeto. Las claves de esta lista de adyacencia son los nodos y
      los valores representan los nodos secundarios izquierdo y derecho correspondientes
      (el primer elemento de la matriz es el hijo izquierdo y el segundo elemento
      es el hijo derecho). Por ejemplo, el hijo izquierdo del nodo 'b' es 'd' y
      hijo derecho es 'e.'

      2. A diferencia del BST del workshop, este árbol binario también está desordenado.
      (no hay nada que realmente determine lo que va a la izquierda o a la derecha de un
      nodo). Los BST son un subconjunto de árboles binarios, y mientras que el primero tiene
      orden implícito, este último no (necesariamente).
      NOTA: Si bien este árbol binario desordenado se representa como un
      lista de adyacencia, ¡esto no significa que todos tengan que serlo!

      Debido a estas diferencias, en este ejercicio se tiene que tomar un enfoque diferente
      respecto al metodo "contains" del arbol BST.

      */

      binaryTree = {
        a: ["b", "c"],
        b: ["d", "e"],
        c: ["f", "g"],
        d: ["h"],
        e: [],
        f: ["i", "j"],
        g: ["k"],
        h: [],
        i: [],
        j: [],
        k: [],
      };
    });

    it("retorna 'true' para rutas existentes", function () {
      expect(pathExists(binaryTree, "a", "h")).toBe(true);
      expect(pathExists(binaryTree, "c", "j")).toBe(true);
    });

    it("retorna 'false' para rutas inexistentes", function () {
      expect(pathExists(binaryTree, "b", "j")).toBe(false);
      expect(pathExists(binaryTree, "c", "h")).toBe(false);
    });
  });

  describe("dado un árbol con más de dos hijos", function () {
    beforeEach(function () {
      /* General Tree

               +-+
               |A|
               +-+
                |
          +-----+---------+
          |     |         |
          v     v         v
         +-+   +-+       +-+
         |B|   |C|       |D|
         +-+   +-+       +-+
          |     |         |
       +--+-+   |     +---+-+---+---+
       |    |   |     |     |   |   |
       v    v   v     v     v   v   v
      +-+  +-+ +-+   +-+   +-+ +-+ +-+
      |E|  |G| |H|   |I|   |J| |K| |L|
      +-+  +-+ +-+   +-+   +-+ +-+ +-+
            |         |
            |      +--+---+
            |      |      |
            v      v      v
           +-+    +-+    +-+
           |M|    |N|    |O|
           +-+    +-+    +-+

      Este árbol es como el árbol binario en la especificación anterior, excepto que no hay
      límite a cuántos hijos puede tener cada nodo!

      */
      generalTree = {
        a: ["b", "c", "d"],
        b: ["e", "g"],
        c: ["h"],
        d: ["i", "j", "k", "l"],
        e: [],
        g: ["m"],
        h: [],
        i: ["n", "o"],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
      };
    });

    it("retorna 'true' para rutas existentes", function () {
      expect(pathExists(generalTree, "a", "n")).toBe(true);
      expect(pathExists(generalTree, "b", "m")).toBe(true);
    });

    it("retorna 'false' para rutas inexistentes", function () {
      expect(pathExists(generalTree, "b", "n")).toBe(false);
      expect(pathExists(generalTree, "c", "m")).toBe(false);
    });
  });

  describe("dado un gráfo acíclico", function () {
    beforeEach(function () {
      /* Graph (sin ciclos)

                +-+
                |A|
                +-+
                 |
             +---+---+
             |       |
             v       v
            +-+     +-+
            |B|     |C|
            +-+     +-+
             |       |
             |       |
             +---+---+
                 |
                 v
                +-+
                |D|
                +-+

      Es necesario prestar mucha atención en este caso ya que varios padres pueden comunicarse con el mismo hijo
      ('b' y 'c' pueden llegar a 'd'). Esto significa que la estructura de datos ya no se llamará un *árbol*, 
      sino un *gráfico*! Todos los árboles son técnicamente un subconjunto de gráficos, pero los árboles no pueden tener múltiples raíces
      o múltiples caminos a cualquier nodo. Por lo tanto, no podemos llamar a esto un árbol.

      Es problable que no se necesite cambiar gran parte del código para
      hacer que `pathExists` funcione tambien para este caso: si funciona para `generalTree`, es probable que funcione para este grafico.

      */
      graph = {
        a: ["b", "c"],
        b: ["d"],
        c: ["d"],
        d: [],
      };
    });

    it("retorna 'true' para rutas existentes", function () {
      expect(pathExists(graph, "a", "d")).toBe(true);
      expect(pathExists(graph, "b", "d")).toBe(true);
    });

    it("retorna 'false' para rutas que no existen", function () {
      expect(pathExists(graph, "a", "!@#$")).toBe(false);
      expect(pathExists(graph, "d", "a")).toBe(false);
    });
  });

  describe("dado un grafo cíclico", function () {
    beforeEach(function () {
      /* Graph (con ciclos!)

                    +-+
                    |D|--+
                    +-+  |
                         v
                        +-+
                 +----->|A|
                 |      +-+
                 |       |
                 |       |
                 |       v
                +-+     +-+   +-+
                |S|<--->|C|<--|B|
                +-+     +-+   +-+
                         |
                       +-+-+
                       |   |
                       v   v
                      +-+ +-+
                      |R| |T|
                      +-+ +-+

      Acá es donde viene la parte divertida!

      Este gráfico ahora contiene ciclos. Ahora ya no existe el concepto de padre-hijo porque cualquier nodo puede retroceder y conectarse a un nodo anterior.
      No hay nodos "padres" o "hijos", solo nodos y nodos vecinos.

      Los enlaces entre los nodos y los nodos vecinos se denominan "bordes" y pueden
      ser bidireccional (entre los nodos S y C, por ejemplo) o unidireccional 
      (en todos lados).

      (El término "vecino" no se refiere especificamente a un nodo al lado de otro sino a un posible "proximo destino".
      En el siguiente gráfico, por ejemplo, A tiene a C como vecino, pero C no tiene a A como vecino).

      Para terminar: un gráfico cíclico puede llegar a terminar en un bucle infinito si todavia no se cambió el código para lidiar con los ciclos.
      */

      graphWithCycles = {
        a: ["c"],
        b: ["c"],
        c: ["s", "r", "t"],
        d: ["a"],
        s: ["a", "c"],
        r: ["d"],
        t: [],
        z: ["z"],
      };
    });

    it("retorna 'true' para rutas existentes", function () {
      expect(pathExists(graphWithCycles, "a", "c")).toBe(true);
      expect(pathExists(graphWithCycles, "a", "d")).toBe(true);
      expect(pathExists(graphWithCycles, "r", "d")).toBe(true);
      expect(pathExists(graphWithCycles, "r", "a")).toBe(true);
      expect(pathExists(graphWithCycles, "r", "s")).toBe(true); 
    });

    it("retorna 'false' para rutas que no existen", function () {
      expect(pathExists(graphWithCycles, "a", "b")).toBe(false);
      expect(pathExists(graphWithCycles, "c", "z")).toBe(false);
      expect(pathExists(graphWithCycles, "r", "o")).toBe(false);
    });
  });
});
