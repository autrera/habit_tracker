// db.js
const DB_NAME = "HabitTracker";
const DB_VERSION = 1;

export async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("habits")) {
        db.createObjectStore("habits", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("checks")) {
        const store = db.createObjectStore("checks", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("checks_habit_id_date_index", ["habit_id", "date"], {
          unique: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAll(db, table) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, "readonly");
    const store = transaction.objectStore(table);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getByIndex(db, table, indexName, properties) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, "readonly");
    const store = transaction.objectStore(table);
    const index = store.index(indexName);
    const request = index.openCursor(IDBKeyRange.only(properties));
    const results = [];

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function add(db, table, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, "readwrite");
    const store = transaction.objectStore(table);
    const request = store.add(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function remove(db, table, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, "readwrite");
    const store = transaction.objectStore(table);
    const request = store.delete(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function update(db, table, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(table, "readwrite");
    const store = transaction.objectStore(table);
    const request = store.get(data.id);

    request.onsuccess = () => {
      data = { ...request.result, ...data };
      const updateRequest = store.put(data);

      updateRequest.onsuccess = () => resolve(updateRequest.result);
      updateRequest.onerror = () => reject(updateRequest.error);
    };
    request.onerror = () => reject(request.error);
  });
}
