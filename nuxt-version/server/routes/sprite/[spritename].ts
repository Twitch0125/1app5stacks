export default cachedEventHandler(async event => {
  const spritename = getRouterParam(event,'spritename')
  if(!spritename) return createError({status: 404})
    // Make sure spritename matches format {id}.png (use a regex)
  if (!/^\d+\.png$/.test(spritename)) return createError({status: 404})
 
    const dexId = parseInt(spritename.split(".")[0]);
  if (isNaN(dexId) || dexId < 1 || dexId > 1025) {
  return createError({ status: 404 });
  }

  const spriteFromGithub = await fetch(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`
  );

  return spriteFromGithub
}, {
  headersOnly: true,
  maxAge: 60 * 60 * 24 * 365,
})