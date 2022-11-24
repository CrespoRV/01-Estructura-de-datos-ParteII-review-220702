describe("Una Linked List", function () {
  var linkedList;

  beforeEach(function () {
    // Al igual que en 'queues' crearás un constructor llamado 'LinkedList'.
    // Este contendrá una *lista doblemente enlazada*.
    linkedList = new LinkedList();
  });

  it("tiene métodos `addToTail`, `addToHead`, `removeTail`,`removeHead` y `search`", function () {
    expect(typeof linkedList.addToTail).toBe("function");
    expect(typeof linkedList.addToHead).toBe("function");
    expect(typeof linkedList.removeTail).toBe("function");
    expect(typeof linkedList.removeHead).toBe("function");
    expect(typeof linkedList.search).toBe("function");
  });

  it("empieza con `head` y `tail` como falsos", function () {
    // Creá dos Propiedades head y tail, ambas tienen que estar vacías por defecto.
    // Representarán los *punteros* al inicio y final de la lista.
    // "Falsy" hace referencia a un valor que da *falso* evaluado como 'Boolean'. ¿Te acordás cuáles son?
    expect(linkedList.head).toBeFalsy();
    expect(linkedList.tail).toBeFalsy();
    // ¿Qué esperás que haga 'removeHead'? ¿Cómo debería actuar si la lista está vacía?
    expect(linkedList.removeHead()).toBeFalsy();
  });

  it("tiene una clase Node para representar un nodo", function () {
    expect(typeof Node).toBe("function");
    // Ya existe un constructor llamado "Node" en el explorador.
    // El siguiente spec verifica que hayas creado uno propio.
    expect(isNative(Node)).toBe(false);
    function isNative(fn) {
      return /\{\s*\[native code]\s*\}/.test("" + fn);
    }
  });

  it("tiene nodos que, por default, contienen las Propiedades `next` y `previous` como null", function () {
    var node = new Node("test");
    // Recordá cargar los valores por defecto.
    expect(node.value).toBe("test");
    expect(node.next).toBe(null);
    expect(node.previous).toBe(null);
  });

  it("debe usar la clase Node para agregar nodos", function () {
    // Vamos a almacenar cada elemento de la lista en forma de nodos.
    // Los punteros deberán actualizarse a medida que la lista cambie.
    linkedList.addToTail("first");
    // ¿Qué significa que `tail` sea una instancia de `Node`? ¿Cómo hago para que eso pase?
    expect(linkedList.tail instanceof Node).toBe(true);
  });

  it("con un solo nodo, tendrá un `head` que apuntará al mismo lado que el `tail`", function () {
    // Para este 'spec' es muy importante que recuerdes la diferencia entre valor y referencia. Mirá este video: https://www.youtube.com/watch?v=AvkyOrWkuQc
    linkedList.addToHead("first");
    expect(linkedList.head.value).toBe("first");
    expect(linkedList.head.next).toBeFalsy();
    expect(linkedList.head.previous).toBeFalsy();
    expect(linkedList.head).toBe(linkedList.tail);
  });

  // A partir de acá tendrás que avanzar por tu cuenta.

  it("debe devolver el `head` en `removeHead`", function () {
    linkedList.addToTail("first");
    linkedList.addToTail("second");
    linkedList.addToTail("third");
    expect(linkedList.removeHead()).toBe("first");
    expect(linkedList.removeHead()).toBe("second");
    expect(linkedList.removeHead()).toBe("third");
  });

  it("debe estar segura de que la Propiedad `previous` de un nuevo `head` sea null", function () {
    linkedList.addToTail("first");
    linkedList.addToTail("second");
    linkedList.addToTail("third");
    expect(linkedList.removeHead()).toBe("first");
    expect(linkedList.head.previous).toBe(null);
  });

  it("debe asegurarse de que el `next` de un nuevo `tail` sea null", function () {
    linkedList.addToTail("first");
    linkedList.addToTail("second");
    linkedList.addToTail("third");
    expect(linkedList.removeTail()).toBe("third");
    expect(linkedList.tail.next).toBe(null);
  });

  it("debe poder agregar un nuevo nodo al principio y al final", function () {
    linkedList.addToTail("second");
    linkedList.addToHead("first");
    linkedList.addToTail("third");
    expect(linkedList.removeHead()).toBe("first");
    expect(linkedList.removeHead()).toBe("second");
    expect(linkedList.removeHead()).toBe("third");
  });

  it("debe devolver el `tail` con `removeTail`", function () {
    linkedList.addToTail("second");
    linkedList.addToHead("third");
    linkedList.addToTail("first");
    expect(linkedList.removeTail()).toBe("first");
    expect(linkedList.removeTail()).toBe("second");
    expect(linkedList.removeTail()).toBe("third");
  });

  it("debe eliminar el `head` y el `tail` cuando sea el último nodo", function () {
    expect(linkedList.removeHead()).toBeFalsy();
    linkedList.addToTail("one");
    expect(linkedList.removeHead()).toBe("one");
    expect(linkedList.removeHead()).toBeFalsy();
    expect(linkedList.head).toBeFalsy();
    expect(linkedList.tail).toBeFalsy();
  });

  it("debe devolver los valores correctos para buscar", function () {
    linkedList.addToTail("one");
    linkedList.addToTail("two");
    linkedList.addToTail("three");
    linkedList.addToTail("four");
    linkedList.addToTail("one");
    expect(linkedList.search("two")).toBe("two");
    expect(linkedList.search("sdd")).toBe(null);
    expect(linkedList.search("one")).toBe("one");
    expect(linkedList.search("four")).toBe("four");
  });

  it("debe tomar Strings y Functions como search inputs", function () {
    linkedList.addToTail("one");
    linkedList.addToTail("two");
    expect(
      linkedList.search(function (nodeValue) {
        return nodeValue === "two";
      })
    ).toBe("two");
  });

  // Si realizaste bien el test anterior, los siguientes pasarán automáticamente.

  it("debe buscar no solo Strings sino también Objetos", function () {
    function UserNode(name, email, city) {
      this.name = name;
      this.email = email;
      this.city = city;
    }

    linkedList.addToHead(
      new UserNode("Luke", "luke@skywalker.com", "Tatooine")
    );
    linkedList.addToHead(
      new UserNode("Leia", "leia@skywalker.com", "Alderaan")
    );
    linkedList.addToHead(
      new UserNode("Chewbacca", "chewie@chewie.com", "Kashyyyk")
    );

    expect(
      linkedList.search(function (userNode) {
        return userNode.name === "Luke";
      }).email
    ).toBe("luke@skywalker.com");

    expect(
      linkedList.search(function (userNode) {
        return userNode.email === "leia@skywalker.com";
      }).city
    ).toBe("Alderaan");

    expect(
      linkedList.search(function (userNode) {
        return userNode.city === "Kashyyyk";
      }).name
    ).toBe("Chewbacca");
  });
});
