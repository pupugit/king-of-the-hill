import type { FullWeek, Week, Match } from '~~/types/directus'

const fullWeeks = ref<FullWeek[]>([])
const matches = ref<Match[]>([])

export const useFullWeek = () => {
  return fullWeeks
}

export const useMatches = () => {
  return matches
}

export const initFullWeeks = async () => {
  const { getItems } = useDirectusItems()
  // const weeks = await getItems<Week[]>({ collection: 'week' })
  matches.value = await getItems<Match[]>({ collection: 'match', params: { fields: ['*', 'player1.*', 'player2.*', 'winner.*'] } })
}