describe("Hash Table", function () {
  var hashTable;

  beforeEach(function () {
    hashTable = new HashTable();
  });

  // Esta es la última sección del Workshop. ¡Adelante!

  it("debe tener 35 buckets", function () {
    expect(hashTable.numBuckets).toBe(35);
  });

  it("debe tener métodos `set`, `get`, y `hasKey`", function () {
    expect(typeof hashTable.set).toBe("function");
    expect(typeof hashTable.get).toBe("function");
    expect(typeof hashTable.hasKey).toBe("function");
  });

  it("debe realizar el `hash` correctamente", function () {
    // Esta función 'hash' deberá sumar los key codes de las letras de la palabra.
    // Además deberá hacer el módulo (%) de ese valor por el número total de 'buckets'
    expect(hashTable.hash("foo")).toBe(9);
    expect(hashTable.hash("this is a key")).toBe(27);
    expect(hashTable.hash("what about this one")).toBe(13);
  });

  it("debe guardar y buscar valores por key", function () {
    // Recordá cómo guardar las keys en una Hash Table.
    // Importante: Las Hash Tables NO son objetos de JavaScript

    hashTable.set("key1", "val1");
    hashTable.set("key2", "val2");
    hashTable.set("this is a very different string", 44.4);
    expect(hashTable.get("key1")).toBe("val1");
    expect(hashTable.get("key2")).toBe("val2");
    expect(hashTable.get("this is a very different string")).toBe(44.4);
  });

  it("debe guardar los keys 'hasheados', no usar la Hash Table como un objeto de Java Script", function () {
    // Este test debe pasar automáticamente si implementaste bien los métodos 'get' y 'set'.
    spyOn(hashTable, "hash").and.callThrough();
    hashTable.set("key1", "val1");
    expect(hashTable.get("key1")).toBe("val1");
    expect(hashTable.hash.calls.count()).toBe(2);
    expect(hashTable.hash).toHaveBeenCalledWith("key1");
  });

  it("debe devolver un error cuando el key no es un String", function () {
    expect(function () {
      hashTable.set(false, "hi");
    }).toThrowError(TypeError, "Keys must be strings");
  });

  it("debe manejar colisiones", function () {
    // Si bien en una colisión ordinaria se genera una segunda Hash Table interna para solucionarla,
    // en este caso, usaremos una LinkedList para simplificarla.
    hashTable.set("foo", "bar1");
    hashTable.set("ofo", "bar2");
    expect(hashTable.get("ofo")).toBe("bar2");
    expect(hashTable.get("foo")).toBe("bar1");
  });

  it("debe sobreescribir keys", function () {
    hashTable.set("foo", "bar1");
    hashTable.set("foo", "bar2");
    expect(hashTable.get("foo")).toBe("bar2");
  });

  it("debe devolver booleanos para el método 'hasKey'", function () {
    hashTable.set("foobar", "fluf cats");
    expect(hashTable.hasKey("foobar")).toBe(true);
    expect(hashTable.hasKey("raboof")).toBe(false);
  });
});
