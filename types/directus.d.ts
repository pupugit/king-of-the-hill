export type Week = {
  id: string
  started: string | null
  finished: string | null
  status: 'upcoming' | 'running' | 'finished'
  nr: number
}
export type Player = {
  id: string
  status: 'active' | 'inactive'
  name: string
}
export type Match = {
  id: string
  week: string
  status: 'upcoming' | 'running' | 'finished'
  player1: Player | null
  player2: Player | null
  level: number
  started: string | null
  finished: string | null
  winner: Player | null
}

export type FullWeek = {
  id: string
  started: string | null
  finished: string | null
  status: 'upcoming' | 'running' | 'finished'
  nr: number
  matches: Match[]
  king: Player | null
}