type Shape = "round" | "square" | "drop" | "star";

const bodies: Record<Shape, React.ReactNode> = {
  round: <circle cx="50" cy="62" r="30" />,
  square: <rect x="22" y="34" width="56" height="56" rx="14" />,
  drop: <path d="M50 28 C72 52 80 66 80 74 A30 22 0 0 1 20 74 C20 66 28 52 50 28Z" />,
  star: (
    <path
      d="M50 30 L59 50 L81 53 L65 68 L69 90 L50 79 L31 90 L35 68 L19 53 L41 50Z"
      strokeLinejoin="round"
    />
  ),
};

function Wick({ shape, color, className }: { shape: Shape; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 4 C58 14 56 22 50 26 C44 22 42 14 50 4Z" fill="#ffb938" />
      <g fill={color} stroke="#1b1730" strokeWidth="4">
        {bodies[shape]}
      </g>
      <circle cx="40" cy="62" r="4.5" fill="#1b1730" />
      <circle cx="60" cy="62" r="4.5" fill="#1b1730" />
      <path d="M41 73 Q50 81 59 73" fill="none" stroke="#1b1730" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const nav = [
  { label: "Cast", href: "#cast" },
  { label: "How to play", href: "#play" },
  { label: "Updates", href: "#updates" },
  { label: "FAQ", href: "#faq" },
];

const cast: { name: string; role: string; blurb: string; shape: Shape; color: string }[] = [
  { name: "Pip", role: "Runner", blurb: "Fastest feet in the workshop. Burns bright, burns short.", shape: "round", color: "#ff7a59" },
  { name: "Bolt", role: "Tinkerer", blurb: "Repairs lanterns in half the time and hums while doing it.", shape: "square", color: "#5cc8ff" },
  { name: "Dribble", role: "Healer", blurb: "Shares wax with teammates who are running low.", shape: "drop", color: "#8be28b" },
  { name: "Glint", role: "Scout", blurb: "Spots the Snuffer through walls for a few seconds.", shape: "star", color: "#f6d94c" },
  { name: "Mallow", role: "Tank", blurb: "Slow and squishy, but shrugs off one hit every floor.", shape: "round", color: "#d59bff" },
  { name: "Crate", role: "Hauler", blurb: "Carries two items at once. Complains about both.", shape: "square", color: "#ff9fc2" },
];

const steps = [
  { title: "Light the lanterns", text: "Every floor has a handful of dead lanterns. Find them, fix them, and keep them burning." },
  { title: "Dodge the Snuffer", text: "Something in the dark wants the lights out. Listen for the draft and stay out of sight." },
  { title: "Ride the lift", text: "Once the floor is lit, pile into the lift, pick an upgrade, and head one level deeper." },
];

const updates = [
  { tag: "Patch 0.4", title: "The Boiler Room", text: "A new floor type with steam vents, two new items, and a much grumpier Snuffer." },
  { tag: "Event", title: "Wax Week", text: "Double wax drops all week, plus a limited ribbon for anyone who clears floor ten." },
  { tag: "Dev note", title: "Balancing the Scout", text: "Glint's reveal is getting a shorter cooldown and a slightly smaller range." },
];

const faq = [
  { q: "How many players is it?", a: "One to six. Floors scale with the size of your group." },
  { q: "Is it scary?", a: "It's spooky rather than scary: cartoon suspense, no gore." },
  { q: "Do I keep my upgrades?", a: "Upgrades reset each run. Wax you earn unlocks new Wicks permanently." },
  { q: "Where can I play?", a: "The game is in development. Join the list above to hear when the playtest opens." },
];

export default function Home() {
  return (
    <div className="bg-[#1b1730] text-[#fff6e5]">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1b1730]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold">
            <Wick shape="round" color="#ffb938" className="size-8" />
            Wobblewick
          </a>
          <nav className="hidden gap-6 text-sm font-medium sm:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-white/70 hover:text-[#ffb938]">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#join" className="rounded-full bg-[#ffb938] px-4 py-2 text-sm font-bold text-[#1b1730] hover:bg-[#ffc95e]">
            Join the playtest
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#ffb93833,transparent_60%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
            <div>
              <p className="mb-4 inline-block rounded-full border border-[#ffb938]/40 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffb938] uppercase">
                Co-op survival · 1–6 players
              </p>
              <h1 className="font-heading text-5xl leading-tight font-bold md:text-6xl">
                Keep the lights on. <span className="text-[#ffb938]">Don&apos;t get snuffed.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-white/70">
                Team up as a crew of candle-topped toys, relight an abandoned workshop floor by floor, and
                see how deep you can go before the dark catches up.
              </p>
              <div id="join" className="mt-8 flex flex-wrap gap-3">
                <a href="#play" className="rounded-full bg-[#ffb938] px-6 py-3 font-bold text-[#1b1730] hover:bg-[#ffc95e]">
                  How to play
                </a>
                <a href="#cast" className="rounded-full border border-white/25 px-6 py-3 font-bold hover:border-[#ffb938] hover:text-[#ffb938]">
                  Meet the cast
                </a>
              </div>
            </div>
            <div className="flex items-end justify-center">
              <Wick shape="drop" color="#8be28b" className="w-1/4 translate-x-4" />
              <Wick shape="round" color="#ff7a59" className="z-[1] w-2/5 drop-shadow-[0_0_40px_#ffb93866]" />
              <Wick shape="star" color="#f6d94c" className="w-1/4 -translate-x-4" />
            </div>
          </div>
        </section>

        <section id="cast" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Meet the Wicks</h2>
          <p className="mt-2 text-white/70">Six toys, six jobs. Mix and match to survive the deeper floors.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cast.map((c) => (
              <article key={c.name} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#ffb938]/60">
                <Wick shape={c.shape} color={c.color} className="size-20 shrink-0" />
                <div>
                  <h3 className="font-heading text-xl font-bold">{c.name}</h3>
                  <p className="text-xs font-semibold tracking-widest text-[#ffb938] uppercase">{c.role}</p>
                  <p className="mt-2 text-sm text-white/70">{c.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="play" className="scroll-mt-16 bg-[#241f40] py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">How to play</h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-[#1b1730] p-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#ffb938] font-heading text-lg font-bold text-[#1b1730]">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="updates" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Latest updates</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {updates.map((u) => (
              <article key={u.title} className="rounded-3xl border border-white/10 p-6">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{u.tag}</span>
                <h3 className="mt-4 font-heading text-xl font-bold">{u.title}</h3>
                <p className="mt-2 text-sm text-white/70">{u.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 bg-[#241f40] py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">FAQ</h2>
            <div className="mt-8 space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-2xl bg-[#1b1730] p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                    {f.q}
                    <span className="text-[#ffb938] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-white/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-white/50 sm:flex-row">
          <p>© 2026 Wobblewick. An original prototype.</p>
          <nav className="flex gap-5">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-[#ffb938]">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
