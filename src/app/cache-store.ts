export class CacheStore<T> {
    cacheDictionary = new KeyedCollection<CacheItem<T>>();
    maxCachedItems = 0;
    expirationSecondsForItem = 0;

    constructor(maxCachedItems?: number, expirationSecondsForItem?: number) {
        this.maxCachedItems = maxCachedItems;
        this.expirationSecondsForItem = expirationSecondsForItem;
        console.log('CacheStore: initialized. maxCachedItems=' + this.maxCachedItems +
         ', expirationSecondsForItem=' + this.expirationSecondsForItem);
    }

    public GetOrCache(key: string, func: any, doneFunc: any): void {
        console.log('CacheStore: keys in cache=' + this.cacheDictionary.Keys().join(','));
        const keyExist = this.cacheDictionary.ContainsKey(key);
        let isCacheExpired = false;
        let cacheItem: CacheItem<T>;

        if (keyExist) {
            cacheItem = this.cacheDictionary.Item(key);
            const cachedSeconds = (Math.abs(((new Date()).getTime() - cacheItem.time.getTime()) / 1000));
            if (cachedSeconds > this.expirationSecondsForItem) {
                console.log('CacheStore: item=' + key + ' was cached for ' + cachedSeconds +
                 ' (expiretime=' + this.expirationSecondsForItem + ')');
                isCacheExpired = true;
            }
        }

        if (!keyExist || isCacheExpired) {
            // Cache the item
            func((data) => {
                if (isCacheExpired) {
                    // Since cache expired for this key, first remove it.
                    console.log('CacheStore: item=' + key + ' removed from cache');
                    this.cacheDictionary.Remove(key);
                }

                // Before adding to cache, verify if reached max limit of cached items.
                if (this.cacheDictionary.Count() >= this.maxCachedItems) {
                    const firstAdded = this.cacheDictionary.FirstAddedKey();
                    console.log('CacheStore: reached maxCachedItems, item=' + firstAdded + ' removed (first)');
                    this.cacheDictionary.Remove(firstAdded);
                    // This will retain a maxCachedItems.
                }

                const newCacheItem = new CacheItem<T>(data);
                this.cacheDictionary.Add(key, newCacheItem);
                console.log('CacheStore: item=' + key + ' added to cache');
                doneFunc(data);
            });
        } else {
            // Simply retrieve the item.
            console.log('CacheStore: item=' + key + ' retrieved from cache');
            doneFunc(cacheItem.item);
        }
    }
}

export class CacheItem<T> {
  time: Date;
  item: T;

  constructor(private t: any) {
      this.time = new Date();
      this.item = t;
  }
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
  private items: { [index: string]: T } = {};

  private count = 0;

  public ContainsKey(key: string): boolean {
      return this.items.hasOwnProperty(key);
  }

  public Count(): number {
      return this.count;
  }

  public Add(key: string, value: T) {
      if (!this.items.hasOwnProperty(key)) {
        this.count++;
      }

      this.items[key] = value;
  }

  public Remove(key: string): T {
      const val = this.items[key];
      delete this.items[key];
      this.count--;
      return val;
  }

  public Item(key: string): T {
      return this.items[key];
  }

  public FirstAddedKey(): string {
    const keys = this.Keys();
    return keys[0];
  }

  public Keys(): string[] {
      const keySet: string[] = [];

      for (const prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              keySet.push(prop);
          }
      }

      return keySet;
  }

  public Values(): T[] {
      const values: T[] = [];

      for (const prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              values.push(this.items[prop]);
          }
      }

      return values;
  }
}

export interface IKeyedCollection<T> {
  Add(key: string, value: T);
  ContainsKey(key: string): boolean;
  Count(): number;
  Item(key: string): T;
  Keys(): string[];
  Remove(key: string): T;
  Values(): T[];
}