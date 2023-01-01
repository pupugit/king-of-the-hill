import type { FullWeek, Week, Match } from '~~/types/directus'

const fullWeeks = ref<FullWeek[]>([])
const matches = ref<Match[]>([])

export const useFullWeeks = () => {
  return fullWeeks
}

export const useMatches = () => {
  return matches
}

export const loadFullWeeks = async () => {
  const { getItems } = useDirectusItems()
  fullWeeks.value = await getItems<FullWeek[]>({ collection: 'week', params: { sort: '-started', fields: ['*', 'cohost.*', 'winner.*', 'matches.*', 'matches.player1.*', 'matches.player2.*', 'matches.winner.*'] } })
  // matches.value = await getItems<Match[]>({ collection: 'match', params: { fields: ['*', 'player1.*', 'player2.*', 'winner.*'] } })
}
