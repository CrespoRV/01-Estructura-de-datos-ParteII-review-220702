describe('Una "circular buffer queue"', function() {
  var queue;

  beforeEach(function() {
    queue = new QueueCirc(4);
  });

  it('debe implementarse con un arreglo de tipo Uint8Array (tomando la longitud como parámetro)', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array#Examples
    expect(queue.data instanceof Uint8Array).toBe(true);
    expect(queue.data.length).toBe(4);
    expect(new QueueCirc(16).data.length).toBe(16);
  });

  it('tiene un método `enqueue` y `dequeue`', function() {
    expect(queue.enqueue).toEqual(jasmine.any(Function));
    expect(queue.dequeue).toEqual(jasmine.any(Function));
  });

  describe('método enqueue', function() {
    it('debería agregar correctamente los valores a la queue', function() {
      queue.enqueue(10);
      queue.enqueue(21);
      expect(queue.data[0]).toBe(21);
      expect(queue.data[1]).toBe(10);
    });

    it('debería aceptar solo numeros enteros entre 0 y 255', function() {
      expect(function() {
        queue.enqueue('invalid value!');
      }).toThrow();
      expect(function() {
        queue.enqueue(256);
      }).toThrow();
      expect(function() {
        queue.enqueue(-1);
      }).toThrow();
    });
  });
  describe('método dequeue', function() {
    it('debería retornar el valor correcto', function() {
      queue.enqueue(1);
      queue.enqueue(6);
      queue.enqueue(10);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(6);
      expect(queue.dequeue()).toBe(10);
    });
    it('debería manejar el uso intercalado de los metodos `enqueue` y `dequeue` ', function() {
      queue.enqueue(3);
      queue.enqueue(10);
      expect(queue.dequeue()).toBe(3);
      queue.enqueue(41);
      queue.enqueue(35);
      expect(queue.dequeue()).toBe(10);
      expect(queue.dequeue()).toBe(41);
    });
    it('debe manejar el subdesbordamiento (lanzar un error al intentar eliminar un valor de una queue vacia)', function() {
      expect(function() {
        queue.dequeue();
      }).toThrow();
    });
  });

  describe('Manejando desbordamiento', function() {
    it('debería lanzar un error al intentar agregar un elemento a una queue llena', function() {
      queue.enqueue(14);
      queue.enqueue(7);
      queue.enqueue(20);
      queue.enqueue(31);
      expect(function() {
        queue.enqueue(7);
      }).toThrow();
    });
  });

  describe('Manejando correctamente el uso intercalado de los metodos y el desbordamiento', function() {
    it('debería manejar valores correctos', function() {
      queue.enqueue(12);
      queue.enqueue(81);
      queue.enqueue(200);
      queue.enqueue(32);
      queue.dequeue();
      queue.enqueue(14);
      expect(queue.data[0]).toBe(14);
      expect(function() {
        queue.enqueue(6);
      }).toThrow();
      expect(queue.dequeue()).toBe(81);
    });
  });
});
