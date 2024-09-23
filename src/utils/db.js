const storeName = 'prices';
const dbName = 'FinancialDataDB';
const dbVersion = 1;

export const openDb = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(`Ошибка открытия IndexedDB: ${error}`);
  });
};

const transactionPromise = (db, mode, operation) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], mode);
    const store = transaction.objectStore(storeName);
    const request = operation(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(`Ошибка выполнения операции в IndexedDB: ${error}`);
  });
};

export const addPrice = async (quote) => {
  const db = await openDb();
  return transactionPromise(db, 'readwrite', (store) => store.add(quote));
};

export const getAllPrices = async () => {
  const db = await openDb();
  return transactionPromise(db, 'readonly', (store) => store.getAll());
};

export const clearDb = async () => {
  const db = await openDb();
  return transactionPromise(db, 'readwrite', (store) => store.clear());
};
