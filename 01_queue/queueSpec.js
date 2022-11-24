/**
 * ¡Bienvenid@ a tu primer Workshop!
 *
 * Ahora que ya sabés qué es una Queue, deberás pensar cómo hacer una.
 * En este Workshop te daremos algunas pistas, pero te enfrentarás a problemas que deberás resolver vos mism@.
 * Si estás trabad@ y no podés avanzar, seguí estos pasos:
 * 1. Googlealo.
 * 2. Consultalo con tu mesa.
 * 3. Llamá a un asistente.
 * Esto es clave para que empieces a desarrollar tu autonomía.
 *
 * ¡No te olvides de leer los comentarios!
 */

describe("Un queue", function () {
  var queue;

  beforeEach(function () {
    // Necesitarás un constructor Queue creado en el archivo `queue.js`.
    // Al ejecutarlo (con el keyword new) obtendrás una instancia de ese constructor.
    queue = new Queue();
  });

  it("tiene los métodos `enqueue`, `dequeue`, y `size`", function () {
    // Estas instancias pueden utilizar los métodos(funcionalidades) que el constructor les provee.
    // Este test te pide agregar 3 métodos de nombre: 'enqueue', 'dequeue' y 'size'.
    // ¿Cómo agregarías un método a un constructor para que, cualquiera de sus instancias, lo puedan usar?
    expect(typeof queue.enqueue).toBe("function");
    expect(typeof queue.dequeue).toBe("function");
    expect(typeof queue.size).toBe("function");
  });

  // Sacá la 'x' del xit para correrlo
  it("tiene size 0 inicialmente", function () {
    expect(queue.size()).toBe(0);
  });

  it("incrementa en size cuando agregamos ítems", function () {
    // El método 'enqueue' debe agregar el valor pasado por parámetro a nuestra queue.
    // RECORDÁ: Tu primera versión de 'Queue' debería guardar la información en un Arreglo.
    queue.enqueue("first in line");
    // y, por ende, impactar sobre el resultado de size.
    expect(queue.size()).toBe(1);
  });

  it("decrementa en size cuando removemos elementos", function () {
    // El método 'dequeue' retirará un elemento de la cola y, por lo tanto, modificará su 'size'.
    // Tené en cuenta que no hay una solución única para resolver este punto. Usá tu creatividad para pensar
    // una posible solución.
    queue.enqueue("first");
    queue.enqueue("second");
    queue.enqueue("third");
    queue.dequeue();
    expect(queue.size()).toBe(2);
  });

  it("devuelve el ítem correcto cuando hacemos el `dequeue`", function () {
    // RECORDÁ: Una Queue es de tipo FIFO.
    queue.enqueue("first");
    queue.enqueue("second");
    queue.enqueue("third");
    expect(queue.size()).toBe(3);
    expect(queue.dequeue()).toBe("first");
    expect(queue.size()).toBe(2);
    expect(queue.dequeue()).toBe("second");
    expect(queue.size()).toBe(1);
    expect(queue.dequeue()).toBe("third");
    expect(queue.size()).toBe(0);
  });

  it("maneja bien el underflow: cuando no hay elementos `dequeue` devuelve undefined", function () {
    // No solo hay que preocuparse por el "happy path" donde todo sale bien; contemplá los casos en los que
    // se puede dar un error.
    queue.enqueue("first in line");
    expect(queue.size()).toBe(1);
    expect(queue.dequeue()).toBe("first in line");
    expect(queue.size()).toBe(0);
    expect(queue.dequeue()).toBe(undefined);
    expect(queue.size()).toBe(0);
    expect(queue.dequeue()).toBe(undefined);
    expect(queue.size()).toBe(0);
  });

  it("maneja bien varios enqueue y dequeue", function () {
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    queue.enqueue(4);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);
    expect(queue.dequeue()).toBe(undefined);
  });

  it("agrega y remueve sus propios items", function () {
    // Cada instancia de Queue debe manejar su propia información: no guardes su data en variables globales.
    var q2 = new Queue();
    queue.enqueue("fullstack");
    q2.enqueue("JavaScript");
    expect(q2.dequeue()).toBe("JavaScript");
    expect(q2.dequeue()).toBe(undefined);
    expect(queue.dequeue()).toBe("fullstack");
    expect(queue.dequeue()).toBe(undefined);
  });
});
