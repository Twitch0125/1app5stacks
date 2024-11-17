export default eventHandler(async (event) => {
  const body = await readBody(event)
  return recordBattle(body.winner, body.loser)
})
