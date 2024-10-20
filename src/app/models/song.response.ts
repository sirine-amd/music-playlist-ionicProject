import { Song } from '../models/song.model';

export interface SongResponse {
    [key: string]: Song; // Index signature for string keys
  }