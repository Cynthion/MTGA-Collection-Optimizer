export interface StorageService {
  store(key: string, data: any): void;
  load<TResult>(key: string): TResult;
}
