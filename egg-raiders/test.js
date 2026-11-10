// Checks the game's core rules in a headless browser. Run: node egg-raiders/test.js  (needs Playwright)
const { chromium } = require('playwright');
const assert = require('assert');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 700 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.join(__dirname, 'index.html'));

  const results = await page.evaluate(() => {
    const G = window.game, P = G.P, home = G.bases[2], rival = G.bases[1], rook = G.ents[0], out = {};
    const count = b => b.eggs.filter(Boolean).length;
    const park = () => G.ents.forEach(e => { if (e.bot) { e.st = 'idle'; e.t = 999; e.x = G.bases[e.home].cx; e.y = G.bases[e.home].cy; } });
    park();

    // 1. buy -> carry -> nest -> income
    G.step(0.1);                                   // spawns a belt egg
    const g = G.belt[0]; g.t = 0; g.m = 0;
    P.cash = 100; P.x = g.x; P.y = 450;
    G.act();
    out.bought = !!P.carry && P.cash === 75;
    P.x = home.cx; P.y = home.cy; G.step(0.1);
    out.nested = !P.carry && count(home) === 1;
    const before = P.cash; G.step(0.05); G.step(0.05);
    out.income = P.cash > before;

    // 2. steal from a rival and deliver it
    park(); rival.shield = 0; rival.eggs[0] = { t: 3, m: 0 };
    let p = G.slot(rival, 0); P.x = p.x; P.y = p.y;
    G.act(); for (let i = 0; i < 22; i++) G.step(0.05);
    out.grabbed = !!P.carry && P.carry.from === 1 && !rival.eggs[0];
    P.x = home.cx; P.y = home.cy; G.step(0.05);
    out.delivered = !P.carry && count(home) === 2;

    // 3. swatting a thief returns the egg
    park(); const mine = count(home);
    G.grab(rook, home, 0); rook.x = P.x + 30; rook.y = P.y;
    out.taken = count(home) === mine - 1;
    P.cd = 0; G.swat(P);
    out.returned = count(home) === mine && !rook.carry && rook.stun > 0;

    // 4. a dome blocks intruders
    park(); rook.stun = 0; G.raise(rival); P.stun = 0;
    p = G.slot(rival, 1); rival.eggs[1] = { t: 0, m: 0 }; P.x = p.x; P.y = p.y;
    out.noStealUnderDome = G.context() === null;
    G.step(0.05);
    out.pushedOut = Math.abs(P.x - rival.cx) > 260 || Math.abs(P.y - rival.cy) > 130;   // outside the 520x260 nest

    // 5. upgrades and rebirth
    P.cash = 200; out.upgrade = G.buyUpg('speed') && G.upg.speed === 1 && P.cash === 0;
    out.cantAfford = G.buyUpg('speed') === false;
    P.cash = 20000; out.rebirth = G.rebirth() && G.reb === 1 && count(home) === 0 && P.cash === 50;

    // 6. a long unattended run stays healthy
    G.ents.forEach(e => { e.t = 0; });
    for (let i = 0; i < 300 * 20; i++) G.step(0.05);
    out.botsProgress = G.ents.filter(e => e.bot).every(e => count(G.bases[e.home]) >= 1 && isFinite(e.cash) && isFinite(e.x));

    P.cash = 1234; G.bases[2].eggs[0] = { t: 2, m: 1 }; G.save();
    return out;
  });

  // 7. save survives a reload
  await page.reload();
  const loaded = await page.evaluate(() => ({ cash: Math.floor(window.game.P.cash), reb: window.game.reb, speed: window.game.upg.speed, egg: window.game.bases[2].eggs[0] }));
  results.saved = loaded.cash >= 1234 && loaded.reb === 1 && loaded.speed === 1 && loaded.egg && loaded.egg.t === 2 && loaded.egg.m === 1;

  await page.screenshot({ path: process.env.SHOT || path.join(require('os').tmpdir(), 'egg-raiders.png') });
  await browser.close();

  let failed = errors.length;
  for (const [k, v] of Object.entries(results)) { console.log((v ? 'ok   ' : 'FAIL ') + k); if (!v) failed++; }
  errors.forEach(e => console.log('page error: ' + e));
  assert.strictEqual(failed, 0, failed + ' check(s) failed');
  console.log('all checks passed');
})().catch(e => { console.error(e.message); process.exit(1); });
