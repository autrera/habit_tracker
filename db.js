// db.js
const DB_NAME = 'HabitTracker';
const DB_VERSION = 2;

export async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('habits')) {
        db.createObjectStore('habits', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
      if (!db.objectStoreNames.contains('checks')) {
        db.createObjectStore('checks', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAll(db, table) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, 'readonly');
    const store = transaction.objectStore(table);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function add(db, table, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, 'readwrite');
    const store = transaction.objectStore(table);
    const request = store.add(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function remove(db, table, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, 'readwrite');
    const store = transaction.objectStore(table);
    const request = store.delete(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
