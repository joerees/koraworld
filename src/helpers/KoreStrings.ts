export interface KoraString {
  note: string
  notes: string[]
  info: string
  on: boolean
  midi: number
  side: number
}

export interface IKoraStrings {
  [key: string]: KoraString
}

export const koraStrings: IKoraStrings = {
  1: {
    note: 'F',
    notes: ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E'],
    info: 'F2',
    on: false,
    midi: 41,
    side: 0,
  },
  2: {
    note: 'C',
    notes: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b'],
    info: 'C3',
    on: false,
    midi: 48,
    side: 0,
  },
  3: {
    note: 'D',
    notes: ['D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'C', 'Db'],
    info: 'D3',
    on: false,
    midi: 50,
    side: 0,
  },
  4: {
    note: 'E',
    notes: ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'C', 'Db', 'D', 'Eb'],
    info: 'E3',
    on: false,
    midi: 52,
    side: 0,
  },
  5: {
    note: 'F',
    notes: ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E'],
    info: 'F3',
    on: false,
    midi: 53,
    side: 1,
  },
  6: {
    note: 'G',
    notes: ['G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb'],
    info: 'G3',
    on: false,
    midi: 55,
    side: 0,
  },
  7: {
    note: 'A',
    notes: ['A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
    info: 'A3',
    on: false,
    midi: 57,
    side: 1,
  },
  8: {
    note: 'Bb',
    notes: ['Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A'],
    info: 'Bb3',
    on: false,
    midi: 58,
    side: 0,
  },
  9: {
    note: 'C',
    notes: ['c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b'],
    info: 'C4',
    on: false,
    midi: 60,
    side: 1,
  },
  10: {
    note: 'D',
    notes: ['D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db'],

    info: 'D4',
    on: false,
    midi: 62,
    side: 0,
  },
  11: {
    note: 'E',
    notes: ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb'],
    info: 'E4',
    on: false,
    midi: 64,
    side: 1,
  },
  12: {
    note: 'F',
    notes: ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E'],
    info: 'F4',
    on: false,
    midi: 65,
    side: 0,
  },
  13: {
    note: 'G',
    notes: ['G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb'],
    info: 'G4',
    on: false,
    midi: 67,
    side: 1,
  },
  14: {
    note: 'A',
    notes: ['A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
    info: 'A4',
    on: false,
    midi: 69,
    side: 0,
  },
  15: {
    note: 'Bb',
    notes: ['Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A'],
    info: 'Bb4',
    on: false,
    midi: 70,
    side: 1,
  },
  16: {
    note: 'C',
    notes: ['c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b'],
    info: 'C5',
    on: false,
    midi: 72,
    side: 0,
  },
  17: {
    note: 'D',
    notes: ['D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db'],
    info: 'D5',
    on: false,
    midi: 74,
    side: 1,
  },
  18: {
    note: 'E',
    notes: ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb'],
    info: 'E5',
    on: false,
    midi: 76,
    side: 0,
  },
  19: {
    note: 'F',
    notes: ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E'],
    info: 'F5',
    on: false,
    midi: 77,
    side: 1,
  },
  20: {
    note: 'G',
    notes: ['G', 'Ab', 'A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb'],
    info: 'G5',
    on: false,
    midi: 79,
    side: 1,
  },
  21: {
    note: 'A',
    notes: ['A', 'Bb', 'b', 'c', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
    info: 'A5',
    on: false,
    midi: 81,
    side: 1,
  },
}
