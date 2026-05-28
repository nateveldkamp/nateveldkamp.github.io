---
layout: post
title: "The Shape of Complexity"
date: 2026-05-27
d3: true
description: "A visual tour through the math, the metaphors, and the moves that keep complex systems alive."
wip: true
---

<p class="deck">A visual tour through the math, the metaphors, and the moves that keep complex systems alive.</p>
<p class="reading-meta">Built with d3 &middot; reads in about 25 minutes &middot; play with everything</p>


<!-- =================================================================== -->
<!-- SECTION 1: HOOK                                                     -->
<!-- =================================================================== -->
  <h2><span class="section-num">01</span> The arithmetic of more</h2>

  <p class="lead drop">Add a person to a two-person conversation and you have a three-way chat. Add another, and you have something approaching a dinner party. Add a few more and you start needing turn-taking, maybe a chair, eventually a moderator. Somewhere between four guests and forty, "people talking" becomes "an event."</p>

  <p>The work didn't get harder. The arithmetic did.</p>

  <p>This is the central trick of complexity, and it hides inside something that looks linear. You add one node, one teammate, one product line, one feature, and you think you've added one unit of work. But the work isn't in the node. The work is in everything the new node now has to coordinate with.</p>

  <p>In the next twenty minutes we're going to look at that idea from a dozen different angles. We'll start with a single curve. Then we'll watch industries from manufacturing to biology to organizational theory reinvent the same handful of moves to bend it. By the end you'll have a lens that fits onto almost any system that involves more than a few parts: a brain, an org chart, a city, a piece of software, an ant colony, a supply chain.</p>

<!-- =================================================================== -->
<!-- SECTION 2: METCALFE                                                 -->
<!-- =================================================================== -->
  <h2><span class="section-num">02</span> Complexity lives in the connections</h2>

  <p>Picture two phones. There's one line between them. Now picture three phones: three lines. Four phones: six. Five phones: ten. Six phones: fifteen.</p>

  <p>The phones grow by one each step. The connections grow by a number that gets bigger every step. This is the most important shape in all of complexity, and it has a name. The number of possible connections among <em>n</em> nodes is <em>n(n&minus;1)/2</em>, and for any decent-sized <em>n</em> that's essentially <em>n</em>&sup2;.</p>

  <p>Drag the slider below and feel the curve bend.</p>

<div class="viz-container">
  <div class="viz" id="viz-metcalfe">
    <div class="viz-title">Visualization 1</div>
    <div class="viz-headline">Nodes grow in a line. Connections grow in a curve.</div>
    <div class="controls">
      <div class="control">
        <label>Nodes</label>
        <input type="range" id="m-nodes" min="2" max="40" value="6" step="1">
        <span class="value-pill" id="m-nodes-v">6</span>
      </div>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="m-conn">15</span><span class="label">Connections</span></div>
        <div class="stat"><span class="num-big" id="m-formula">n(n−1)/2</span><span class="label">Formula</span></div>
      </div>
    </div>
    <div class="split">
      <svg class="viz-svg" id="m-graph" viewBox="0 0 380 380"></svg>
      <svg class="viz-svg" id="m-chart" viewBox="0 0 380 380"></svg>
    </div>
    <div class="viz-caption">Left: every line is a potential connection between two nodes. Right: the same number plotted as the graph grows. The dot is where you are right now.</div>
  </div>
</div>

  <p>This idea is older than the telephone is new. Robert Metcalfe, who co-invented Ethernet, used a version of it in the 1980s to argue that the <em>value</em> of a communications network grows as <em>n</em>&sup2;. Add a tenth person to a nine-person network and you've added nine new edges. The same math cuts the other way: ten engineers don't write ten times as much working code as one engineer. They write some fraction of that, because they spend the difference talking to each other. Fred Brooks called this Brooks's Law (adding manpower to a late project makes it later), but the underlying engine is the curve above.</p>

<!-- =================================================================== -->
<!-- SECTION 3: POWER LAWS (NEW)                                         -->
<!-- =================================================================== -->
  <h2><span class="section-num">03</span> But real networks aren't like that</h2>

  <p>The complete-graph picture in the last section is a useful upper bound. It is also a lie. Almost no real network looks like K<sub>n</sub>. Real networks have a small number of nodes with enormous numbers of connections (the hubs) and a long tail of nodes with very few connections. The distribution is wildly uneven.</p>

  <p>This pattern is called a <strong>power-law degree distribution</strong>, and it shows up in places that have no business looking similar to each other.</p>

  <p>The World Wide Web is a power law: a few sites (Google, Wikipedia, Facebook) accept millions of incoming links, while almost every page has only a handful. Air traffic is a power law: hubs like Atlanta and Frankfurt route enormous volume; most airports route almost none. Protein interaction networks inside a single cell follow it: a few protein types interact with hundreds of others, most interact with three or four. Citation networks in science follow it: a few papers get cited tens of thousands of times, most are cited once or twice. The internal email map of any large company you have ever worked at follows it.</p>

  <p>Albert-László Barabási and Réka Albert formalized this in 1999 with a simple generative rule called <strong>preferential attachment</strong>: new nodes preferentially connect to already-well-connected nodes. Rich get richer. Iterate that rule and you get a network that looks exactly like the real ones. Compare three flavors of network below: a uniformly random one, a small-world one that mostly has local connections plus a few long-range shortcuts, and a scale-free one with hubs.</p>

<div class="viz-container">
  <div class="viz" id="viz-power">
    <div class="viz-title">Visualization 2</div>
    <div class="viz-headline">Three flavors of network, same node count.</div>
    <div class="controls">
      <button class="btn" id="pw-rebuild">Regenerate</button>
      <button class="btn" id="pw-hub">Highlight top hubs</button>
      <button class="btn" id="pw-fail-random">Knock out random node</button>
      <button class="btn" id="pw-fail-hub">Knock out biggest hub</button>
    </div>
    <div class="triplet">
      <div class="net-card">
        <div class="net-title">Random</div>
        <div class="net-sub">Erdős–Rényi, 1959</div>
        <svg class="viz-svg" id="pw-er" viewBox="0 0 280 240"></svg>
      </div>
      <div class="net-card">
        <div class="net-title">Small-world</div>
        <div class="net-sub">Watts–Strogatz, 1998</div>
        <svg class="viz-svg" id="pw-ws" viewBox="0 0 280 240"></svg>
      </div>
      <div class="net-card">
        <div class="net-title">Scale-free</div>
        <div class="net-sub">Barabási–Albert, 1999</div>
        <svg class="viz-svg" id="pw-ba" viewBox="0 0 280 240"></svg>
      </div>
    </div>
    <div class="triplet" style="margin-top:14px">
      <svg class="viz-svg" id="pw-er-hist" viewBox="0 0 280 120"></svg>
      <svg class="viz-svg" id="pw-ws-hist" viewBox="0 0 280 120"></svg>
      <svg class="viz-svg" id="pw-ba-hist" viewBox="0 0 280 120"></svg>
    </div>
    <div class="viz-caption">Bottom row: degree distribution (how many connections each node has). The random network is bell-shaped around the average. The scale-free network has a long tail with a few enormous hubs. Knock out a random node and the scale-free network barely notices. Knock out a hub and it falls apart.</div>
  </div>
</div>

  <p>This changes the complexity story in two important ways.</p>

  <p>First, the actual connection count in real networks is much smaller than <em>n</em>&sup2;. A scale-free network of a thousand nodes typically has a few thousand edges, not half a million. Real-world complexity lives in distributions, not in worst cases.</p>

  <p>Second, robustness becomes wildly asymmetric. Scale-free networks tolerate random failures beautifully: knock out a random page on the web and almost no one notices. But they are catastrophically fragile to targeted attacks on the hubs. Take out Google and Wikipedia and the link structure of the web collapses. The same logic applies to power grids, airports, supply chains, key engineers, senior approvers, and the one person in finance who knows how the accruals model actually works.</p>

  <p>This is what Nassim Taleb calls <em>Extremistan</em>, the regime where a few rare events dominate the average. Black Swans live in Extremistan, not in the bell-curve world. A scale-free network is just Extremistan drawn as a graph. We will return to the implications in Section 13.</p>

  <div class="aside">
    <span class="label">A practical consequence</span>
    Most enterprise complexity audits stop at "how many connections are there?" That is the wrong question. The better questions: "Where are the hubs?" "What happens if we lose any one of them?" "Are we accidentally building a scale-free architecture in a domain where it should be more uniform?"
  </div>

<!-- =================================================================== -->
<!-- SECTION 4: SHANNON                                                  -->
<!-- =================================================================== -->
  <h2><span class="section-num">04</span> Information is surprise</h2>

  <p>Here's a small idea that explains a lot of the modern world: <strong>information equals surprise</strong>.</p>

  <p>If I flip a fair coin and tell you the result, I've just given you one <em>bit</em>, one yes/no question's worth of information. If I flip a coin that has heads on both sides, and tell you "heads," I haven't told you anything, because you already knew. There was no surprise. Zero bits. The more skewed the odds, the less surprise each outcome carries.</p>

  <p>Roll the dice. Flip a coin. Feel how much information each event actually conveys.</p>

<div class="viz-container">
  <div class="viz" id="viz-shannon">
    <div class="viz-title">Visualization 3</div>
    <div class="viz-headline">How much surprise is a coin worth?</div>
    <div class="controls">
      <button class="btn" data-source="fair">Fair coin</button>
      <button class="btn" data-source="weighted">Weighted coin (90/10)</button>
      <button class="btn" data-source="die">Six-sided die</button>
      <button class="btn" data-source="rigged">Two-headed coin</button>
    </div>
    <div id="shannon-output" style="font-family:Inter,sans-serif;font-size:15px;color:var(--muted);min-height:120px;padding:8px 0;">
      <div style="margin-bottom:10px;color:var(--muted);font-size:13px">Click a source above to roll it.</div>
    </div>
    <div class="viz-caption">Entropy is the <em>average</em> surprise of a source, measured in bits. A fair coin equals 1 bit. A loaded coin (90/10) is about 0.47 bits. A fair die is about 2.58 bits. A two-headed coin is 0 bits.</div>
  </div>
</div>

  <p>Claude Shannon wrote this down in 1948 and accidentally founded the modern world. Every JPEG, every Zoom call, every error-correcting code in your phone descends from his idea. For our purposes we just need the headline: when a system has more possible states, each message moving through it carries more potential surprise. More surprise means more information. More information means more bandwidth, more processing, more memory, more attention.</p>

  <p>Now combine the surprise idea with the connections curve. As your network grows, the number of pipes grows (toward <em>n</em>&sup2; in the worst case, scale-free in the typical case). Along each pipe flows information that, on average, gets <em>more</em> informative as the system's possibility space grows. Multiply those two together and you get the engineering reality of large systems: at some scale, the cost of moving information around the network swamps the cost of doing the actual work.</p>

  <p>Watch a small network move messages.</p>

<div class="viz-container">
  <div class="viz" id="viz-flow">
    <div class="viz-title">Visualization 4</div>
    <div class="viz-headline">Each new node adds n−1 new conversations.</div>
    <div class="controls">
      <div class="control">
        <label>Nodes</label>
        <input type="range" id="f-nodes" min="3" max="14" value="5" step="1">
        <span class="value-pill" id="f-nodes-v">5</span>
      </div>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="f-edges">10</span><span class="label">Channels</span></div>
        <div class="stat"><span class="num-big" id="f-rate">20</span><span class="label">msgs / sec</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="f-graph" viewBox="0 0 800 360" style="max-height:380px"></svg>
    <div class="viz-caption">Dots are messages flowing across channels. The traffic isn't visible from any single node, only from above.</div>
  </div>
</div>

<!-- =================================================================== -->
<!-- SECTION 5: BAYES                                                    -->
<!-- =================================================================== -->
  <h2><span class="section-num">05</span> Bayes' rule and the way information moves</h2>

  <p>Shannon told us how much surprise there is in a source. The natural follow-up question is: how do you <em>reduce</em> that surprise? The answer lives in conditional probability, and the rule that turns the answer into a computable algorithm is Bayes' theorem.</p>

  <p>The theorem itself is not complicated.</p>

  <div class="pull">P(H | E) = P(E | H) &middot; P(H) / P(E)</div>

  <p>Read in English: the probability of a hypothesis given some evidence equals the probability of that evidence given the hypothesis, times the prior probability of the hypothesis, divided by the total probability of the evidence. The intuitive version is shorter: you have a belief, evidence arrives, you update. Your new belief should weight the old belief by how well the evidence fits, and then renormalize. Repeat forever. That is most of statistics in one sentence.</p>

  <p>A classic example to feel how counterintuitive this gets. Suppose a disease affects one in a thousand people. A test is 99% accurate (99% true positives, 99% true negatives). You test positive. What is the probability you have the disease?</p>

  <p>Most people answer "about 99%." The correct answer is roughly 9%. The base rate is so low that even with a 99% accurate test, the vast majority of positive results are false positives. Out of a thousand random people, you would expect one true positive (the one sick person, correctly flagged) and about ten false positives (1% of the 999 healthy people, incorrectly flagged). Eleven positives, one of them real. That is a 1-in-11 chance, around 9%.</p>

  <p>This is the same shape as a thousand other situations. Every diagnostic test, every fraud-detection algorithm, every spam filter, every interview screen, every legal evidence assessment, every "what is the probability this candidate is good given they passed our screen" question runs on this math. Most of those situations get it wrong because humans are bad at base rates, an error known as base-rate neglect. The expensive lesson is that the prior matters at least as much as the evidence.</p>

  <h3>Bayesian networks: what the graphs in this essay actually are</h3>

  <p>The reason this matters for everything else in the essay is that real systems are not single hypotheses with single pieces of evidence. They are tangles of conditional dependencies. A <strong>Bayesian network</strong> is a directed graph where nodes are random variables and edges are conditional dependencies. The joint probability of everything factors along the graph: P(X<sub>1</sub>, X<sub>2</sub>, &hellip;, X<sub>n</sub>) = &Pi; P(X<sub>i</sub> | parents(X<sub>i</sub>)). Sparse graph, cheap factorization. Dense graph, no factorization.</p>

  <p>Try the canonical four-node network below, due to Judea Pearl. It models a small slice of daily life: whether it's cloudy, whether it's raining, whether the sprinkler is on, whether the grass is wet. Click any node to set evidence (observe it true or false). Watch the other nodes' probabilities update.</p>

<div class="viz-container">
  <div class="viz" id="viz-bayes">
    <div class="viz-title">Visualization 5</div>
    <div class="viz-headline">A Bayesian network. Click any node to set evidence.</div>
    <div class="controls">
      <button class="btn" id="by-reset">Clear all evidence</button>
      <span style="font-family:Inter,sans-serif;font-size:13px;color:var(--muted);font-style:italic">Click a node to cycle: unknown &rarr; true &rarr; false &rarr; unknown</span>
    </div>
    <svg class="viz-svg" id="by-graph" viewBox="0 0 800 360" style="max-height:420px"></svg>
    <div class="viz-caption">A directed graph encodes "this variable depends on those variables." Observing one node propagates information through the graph to update beliefs about all the others. Modular systems work because most variables are conditionally independent of most others given the right interface.</div>
  </div>
</div>

  <p>Click "Cloudy = true." Notice that the probability of rain goes up and the probability of the sprinkler being on goes down (people don't water the lawn when it's cloudy). Click "Wet grass = true." Now both rain and sprinkler become more likely, and they each provide partial evidence for the other being off (this is called <em>explaining away</em>). The graph does the bookkeeping. You couldn't have intuited the exact probabilities, but the algorithm can.</p>

  <h3>Where Bayes shows up in everything else</h3>

  <p>Once you have this lens, large parts of the essay rearrange themselves.</p>

  <p><strong>Modularity</strong>, when we reach it in Section 9, is essentially a claim of conditional independence: the internal state of a module is independent of the outside world given the module's interface. When an abstraction "leaks," you have discovered a hidden edge in the dependency graph that the architect did not model. That is also what tight coupling really is: a conditional dependence stronger than the architecture admits.</p>

  <p><strong>Stigmergy</strong> (Section 8) is distributed Bayesian inference in physical space. Each ant's pheromone trail is a piece of evidence. The next ant updates its behavior using the evidence in the environment. The colony's prior is "all paths equally likely." The posterior, encoded in the pheromone field, converges on the shortest path. Wikipedia, kanban boards, and git history are all stigmergic Bayesian systems with the same shape.</p>

  <p><strong>Feedback loops</strong> (Section 12) are Bayesian update loops with state. A reinforcing loop is what happens when the posterior at time t becomes the prior at time t+1 and consistently moves in the same direction. The bullwhip effect in supply chains is a chain of slow Bayesian updates on delayed evidence, amplifying noise at each step. Most "we keep overcorrecting on this" pathologies in companies are slow distributed Bayesian updates running with the wrong likelihood model.</p>

  <p><strong>Ashby's Law of Requisite Variety</strong> (Section 13) is, in this language, an information-theoretic impossibility theorem. Ashby's "variety" is the log of the number of states a system can be in, which is the same quantity as Shannon's entropy. Control requires that the mutual information I(controller; system) be at least as large as the system's entropy. If the controller has fewer bits than the system has, full regulation is impossible. Ashby's law and Shannon's information theorem are the same statement.</p>

  <p><strong>Conway's Law</strong> (Section 15) is the structural statement that the organization's communication graph becomes the system's conditional dependency graph. A modular org produces a factorable system. A tangled org produces an entangled system whose behavior cannot be predicted by reasoning about components in isolation.</p>

  <p>You can think of the rest of the essay as a tour of what conditional probability looks like when it is embodied in real systems: in networks of humans, in modules of code, in markets, in cells, in ant colonies. Bayes is the mathematics underneath. The essay is the field guide.</p>

<!-- =================================================================== -->
<!-- SECTION 6: DUNBAR                                                   -->
<!-- =================================================================== -->
  <h2><span class="section-num">06</span> The human ceiling</h2>

  <p>Humans have a hard cap on how much of that traffic they can handle. In the 1990s, an anthropologist named Robin Dunbar plotted the size of various primate groups against the size of their neocortex (the thinking part of the brain) and found a tight relationship. Extrapolating to humans gave him a famous number: roughly <strong>150</strong>. That's about the largest stable social group in which you can keep track of who knows whom, who owes whom what, who not to seat next to whom at the dinner you're going to throw later.</p>

  <p>The single number is contested. The more durable finding is the <em>layered</em> version: about five intimates, fifteen close friends, fifty good friends, one hundred and fifty meaningful contacts, five hundred acquaintances, fifteen hundred faces you'd recognize. Each ring is roughly three times the last.</p>

  <p>What matters for our purposes is the principle: human attention is finite, and the cost of maintaining a relationship doesn't disappear just because you wish it would. Add nodes past your capacity, and something has to give.</p>

<div class="viz-container">
  <div class="viz" id="viz-dunbar">
    <div class="viz-title">Visualization 6</div>
    <div class="viz-headline">You can only hold so many people in your head.</div>
    <div class="controls">
      <div class="control">
        <label>Network size</label>
        <input type="range" id="d-nodes" min="5" max="600" value="80" step="5">
        <span class="value-pill" id="d-nodes-v">80</span>
      </div>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="d-within">80</span><span class="label">Within reach</span></div>
        <div class="stat"><span class="num-big" id="d-beyond">0</span><span class="label">Beyond Dunbar</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="d-graph" viewBox="0 0 800 420" style="max-height:480px"></svg>
    <div class="viz-caption">You're the bright dot in the middle. Inner rings: intimates (5), close friends (15), good friends (50), meaningful relationships (150). Beyond the 150 ring, faces blur into acquaintances. The cap doesn't actually move just because the network does.</div>
  </div>
</div>

  <p>So here's the question every system at scale has to answer: how do you keep growing past the point where every node can stay connected to every other node? In other words, how do you bend the <em>n</em>&sup2; curve?</p>

  <p>It turns out we've invented this answer at least four different times, and three of those inventions are tricks of structure. The fourth is a trick of flow.</p>

<hr>

<!-- =================================================================== -->
<!-- SECTION 7: HIERARCHY                                                -->
<!-- =================================================================== -->
  <h2><span class="section-num">07</span> Invention one: hierarchy</h2>

  <p>If you can't connect everyone to everyone, connect everyone to a <em>coordinator</em>. Then connect the coordinators to each other. If you need to, connect <em>their</em> coordinators.</p>

  <p>A flat mesh of <em>n</em> people has <em>n</em>&sup2; potential conversations. A tree of <em>n</em> people has only <em>n</em>&minus;1 lines on the chart. The deepest path between any two people is log(<em>n</em>), so for a thousand people, ten steps. The price is that information has to travel through intermediaries, and each intermediary distorts a little.</p>

<div class="viz-container">
  <div class="viz" id="viz-hierarchy">
    <div class="viz-title">Visualization 7</div>
    <div class="viz-headline">Twenty people. Two hundred conversations, or nineteen.</div>
    <div class="controls">
      <button class="btn active" id="h-mesh">Show as mesh</button>
      <button class="btn" id="h-tree">Show as hierarchy</button>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="h-edges">190</span><span class="label">Connections</span></div>
        <div class="stat"><span class="num-big" id="h-depth">1</span><span class="label">Max path length</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="h-graph" viewBox="0 0 800 420" style="max-height:460px"></svg>
    <div class="viz-caption">Hierarchy is the oldest answer to scaling complexity. It works because trees collapse <em>n</em>&sup2; connections into <em>n</em>&minus;1.</div>
  </div>
</div>

  <p>Herbert Simon, in a famous 1962 essay called <em>The Architecture of Complexity</em>, argued this is more or less the only kind of system that survives, what he called <em>nearly decomposable</em> hierarchies, where the parts of a subsystem talk much more to each other than to anything outside.</p>

  <p>His analogy was the two watchmakers. Both build watches of a thousand parts. Hora builds in modular subassemblies of ten. Tempus builds each watch as one long chain. When the phone rings (and the phone always rings), Hora loses one subassembly's worth of work. Tempus loses the whole watch. Hierarchy is evolution's error-correction.</p>

  <div class="pull">Hierarchy isn't morally good. It's a strategy for surviving interruption.</div>

<!-- =================================================================== -->
<!-- SECTION 8: STIGMERGY                                                -->
<!-- =================================================================== -->
  <h2><span class="section-num">08</span> Invention two: stigmergy</h2>

  <p>Hierarchy is one way to coordinate at scale. There is another, much older one, and termites figured it out before we did.</p>

  <p>A foraging ant has no plan, no map, no manager. It wanders semi-randomly until it finds food, then walks back to the nest leaving a pheromone trail. Other ants are biased toward stronger pheromone, and they leave their own pheromone when they walk the path. Pheromone evaporates with time. Short paths get reinforced faster than long paths, because each round-trip on a short path adds pheromone sooner. Within minutes, the colony has discovered the shortest route from nest to food without anyone designing the search.</p>

  <p>This pattern is called <strong>stigmergy</strong>, from the Greek for "marks that incite work." The French biologist Pierre-Paul Grassé coined the term in 1959 watching termites build mounds, but the underlying idea is older than the word: coordination through marks left in a shared environment, rather than through direct communication.</p>

<div class="viz-container">
  <div class="viz" id="viz-stigmergy">
    <div class="viz-title">Visualization 8</div>
    <div class="viz-headline">No coordinator. No plan. A path emerges anyway.</div>
    <div class="controls">
      <button class="btn" id="st-reset">Reset</button>
      <button class="btn active" id="st-pause">Pause</button>
      <div class="control">
        <label>Pheromone strength</label>
        <input type="range" id="st-pher" min="0" max="100" value="55" step="1">
      </div>
      <div class="control">
        <label>Decay</label>
        <input type="range" id="st-decay" min="1" max="100" value="35" step="1">
      </div>
    </div>
    <svg class="viz-svg" id="st-graph" viewBox="0 0 800 320" style="max-height:380px;background:#f5f1e8;border-radius:4px"></svg>
    <div class="viz-caption">A nest (center) and two food sources (left and right corners). Agents leave fading trails in the environment. Stronger trails attract more agents. The shorter path gets reinforced faster and dominates.</div>
  </div>
</div>

  <p>Once you have the lens, you see it everywhere.</p>

  <p>In software, every git commit is a mark left in a shared environment that biases the next developer's work. Type annotations, code comments, naming conventions, and tests are all stigmergic signals: the code teaching the next person what to do. In manufacturing, a kanban board is a stigmergic system; a card on the wall tells you what to pull next, with no manager involved. In urban design, desire paths in parks, where pedestrians cut diagonals through the grass, are stigmergy at work; the trail itself reshapes future foot traffic. Wikipedia is stigmergy at the scale of millions; each edit is a mark in the shared page that influences the next editor.</p>

  <p>The slime mold <em>Physarum polycephalum</em> deserves special mention. In a 2010 experiment, researchers placed oat flakes at the locations of major Tokyo train stations in a petri dish, dropped a single slime mold in the middle, and watched. Within hours, the slime mold had grown a network of tubes connecting the food sources that closely resembled the actual Tokyo subway map. No engineers, no central planning, just stigmergic reinforcement of paths that carry nutrients efficiently. A single-celled organism with no brain, beating a century of urban planners on their own benchmark.</p>

  <p>Stigmergy is not better than hierarchy. It is different. Hierarchy is fast, deliberate, and excellent at decisions that need authority. Stigmergy is slow, robust, and excellent at decisions that need search. Most real organizations are mixtures, and they tend to get into trouble when they confuse one for the other (trying to design a culture by decree, or trying to make a high-stakes legal call by Slack consensus).</p>

  <p>One more way of seeing it. From far enough above, stigmergy is distributed Bayesian inference (recall Section 5) with the environment as the belief medium. Each agent's mark is a piece of evidence. The next agent's behavior is a posterior update. The colony's collective belief about good paths converges through many small, parallel updates that no individual coordinates. The ant doesn't know it is doing inference. The colony doesn't know it has a posterior. The math just works.</p>

<!-- =================================================================== -->
<!-- SECTION 9: MODULARITY                                               -->
<!-- =================================================================== -->
  <h2><span class="section-num">09</span> Invention three: modularity</h2>

  <p>The flaw in pure hierarchy is that the tree still has to know about every leaf. The flaw in pure stigmergy is that it's slow and noisy. If you want to <em>really</em> compress complexity, you don't just route the connections, you <em>hide</em> them.</p>

  <p>A team of forty engineers, from the outside, can be one box on a chart called "Platform." A million-line accounting system, from the outside, can be one API called "billing." A human body, from the outside, can be one person walking past you on the street.</p>

  <p>This is modularity. You wrap a tangle of internal connections behind a small, stable interface, and from then on the outside world only has to think about the interface. The complexity didn't disappear, it's just <em>somebody else's problem</em>. The cognitive load of the system, from any one vantage point, drops.</p>

<div class="viz-container">
  <div class="viz" id="viz-modular">
    <div class="viz-title">Visualization 9</div>
    <div class="viz-headline">Click a cluster to collapse it.</div>
    <div class="controls">
      <button class="btn" id="mod-reset">Reset all</button>
      <button class="btn" id="mod-all">Collapse all</button>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="mod-effective">30</span><span class="label">Visible nodes</span></div>
        <div class="stat"><span class="num-big" id="mod-edges">87</span><span class="label">Visible edges</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="mod-graph" viewBox="0 0 800 460" style="max-height:500px"></svg>
    <div class="viz-caption">Same system, two ways of seeing it. The complexity is conserved, it just gets a smaller surface area.</div>
  </div>
</div>

  <p>David Parnas wrote the foundational paper on this in 1972, with the unforgettable title <em>On the Criteria To Be Used in Decomposing Systems into Modules</em>. His insight: don't decompose by the <em>steps</em> the system performs. Decompose by the <em>decisions most likely to change</em>. Each module hides one decision behind a stable interface. The outside doesn't need to know how it works. The inside is free to be rewritten without anyone outside noticing.</p>

  <p>That same principle, in different vocabularies, is what corporate departments are, what microservices are, what cells in a body are, what cabinets in a government are. Wrap the mess. Expose only the handles.</p>

  <p>In the Bayesian language from Section 5: a well-designed module is one where the internal random variables are <em>conditionally independent</em> of the rest of the system given the module's interface. That is the formal definition of an abstraction boundary. When abstractions "leak" (Joel Spolsky's famous phrase), you have discovered a hidden conditional dependency that the architect did not model. The factorization breaks. Suddenly knowing something about the inside of the billing module changes your belief about the inside of the auth module, in a way the architecture didn't predict.</p>

  <p>One more move turns modularity into something even more powerful: stack it.</p>

<!-- =================================================================== -->
<!-- SECTION 10: LAYERS OF ABSTRACTION                                   -->
<!-- =================================================================== -->
  <h2><span class="section-num">10</span> Stacking the abstractions</h2>

  <p>Modularity says: wrap a tangle of internal connections behind a small, stable interface. Layers of abstraction say: do that again. And again. And again.</p>

  <p>A layer of abstraction is what you get when you treat the layer beneath you as a primitive. From inside that primitive, there is a whole world of complexity. From outside it, there is one thing: a cell, an instruction, a function call, a department. The trick of complex systems is not that they hide a single mess behind one interface. The trick is that they nest those hidings, so each level produces new vocabulary for the level above.</p>

  <h3>Biology is a stack</h3>

  <p>The most famous abstraction stack in nature is the one we live in. Atoms compose into molecules. Molecules compose into organelles. Organelles compose into cells. Cells compose into tissues. Tissues compose into organs. Organs compose into organ systems. Organ systems compose into an organism. Each layer treats the layer below as a primitive: a heart is "a thing that pumps blood," not "a particular arrangement of approximately ten billion cardiomyocytes each of which is approximately one hundred trillion atoms each of which is approximately ninety-something subatomic particles."</p>

  <p>A cardiologist reasons about hearts. A histologist reasons about tissues. A cell biologist reasons about cells. A biochemist reasons about molecules. A physicist reasons about atoms. They are all studying the same patient. They almost never need to talk to each other day-to-day. Each layer has its own vocabulary, its own techniques, its own journals. The layers exist precisely so that you can become an expert in one without having to become an expert in all of them.</p>

  <h3>Computing is a stack, only designed</h3>

  <p>The same thing happens in computing, only the layers are engineered instead of evolved.</p>

  <p>Transistors are switches. Combine them and you get logic gates. Combine gates and you get circuits that can execute binary instructions: machine code. Group machine code into named primitives and you get assembly language. Compile sequences of those into structured statements and you get high-level languages like C, Python, JavaScript. Combine high-level statements into reusable units and you get libraries, frameworks, applications. The application is the thing the human points at; the transistor is the thing physically doing work; everything in between is a chain of stable interfaces.</p>

  <p>A modern web developer writes "fetch this data and render it in a table." That sentence compiles, through many layers, into billions of transistor switches per second. The developer never sees the layers below. They write at one level, and the levels below (their entire history of compilers, assemblers, microarchitectures, semiconductors, and physics) work in their service without intruding. Andy Hertzfeld, working at Apple in the 1980s, wrote the original Macintosh QuickDraw graphics library in 6502 assembly. Today's mobile developer writes the equivalent functionality in three lines of SwiftUI. Same picture, a hundred million times less code visible.</p>

  <h3>The newest layer</h3>

  <p>For seventy years, programming meant translating human intent down through a stack of progressively more rigid languages. With large language models, that translation is now partially performed by the machine itself. Natural language has become a new top layer of the abstraction stack. You say "summarize this email and draft a reply," and a model translates that into a sequence of operations the layer below understands.</p>

  <p>The substrate has not changed. Still transistors at the bottom. Still machine code, assembly, high-level languages, applications in the middle. But the top of the stack has moved up. The same move that adding any new abstraction layer is, with the same rules: a stable interface, a compression of the complexity below, a vocabulary that the next-higher reasoner can use without paying attention to what is underneath. AI as a compiler from natural language to machine instructions. The newest rung in a ladder humans have been climbing since the abacus.</p>

<div class="viz-container">
  <div class="viz" id="viz-layers">
    <div class="viz-title">Visualization 10</div>
    <div class="viz-headline">Two stacks. Same trick. Click any layer.</div>
    <div class="controls">
      <button class="btn" id="la-reset">Clear selection</button>
      <span style="font-family:Inter,sans-serif;font-size:13px;color:var(--muted);font-style:italic">Click any layer to see what it abstracts</span>
    </div>
    <svg class="viz-svg" id="la-graph" viewBox="0 0 800 540" style="max-height:600px"></svg>
    <div id="la-detail" style="font-family:Inter,sans-serif;font-size:14px;color:var(--muted);min-height:80px;padding:14px 18px;background:var(--surface);border-radius:4px;margin-top:8px;line-height:1.5">
      <span style="color:var(--muted);font-style:italic">Click a layer above to see what it composes and what it provides.</span>
    </div>
    <div class="viz-caption">Each layer treats the one below it as a primitive. The compression compounds: an organism is built from atoms, but a doctor almost never has to think about atoms. The substrate is doing real work, but it is doing it out of view.</div>
  </div>
</div>

  <h3>The exponential payoff</h3>

  <p>Each layer of abstraction compresses by some factor. A protein is many atoms. A cell is many proteins. A tissue is many cells. If each layer compresses ten times, after five layers you are hiding one hundred thousand base units behind one thing. After ten layers, ten billion. In real biology and real computing the compression ratios per layer are much higher than ten, often hundreds or thousands. This is why the apparent simplicity of "I clicked a button" can be doing real work over 10<sup>15</sup> transistor operations, and why "I held the patient's hand" can be doing real work over 10<sup>27</sup> atomic interactions. The cost is hidden, not eliminated.</p>

  <h3>When the layer leaks</h3>

  <p>Abstraction layers work because each layer's interface is stable. The heart pumps blood. The function returns a value. The cell does its job. The layer below can change without anyone above noticing. A new generation of cardiomyocytes inherits the same heart structure. A new generation of compilers inherits the same C language. Stability of interface across substrate change is what makes the stack possible at all.</p>

  <p>Abstraction layers fail when the boundary leaks. Joel Spolsky published a canonical statement in 2002 known as the <em>Law of Leaky Abstractions</em>: every non-trivial abstraction is, to some degree, leaky. The TCP/IP stack is supposed to hide the network from your application; on a flaky WiFi connection, you discover that it does not. The cardiologist treats the heart as a pump; the patient with a previously unknown metabolic enzyme deficiency discovers that "pump" is a leaky abstraction over millions of proteins each doing their own thing. The same pattern, the same pathology.</p>

  <p>Picking up the Bayesian translation from Section 5: a clean abstraction is conditional independence at the boundary. A leaky abstraction is a hidden conditional dependency the architects did not know about. When that hidden edge fires, you suddenly need to reason at two levels at once, which is much harder than reasoning at one. Most production-systems crises are precisely this: an abstraction that worked yesterday is leaking today, and the engineers who only know the layer above have to learn the layer below in a hurry.</p>

  <h3>The same stack, in every domain</h3>

  <p>Once you have the lens, you see the stack everywhere humans deal with quantity.</p>

  <p>In <strong>mathematics</strong>: numbers, algebra, calculus, topology, category theory. Each layer treats the layer below as primitives and introduces new operations the layer below could not see. A topologist almost never thinks about specific numbers. A number theorist almost never thinks about topological spaces. They share an ancestry, not a vocabulary.</p>

  <p>In <strong>government</strong>: citizens, families, towns, counties, states, nations, international bodies. Each tier delegates to the tier above and answers to the tier below, with stable interfaces called constitutions, laws, treaties. When the abstraction leaks (a town suddenly cares about international monetary policy because the local economy collapsed), the layers above and below have to coordinate.</p>

  <p>In <strong>business</strong>: individual contributors, teams, departments, divisions, companies, industries. A C-suite executive almost never makes decisions at the individual contributor level. An individual contributor almost never makes decisions at the company-strategy level. The org chart is the abstraction stack made visible.</p>

  <p>In <strong>cognition</strong>: sensations, perceptions, concepts, arguments, worldviews. You see a red light; you perceive a stop sign; you understand the concept of traffic law; you hold a worldview that includes shared rules of the road; the worldview shapes which sensations even register.</p>

  <p>In <strong>language</strong>: phonemes, morphemes, words, phrases, sentences, paragraphs, arguments. A child learns each layer in roughly that order, and an adult writer almost never thinks at the phoneme level except in poetry or song.</p>

  <p>In <strong>physics</strong>: quantum fields, particles, atoms, molecules, materials, structures, planets, galaxies, the observable universe. The same atoms make a granite mountain and a kidney. The layer above is what differs.</p>

  <p>In every case, the trick is the same. You operate at one level. The levels below are running, but for the purposes of the work you are doing, they may as well not be there. The system is built so that you almost never have to think about more than one layer at a time. When you do need to, you have either found a leaky abstraction (which is a bug) or you are doing the cross-cutting work of debugging or redesign, which is hard precisely because abstraction is doing its normal job of hiding things from you.</p>

  <p>The most generative question to keep in mind, in any domain: which layer am I trying to operate at right now, and which layer is leaking?</p>

<!-- =================================================================== -->
<!-- SECTION 11: CONNASCENCE + WEAK TIES                                 -->
<!-- =================================================================== -->
  <h2><span class="section-num">11</span> Not all edges are equal</h2>

  <p>Here is the next layer of nuance. We've been treating every line in the graph as the same kind of thing. They aren't. Edges differ along at least two axes that matter: how <em>tightly</em> they couple their endpoints, and what they <em>bridge</em> in the larger network.</p>

  <h3>Coupling strength: connascence</h3>

  <p>If two parts of a system share a <em>name</em>, both refer to a function called <code style="background:var(--surface);padding:1px 6px;border-radius:2px;font-size:0.85em">total_revenue</code>, that's a connection, but a light one. Rename it on both sides and you're done. If they share a <em>type</em>, say they both expect a customer object with certain fields, the connection is heavier; changes ripple. If they share <em>timing</em>, one has to run before the other or things explode, the connection is much heavier and far harder to see, because it lives in the runtime rather than the source code.</p>

  <p>A software engineer named Meilir Page-Jones gave us a vocabulary for this in 1992. He called it <strong>connascence</strong>, from the Latin for "born together." It's a ranked list of the ways two pieces of a system can be entangled, from light to heavy.</p>

  <table class="connascence-table" id="connascence-table">
    <tr><td>Name</td><td><span class="weight-bar" style="width:18px;background:#5b8a5a"></span>Both sides agree on what to call something. Trivially refactorable.</td></tr>
    <tr><td>Type</td><td><span class="weight-bar" style="width:28px;background:#5b8a5a"></span>Both sides agree on what kind of thing it is.</td></tr>
    <tr><td>Meaning</td><td><span class="weight-bar" style="width:40px;background:#8b8a45"></span>Both sides agree what <code style="background:var(--surface);padding:1px 4px;font-size:0.85em">status = 7</code> actually means.</td></tr>
    <tr><td>Position</td><td><span class="weight-bar" style="width:54px;background:#b89535"></span>Both sides agree on the order of arguments.</td></tr>
    <tr><td>Algorithm</td><td><span class="weight-bar" style="width:68px;background:#c08230"></span>Both sides have to use the same procedure (such as the same hash).</td></tr>
    <tr><td>Execution</td><td><span class="weight-bar" style="width:90px;background:#c75432"></span>Order of operations matters at runtime.</td></tr>
    <tr><td>Timing</td><td><span class="weight-bar" style="width:108px;background:#a8431d"></span><em>When</em> something happens matters (race conditions live here).</td></tr>
    <tr><td>Value</td><td><span class="weight-bar" style="width:130px;background:#8c3215"></span>Values must change together to stay consistent (invariants).</td></tr>
    <tr><td>Identity</td><td><span class="weight-bar" style="width:150px;background:#6b1f08"></span>Both sides must reference <em>the exact same instance</em>.</td></tr>
  </table>

  <p>The lighter entries are easy to refactor. The heavier ones rot a system from the inside.</p>

<div class="viz-container">
  <div class="viz" id="viz-coupling">
    <div class="viz-title">Visualization 11a</div>
    <div class="viz-headline">Where does the heavy coupling live?</div>
    <div class="controls">
      <button class="btn active" data-c="all">All coupling</button>
      <button class="btn" data-c="light">Only light (Name to Position)</button>
      <button class="btn" data-c="heavy">Only heavy (Execution to Identity)</button>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="c-edges">60</span><span class="label">Edges shown</span></div>
        <div class="stat"><span class="num-big" id="c-weight">100%</span><span class="label">Coupling cost</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="c-graph" viewBox="0 0 800 420" style="max-height:460px"></svg>
    <div class="legend">
      <div class="legend-item"><div class="legend-dot" style="background:#5b8a5a"></div>Name / Type</div>
      <div class="legend-item"><div class="legend-dot" style="background:#b89535"></div>Meaning / Position</div>
      <div class="legend-item"><div class="legend-dot" style="background:#c75432"></div>Algorithm / Execution</div>
      <div class="legend-item"><div class="legend-dot" style="background:#8c3215"></div>Timing / Value / Identity</div>
    </div>
    <div class="viz-caption">A handful of heavy edges can carry more complexity than dozens of light ones. The eye is drawn to the count; the cost lives in the strength.</div>
  </div>
</div>

  <h3>What an edge bridges: the strength of weak ties</h3>

  <p>Coupling strength is one axis. Position in the network is another. In 1973 a sociologist named Mark Granovetter published a paper called <em>The Strength of Weak Ties</em> that became one of the most-cited papers in social science. His observation: people get their best job leads not from close friends, but from acquaintances. Close friends already know what you know; their information overlaps with yours. Acquaintances live in different social worlds, and any one of them is an information arbitrageur. The connections that matter most are often the weak ones, because they bridge gaps in the social graph that no one else can.</p>

  <p>The pattern generalizes. In biology, cross-population mating exports genetic variation between gene pools and prevents inbreeding. In software, the interfaces between modules are weak ties; the value of the architecture lives in those interfaces, not in the dense intra-module structure. In innovation, combinatorial creativity (mixing distant ideas) requires diverse weak ties; cultures that are too tightly bonded produce derivative work.</p>

<div class="viz-container">
  <div class="viz" id="viz-weakties">
    <div class="viz-title">Visualization 11b</div>
    <div class="viz-headline">One weak edge holds two worlds together.</div>
    <div class="controls">
      <button class="btn" id="wt-reset">Reset</button>
      <button class="btn" id="wt-remove-strong">Remove a strong tie</button>
      <button class="btn" id="wt-remove-weak">Remove the weak tie</button>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="wt-components">1</span><span class="label">Components</span></div>
        <div class="stat"><span class="num-big" id="wt-edges-remaining">21</span><span class="label">Edges remaining</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="wt-graph" viewBox="0 0 800 320" style="max-height:380px"></svg>
    <div class="viz-caption">Two tight clusters joined by a single weak edge. Remove any strong tie and the system mostly survives. Remove the weak tie and it splits in two. Both clusters lose the ability to learn from each other.</div>
  </div>
</div>

  <p>When you audit a system for complexity, the two questions to hold in mind together: <em>where is coupling heavy</em>, and <em>which edges, if removed, would disconnect the network</em>? Heavy coupling is one kind of fragility. Critical bridges are another, dual kind. A modular system held together by a few key bridges can survive a thousand internal failures and die from one cut at the seams.</p>

<!-- =================================================================== -->
<!-- SECTION 12: THEORY OF CONSTRAINTS                                   -->
<!-- =================================================================== -->
  <h2><span class="section-num">12</span> Invention four: managing the flow</h2>

  <p>The three inventions we've covered so far (hierarchy, stigmergy, modularity) are all about structure: how to arrange the nodes and edges. There is a fourth move that is about <em>flow</em>: how work moves through the structure once you've drawn it.</p>

  <p>Imagine an assembly line with five workstations. The first can process ten units per hour. The second, twelve. The third, six. The fourth, ten. The fifth, fifteen. What is the throughput of the line?</p>

  <p>Six. The slowest station is the bottleneck, and the line as a whole moves at the speed of the slowest station no matter how fast the others can run. The faster stations sit idle waiting for the slow one, or they pile work in queues in front of it. Eli Goldratt formalized this in his 1984 book <em>The Goal</em> and called it the <strong>Theory of Constraints</strong>: any system has a binding constraint, and improving anything that isn't the constraint doesn't help. To improve the system, find the constraint, exploit it, elevate it.</p>

<div class="viz-container">
  <div class="viz" id="viz-toc">
    <div class="viz-title">Visualization 12</div>
    <div class="viz-headline">Five stations, one bottleneck.</div>
    <div class="controls" id="toc-sliders">
      <!-- Sliders for each station inserted by JS -->
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="toc-throughput">6</span><span class="label">Throughput / sec</span></div>
        <div class="stat"><span class="num-big" id="toc-wip">0</span><span class="label">Work in progress</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="toc-graph" viewBox="0 0 800 280" style="max-height:340px"></svg>
    <div class="viz-caption">Items flow left to right. Each workstation processes at its capacity. Watch the queues pile up in front of the bottleneck. Drag any station's slider and see how throughput changes (or doesn't).</div>
  </div>
</div>

  <p>The companion law is John Little's, from queueing theory: <strong>L = λW</strong>. The average number of items in a system equals the arrival rate times the average wait time. If you push items in faster than you can pull them out, the queue grows without bound. This holds with no assumptions about the distribution of arrivals or service times. It is universal.</p>

  <p>The reach is enormous. The Toyota Production System was built on it: pull only what the bottleneck can absorb, no faster. Software teams that adopt lean practices set explicit work-in-progress limits on kanban boards to prevent the pipeline from clogging. Cell biology has rate-limiting enzymes that pace entire metabolic pathways. Highways have lane reductions that set the capacity for everything upstream. Hospital emergency departments live and die by their triage nurses. Inside companies, the "one person who has to sign every deal" is the binding constraint on revenue.</p>

  <p>The deepest lesson is one Goldratt put in italics: <em>a system of local optima is not a global optimum</em>. Optimizing every part of the system independently makes things worse, because you generate more work in front of the bottleneck without moving more work out. Coordination is not just an output. Coordination is the work.</p>

  <p>A subtler corollary, which Goldratt called <em>protective capacity</em>: every non-bottleneck station should have slack. Run them flat-out and you produce mountains of inventory ahead of the bottleneck without moving an extra unit through it. Worse, you eliminate the buffer that lets the system absorb the next shock. Taleb makes the same argument under a different name (redundancy as the engineering basis of antifragility). Lean factories that eliminate every gram of slack manufacture fragility on purpose.</p>

<!-- =================================================================== -->
<!-- SECTION 13: FEEDBACK LOOPS                                          -->
<!-- =================================================================== -->
  <h2><span class="section-num">13</span> Dynamics, not just structure</h2>

  <p>Everything in the essay so far has been about static structure: who is connected to whom, who decides what, who hides what. There is another whole axis we've ignored: what happens over time when the system's output feeds back into its input.</p>

  <p>The biggest single insight in systems thinking is that systems with identical structures can behave wildly differently depending on their feedback loops, and almost every important behavior of a complex system is loop behavior, not part behavior.</p>

  <p>Two basic types of loops do most of the work.</p>

  <p>A <strong>reinforcing loop</strong> is one where the output amplifies the input. If A increases B, and B increases A, then any perturbation grows. Compound interest is reinforcing. Viral disease spread is reinforcing. The accumulation of debt is reinforcing. Network effects on a platform are reinforcing. A compounding-complaints culture inside a team is reinforcing. Reinforcing loops produce explosive growth or explosive collapse, depending on the sign of the perturbation. They cannot, by themselves, settle.</p>

  <p>A <strong>balancing loop</strong> is one where the output dampens the input. If A increases B, and B <em>decreases</em> A, then any perturbation gets corrected. A thermostat is balancing. The body's regulation of blood sugar is balancing. A predator population that grows after a prey boom and then crashes is balancing. The price discovery mechanism of a market is balancing. Balancing loops produce stability, oscillation, or homeostasis.</p>

<div class="viz-container">
  <div class="viz" id="viz-feedback">
    <div class="viz-title">Visualization 13</div>
    <div class="viz-headline">Two loops, two completely different worlds.</div>
    <div class="controls">
      <div class="control">
        <label>Loop gain</label>
        <input type="range" id="fb-gain" min="1" max="100" value="40" step="1">
      </div>
      <div class="control">
        <label>Delay (balancing only)</label>
        <input type="range" id="fb-delay" min="0" max="50" value="10" step="1">
      </div>
      <button class="btn" id="fb-restart">Restart</button>
    </div>
    <div class="split">
      <div>
        <div style="font-family:Inter,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:var(--accent);margin-bottom:4px;font-weight:600">Reinforcing loop</div>
        <div style="font-family:Inter,sans-serif;font-size:11px;color:var(--muted);margin-bottom:8px;font-style:italic">Output amplifies input. Viral growth, compound interest, runaway debt.</div>
        <svg class="viz-svg" id="fb-rein" viewBox="0 0 380 240"></svg>
      </div>
      <div>
        <div style="font-family:Inter,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#2c5f8d;margin-bottom:4px;font-weight:600">Balancing loop</div>
        <div style="font-family:Inter,sans-serif;font-size:11px;color:var(--muted);margin-bottom:8px;font-style:italic">Output dampens input. Thermostat, hormones, predator-prey, supply chains.</div>
        <svg class="viz-svg" id="fb-bal" viewBox="0 0 380 240"></svg>
      </div>
    </div>
    <div class="viz-caption">Add delay to a balancing loop and you get oscillation. The classic example: a hot shower in an old hotel. You turn the tap, nothing happens, you turn it more, suddenly scalding, you turn it cold, nothing happens, you turn it more, suddenly freezing.</div>
  </div>
</div>

  <p>The interesting trouble comes from delay. A balancing loop with no delay is a thermostat. A balancing loop with delay is a <em>bullwhip</em>.</p>

  <p>The bullwhip effect in supply chains is one of the most-studied examples in operations research. A small fluctuation in retail demand, amplified by inventory delays at the wholesaler and at the manufacturer, produces enormous oscillations in factory orders. The structure is balancing. The dynamics are chaotic. Beer game simulations regularly produce four-times-original demand swings.</p>

  <p>Cross-domain examples are everywhere. In <strong>biology</strong>, predator-prey populations oscillate because population responses lag environmental signals; the Lotka-Volterra equations are the canonical model. In <strong>software</strong>, retry storms happen when a failing service is hammered by clients whose retry logic doesn't know the service is down; autoscalers chase oscillating load, sometimes amplifying it. In <strong>organizations</strong>, hiring waves overshoot, leading to layoffs that overshoot, leading to hiring waves, on a multi-quarter cycle. In <strong>medicine</strong>, dosing errors compound when the drug's response timeline doesn't match the prescriber's review cadence. In <strong>finance</strong>, markets oscillate because price information has built-in lag from when fundamentals shift to when sentiment catches up.</p>

  <p>The takeaway is this: when you look at a system you suspect is malfunctioning, do not just count edges. Trace loops. Watch for delays. The pathologies of most large systems are not structural. They are dynamic.</p>

<!-- =================================================================== -->
<!-- SECTION 14: ASHBY                                                   -->
<!-- =================================================================== -->
  <h2><span class="section-num">14</span> The deepest law: requisite variety</h2>

  <p>W. Ross Ashby was a British psychiatrist who, in the 1950s, did some of the most important work in the field that came to be called cybernetics. In 1956 he stated a theorem so general that it took decades to appreciate.</p>

  <p>In its smallest form: <em>only variety can destroy variety</em>.</p>

  <p>In slightly less compressed form: for a regulator to keep a system in a desired state, the regulator must have at least as many distinguishable actions (its <em>variety</em>) as the system has distinguishable states. A thermostat with one setting can never regulate a building with variable weather. An immune system with one antibody can never defeat the variety of pathogens it will encounter. A scheduling system with one mode can never handle the variety of cases it must serve.</p>

  <p>This is, in a deep sense, an information-theoretic statement. Shannon's bits live underneath it. Variety is just the log of the number of states. Controlling a system is the act of moving information from the regulator into the system. You cannot inject more information than you possess.</p>

<div class="viz-container">
  <div class="viz" id="viz-ashby">
    <div class="viz-title">Visualization 14</div>
    <div class="viz-headline">Controller smaller than system equals loss of control.</div>
    <div class="controls">
      <div class="control">
        <label>System variety</label>
        <input type="range" id="ash-sys" min="1" max="100" value="60" step="1">
        <span class="value-pill" id="ash-sys-v">60</span>
      </div>
      <div class="control">
        <label>Controller variety</label>
        <input type="range" id="ash-ctl" min="1" max="100" value="35" step="1">
        <span class="value-pill" id="ash-ctl-v">35</span>
      </div>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="ash-gap">25</span><span class="label">Uncontrollable states</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="ash-graph" viewBox="0 0 800 320" style="max-height:380px"></svg>
    <div class="viz-caption">Green cells are states the controller can drive the system into. Red cells are states the system can fall into that the controller has no response for. Push the controller below the system, and a gap opens up. Real-world gaps don't sit there inert; the system finds them.</div>
  </div>
</div>

  <p>Once you have this lens, certain pathologies become easier to name.</p>

  <p>Why does a tax code grow without bound? Because every loophole closure introduces a new state the system must distinguish. The tax authority's variety has to keep up with the variety of human financial behavior, or it loses control. Why does an org with a six-page expense policy fail to handle real expenses? Because actual purchases have variety far beyond what six pages can encode. The result is either bureaucratic gaming (people exploit the gap) or bureaucratic gaps (cases the policy can't cover, decided ad hoc by whoever happens to be available).</p>

  <p>Why does the immune system spend so much energy producing antibody variety? Because requisite variety against an evolving pathogen population requires it. Why does management get harder as team complexity grows? Because the manager's information-processing capacity (recall Dunbar) must scale with the team's state space. Why are simple rules in complex domains so often perverse? Because they lack requisite variety: they regulate one dimension well and lose control of the rest.</p>

  <p>Ashby's Law is the cleanest single statement of why complexity is hard to govern. It tells you, with rigor, that the controller's bandwidth must match the system's bandwidth. There is no shortcut.</p>

  <p>The Bayesian translation, picking up from Section 5, makes the result feel even more rigorous: control requires that the mutual information between controller actions and system state, I(controller; system), be at least equal to the system's entropy. If the controller has fewer bits available than the system has, some states are conditionally indistinguishable from the controller's vantage point, and therefore uncontrollable. Variety, entropy, mutual information, requisite variety. Four words for one quantity.</p>

<!-- =================================================================== -->
<!-- SECTION 15: ANTIFRAGILITY                                           -->
<!-- =================================================================== -->
  <h2><span class="section-num">15</span> When you can't have requisite variety</h2>

  <p>Ashby's Law gives you a hard limit but no escape hatch. In any system rich enough to interest you, the controller will not have enough variety. Markets, biology, organizations, weather, geopolitics. You will always be outgunned. So what do you do?</p>

  <p>The most interesting answer in the last twenty years comes from a Lebanese-American mathematician and trader named Nassim Nicholas Taleb. He stated it in his 2012 book <em>Antifragile</em>. The argument: stop trying to match variety with control variety. Build systems that benefit from variety. Don't try to specify the next state; design so that whichever state arrives, the system is improved by encountering it.</p>

  <p>Taleb's three-way distinction is the simple part. Most things are not just robust or fragile.</p>

  <p style="margin-left:24px"><strong>Fragile</strong> things are harmed by volatility. A porcelain vase. A just-in-time supply chain. An over-leveraged balance sheet. A finance team with one person who understands accruals. The more stress, the more damage. Below some threshold, performance hits zero.<br>
  <strong>Robust</strong> things are indifferent to volatility. A granite outcrop. A well-engineered bridge. A diversified passive portfolio. The variance can shake it without changing it.<br>
  <strong>Antifragile</strong> things are improved by volatility. A muscle (which gains strength from stress). An immune system (which learns from exposure). An evolving species. A market under competitive pressure. A startup that has been knocked around a few times. A team that has run a few near-disasters and survived.</p>

<div class="viz-container">
  <div class="viz" id="viz-antifragile">
    <div class="viz-title">Visualization 15</div>
    <div class="viz-headline">Three response curves to the same stress.</div>
    <div class="controls">
      <div class="control">
        <label>Stress level</label>
        <input type="range" id="af-stress" min="0" max="100" value="35" step="1">
        <span class="value-pill" id="af-stress-v">35</span>
      </div>
      <div class="stat-row" style="margin-left:auto">
        <div class="stat"><span class="num-big" id="af-fragile-v" style="color:#8c3215">88</span><span class="label">Fragile</span></div>
        <div class="stat"><span class="num-big" id="af-robust-v" style="color:#6b7280">60</span><span class="label">Robust</span></div>
        <div class="stat"><span class="num-big" id="af-anti-v" style="color:#5b8a5a">52</span><span class="label">Antifragile</span></div>
      </div>
    </div>
    <svg class="viz-svg" id="af-graph" viewBox="0 0 800 380" style="max-height:420px"></svg>
    <div class="viz-caption">Same shock arrives at every system. The fragile one degrades and eventually breaks. The robust one absorbs the shock without changing. The antifragile one gets stronger. The three are not points on a spectrum, they are three different relationships to volatility.</div>
  </div>
</div>

  <p>The crucial property of antifragile systems is that they use volatility as information. The fragile system has nothing to do with the shock except suffer it. The robust system has nothing to do with the shock except survive it. The antifragile system metabolizes the shock and becomes more capable for next time.</p>

  <p>Three design ingredients show up in nearly every antifragile system you can name.</p>

  <h3>Optionality</h3>

  <p>Each individual bet has small downside and large upside. A muscle fiber tear is small and local; the adaptive response across thousands of fibers is large. A failed startup costs one company; a successful one returns one hundred times. A failed scientific hypothesis costs a paper; a successful one rewrites a field. Convex payoff structures favor the entity that has many small bets going at once. The math is the math: when payoffs are asymmetric in your favor, more shots equal more value, even if most miss.</p>

  <h3>Skin in the game</h3>

  <p>Decision-makers bear the consequences of their decisions. Without this, the feedback loop that produces antifragility breaks. The system cannot learn from its own pain because the people who feel the pain are not the people who get to redesign. This is why "you build it, you run it" works in software engineering. It is why founder-operators tend to build more durable companies than career-CEO administrations. It is why distant policy designers tend to produce Procrustean policies that the ground-level operators end up gaming. The bridge to Conway's Law in the next section is direct: when org structures separate the people who design from the people who feel the consequences, the system you build will be fragile by construction.</p>

  <h3>Via negativa</h3>

  <p>Improvement comes from subtraction more than addition. The first move when a complex system is misbehaving is usually to remove something (a dependency, a meeting, a rule, a person, a metric) rather than add something. Most enterprise complexity grows because every shock is met with new structure to prevent recurrence; antifragility argues the opposite. Most organizations have a hiring committee, a budget committee, and a process-improvement committee. Almost none have a process-removal committee.</p>

  <h3>The bridge back to everything else</h3>

  <p>Ashby says requisite variety is required for control. Antifragility says when you can't have requisite variety, build a system that generates the variety it needs in response to what shows up. Stigmergy is antifragile by construction (more agents equal more parallel search equal more learning from failure). Modularity is a precondition for antifragility (you cannot safely run local experiments if local failures cascade globally). Feedback loops are the mechanism (antifragility is a specific reinforcing pattern where stress feeds adaptation feeds capacity). Theory of constraints sneaks in as Goldratt's argument for "protective capacity" at non-bottlenecks, which is the same idea as Taleb's redundancy and overcompensation. Lean factories that eliminate every gram of slack manufacture fragility on purpose.</p>

  <p>Antifragility is not free. It requires that the system can lose the parts that fail without losing the whole. A single muscle fiber can tear because there are thousands more. A startup can fail because there are thousands more. A single scientific paper can be wrong because the literature has other paths. When the unit of failure equals the unit of survival (your one head, your one company, your one nation in a nuclear exchange), antifragility is not available. For those cases you need the <strong>barbell</strong>: pair extreme safety with extreme risk-taking, and avoid the middle. A 90/10 portfolio of cash and venture bets is barbell. A career that combines a tenured day job with side projects is barbell. A research program that mixes incremental work with a few moonshots is barbell. The middle (a moderately risky bet on a moderately leveraged everything) is where the Black Swans eat you.</p>

<hr>

<!-- =================================================================== -->
<!-- SECTION 16: CONWAY                                                  -->
<!-- =================================================================== -->
  <h2><span class="section-num">16</span> The mirror: Conway's Law</h2>

  <p>In 1968, an engineer named Mel Conway wrote a paper called <em>How Do Committees Invent?</em> The Harvard Business Review rejected it for not proving its thesis. It became famous anyway, named "Conway's Law" by Fred Brooks a few years later. The thesis, in one sentence:</p>

  <div class="pull">Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure.</div>

  <p>If your engineering team is split into a frontend group and a backend group, your software will have a frontend and a backend, and an interface between them, and that interface will be exactly as good or as bad as the relationship between the two teams. If your sales and product teams don't talk, your sales motion and your product won't fit together. The shape of the org <em>becomes</em> the shape of the thing it builds.</p>

  <p>It's not a metaphor. It's a structural consequence of the connection-counting we've been doing all along. The system's edges have to flow through someone, and the someones are connected the way the org is connected.</p>

<div class="viz-container">
  <div class="viz" id="viz-conway">
    <div class="viz-title">Visualization 16</div>
    <div class="viz-headline">Pick an org structure. The architecture follows.</div>
    <div class="controls">
      <button class="btn active" data-org="siloed">Siloed by function</button>
      <button class="btn" data-org="product">Cross-functional product teams</button>
      <button class="btn" data-org="matrix">Matrix</button>
      <button class="btn" data-org="hub">Centralized platform team</button>
    </div>
    <div class="split">
      <div>
        <div style="font-family:Inter,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);margin-bottom:6px;font-weight:600">Organization</div>
        <svg class="viz-svg" id="cw-org" viewBox="0 0 380 360"></svg>
      </div>
      <div>
        <div style="font-family:Inter,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);margin-bottom:6px;font-weight:600">System it builds</div>
        <svg class="viz-svg" id="cw-sys" viewBox="0 0 380 360"></svg>
      </div>
    </div>
    <div class="viz-caption">Same eight people, four ways of arranging them. Each arrangement produces a system whose seams sit exactly where the org's seams sit.</div>
  </div>
</div>

  <p>Conway's Law is the bridge between every previous section. The cognitive limit on connections (Dunbar) shapes the org. The org (per Conway) shapes the system. The system inherits the org's coupling and the org's feedback loops. When the system stops scaling, the org reorganizes, only to find that the new org produces a new system with its own <em>n</em>&sup2; problem in a new place. Ashby's Law then guarantees that any control regime you place on top of the new org will eventually be outrun by the variety of what the org has to do.</p>

  <p>The Taleb addendum is sharper. <em>Skin in the game</em> says decision-makers should bear the consequences of their decisions. When org structures separate the people who design from the people who operate (the classic Conway pathology where architects throw plans over the wall to engineers, or where strategy decks are written by people who will never feel the consequences), the feedback loop that produces antifragility is broken. The system cannot learn from its own pain because the people who feel the pain are not the people who get to redesign. This is, in software, why "you build it, you run it" works. It is, in finance, why policies designed by people who do not operate budgets tend to be technically correct and operationally hostile. Conway's Law tells you that org shape becomes system shape. Skin in the game tells you which org shapes produce systems that learn.</p>

<!-- =================================================================== -->
<!-- SECTION 17: BIG-O                                                   -->
<!-- =================================================================== -->
  <h2><span class="section-num">17</span> The same shape, in code</h2>

  <p>If you've spent any time around engineers, you've heard them mutter about "O(<em>n</em>&sup2;)" the way doctors mutter about cholesterol. It's the same idea we've been chasing, written in a different alphabet.</p>

  <p>Big-O notation describes how the <em>work</em> of an algorithm grows as the <em>input</em> gets bigger. Imagine looking someone up in a phone book.</p>

  <p style="margin-left:24px"><strong>O(1)</strong>: You know the page. Flip to it. Same effort no matter the book.<br>
  <strong>O(log&nbsp;n)</strong>: Open the middle of the book. Decide which half. Repeat. Double the book, add one step.<br>
  <strong>O(n)</strong>: Read every name. Twice the book, twice the work.<br>
  <strong>O(n&nbsp;log&nbsp;n)</strong>: Sort the whole book. The practical ceiling for "scales gracefully."<br>
  <strong>O(n&sup2;)</strong>: Compare every person against every other person. Twice the book, four times the work.<br>
  <strong>O(2<sup>n</sup>)</strong>: Try every possible subset. Each new entry <em>doubles</em> the work. Tractable only for tiny <em>n</em>.</p>

<div class="viz-container">
  <div class="viz" id="viz-bigo">
    <div class="viz-title">Visualization 17</div>
    <div class="viz-headline">Six curves, all starting from the same place.</div>
    <div class="controls">
      <div class="control">
        <label>Input size n</label>
        <input type="range" id="bo-n" min="1" max="40" value="10" step="1">
        <span class="value-pill" id="bo-n-v">10</span>
      </div>
      <button class="btn" id="bo-log">Toggle log scale</button>
    </div>
    <svg class="viz-svg" id="bo-graph" viewBox="0 0 800 420" style="max-height:460px"></svg>
    <div class="viz-caption">The lesson isn't really about algorithms. The same family of shapes appears every time humans deal with more than a few interconnected things. The engineer's O(<em>n</em>&sup2;) and the executive's "we have a coordination problem" are the same animal.</div>
  </div>
</div>

<!-- =================================================================== -->
<!-- SECTION 18: EMERGENCE                                               -->
<!-- =================================================================== -->
  <h2><span class="section-num">18</span> The twist: emergence</h2>

  <p>You'd be forgiven, by now, for thinking complexity is purely a problem. It isn't. The same node-and-edge math that creates coordination costs also produces the most interesting behavior in the universe.</p>

  <p>In 1987, a graphics researcher named Craig Reynolds wanted to animate a flock of birds without scripting each one. He gave each simulated bird (he called them "boids") three local rules:</p>

  <ol style="font-family:Inter,sans-serif;font-size:16px;line-height:1.7;margin:18px 0">
    <li><strong>Separation:</strong> steer to avoid crowding your neighbors.</li>
    <li><strong>Alignment:</strong> steer toward the average heading of your neighbors.</li>
    <li><strong>Cohesion:</strong> steer toward the average position of your neighbors.</li>
  </ol>

  <p>No bird sees the whole flock. No leader gives orders. And yet, from those three local rules, flocking emerges. Turn the rules on and off below.</p>

<div class="viz-container">
  <div class="viz" id="viz-boids">
    <div class="viz-title">Visualization 18</div>
    <div class="viz-headline">Three local rules. One global pattern.</div>
    <div class="controls">
      <div class="control">
        <label>Separation</label>
        <input type="range" id="b-sep" min="0" max="200" value="120" step="1">
      </div>
      <div class="control">
        <label>Alignment</label>
        <input type="range" id="b-ali" min="0" max="200" value="100" step="1">
      </div>
      <div class="control">
        <label>Cohesion</label>
        <input type="range" id="b-coh" min="0" max="200" value="60" step="1">
      </div>
      <button class="btn" id="b-zero">All rules off</button>
      <button class="btn accent" id="b-default">Reset to flocking</button>
    </div>
    <svg class="viz-svg" id="b-graph" viewBox="0 0 800 380" style="max-height:420px;background:#f5f1e8;border-radius:4px"></svg>
    <div class="viz-caption">Turn all three rules to zero and you'll see chaos: ninety dots wandering with no purpose. Turn them up and birds start agreeing with each other about where to go without anyone ever telling them where that is.</div>
  </div>
</div>

  <p>This is <strong>emergence</strong>: when local rules between many simple parts produce a global pattern that no single part contains. Ant colonies do this (and we saw it in section 7). Markets do this. Neurons do this. Cells do this. Cities do this. Companies do this, sometimes on purpose and sometimes not.</p>

  <p>Emergence is the answer to the question "why do we ever build complex systems at all?" The complexity isn't an accident. It's the entire point. A brain is a hundred billion neurons cooperating to do something none of them can do alone. A company is a few hundred or a few thousand people doing the same. The interesting behavior lives <em>in the connections</em>.</p>

  <p>Which is what makes complexity such an awkward thing. You can't have the emergent behavior without paying the connection cost. The work of being a large, capable, alive system is mostly the work of paying that bill without going bankrupt.</p>

<hr>

<!-- =================================================================== -->
<!-- SECTION 19: CLOSING                                                 -->
<!-- =================================================================== -->
  <h2><span class="section-num">19</span> One shape, many disciplines</h2>

  <p>So: a curve, a handful of moves, and a couple of laws.</p>

  <p>The curve is <em>n</em>&sup2;, softened in real systems by power-law distributions that concentrate connectivity into hubs (and bring Black Swans with them). The moves are <em>bounded attention</em>, <em>hierarchy</em>, <em>stigmergy</em>, <em>modularity</em>, <em>stacked abstraction layers</em>, <em>managing connection strength</em>, <em>managing flow through the bottleneck</em>, and the structural reality of Conway's Law that mirrors communication into product. The laws are Shannon's information theorem (information is surprise, and it costs to move), Bayes' rule (the algorithm for moving information from evidence into beliefs), Little's Law (queues are inevitable wherever flow meets capacity), and Ashby's Law of Requisite Variety (control requires matching bandwidth). Then dynamics: feedback loops and delays, which make systems with identical structures behave nothing alike. When variety cannot be matched, the move is antifragility: build a system that benefits from what it cannot predict, with optionality, skin in the game, and via negativa. When that is not available either, barbell. And underneath all of it, the same connectivity that makes complexity expensive is what makes it useful in the first place.</p>

  <p>You can now look at any sufficiently large system (a company, a city, a codebase, a brain, a supply chain, a colony, an ecosystem) and ask:</p>

  <ul style="font-family:'Source Serif 4',serif;font-size:19px;line-height:1.7;margin:20px 0 28px;padding-left:24px">
    <li>How many real edges does this thing have, and how are they distributed?</li>
    <li>How strong are those edges? Which are heavy, which are bridges?</li>
    <li>Where is the hierarchy, and what is it hiding? Where is stigmergy doing real work?</li>
    <li>What are the abstraction layers, and which one is leaking right now?</li>
    <li>Where is the bottleneck, and how long is the queue in front of it?</li>
    <li>What are the dominant feedback loops, and what delays are they hiding?</li>
    <li>Does the controller have requisite variety for what it's trying to govern?</li>
    <li>What does the communication structure look like, and what is it forcing the system to build?</li>
    <li>What emergent behavior is the system getting in exchange for all that coupling?</li>
    <li>Where is the system fragile, robust, or antifragile, and have you matched the design to the kind of failure you can survive?</li>
  </ul>

  <p>If those questions feel useful, the rest is just substitution.</p>


<script>
// ============================================================
// COLOR HELPERS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

const cs = getComputedStyle(document.documentElement);
const gv = function(n) { return cs.getPropertyValue(n).trim(); };
const PALETTE = {
  ink:        gv('--text')    || '#141413',
  inkSoft:    '#3a4862',
  muted:      gv('--muted')   || '#7c7c74',
  rule:       gv('--border')  || '#e7e2d6',
  ruleSoft:   gv('--surface') || '#f3eee2',
  panel:      gv('--bg')      || '#faf9f5',
  bg:         gv('--bg')      || '#faf9f5',
  accent:     gv('--accent')  || '#d47f2a',
  accentSoft: '#edc9a5',
  blue:       '#2c5f8d',
  blueSoft:   '#7da3c5',
  green:      '#5b8a5a',
  gold:       '#c9a227',
  purple:     '#6b5b95',
};

// ============================================================
// VIZ 1: METCALFE
// ============================================================
(function() {
  const W = 380, H = 380;
  const graph = d3.select('#m-graph');
  const chart = d3.select('#m-chart');
  const slider = document.getElementById('m-nodes');
  const nv = document.getElementById('m-nodes-v');
  const conn = document.getElementById('m-conn');

  const margin = { top: 28, right: 24, bottom: 40, left: 56 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  const x = d3.scaleLinear().domain([2, 40]).range([0, cw]);
  const y = d3.scaleLinear().domain([0, 40 * 39 / 2]).range([ch, 0]);

  const cg = chart.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  cg.append('g')
    .attr('transform', `translate(0,${ch})`)
    .call(d3.axisBottom(x).ticks(5).tickSize(-ch).tickPadding(8))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
    .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px'));

  cg.append('g')
    .call(d3.axisLeft(y).ticks(4).tickSize(-cw).tickPadding(8))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
    .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px'));

  cg.append('text').text('Nodes')
    .attr('x', cw / 2).attr('y', ch + 32)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.inkSoft)
    .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');
  cg.append('text').text('Connections')
    .attr('transform', `rotate(-90)`).attr('x', -ch / 2).attr('y', -42)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.inkSoft)
    .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');

  const curveData = d3.range(2, 41).map(n => ({ n, c: n * (n - 1) / 2 }));
  const line = d3.line().x(d => x(d.n)).y(d => y(d.c)).curve(d3.curveMonotoneX);
  cg.append('path').datum(curveData)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', PALETTE.accent)
    .attr('stroke-width', 2.5);

  cg.append('line')
    .attr('x1', x(2)).attr('y1', y(2))
    .attr('x2', x(40)).attr('y2', y(40))
    .attr('stroke', PALETTE.blueSoft)
    .attr('stroke-width', 1.5)
    .attr('stroke-dasharray', '3,3');

  cg.append('text').text('nodes (n)')
    .attr('x', x(40) - 4).attr('y', y(40) + 14)
    .attr('text-anchor', 'end').attr('fill', PALETTE.blue)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-style', 'italic');

  cg.append('text').text('connections (~n²)')
    .attr('x', x(40) - 4).attr('y', y(40 * 39 / 2) + 14)
    .attr('text-anchor', 'end').attr('fill', PALETTE.accent)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600').style('font-style', 'italic');

  const dot = cg.append('circle').attr('r', 6).attr('fill', PALETTE.accent).attr('stroke', PALETTE.bg).attr('stroke-width', 2);
  const dotLabel = cg.append('text').attr('fill', PALETTE.ink).style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600');

  function render(n) {
    nv.textContent = n;
    const c = n * (n - 1) / 2;
    conn.textContent = c;

    graph.selectAll('*').remove();
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) / 2 - 30;
    const nodes = d3.range(n).map(i => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    });
    const links = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) links.push({ s: i, t: j });

    graph.append('g').selectAll('line').data(links).join('line')
      .attr('x1', d => nodes[d.s].x).attr('y1', d => nodes[d.s].y)
      .attr('x2', d => nodes[d.t].x).attr('y2', d => nodes[d.t].y)
      .attr('stroke', PALETTE.accent)
      .attr('stroke-width', 0.6)
      .attr('opacity', Math.max(0.15, 1 - n / 50));

    graph.append('g').selectAll('circle').data(nodes).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', Math.max(3, 8 - n / 8))
      .attr('fill', PALETTE.ink)
      .attr('stroke', PALETTE.bg)
      .attr('stroke-width', 1.5);

    dot.transition().duration(180).attr('cx', x(n)).attr('cy', y(c));
    dotLabel.transition().duration(180)
      .attr('x', x(n) + 10).attr('y', y(c) - 10)
      .text(`${n} nodes → ${c} edges`);
  }

  slider.addEventListener('input', e => render(+e.target.value));
  render(6);
})();

// ============================================================
// VIZ 2: POWER LAWS / NETWORK TYPES
// ============================================================
(function() {
  const W = 280, H = 240;
  const N = 40;
  const targetEdges = 70;

  function buildER() {
    const nodes = d3.range(N).map(i => ({ id: i }));
    const links = [];
    const seen = new Set();
    while (links.length < targetEdges) {
      const a = Math.floor(Math.random() * N);
      const b = Math.floor(Math.random() * N);
      if (a === b) continue;
      const key = Math.min(a, b) + '-' + Math.max(a, b);
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ source: a, target: b });
    }
    return { nodes, links };
  }

  function buildWS() {
    const nodes = d3.range(N).map(i => ({ id: i }));
    const links = [];
    const seen = new Set();
    const k = 4; // each node connects to k nearest
    for (let i = 0; i < N; i++) {
      for (let j = 1; j <= k / 2; j++) {
        const t = (i + j) % N;
        const key = Math.min(i, t) + '-' + Math.max(i, t);
        if (!seen.has(key)) { seen.add(key); links.push({ source: i, target: t }); }
      }
    }
    // Rewire with prob p
    const p = 0.15;
    links.forEach(l => {
      if (Math.random() < p) {
        let nt;
        do { nt = Math.floor(Math.random() * N); }
        while (nt === l.source || seen.has(Math.min(l.source, nt) + '-' + Math.max(l.source, nt)));
        seen.delete(Math.min(l.source, l.target) + '-' + Math.max(l.source, l.target));
        l.target = nt;
        seen.add(Math.min(l.source, l.target) + '-' + Math.max(l.source, l.target));
      }
    });
    return { nodes, links };
  }

  function buildBA() {
    const nodes = [{ id: 0 }, { id: 1 }, { id: 2 }];
    const links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 0, target: 2 }
    ];
    const degrees = [2, 2, 2];
    const m = 2;
    for (let i = 3; i < N; i++) {
      const totalDeg = degrees.reduce((a, b) => a + b, 0);
      const chosen = new Set();
      while (chosen.size < m) {
        let r = Math.random() * totalDeg;
        let acc = 0;
        for (let j = 0; j < degrees.length; j++) {
          acc += degrees[j];
          if (r <= acc) { chosen.add(j); break; }
        }
      }
      degrees.push(0);
      chosen.forEach(j => {
        links.push({ source: i, target: j });
        degrees[i]++;
        degrees[j]++;
      });
      nodes.push({ id: i });
    }
    return { nodes, links };
  }

  function simulate(graph) {
    const sim = d3.forceSimulation(graph.nodes)
      .force('charge', d3.forceManyBody().strength(-30))
      .force('link', d3.forceLink(graph.links).id(d => d.id).distance(22).strength(0.7))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collide', d3.forceCollide(6))
      .stop();
    for (let i = 0; i < 250; i++) sim.tick();
    // Compute degree
    const deg = new Map();
    graph.nodes.forEach(n => deg.set(n.id, 0));
    graph.links.forEach(l => {
      deg.set(l.source.id, (deg.get(l.source.id) || 0) + 1);
      deg.set(l.target.id, (deg.get(l.target.id) || 0) + 1);
    });
    graph.nodes.forEach(n => { n.degree = deg.get(n.id); });
    return graph;
  }

  const graphs = {
    er: simulate(buildER()),
    ws: simulate(buildWS()),
    ba: simulate(buildBA())
  };

  const failed = { er: new Set(), ws: new Set(), ba: new Set() };
  let highlightHubs = false;

  function drawGraph(svgSel, g, key) {
    svgSel.selectAll('*').remove();
    const isFailed = (i) => failed[key].has(i);
    const visibleNodes = g.nodes.filter(n => !isFailed(n.id));
    const visibleLinks = g.links.filter(l => !isFailed(l.source.id) && !isFailed(l.target.id));

    // Compute connected components for visual feedback
    svgSel.append('g').selectAll('line').data(visibleLinks).join('line')
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      .attr('stroke', PALETTE.inkSoft).attr('stroke-width', 0.7).attr('opacity', 0.5);

    svgSel.append('g').selectAll('circle').data(visibleNodes).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', d => {
        const base = Math.max(2.5, Math.min(8, 2 + Math.sqrt(d.degree)));
        return highlightHubs && d.degree >= 6 ? base + 2 : base;
      })
      .attr('fill', d => highlightHubs && d.degree >= 6 ? PALETTE.accent : PALETTE.ink)
      .attr('stroke', PALETTE.bg)
      .attr('stroke-width', 1)
      .attr('opacity', 0.95);
  }

  function drawHist(svgSel, g) {
    svgSel.selectAll('*').remove();
    const W = 280, H = 120;
    const degrees = g.nodes.filter(n => !failed[Object.keys(graphs).find(k => graphs[k] === g)].has(n.id)).map(n => n.degree);
    const maxD = Math.max(12, d3.max(degrees) || 0);
    const bins = d3.range(0, maxD + 2).map(d => ({ d, count: 0 }));
    degrees.forEach(d => { if (bins[d]) bins[d].count++; });
    const x = d3.scaleLinear().domain([0, maxD + 1]).range([20, W - 8]);
    const y = d3.scaleLinear().domain([0, Math.max(5, d3.max(bins, b => b.count) || 0)]).range([H - 22, 6]);

    svgSel.append('g').selectAll('rect').data(bins).join('rect')
      .attr('x', d => x(d.d))
      .attr('y', d => y(d.count))
      .attr('width', Math.max(2, (W - 28) / (maxD + 1) - 1))
      .attr('height', d => H - 22 - y(d.count))
      .attr('fill', PALETTE.accent).attr('opacity', 0.7);

    // X axis baseline
    svgSel.append('line').attr('x1', 20).attr('x2', W - 8).attr('y1', H - 22).attr('y2', H - 22)
      .attr('stroke', PALETTE.rule);
    svgSel.append('text').text('degree').attr('x', W / 2).attr('y', H - 6)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
      .style('font-family', 'Inter').style('font-size', '10px');
    svgSel.append('text').text('0').attr('x', 20).attr('y', H - 10)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
      .style('font-family', 'Inter').style('font-size', '9px');
    svgSel.append('text').text(maxD + 1).attr('x', W - 8).attr('y', H - 10)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
      .style('font-family', 'Inter').style('font-size', '9px');
  }

  function renderAll() {
    drawGraph(d3.select('#pw-er'), graphs.er, 'er');
    drawGraph(d3.select('#pw-ws'), graphs.ws, 'ws');
    drawGraph(d3.select('#pw-ba'), graphs.ba, 'ba');
    drawHist(d3.select('#pw-er-hist'), graphs.er);
    drawHist(d3.select('#pw-ws-hist'), graphs.ws);
    drawHist(d3.select('#pw-ba-hist'), graphs.ba);
  }

  document.getElementById('pw-rebuild').addEventListener('click', () => {
    failed.er.clear(); failed.ws.clear(); failed.ba.clear();
    graphs.er = simulate(buildER());
    graphs.ws = simulate(buildWS());
    graphs.ba = simulate(buildBA());
    renderAll();
  });
  document.getElementById('pw-hub').addEventListener('click', () => {
    highlightHubs = !highlightHubs;
    renderAll();
  });
  document.getElementById('pw-fail-random').addEventListener('click', () => {
    Object.keys(graphs).forEach(k => {
      const g = graphs[k];
      const alive = g.nodes.filter(n => !failed[k].has(n.id));
      if (alive.length) {
        const target = alive[Math.floor(Math.random() * alive.length)];
        failed[k].add(target.id);
      }
    });
    renderAll();
  });
  document.getElementById('pw-fail-hub').addEventListener('click', () => {
    Object.keys(graphs).forEach(k => {
      const g = graphs[k];
      const alive = g.nodes.filter(n => !failed[k].has(n.id));
      alive.sort((a, b) => b.degree - a.degree);
      if (alive.length) failed[k].add(alive[0].id);
    });
    renderAll();
  });

  renderAll();
})();

// ============================================================
// VIZ 3: SHANNON ENTROPY
// ============================================================
(function() {
  const out = document.getElementById('shannon-output');
  const sources = {
    fair: { name: 'Fair coin', outcomes: ['Heads', 'Tails'], probs: [0.5, 0.5], H: 1 },
    weighted: { name: 'Weighted coin (90/10)', outcomes: ['Heads', 'Tails'], probs: [0.9, 0.1], H: -0.9 * Math.log2(0.9) - 0.1 * Math.log2(0.1) },
    die: { name: 'Six-sided die', outcomes: ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'], probs: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6], H: Math.log2(6) },
    rigged: { name: 'Two-headed coin', outcomes: ['Heads'], probs: [1.0], H: 0 }
  };

  function roll(key) {
    const src = sources[key];
    let r = Math.random(), idx = 0, acc = 0;
    for (let i = 0; i < src.probs.length; i++) { acc += src.probs[i]; if (r <= acc) { idx = i; break; } }
    const outcome = src.outcomes[idx];
    const surprise = src.probs[idx] > 0 ? -Math.log2(src.probs[idx]) : 0;
    const barW = Math.min(280, Math.max(4, src.H * 100));
    out.innerHTML = `
      <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-end">
        <div>
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);font-weight:600">Source</div>
          <div style="font-size:18px;font-weight:600;color:var(--text);margin-top:4px">${src.name}</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);font-weight:600">Result</div>
          <div style="font-size:32px;font-weight:700;color:var(--accent);margin-top:0px;line-height:1.1">${outcome}</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);font-weight:600">Surprise of this result</div>
          <div style="font-size:18px;font-weight:600;color:var(--text);margin-top:4px">${surprise.toFixed(2)} bits</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);font-weight:600">Average surprise (entropy)</div>
          <div style="font-size:18px;font-weight:600;color:var(--text);margin-top:4px;display:flex;align-items:center">
            ${src.H.toFixed(2)} bits
            <span class="bits-bar" style="width:${barW}px"></span>
          </div>
        </div>
      </div>
      <div style="margin-top:14px;font-size:13px;color:var(--muted);font-style:italic">A bit is one yes/no question. Two bits equals four equally likely possibilities. Three bits equals eight. Surprise compounds in powers of two.</div>
    `;
  }

  document.querySelectorAll('#viz-shannon .btn').forEach(b => b.addEventListener('click', () => roll(b.dataset.source)));
})();

// ============================================================
// VIZ 4: FLOW
// ============================================================
(function() {
  const W = 800, H = 360;
  const svg = d3.select('#f-graph');
  const slider = document.getElementById('f-nodes');
  const nv = document.getElementById('f-nodes-v');
  const edgesEl = document.getElementById('f-edges');
  const rateEl = document.getElementById('f-rate');

  let nodes = [], links = [];
  let particles = [];
  let n = 5;
  const linksLayer = svg.append('g');
  const particlesLayer = svg.append('g');
  const nodesLayer = svg.append('g');

  function rebuild(N) {
    n = N;
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) / 2 - 50;
    nodes = d3.range(N).map(i => {
      const a = (i / N) * 2 * Math.PI - Math.PI / 2;
      return { id: i, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    });
    links = [];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) links.push({ s: i, t: j });

    linksLayer.selectAll('line').data(links).join('line')
      .attr('x1', d => nodes[d.s].x).attr('y1', d => nodes[d.s].y)
      .attr('x2', d => nodes[d.t].x).attr('y2', d => nodes[d.t].y)
      .attr('stroke', PALETTE.rule)
      .attr('stroke-width', 1);

    nodesLayer.selectAll('circle').data(nodes).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', 7)
      .attr('fill', PALETTE.ink)
      .attr('stroke', PALETTE.bg)
      .attr('stroke-width', 2);

    edgesEl.textContent = links.length;
    rateEl.textContent = links.length * 2;
    nv.textContent = N;
    particles = [];
  }

  function spawn() {
    if (particles.length > 200) return;
    const link = links[Math.floor(Math.random() * links.length)];
    if (!link) return;
    particles.push({
      s: link.s, t: link.t, t0: performance.now(),
      duration: 1400 + Math.random() * 600,
      dir: Math.random() < 0.5 ? 1 : -1
    });
  }

  function tick() {
    const now = performance.now();
    particles = particles.filter(p => (now - p.t0) < p.duration);
    const data = particles.map(p => {
      const u = (now - p.t0) / p.duration;
      const t = p.dir > 0 ? u : 1 - u;
      const a = nodes[p.s], b = nodes[p.t];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, u };
    });
    particlesLayer.selectAll('circle').data(data).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', 2.5)
      .attr('fill', PALETTE.accent)
      .attr('opacity', d => 1 - Math.abs(0.5 - d.u) * 1.5);
    requestAnimationFrame(tick);
  }

  setInterval(() => { for (let i = 0; i < Math.max(1, Math.floor(links.length / 6)); i++) spawn(); }, 150);

  slider.addEventListener('input', e => rebuild(+e.target.value));
  rebuild(5);
  requestAnimationFrame(tick);
})();

// ============================================================
// VIZ 5: BAYESIAN NETWORK
// ============================================================
(function() {
  const W = 800, H = 360;
  const svg = d3.select('#by-graph');
  const resetBtn = document.getElementById('by-reset');

  // Define arrow marker
  const defs = svg.append('defs');
  defs.append('marker')
    .attr('id', 'arrow-bayes')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 8).attr('refY', 0)
    .attr('markerWidth', 8).attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', PALETTE.inkSoft);

  // CPTs: P(X | parents)
  function jointProb(c, r, s, w) {
    const pC = 0.5;
    const pR = c ? (r ? 0.8 : 0.2) : (r ? 0.2 : 0.8);
    const pS = c ? (s ? 0.1 : 0.9) : (s ? 0.5 : 0.5);
    let pW;
    if (r && s) pW = w ? 0.99 : 0.01;
    else if (r && !s) pW = w ? 0.90 : 0.10;
    else if (!r && s) pW = w ? 0.90 : 0.10;
    else pW = w ? 0.00 : 1.00;
    return pC * pR * pS * pW;
  }

  // evidence: { C, R, S, W } each value in {true, false, null}
  let evidence = { C: null, R: null, S: null, W: null };

  function marginal(varName) {
    let numer = 0, denom = 0;
    for (const c of [true, false]) {
      if (evidence.C !== null && evidence.C !== c) continue;
      for (const r of [true, false]) {
        if (evidence.R !== null && evidence.R !== r) continue;
        for (const s of [true, false]) {
          if (evidence.S !== null && evidence.S !== s) continue;
          for (const w of [true, false]) {
            if (evidence.W !== null && evidence.W !== w) continue;
            const p = jointProb(c, r, s, w);
            const vars = { C: c, R: r, S: s, W: w };
            denom += p;
            if (vars[varName] === true) numer += p;
          }
        }
      }
    }
    return denom > 0 ? numer / denom : 0;
  }

  const nodes = [
    { key: 'C', label: 'Cloudy', x: 400, y: 60 },
    { key: 'R', label: 'Rain', x: 220, y: 180 },
    { key: 'S', label: 'Sprinkler', x: 580, y: 180 },
    { key: 'W', label: 'Wet grass', x: 400, y: 300 }
  ];

  const edges = [
    { from: 'C', to: 'R' },
    { from: 'C', to: 'S' },
    { from: 'R', to: 'W' },
    { from: 'S', to: 'W' }
  ];

  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.key] = n);

  // Edges layer
  const edgesLayer = svg.append('g');
  edges.forEach(e => {
    const a = nodeMap[e.from], b = nodeMap[e.to];
    // Compute endpoints that stop just outside the node rectangles
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len, ny = dy / len;
    const rectHalfW = 65, rectHalfH = 28;
    const tCut = Math.min(rectHalfW / Math.abs(nx || 1e-9), rectHalfH / Math.abs(ny || 1e-9));
    const x1 = a.x + nx * tCut;
    const y1 = a.y + ny * tCut;
    const x2 = b.x - nx * (tCut + 4);
    const y2 = b.y - ny * (tCut + 4);
    edgesLayer.append('line')
      .attr('x1', x1).attr('y1', y1)
      .attr('x2', x2).attr('y2', y2)
      .attr('stroke', PALETTE.inkSoft).attr('stroke-width', 1.8)
      .attr('marker-end', 'url(#arrow-bayes)');
  });

  // Nodes layer
  const nodesLayer = svg.append('g');

  function nodeColor(state) {
    if (state === true) return PALETTE.green;
    if (state === false) return PALETTE.accent;
    return PALETTE.panel;
  }
  function textColor(state) {
    if (state === true || state === false) return '#ffffff';
    return PALETTE.ink;
  }
  function subColor(state) {
    if (state === true || state === false) return 'rgba(255,255,255,0.85)';
    return PALETTE.muted;
  }

  function render() {
    nodes.forEach(n => {
      n.state = evidence[n.key];
      n.prob = marginal(n.key);
    });

    const nodeG = nodesLayer.selectAll('g.bnode').data(nodes, d => d.key)
      .join(
        enter => {
          const g = enter.append('g').attr('class', 'bnode')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (e, d) => {
              const cur = evidence[d.key];
              if (cur === null) evidence[d.key] = true;
              else if (cur === true) evidence[d.key] = false;
              else evidence[d.key] = null;
              render();
            });
          g.append('rect').attr('class', 'bnode-rect');
          g.append('text').attr('class', 'bnode-label');
          g.append('text').attr('class', 'bnode-prob');
          g.append('rect').attr('class', 'bnode-bar-bg');
          g.append('rect').attr('class', 'bnode-bar');
          return g;
        },
        update => update,
        exit => exit.remove()
      );

    nodeG.select('rect.bnode-rect')
      .attr('x', -65).attr('y', -28)
      .attr('width', 130).attr('height', 56)
      .attr('rx', 6)
      .attr('fill', d => nodeColor(d.state))
      .attr('stroke', d => d.state === null ? PALETTE.ink : nodeColor(d.state))
      .attr('stroke-width', 2);

    nodeG.select('text.bnode-label')
      .attr('x', 0).attr('y', -8)
      .attr('text-anchor', 'middle')
      .attr('fill', d => textColor(d.state))
      .style('font-family', 'Inter').style('font-size', '14px').style('font-weight', '600')
      .text(d => d.label);

    nodeG.select('text.bnode-prob')
      .attr('x', 0).attr('y', 10)
      .attr('text-anchor', 'middle')
      .attr('fill', d => subColor(d.state))
      .style('font-family', 'Inter').style('font-size', '11px')
      .text(d => {
        if (d.state === true) return 'OBSERVED: TRUE';
        if (d.state === false) return 'OBSERVED: FALSE';
        return `P(true) = ${(d.prob * 100).toFixed(1)}%`;
      });

    // Probability bar
    nodeG.select('rect.bnode-bar-bg')
      .attr('x', -55).attr('y', 16)
      .attr('width', 110).attr('height', 5)
      .attr('rx', 2)
      .attr('fill', d => d.state === null ? PALETTE.ruleSoft : 'rgba(255,255,255,0.3)');

    nodeG.select('rect.bnode-bar')
      .attr('x', -55).attr('y', 16)
      .attr('width', d => 110 * (d.state === true ? 1 : d.state === false ? 0 : d.prob))
      .attr('height', 5).attr('rx', 2)
      .attr('fill', d => d.state === null ? PALETTE.accent : 'rgba(255,255,255,0.9)');
  }

  resetBtn.addEventListener('click', () => {
    evidence = { C: null, R: null, S: null, W: null };
    render();
  });

  render();
})();

// ============================================================
// VIZ 6: DUNBAR
// ============================================================
(function() {
  const W = 800, H = 420;
  const svg = d3.select('#d-graph');
  const slider = document.getElementById('d-nodes');
  const nv = document.getElementById('d-nodes-v');
  const withinEl = document.getElementById('d-within');
  const beyondEl = document.getElementById('d-beyond');

  const cx = W / 2, cy = H / 2;
  const layers = [
    { name: 'intimates', count: 5, r: 32, color: '#c75432' },
    { name: 'close friends', count: 15, r: 64, color: '#d97c5c' },
    { name: 'good friends', count: 50, r: 110, color: '#e8a48b' },
    { name: 'meaningful', count: 150, r: 165, color: '#7da3c5' }
  ];

  const ringsLayer = svg.append('g');
  ringsLayer.selectAll('circle').data(layers).join('circle')
    .attr('cx', cx).attr('cy', cy).attr('r', d => d.r)
    .attr('fill', 'none').attr('stroke', PALETTE.rule)
    .attr('stroke-width', 1).attr('stroke-dasharray', '2,4');

  ringsLayer.selectAll('text').data(layers).join('text')
    .text(d => `${d.count} ${d.name}`)
    .attr('x', cx).attr('y', d => cy - d.r - 5)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
    .style('font-family', 'Inter').style('font-size', '10px').style('font-weight', '500');

  ringsLayer.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 165)
    .attr('fill', 'none').attr('stroke', PALETTE.accent).attr('stroke-width', 1.5);

  const focal = svg.append('circle')
    .attr('cx', cx).attr('cy', cy).attr('r', 8)
    .attr('fill', PALETTE.accent).attr('stroke', PALETTE.bg).attr('stroke-width', 2.5);

  const dotsLayer = svg.append('g');

  const positions = [];
  function buildPositions() {
    positions.length = 0;
    let cum = 0;
    for (const layer of layers) {
      const inner = cum === 0 ? 14 : layers[layers.indexOf(layer) - 1].r;
      const outer = layer.r;
      for (let i = 0; i < layer.count; i++) {
        const a = (i / layer.count) * 2 * Math.PI + (Math.random() - 0.5) * 0.18;
        const rr = inner + 6 + Math.random() * (outer - inner - 12);
        positions.push({ x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a), beyond: false });
      }
      cum += layer.count;
    }
    const beyondMax = 600;
    for (let i = 0; i < beyondMax; i++) {
      const a = Math.random() * 2 * Math.PI;
      const rr = 175 + Math.random() * (Math.min(W, H) / 2 - 180);
      positions.push({ x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a), beyond: true });
    }
  }
  buildPositions();

  function render(N) {
    nv.textContent = N;
    const visible = positions.slice(0, N);
    const within = visible.filter(d => !d.beyond).length;
    const beyond = visible.filter(d => d.beyond).length;
    withinEl.textContent = within;
    beyondEl.textContent = beyond;

    dotsLayer.selectAll('circle').data(visible).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', d => d.beyond ? 1.8 : 3.5)
      .attr('fill', d => d.beyond ? PALETTE.muted : PALETTE.ink)
      .attr('opacity', d => d.beyond ? 0.35 : 0.9);
  }

  slider.addEventListener('input', e => render(+e.target.value));
  render(80);
})();

// ============================================================
// VIZ 7: HIERARCHY (MESH -> TREE)
// ============================================================
(function() {
  const W = 800, H = 420;
  const svg = d3.select('#h-graph');
  const meshBtn = document.getElementById('h-mesh');
  const treeBtn = document.getElementById('h-tree');
  const edgesEl = document.getElementById('h-edges');
  const depthEl = document.getElementById('h-depth');

  const N = 20;

  const meshPos = d3.range(N).map(i => {
    const a = (i / N) * 2 * Math.PI - Math.PI / 2;
    const cx = W / 2, cy = H / 2;
    const r = 160;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

  const tree = { id: 0, children: [] };
  let counter = 1;
  function fill(node, depth) {
    if (depth === 0) return;
    const branches = depth === 3 ? 3 : (depth === 2 ? 3 : 2);
    for (let i = 0; i < branches && counter < N; i++) {
      const c = { id: counter++, children: [] };
      node.children.push(c);
      fill(c, depth - 1);
    }
  }
  fill(tree, 3);
  while (counter < N) {
    const leaves = [];
    (function walk(n, d) {
      if (n.children.length === 0) leaves.push({ n, d });
      else n.children.forEach(c => walk(c, d + 1));
    })(tree, 0);
    leaves.sort((a, b) => a.d - b.d);
    const target = leaves[0].n;
    target.children.push({ id: counter++, children: [] });
  }

  const hier = d3.hierarchy(tree);
  const treeLayout = d3.tree().size([W - 80, H - 80]);
  treeLayout(hier);
  const treePos = {};
  hier.descendants().forEach(d => { treePos[d.data.id] = { x: d.x + 40, y: d.y + 40 }; });

  const meshLinks = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) meshLinks.push({ s: i, t: j });

  const treeLinks = hier.links().map(l => ({ s: l.source.data.id, t: l.target.data.id }));

  const linksLayer = svg.append('g');
  const nodesLayer = svg.append('g');

  let mode = 'mesh';

  function render() {
    const pos = mode === 'mesh' ? meshPos : d3.range(N).map(i => treePos[i]);
    const links = mode === 'mesh' ? meshLinks : treeLinks;
    const maxDepth = mode === 'mesh' ? 1 : hier.height;

    edgesEl.textContent = links.length;
    depthEl.textContent = maxDepth;

    linksLayer.selectAll('line').data(links, d => d.s + '-' + d.t)
      .join(
        enter => enter.append('line')
          .attr('x1', d => pos[d.s].x).attr('y1', d => pos[d.s].y)
          .attr('x2', d => pos[d.t].x).attr('y2', d => pos[d.t].y)
          .attr('stroke', mode === 'mesh' ? PALETTE.accent : PALETTE.blue)
          .attr('stroke-width', mode === 'mesh' ? 0.6 : 1.5)
          .attr('opacity', 0)
          .call(e => e.transition().duration(700).attr('opacity', mode === 'mesh' ? 0.4 : 0.7)),
        update => update.transition().duration(700)
          .attr('x1', d => pos[d.s].x).attr('y1', d => pos[d.s].y)
          .attr('x2', d => pos[d.t].x).attr('y2', d => pos[d.t].y)
          .attr('stroke', mode === 'mesh' ? PALETTE.accent : PALETTE.blue)
          .attr('stroke-width', mode === 'mesh' ? 0.6 : 1.5)
          .attr('opacity', mode === 'mesh' ? 0.4 : 0.7),
        exit => exit.transition().duration(400).attr('opacity', 0).remove()
      );

    nodesLayer.selectAll('circle').data(d3.range(N)).join('circle')
      .transition().duration(700)
      .attr('cx', i => pos[i].x).attr('cy', i => pos[i].y)
      .attr('r', i => mode === 'tree' && i === 0 ? 10 : 7)
      .attr('fill', i => mode === 'tree' && i === 0 ? PALETTE.accent : PALETTE.ink)
      .attr('stroke', PALETTE.bg).attr('stroke-width', 2);
  }

  meshBtn.addEventListener('click', () => { mode = 'mesh'; meshBtn.classList.add('active'); treeBtn.classList.remove('active'); render(); });
  treeBtn.addEventListener('click', () => { mode = 'tree'; treeBtn.classList.add('active'); meshBtn.classList.remove('active'); render(); });
  render();
})();

// ============================================================
// VIZ 8: STIGMERGY
// ============================================================
(function() {
  const W = 800, H = 320;
  const svg = d3.select('#st-graph');
  const pherSlider = document.getElementById('st-pher');
  const decaySlider = document.getElementById('st-decay');
  const resetBtn = document.getElementById('st-reset');
  const pauseBtn = document.getElementById('st-pause');

  const COLS = 80, ROWS = 32;
  const cellW = W / COLS, cellH = H / ROWS;
  let pher = new Float32Array(COLS * ROWS);

  // Locations: nest center, food at corners
  const nest = { x: W * 0.5, y: H * 0.5 };
  const foods = [
    { x: W * 0.08, y: H * 0.2 },     // close-ish, top-left
    { x: W * 0.93, y: H * 0.85 }     // far, bottom-right
  ];

  const NUM_AGENTS = 30;
  let agents = [];
  function spawnAgents() {
    agents = d3.range(NUM_AGENTS).map(() => ({
      x: nest.x + (Math.random() - 0.5) * 30,
      y: nest.y + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      mode: 'forage', // forage -> find food -> return -> nest
      target: null
    }));
  }
  spawnAgents();

  const pherLayer = svg.append('g');
  const sceneLayer = svg.append('g');

  // Static scene: nest and food
  sceneLayer.append('circle').attr('cx', nest.x).attr('cy', nest.y).attr('r', 10)
    .attr('fill', PALETTE.ink).attr('stroke', PALETTE.bg).attr('stroke-width', 2);
  sceneLayer.append('text').text('Nest').attr('x', nest.x).attr('y', nest.y + 24)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.ink)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600');
  foods.forEach((f, i) => {
    sceneLayer.append('circle').attr('cx', f.x).attr('cy', f.y).attr('r', 10)
      .attr('fill', PALETTE.green).attr('stroke', PALETTE.bg).attr('stroke-width', 2);
    sceneLayer.append('text').text('Food ' + (i + 1)).attr('x', f.x).attr('y', f.y - 14)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.green)
      .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600');
  });

  const agentsLayer = svg.append('g');

  let paused = false;
  pauseBtn.textContent = 'Pause';
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    if (paused) pauseBtn.classList.remove('active'); else pauseBtn.classList.add('active');
    if (!paused) tick();
  });
  pauseBtn.classList.add('active');
  resetBtn.addEventListener('click', () => {
    pher = new Float32Array(COLS * ROWS);
    spawnAgents();
  });

  function ci(gx, gy) { return gy * COLS + gx; }

  function tick() {
    const pherStrength = +pherSlider.value / 200; // 0 to 0.5
    const decayRate = 0.985 + ((+decaySlider.value) / 100) * 0.014; // 0.985 to 0.999

    // Decay pheromone
    for (let i = 0; i < pher.length; i++) pher[i] *= decayRate;

    // Update agents
    for (const a of agents) {
      const targetPos = a.mode === 'forage' ? null : nest;

      // Sample pheromone gradient in front
      const gx = Math.floor(a.x / cellW);
      const gy = Math.floor(a.y / cellH);
      let bestDx = 0, bestDy = 0, bestP = -1;
      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          const nx = gx + dx, ny = gy + dy;
          if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
          const p = pher[ci(nx, ny)];
          if (p > bestP) {
            bestP = p;
            bestDx = dx;
            bestDy = dy;
          }
        }
      }

      // Direction selection
      let dvx, dvy;
      if (a.mode === 'forage') {
        // Bias toward pheromone if any, otherwise wander
        if (bestP > 0.05) {
          dvx = bestDx / 2; dvy = bestDy / 2;
        } else {
          dvx = (Math.random() - 0.5) * 1.5;
          dvy = (Math.random() - 0.5) * 1.5;
        }
        // Apply pheromone strength to bias
        a.vx = a.vx * 0.85 + dvx * pherStrength * 3 + (Math.random() - 0.5) * 0.5;
        a.vy = a.vy * 0.85 + dvy * pherStrength * 3 + (Math.random() - 0.5) * 0.5;
      } else {
        // Return home: head toward nest
        const dx = nest.x - a.x, dy = nest.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0) {
          a.vx = a.vx * 0.6 + (dx / d) * 1.5;
          a.vy = a.vy * 0.6 + (dy / d) * 1.5;
        }
        // Deposit pheromone
        const ix = ci(gx, gy);
        if (ix >= 0 && ix < pher.length) pher[ix] = Math.min(1, pher[ix] + 0.06);
      }

      // Speed cap
      const sp = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      const maxSp = 1.6;
      if (sp > maxSp) { a.vx = a.vx / sp * maxSp; a.vy = a.vy / sp * maxSp; }

      a.x += a.vx; a.y += a.vy;

      // Wrap
      if (a.x < 4) a.x = 4, a.vx = Math.abs(a.vx);
      if (a.x > W - 4) a.x = W - 4, a.vx = -Math.abs(a.vx);
      if (a.y < 4) a.y = 4, a.vy = Math.abs(a.vy);
      if (a.y > H - 4) a.y = H - 4, a.vy = -Math.abs(a.vy);

      // Check for food / nest
      if (a.mode === 'forage') {
        for (const f of foods) {
          if ((a.x - f.x) ** 2 + (a.y - f.y) ** 2 < 144) {
            a.mode = 'return';
            break;
          }
        }
      } else {
        if ((a.x - nest.x) ** 2 + (a.y - nest.y) ** 2 < 144) {
          a.mode = 'forage';
        }
      }
    }

    // Render pheromone field (only nonzero cells)
    const pherData = [];
    for (let gy = 0; gy < ROWS; gy++) {
      for (let gx = 0; gx < COLS; gx++) {
        const p = pher[ci(gx, gy)];
        if (p > 0.02) pherData.push({ gx, gy, p });
      }
    }
    pherLayer.selectAll('rect').data(pherData, d => d.gx + ',' + d.gy)
      .join(
        enter => enter.append('rect')
          .attr('x', d => d.gx * cellW).attr('y', d => d.gy * cellH)
          .attr('width', cellW).attr('height', cellH),
        update => update,
        exit => exit.remove()
      )
      .attr('fill', PALETTE.accent)
      .attr('opacity', d => Math.min(0.45, d.p * 0.6));

    // Render agents
    agentsLayer.selectAll('circle').data(agents).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', 3)
      .attr('fill', d => d.mode === 'forage' ? PALETTE.ink : PALETTE.accent)
      .attr('opacity', 0.85);

    if (!paused) requestAnimationFrame(tick);
  }
  tick();
})();

// ============================================================
// VIZ 9: MODULARITY
// ============================================================
(function() {
  const W = 800, H = 460;
  const svg = d3.select('#mod-graph');
  const effEl = document.getElementById('mod-effective');
  const edgEl = document.getElementById('mod-edges');
  const resetBtn = document.getElementById('mod-reset');
  const collapseAllBtn = document.getElementById('mod-all');

  const clusters = [
    { id: 0, label: 'Platform', cx: 200, cy: 140, color: '#2c5f8d' },
    { id: 1, label: 'Frontend', cx: 580, cy: 130, color: '#c75432' },
    { id: 2, label: 'Data', cx: 130, cy: 340, color: '#5b8a5a' },
    { id: 3, label: 'Billing', cx: 420, cy: 380, color: '#c9a227' },
    { id: 4, label: 'Auth', cx: 660, cy: 340, color: '#6b5b95' }
  ];
  const nodesPerCluster = 6;
  const allNodes = [];
  clusters.forEach((c, ci) => {
    for (let i = 0; i < nodesPerCluster; i++) {
      const a = (i / nodesPerCluster) * 2 * Math.PI + ci;
      const r = 36;
      allNodes.push({ id: allNodes.length, cluster: ci, x: c.cx + r * Math.cos(a), y: c.cy + r * Math.sin(a) });
    }
  });

  const links = [];
  clusters.forEach((c, ci) => {
    const cn = allNodes.filter(n => n.cluster === ci);
    for (let i = 0; i < cn.length; i++) for (let j = i + 1; j < cn.length; j++) {
      if (Math.random() < 0.7) links.push({ s: cn[i].id, t: cn[j].id, type: 'intra' });
    }
  });
  const interPairs = [[0,1],[0,2],[0,3],[1,3],[2,3],[1,4],[3,4],[0,4]];
  interPairs.forEach(([a, b]) => {
    const an = allNodes.filter(n => n.cluster === a);
    const bn = allNodes.filter(n => n.cluster === b);
    for (let i = 0; i < 2; i++) {
      const s = an[Math.floor(Math.random() * an.length)];
      const t = bn[Math.floor(Math.random() * bn.length)];
      links.push({ s: s.id, t: t.id, type: 'inter' });
    }
  });

  const collapsed = new Set();

  const linksLayer = svg.append('g');
  const nodesLayer = svg.append('g');
  const labelsLayer = svg.append('g');

  function render() {
    const visibleNodes = [];
    const nodeMap = new Map();
    clusters.forEach((c, ci) => {
      if (collapsed.has(ci)) {
        const nd = { id: 'c' + ci, cluster: ci, x: c.cx, y: c.cy, collapsed: true, label: c.label, color: c.color };
        visibleNodes.push(nd);
        allNodes.filter(n => n.cluster === ci).forEach(n => nodeMap.set(n.id, nd));
      } else {
        allNodes.filter(n => n.cluster === ci).forEach(n => {
          const nd = { id: n.id, cluster: ci, x: n.x, y: n.y, collapsed: false, color: c.color };
          visibleNodes.push(nd);
          nodeMap.set(n.id, nd);
        });
      }
    });

    const linkMap = new Map();
    links.forEach(l => {
      const s = nodeMap.get(l.s), t = nodeMap.get(l.t);
      if (s === t) return;
      const key = [s.id, t.id].sort().join('|');
      if (!linkMap.has(key)) linkMap.set(key, { s, t, count: 0 });
      linkMap.get(key).count++;
    });
    const visibleLinks = Array.from(linkMap.values());

    effEl.textContent = visibleNodes.length;
    edgEl.textContent = visibleLinks.length;

    linksLayer.selectAll('line').data(visibleLinks, d => d.s.id + '|' + d.t.id)
      .join(
        enter => enter.append('line')
          .attr('x1', d => d.s.x).attr('y1', d => d.s.y)
          .attr('x2', d => d.t.x).attr('y2', d => d.t.y)
          .attr('stroke', PALETTE.inkSoft)
          .attr('stroke-width', d => Math.min(4, 0.8 + d.count * 0.6))
          .attr('opacity', 0)
          .call(e => e.transition().duration(400).attr('opacity', 0.45)),
        update => update.transition().duration(400)
          .attr('x1', d => d.s.x).attr('y1', d => d.s.y)
          .attr('x2', d => d.t.x).attr('y2', d => d.t.y)
          .attr('stroke-width', d => Math.min(4, 0.8 + d.count * 0.6)),
        exit => exit.transition().duration(300).attr('opacity', 0).remove()
      );

    nodesLayer.selectAll('circle').data(visibleNodes, d => d.id)
      .join(
        enter => enter.append('circle')
          .attr('cx', d => d.x).attr('cy', d => d.y)
          .attr('r', d => d.collapsed ? 34 : 7)
          .attr('fill', d => d.color)
          .attr('stroke', PALETTE.bg)
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')
          .attr('opacity', 0)
          .on('click', (e, d) => {
            if (d.collapsed) collapsed.delete(d.cluster);
            else collapsed.add(d.cluster);
            render();
          })
          .call(e => e.transition().duration(400).attr('opacity', 1)),
        update => update.transition().duration(400)
          .attr('cx', d => d.x).attr('cy', d => d.y)
          .attr('r', d => d.collapsed ? 34 : 7),
        exit => exit.transition().duration(300).attr('opacity', 0).remove()
      );

    labelsLayer.selectAll('text.cluster-label').data(clusters).join(
      enter => enter.append('text').attr('class', 'cluster-label'),
      update => update,
      exit => exit
    )
      .text(d => d.label)
      .attr('x', d => d.cx).attr('y', d => collapsed.has(d.id) ? d.cy + 4 : d.cy + 64)
      .attr('text-anchor', 'middle')
      .attr('fill', d => collapsed.has(d.id) ? PALETTE.bg : PALETTE.inkSoft)
      .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600')
      .style('letter-spacing', '0.05em');
  }

  resetBtn.addEventListener('click', () => { collapsed.clear(); render(); });
  collapseAllBtn.addEventListener('click', () => { clusters.forEach(c => collapsed.add(c.id)); render(); });

  render();
})();

// ============================================================
// VIZ 10: LAYERS OF ABSTRACTION
// ============================================================
(function() {
  const W = 800, H = 540;
  const svg = d3.select('#la-graph');
  const detailEl = document.getElementById('la-detail');
  const resetBtn = document.getElementById('la-reset');

  // Layer data, ordered bottom-to-top
  const bioLayers = [
    { name: 'Molecules', example: 'proteins, lipids, DNA', composedOf: 'atoms', ratio: '~10² atoms each', cumulative: '~10² atoms' },
    { name: 'Cells', example: 'neurons, hepatocytes, T-cells', composedOf: 'molecules', ratio: '~10¹² molecules each', cumulative: '~10¹⁴ atoms' },
    { name: 'Tissues', example: 'muscle, epithelium, nervous', composedOf: 'cells', ratio: '~10⁶ cells each', cumulative: '~10²⁰ atoms' },
    { name: 'Organs', example: 'heart, liver, brain', composedOf: 'tissues', ratio: '~10³ tissues each', cumulative: '~10²³ atoms' },
    { name: 'Organism', example: 'a person', composedOf: 'organs', ratio: '~80 organs', cumulative: '~10²⁷ atoms' }
  ];

  const compLayers = [
    { name: 'Machine code', example: 'binary opcodes', composedOf: 'transistor switches', ratio: '~10³ ops each', cumulative: '~10³ ops' },
    { name: 'Assembly', example: 'MOV, ADD, JMP', composedOf: 'machine code', ratio: '~1-3 instructions each', cumulative: '~10⁴ ops' },
    { name: 'High-level code', example: 'C, Python, JavaScript', composedOf: 'assembly', ratio: '~10 assembly statements each', cumulative: '~10⁵ ops' },
    { name: 'Application', example: 'browser, OS, spreadsheet', composedOf: 'high-level code', ratio: '~10⁶ statements each', cumulative: '~10¹¹ ops' },
    { name: 'Natural language (AI)', example: '"summarize this email"', composedOf: 'application calls', ratio: '~10⁴ calls each', cumulative: '~10¹⁵ ops', accent: true }
  ];

  // Layout
  const layerH = 60;
  const layerGap = 12;
  const startY = 80;
  const colW = 320;
  const leftX = 40;
  const rightX = 440;
  const totalLayers = 5;

  // Stack headers
  svg.append('text').text('BIOLOGY').attr('x', leftX + colW / 2).attr('y', 40)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.green)
    .style('font-family', 'Inter').style('font-size', '13px').style('font-weight', '700').style('letter-spacing', '0.15em');
  svg.append('text').text('COMPUTING').attr('x', rightX + colW / 2).attr('y', 40)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.blue)
    .style('font-family', 'Inter').style('font-size', '13px').style('font-weight', '700').style('letter-spacing', '0.15em');

  // Direction indicator near top of each stack
  function drawArrow(x, label) {
    svg.append('path')
      .attr('d', `M${x},${startY - 14} L${x - 5},${startY - 6} L${x + 5},${startY - 6} Z`)
      .attr('fill', PALETTE.muted);
    svg.append('text').text(label).attr('x', x).attr('y', startY - 22)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
      .style('font-family', 'Inter').style('font-size', '10px').style('font-style', 'italic');
  }
  drawArrow(leftX + colW / 2, 'higher abstraction');
  drawArrow(rightX + colW / 2, 'higher abstraction');

  // Track selection
  let selected = null; // { stack: 'bio'|'comp', index: number }

  const stacksLayer = svg.append('g');

  function drawStack(layers, x, stackKey, baseLabel, headerColor) {
    layers.forEach((layer, i) => {
      // i=0 is bottom; topmost is layers.length-1
      const y = startY + (totalLayers - 1 - i) * (layerH + layerGap);
      const isSelected = selected && selected.stack === stackKey && selected.index === i;
      const isBelowSelected = selected && selected.stack === stackKey && i < selected.index;

      const g = stacksLayer.append('g').attr('class', 'layer-' + stackKey + '-' + i)
        .style('cursor', 'pointer')
        .on('click', () => {
          if (selected && selected.stack === stackKey && selected.index === i) {
            selected = null;
          } else {
            selected = { stack: stackKey, index: i, layer };
          }
          redraw();
        });

      // Rectangle
      const fill = isSelected ? (layer.accent ? PALETTE.accent : headerColor)
        : (layer.accent ? '#fce4d9' : PALETTE.panel);
      const stroke = isSelected ? PALETTE.ink : (layer.accent ? PALETTE.accent : PALETTE.ink);
      const strokeW = isSelected ? 3 : (layer.accent ? 2 : 1.5);

      g.append('rect')
        .attr('x', x).attr('y', y).attr('width', colW).attr('height', layerH)
        .attr('rx', 4)
        .attr('fill', fill)
        .attr('stroke', stroke)
        .attr('stroke-width', strokeW)
        .attr('opacity', isBelowSelected ? 0.85 : 1);

      // Apply a dim for layers below the selected one (showing they're abstracted)
      if (isBelowSelected) {
        g.append('rect')
          .attr('x', x).attr('y', y).attr('width', colW).attr('height', layerH)
          .attr('rx', 4)
          .attr('fill', headerColor)
          .attr('opacity', 0.10).attr('pointer-events', 'none');
      }

      // Layer name
      g.append('text').text(layer.name)
        .attr('x', x + 16).attr('y', y + 22)
        .attr('fill', isSelected ? '#ffffff' : PALETTE.ink)
        .style('font-family', 'Inter').style('font-size', '14px').style('font-weight', '600');

      // Example
      g.append('text').text(layer.example)
        .attr('x', x + 16).attr('y', y + 42)
        .attr('fill', isSelected ? 'rgba(255,255,255,0.85)' : PALETTE.muted)
        .style('font-family', 'Inter').style('font-size', '12px').style('font-style', 'italic');

      // Small AI marker
      if (layer.accent && !isSelected) {
        g.append('text').text('NEW')
          .attr('x', x + colW - 12).attr('y', y + 18).attr('text-anchor', 'end')
          .attr('fill', PALETTE.accent)
          .style('font-family', 'Inter').style('font-size', '10px').style('font-weight', '700').style('letter-spacing', '0.12em');
      }
    });

    // Bracket showing what's "abstracted" when something is selected
    if (selected && selected.stack === stackKey && selected.index > 0) {
      const topY = startY + (totalLayers - 1 - (selected.index - 1)) * (layerH + layerGap);
      const bottomY = startY + (totalLayers - 1 - 0) * (layerH + layerGap) + layerH;
      const bracketX = x + colW + 12;
      stacksLayer.append('path')
        .attr('d', `M${bracketX - 6},${topY} L${bracketX},${topY} L${bracketX},${bottomY} L${bracketX - 6},${bottomY}`)
        .attr('fill', 'none').attr('stroke', headerColor).attr('stroke-width', 2);
      stacksLayer.append('text').text('abstracted')
        .attr('transform', `translate(${bracketX + 8},${(topY + bottomY) / 2}) rotate(90)`)
        .attr('text-anchor', 'middle').attr('fill', headerColor)
        .style('font-family', 'Inter').style('font-size', '10px').style('font-weight', '600')
        .style('letter-spacing', '0.06em').style('text-transform', 'uppercase');
    }

    // Substrate label
    const baseY = startY + totalLayers * (layerH + layerGap) + 12;
    stacksLayer.append('text').text(baseLabel)
      .attr('x', x + colW / 2).attr('y', baseY)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
      .style('font-family', 'Inter').style('font-size', '11px').style('font-style', 'italic');
  }

  function redraw() {
    stacksLayer.selectAll('*').remove();
    drawStack(bioLayers, leftX, 'bio', 'atoms / physics', PALETTE.green);
    drawStack(compLayers, rightX, 'comp', 'transistors / physics', PALETTE.blue);
    updateDetail();
  }

  function updateDetail() {
    if (!selected) {
      detailEl.innerHTML = '<span style="color:var(--muted);font-style:italic">Click a layer above to see what it composes and what it provides.</span>';
      return;
    }
    const { stack, layer } = selected;
    const headerColor = stack === 'bio' ? PALETTE.green : PALETTE.blue;
    detailEl.innerHTML = `
      <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
        <div style="min-width:140px">
          <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:${headerColor};font-weight:700">${stack === 'bio' ? 'BIOLOGY' : 'COMPUTING'}</div>
          <div style="font-size:17px;font-weight:600;color:var(--text);margin-top:2px">${layer.name}</div>
        </div>
        <div style="flex:1;min-width:200px">
          <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);font-weight:600">Composed of</div>
          <div style="font-size:14px;color:var(--text);margin-top:2px">${layer.ratio}</div>
        </div>
        <div style="flex:1;min-width:200px">
          <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);font-weight:600">Cumulative compression</div>
          <div style="font-size:14px;color:var(--text);margin-top:2px">${layer.cumulative} hidden by this layer</div>
        </div>
      </div>
    `;
  }

  resetBtn.addEventListener('click', () => { selected = null; redraw(); });
  redraw();
})();

// ============================================================
// VIZ 11a: COUPLING
// ============================================================
(function() {
  const W = 800, H = 420;
  const svg = d3.select('#c-graph');
  const edgesEl = document.getElementById('c-edges');
  const weightEl = document.getElementById('c-weight');

  const N = 20;
  const cx = W / 2, cy = H / 2;
  const r = 160;
  const nodes = d3.range(N).map(i => {
    const a = (i / N) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

  const cats = [
    { key: 'lt', label: 'Name/Type', weight: 1, color: '#5b8a5a' },
    { key: 'md', label: 'Meaning/Position', weight: 2, color: '#b89535' },
    { key: 'hv', label: 'Algorithm/Execution', weight: 4, color: '#c75432' },
    { key: 'xt', label: 'Timing/Value/Identity', weight: 8, color: '#8c3215' }
  ];

  const distribution = [0.55, 0.25, 0.13, 0.07];
  const allLinks = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    if (Math.random() < 0.35) {
      const r0 = Math.random();
      let acc = 0, idx = 0;
      for (let k = 0; k < distribution.length; k++) {
        acc += distribution[k];
        if (r0 <= acc) { idx = k; break; }
      }
      allLinks.push({ s: i, t: j, cat: idx });
    }
  }

  const totalWeight = allLinks.reduce((sum, l) => sum + cats[l.cat].weight, 0);

  const linksLayer = svg.append('g');
  const nodesLayer = svg.append('g');

  nodesLayer.selectAll('circle').data(nodes).join('circle')
    .attr('cx', d => d.x).attr('cy', d => d.y)
    .attr('r', 7).attr('fill', PALETTE.ink)
    .attr('stroke', PALETTE.bg).attr('stroke-width', 2);

  let filter = 'all';

  function visible(l) {
    if (filter === 'all') return true;
    if (filter === 'light') return l.cat <= 1;
    if (filter === 'heavy') return l.cat >= 2;
  }

  function render() {
    const vis = allLinks.filter(visible);
    const w = vis.reduce((s, l) => s + cats[l.cat].weight, 0);
    edgesEl.textContent = vis.length;
    weightEl.textContent = Math.round(w / totalWeight * 100) + '%';

    linksLayer.selectAll('line').data(allLinks).join('line')
      .attr('x1', d => nodes[d.s].x).attr('y1', d => nodes[d.s].y)
      .attr('x2', d => nodes[d.t].x).attr('y2', d => nodes[d.t].y)
      .attr('stroke', d => cats[d.cat].color)
      .attr('stroke-width', d => 0.8 + cats[d.cat].weight * 0.4)
      .transition().duration(350)
      .attr('opacity', d => visible(d) ? 0.75 : 0.04);
  }

  document.querySelectorAll('#viz-coupling .btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#viz-coupling .btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      filter = b.dataset.c;
      render();
    });
  });

  render();
})();

// ============================================================
// VIZ 11b: WEAK TIES
// ============================================================
(function() {
  const W = 800, H = 320;
  const svg = d3.select('#wt-graph');
  const componentsEl = document.getElementById('wt-components');
  const edgesRemainingEl = document.getElementById('wt-edges-remaining');
  const resetBtn = document.getElementById('wt-reset');
  const removeStrongBtn = document.getElementById('wt-remove-strong');
  const removeWeakBtn = document.getElementById('wt-remove-weak');

  // Two clusters
  const left = d3.range(6).map(i => {
    const a = (i / 6) * 2 * Math.PI;
    return { id: i, x: 200 + 70 * Math.cos(a), y: 160 + 70 * Math.sin(a), cluster: 0 };
  });
  const right = d3.range(6).map(i => {
    const a = (i / 6) * 2 * Math.PI;
    return { id: i + 6, x: 600 + 70 * Math.cos(a), y: 160 + 70 * Math.sin(a), cluster: 1 };
  });
  const allNodes = [...left, ...right];

  // Strong intra-cluster ties + one weak inter-cluster tie
  function buildEdges() {
    const edges = [];
    // Dense intra-cluster for left
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
      edges.push({ s: left[i].id, t: left[j].id, kind: 'strong' });
    }
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
      edges.push({ s: right[i].id, t: right[j].id, kind: 'strong' });
    }
    // One weak bridge
    edges.push({ s: 2, t: 8, kind: 'weak' });
    return edges;
  }

  let edges = buildEdges();

  function countComponents() {
    const parent = {};
    allNodes.forEach(n => parent[n.id] = n.id);
    function find(x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    function union(a, b) { const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; }
    edges.forEach(e => union(e.s, e.t));
    const roots = new Set();
    allNodes.forEach(n => roots.add(find(n.id)));
    return roots.size;
  }

  const linksLayer = svg.append('g');
  const nodesLayer = svg.append('g');

  function render() {
    componentsEl.textContent = countComponents();
    edgesRemainingEl.textContent = edges.length;

    linksLayer.selectAll('line').data(edges, d => d.s + '-' + d.t)
      .join(
        enter => enter.append('line')
          .attr('x1', d => allNodes.find(n => n.id === d.s).x)
          .attr('y1', d => allNodes.find(n => n.id === d.s).y)
          .attr('x2', d => allNodes.find(n => n.id === d.t).x)
          .attr('y2', d => allNodes.find(n => n.id === d.t).y)
          .attr('stroke', d => d.kind === 'weak' ? PALETTE.accent : PALETTE.inkSoft)
          .attr('stroke-width', d => d.kind === 'weak' ? 2 : 1.2)
          .attr('stroke-dasharray', d => d.kind === 'weak' ? '4,3' : null)
          .attr('opacity', 0).call(e => e.transition().duration(300).attr('opacity', d => d.kind === 'weak' ? 0.9 : 0.55)),
        update => update,
        exit => exit.transition().duration(300).attr('opacity', 0).remove()
      );

    nodesLayer.selectAll('circle').data(allNodes).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', 8)
      .attr('fill', d => d.cluster === 0 ? PALETTE.blue : PALETTE.purple)
      .attr('stroke', PALETTE.bg)
      .attr('stroke-width', 2);
  }

  resetBtn.addEventListener('click', () => { edges = buildEdges(); render(); });
  removeStrongBtn.addEventListener('click', () => {
    const strong = edges.filter(e => e.kind === 'strong');
    if (strong.length === 0) return;
    const target = strong[Math.floor(Math.random() * strong.length)];
    edges = edges.filter(e => e !== target);
    render();
  });
  removeWeakBtn.addEventListener('click', () => {
    edges = edges.filter(e => e.kind !== 'weak');
    render();
  });

  // Cluster hulls
  svg.append('g').attr('class', 'hulls').selectAll('circle').data([
    { x: 200, y: 160, r: 95, color: PALETTE.blueSoft },
    { x: 600, y: 160, r: 95, color: PALETTE.purple }
  ]).join('circle')
    .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
    .attr('fill', d => d.color).attr('opacity', 0.08);

  svg.append('text').text('Cluster A').attr('x', 200).attr('y', 80)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.blue)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600').style('letter-spacing', '0.1em').style('text-transform', 'uppercase');
  svg.append('text').text('Cluster B').attr('x', 600).attr('y', 80)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.purple)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600').style('letter-spacing', '0.1em').style('text-transform', 'uppercase');
  svg.append('text').text('weak tie').attr('x', 400).attr('y', 130)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.accent)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600').style('font-style', 'italic');

  render();
})();

// ============================================================
// VIZ 12: THEORY OF CONSTRAINTS
// ============================================================
(function() {
  const W = 800, H = 280;
  const svg = d3.select('#toc-graph');
  const throughputEl = document.getElementById('toc-throughput');
  const wipEl = document.getElementById('toc-wip');
  const slidersContainer = document.getElementById('toc-sliders');

  // Build sliders for 5 stations dynamically
  const initialCaps = [10, 12, 6, 10, 15];
  const labels = ['A', 'B', 'C', 'D', 'E'];
  const caps = [...initialCaps];

  // Insert sliders before the stat-row in the controls div
  const statRow = slidersContainer.querySelector('.stat-row');
  for (let i = 0; i < 5; i++) {
    const div = document.createElement('div');
    div.className = 'control';
    div.innerHTML = `<label>Station ${labels[i]}</label><input type="range" min="2" max="20" value="${caps[i]}" step="1" data-station="${i}" style="width:90px;accent-color:var(--accent)"><span class="value-pill" data-pill="${i}">${caps[i]}</span>`;
    slidersContainer.insertBefore(div, statRow);
  }
  slidersContainer.querySelectorAll('input[type=range][data-station]').forEach(inp => {
    inp.addEventListener('input', e => {
      const i = +e.target.dataset.station;
      caps[i] = +e.target.value;
      document.querySelector(`[data-pill="${i}"]`).textContent = caps[i];
    });
  });

  // Stations positioned across the canvas
  const stationY = 150;
  const stationX = [100, 240, 380, 520, 660];

  // Each station has queue + current; we track queues as numbers (length)
  let queues = [0, 0, 0, 0, 0];
  let processed = 0;
  let startedAt = performance.now();

  // Source rate
  const sourceRate = 14; // items per second injected
  let lastTick = performance.now();
  let pendingInject = 0;
  let processedRecent = []; // timestamps for moving average throughput

  // Draw static scene
  const bgLayer = svg.append('g');
  // Connector lines
  for (let i = 0; i < stationX.length - 1; i++) {
    bgLayer.append('line')
      .attr('x1', stationX[i] + 40).attr('y1', stationY)
      .attr('x2', stationX[i + 1] - 40).attr('y2', stationY)
      .attr('stroke', PALETTE.rule).attr('stroke-width', 2);
  }
  // Source arrow
  bgLayer.append('line')
    .attr('x1', 20).attr('y1', stationY)
    .attr('x2', stationX[0] - 40).attr('y2', stationY)
    .attr('stroke', PALETTE.rule).attr('stroke-width', 2);
  bgLayer.append('text').text('Source').attr('x', 30).attr('y', stationY - 14)
    .attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px');
  // Sink arrow
  bgLayer.append('line')
    .attr('x1', stationX[4] + 40).attr('y1', stationY)
    .attr('x2', 780).attr('y2', stationY)
    .attr('stroke', PALETTE.rule).attr('stroke-width', 2);
  bgLayer.append('text').text('Output').attr('x', 770).attr('y', stationY - 14)
    .attr('fill', PALETTE.muted).attr('text-anchor', 'end').style('font-family', 'Inter').style('font-size', '11px');

  const stationsLayer = svg.append('g');
  const queueLayer = svg.append('g');
  const labelLayer = svg.append('g');

  // Initial stations
  stationsLayer.selectAll('rect').data(stationX).join('rect')
    .attr('x', d => d - 32).attr('y', stationY - 22)
    .attr('width', 64).attr('height', 44)
    .attr('rx', 4)
    .attr('fill', PALETTE.panel).attr('stroke', PALETTE.ink).attr('stroke-width', 2);
  stationsLayer.selectAll('text').data(stationX).join('text')
    .attr('x', d => d).attr('y', stationY + 4).attr('text-anchor', 'middle')
    .text((d, i) => labels[i])
    .attr('fill', PALETTE.ink).style('font-family', 'Inter').style('font-size', '16px').style('font-weight', '700');

  // Station capacity labels (will update)
  labelLayer.selectAll('text').data(stationX).join('text')
    .attr('class', 'cap-label')
    .attr('x', d => d).attr('y', stationY + 42).attr('text-anchor', 'middle')
    .attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '10px');

  function update() {
    const now = performance.now();
    const dt = (now - lastTick) / 1000;
    lastTick = now;

    // Inject items into station 0's queue
    pendingInject += sourceRate * dt;
    while (pendingInject >= 1) {
      queues[0]++;
      pendingInject--;
    }

    // Process each station: each can move min(queue, cap*dt) items forward
    for (let i = 0; i < 5; i++) {
      const capacity = caps[i] * dt;
      const moved = Math.min(queues[i], capacity);
      queues[i] -= moved;
      // Approximate fractional movement: aggregate moved as a fraction
      if (i === 4) {
        processed += moved;
      } else {
        queues[i + 1] += moved;
      }
    }

    // Track processed in last 1.5s
    processedRecent.push({ t: now, count: 0 });
    // Round to track recent throughput
    const recent = processedRecent.filter(r => now - r.t < 1500);
    processedRecent = recent;

    // Throughput estimate = min capacity
    const throughput = Math.min(...caps, sourceRate);
    throughputEl.textContent = throughput.toFixed(0);

    // WIP = total in queues
    const wip = queues.reduce((s, q) => s + q, 0);
    wipEl.textContent = wip.toFixed(0);

    // Find the bottleneck (lowest cap)
    const minCap = Math.min(...caps);

    // Draw queue dots
    const queueData = [];
    for (let i = 0; i < 5; i++) {
      const qLen = Math.min(20, Math.floor(queues[i]));
      for (let j = 0; j < qLen; j++) {
        queueData.push({
          x: stationX[i] - 36 - j * 5,
          y: stationY,
          i, j
        });
      }
    }
    queueLayer.selectAll('circle').data(queueData, d => d.i + '-' + d.j).join(
      enter => enter.append('circle')
        .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 2.4)
        .attr('fill', PALETTE.accent),
      update => update.attr('cx', d => d.x).attr('cy', d => d.y),
      exit => exit.remove()
    );

    // Update capacity labels
    labelLayer.selectAll('text.cap-label').data(caps)
      .text((d, i) => `cap ${d}/s${d === minCap ? ' ↓' : ''}`)
      .attr('fill', (d, i) => d === minCap ? PALETTE.accent : PALETTE.muted)
      .style('font-weight', (d, i) => d === minCap ? '700' : '500');

    // Update station fills based on capacity
    stationsLayer.selectAll('rect').data(caps)
      .attr('stroke', d => d === minCap ? PALETTE.accent : PALETTE.ink)
      .attr('stroke-width', d => d === minCap ? 3 : 2);

    requestAnimationFrame(update);
  }
  update();
})();

// ============================================================
// VIZ 13: FEEDBACK LOOPS
// ============================================================
(function() {
  const W = 380, H = 240;
  const reinSvg = d3.select('#fb-rein');
  const balSvg = d3.select('#fb-bal');
  const gainSlider = document.getElementById('fb-gain');
  const delaySlider = document.getElementById('fb-delay');
  const restartBtn = document.getElementById('fb-restart');

  const margin = { top: 18, right: 14, bottom: 30, left: 38 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  // Reinforcing loop: y[t+1] = y[t] + gain * y[t] + noise. Plot up to a cap.
  // Balancing loop: y[t+1] = y[t] - gain * y[t - delay] + noise. Plot oscillation.

  const N = 200;
  let t = 0;
  let reinSeries = [];
  let balSeries = [];

  function reset() {
    t = 0;
    reinSeries = [1];
    balSeries = [10];
  }
  reset();

  // Setup chart axes
  function setupChart(svg, title) {
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain([0, N]).range([0, cw]);
    const y = d3.scaleLinear().domain([0, 60]).range([ch, 0]);
    g.append('g')
      .attr('transform', `translate(0,${ch})`)
      .call(d3.axisBottom(x).ticks(5).tickSize(-ch).tickPadding(6))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
      .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '10px'));
    g.append('g')
      .call(d3.axisLeft(y).ticks(4).tickSize(-cw).tickPadding(6))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
      .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '10px'));
    g.append('text').text('time').attr('x', cw / 2).attr('y', ch + 22)
      .attr('text-anchor', 'middle').attr('fill', PALETTE.muted)
      .style('font-family', 'Inter').style('font-size', '10px');
    return { g, x, y };
  }

  const reinChart = setupChart(reinSvg);
  const balChart = setupChart(balSvg);

  const reinLine = d3.line().x((d, i) => reinChart.x(i)).y(d => reinChart.y(Math.min(60, Math.max(0, d))));
  const balLine = d3.line().x((d, i) => balChart.x(i)).y(d => balChart.y(Math.min(60, Math.max(0, d))));

  // Zero/equilibrium line for balancing
  balChart.g.append('line')
    .attr('x1', 0).attr('x2', cw).attr('y1', balChart.y(10)).attr('y2', balChart.y(10))
    .attr('stroke', PALETTE.blueSoft).attr('stroke-dasharray', '3,3').attr('stroke-width', 1);
  balChart.g.append('text').text('target = 10').attr('x', cw - 4).attr('y', balChart.y(10) - 4)
    .attr('text-anchor', 'end').attr('fill', PALETTE.blue)
    .style('font-family', 'Inter').style('font-size', '10px').style('font-style', 'italic');

  const reinPath = reinChart.g.append('path').attr('fill', 'none').attr('stroke', PALETTE.accent).attr('stroke-width', 2);
  const balPath = balChart.g.append('path').attr('fill', 'none').attr('stroke', PALETTE.blue).attr('stroke-width', 2);

  restartBtn.addEventListener('click', reset);

  function step() {
    const gain = (+gainSlider.value) / 1000; // 0.001 - 0.1
    const delay = +delaySlider.value;

    if (t < N) {
      // Reinforcing
      const lastR = reinSeries[reinSeries.length - 1];
      const newR = lastR + gain * lastR * 1.05 + (Math.random() - 0.5) * 0.3;
      reinSeries.push(newR);

      // Balancing with delay (target = 10)
      const lastB = balSeries[balSeries.length - 1];
      const delayedIdx = Math.max(0, balSeries.length - 1 - delay);
      const delayed = balSeries[delayedIdx];
      const correction = -(delayed - 10) * gain * 8;
      const newB = lastB + correction + (Math.random() - 0.5) * 0.4;
      balSeries.push(newB);

      t++;

      // Draw
      reinPath.attr('d', reinLine(reinSeries));
      balPath.attr('d', balLine(balSeries));
    } else {
      // Auto-restart after pause
      setTimeout(reset, 1500);
      t = -1; // sentinel
    }

    setTimeout(step, 60);
  }
  step();
})();

// ============================================================
// VIZ 14: ASHBY'S LAW
// ============================================================
(function() {
  const W = 800, H = 320;
  const svg = d3.select('#ash-graph');
  const sysSlider = document.getElementById('ash-sys');
  const ctlSlider = document.getElementById('ash-ctl');
  const sysV = document.getElementById('ash-sys-v');
  const ctlV = document.getElementById('ash-ctl-v');
  const gapEl = document.getElementById('ash-gap');

  const COLS = 20, ROWS = 5;
  const TOTAL = COLS * ROWS;
  const cellW = (W - 40) / COLS;
  const cellH = (H - 60) / ROWS;
  const offsetX = 20, offsetY = 30;

  const g = svg.append('g');

  // Labels
  svg.append('text').text('System states').attr('x', 20).attr('y', 18)
    .attr('fill', PALETTE.muted)
    .style('font-family', 'Inter').style('font-size', '11px').style('font-weight', '600').style('letter-spacing', '0.1em').style('text-transform', 'uppercase');

  function render() {
    const sys = +sysSlider.value;
    const ctl = +ctlSlider.value;
    sysV.textContent = sys;
    ctlV.textContent = ctl;
    const gap = Math.max(0, sys - ctl);
    gapEl.textContent = gap;

    const cells = d3.range(TOTAL).map(i => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      let state = 'absent'; // not part of system
      if (i < ctl) state = 'controlled';
      else if (i < sys) state = 'uncontrolled';
      return { i, col, row, state };
    });

    g.selectAll('rect').data(cells, d => d.i).join('rect')
      .attr('x', d => offsetX + d.col * cellW)
      .attr('y', d => offsetY + d.row * cellH)
      .attr('width', cellW - 4).attr('height', cellH - 4)
      .attr('rx', 3)
      .transition().duration(200)
      .attr('fill', d => {
        if (d.state === 'controlled') return PALETTE.green;
        if (d.state === 'uncontrolled') return PALETTE.accent;
        return PALETTE.ruleSoft;
      })
      .attr('opacity', d => d.state === 'absent' ? 0.4 : 0.85)
      .attr('stroke', d => d.state === 'absent' ? PALETTE.rule : 'none')
      .attr('stroke-width', 0.5);

    // Update label text
    svg.selectAll('text.summary').remove();
    svg.append('text').attr('class', 'summary')
      .text(`Controller variety: ${ctl} actions  •  System variety: ${sys} states  •  Gap: ${gap} states beyond reach`)
      .attr('x', 20).attr('y', H - 8)
      .attr('fill', gap > 0 ? PALETTE.accent : PALETTE.green)
      .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');
  }

  sysSlider.addEventListener('input', render);
  ctlSlider.addEventListener('input', render);
  render();
})();

// ============================================================
// VIZ 15: ANTIFRAGILITY RESPONSE CURVES
// ============================================================
(function() {
  const W = 800, H = 380;
  const svg = d3.select('#af-graph');
  const stressSlider = document.getElementById('af-stress');
  const stressV = document.getElementById('af-stress-v');
  const fragileV = document.getElementById('af-fragile-v');
  const robustV = document.getElementById('af-robust-v');
  const antiV = document.getElementById('af-anti-v');

  const margin = { top: 30, right: 220, bottom: 50, left: 60 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 100]).range([0, cw]);
  const y = d3.scaleLinear().domain([0, 100]).range([ch, 0]);

  g.append('g').attr('transform', `translate(0,${ch})`)
    .call(d3.axisBottom(x).ticks(5).tickSize(-ch).tickPadding(8))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
    .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px'));
  g.append('g')
    .call(d3.axisLeft(y).ticks(5).tickSize(-cw).tickPadding(8))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
    .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px'));

  g.append('text').text('Stress / volatility')
    .attr('x', cw / 2).attr('y', ch + 38).attr('text-anchor', 'middle')
    .attr('fill', PALETTE.inkSoft)
    .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');
  g.append('text').text('Performance')
    .attr('transform', `rotate(-90)`).attr('x', -ch / 2).attr('y', -44)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.inkSoft)
    .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');

  function fragile(s) { return Math.max(0, 100 * Math.pow(Math.max(0, 1 - s / 105), 1.6)); }
  function robust(s) { return 60; }
  function antifragile(s) { return 30 + 60 * (1 - Math.exp(-s / 30)); }

  const xs = d3.range(0, 100.5, 0.5);
  const fragileData = xs.map(s => ({ s, p: fragile(s) }));
  const robustData = xs.map(s => ({ s, p: robust(s) }));
  const antiData = xs.map(s => ({ s, p: antifragile(s) }));

  const line = d3.line().x(d => x(d.s)).y(d => y(d.p)).curve(d3.curveMonotoneX);

  g.append('path').datum(fragileData)
    .attr('fill', 'none').attr('stroke', '#8c3215').attr('stroke-width', 2.5).attr('d', line);
  g.append('path').datum(robustData)
    .attr('fill', 'none').attr('stroke', '#6b7280').attr('stroke-width', 2.5).attr('d', line);
  g.append('path').datum(antiData)
    .attr('fill', 'none').attr('stroke', '#5b8a5a').attr('stroke-width', 2.5).attr('d', line);

  const stressLine = g.append('line')
    .attr('stroke', PALETTE.ink).attr('stroke-width', 1).attr('stroke-dasharray', '3,3');

  const fragileDot = g.append('circle').attr('r', 5).attr('fill', '#8c3215').attr('stroke', PALETTE.bg).attr('stroke-width', 2);
  const robustDot = g.append('circle').attr('r', 5).attr('fill', '#6b7280').attr('stroke', PALETTE.bg).attr('stroke-width', 2);
  const antiDot = g.append('circle').attr('r', 5).attr('fill', '#5b8a5a').attr('stroke', PALETTE.bg).attr('stroke-width', 2);

  const legend = svg.append('g').attr('transform', `translate(${W - margin.right + 18},${margin.top + 30})`);
  const legendItems = [
    { color: '#8c3215', label: 'Fragile', sub: 'porcelain, JIT supply chain' },
    { color: '#6b7280', label: 'Robust', sub: 'granite, fault-tolerant systems' },
    { color: '#5b8a5a', label: 'Antifragile', sub: 'muscle, immune system, markets' }
  ];
  legendItems.forEach((item, i) => {
    const row = legend.append('g').attr('transform', `translate(0,${i * 56})`);
    row.append('line').attr('x1', 0).attr('x2', 22).attr('y1', 0).attr('y2', 0)
      .attr('stroke', item.color).attr('stroke-width', 2.5);
    row.append('text').text(item.label).attr('x', 30).attr('y', 4)
      .attr('fill', PALETTE.ink).style('font-family', 'Inter').style('font-size', '14px').style('font-weight', '600');
    row.append('text').text(item.sub).attr('x', 0).attr('y', 22)
      .attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px').style('font-style', 'italic');
  });

  function render() {
    const s = +stressSlider.value;
    stressV.textContent = s;
    const fp = fragile(s), rp = robust(s), ap = antifragile(s);
    fragileV.textContent = Math.round(fp);
    robustV.textContent = Math.round(rp);
    antiV.textContent = Math.round(ap);

    stressLine.attr('x1', x(s)).attr('x2', x(s)).attr('y1', 0).attr('y2', ch);
    fragileDot.attr('cx', x(s)).attr('cy', y(fp));
    robustDot.attr('cx', x(s)).attr('cy', y(rp));
    antiDot.attr('cx', x(s)).attr('cy', y(ap));
  }

  stressSlider.addEventListener('input', render);
  render();
})();

// ============================================================
// VIZ 16: CONWAY
// ============================================================
(function() {
  const orgSvg = d3.select('#cw-org');
  const sysSvg = d3.select('#cw-sys');

  const W = 380, H = 360;

  function layoutSiloed() {
    const labels = ['Frontend', 'Backend', 'Data', 'QA'];
    const nodes = [];
    for (let c = 0; c < 4; c++) for (let r = 0; r < 2; r++) {
      nodes.push({ x: 60 + c * 88, y: 90 + r * 80, group: c, label: labels[c], role: r });
    }
    const links = [];
    for (let c = 0; c < 4; c++) {
      const a = nodes.find(n => n.group === c && n.role === 0);
      const b = nodes.find(n => n.group === c && n.role === 1);
      links.push({ s: a, t: b, w: 3 });
    }
    [[0,1],[1,2],[1,3]].forEach(([a, b]) => {
      links.push({ s: nodes.find(n => n.group === a && n.role === 0), t: nodes.find(n => n.group === b && n.role === 0), w: 1 });
    });
    return { nodes, links };
  }

  function layoutProduct() {
    const positions = [[100, 100], [280, 100], [100, 260], [280, 260]];
    const nodes = [];
    positions.forEach((p, i) => {
      nodes.push({ x: p[0] - 28, y: p[1], group: i, label: 'Product ' + (i+1), role: 0 });
      nodes.push({ x: p[0] + 28, y: p[1], group: i, label: 'Product ' + (i+1), role: 1 });
    });
    const links = [];
    nodes.forEach((n1, i) => nodes.forEach((n2, j) => {
      if (i < j && n1.group === n2.group) links.push({ s: n1, t: n2, w: 3 });
    }));
    [[0,1],[1,3],[2,3],[0,2]].forEach(([a,b]) => {
      links.push({ s: nodes.find(n => n.group === a && n.role === 0), t: nodes.find(n => n.group === b && n.role === 0), w: 1 });
    });
    return { nodes, links };
  }

  function layoutMatrix() {
    const nodes = [];
    for (let f = 0; f < 2; f++) for (let p = 0; p < 4; p++) {
      nodes.push({ x: 60 + p * 88, y: 130 + f * 100, group: p, role: f, label: 'P' + (p+1) });
    }
    const links = [];
    for (let f = 0; f < 2; f++) {
      const row = nodes.filter(n => n.role === f).sort((a, b) => a.x - b.x);
      for (let i = 0; i < row.length - 1; i++) links.push({ s: row[i], t: row[i+1], w: 2 });
    }
    for (let p = 0; p < 4; p++) {
      const col = nodes.filter(n => n.group === p);
      if (col.length === 2) links.push({ s: col[0], t: col[1], w: 2 });
    }
    return { nodes, links };
  }

  function layoutHub() {
    const nodes = [{ x: W / 2, y: H / 2, group: 'hub', role: 0, label: 'Platform' }];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * 2 * Math.PI - Math.PI / 2;
      const r = 120;
      nodes.push({ x: W / 2 + r * Math.cos(a), y: H / 2 + r * Math.sin(a), group: 'spoke' + i, role: 1, label: 'Team ' + (i+1) });
    }
    const links = [];
    for (let i = 1; i < 8; i++) links.push({ s: nodes[0], t: nodes[i], w: 2 });
    return { nodes, links };
  }

  const layouts = {
    siloed: layoutSiloed(),
    product: layoutProduct(),
    matrix: layoutMatrix(),
    hub: layoutHub()
  };

  function draw(svg, data, isSys) {
    svg.selectAll('*').remove();

    const groups = d3.group(data.nodes, d => d.group);
    const hulls = [];
    groups.forEach((nodes, key) => {
      if (nodes.length < 2) return;
      const pts = nodes.map(n => [n.x, n.y]);
      const minX = d3.min(pts, p => p[0]) - 24;
      const maxX = d3.max(pts, p => p[0]) + 24;
      const minY = d3.min(pts, p => p[1]) - 24;
      const maxY = d3.max(pts, p => p[1]) + 24;
      hulls.push({ minX, maxX, minY, maxY, key, label: nodes[0].label });
    });

    svg.append('g').selectAll('rect.hull').data(hulls).join('rect')
      .attr('class', 'hull')
      .attr('x', d => d.minX).attr('y', d => d.minY)
      .attr('width', d => d.maxX - d.minX).attr('height', d => d.maxY - d.minY)
      .attr('rx', 12).attr('ry', 12)
      .attr('fill', isSys ? 'rgba(44,95,141,0.06)' : 'rgba(199,84,50,0.06)')
      .attr('stroke', isSys ? PALETTE.blueSoft : PALETTE.accentSoft)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    svg.append('g').selectAll('text.hull-label').data(hulls).join('text')
      .attr('class', 'hull-label')
      .text(d => d.label)
      .attr('x', d => (d.minX + d.maxX) / 2).attr('y', d => d.minY - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', isSys ? PALETTE.blue : PALETTE.accent)
      .style('font-family', 'Inter').style('font-size', '10px').style('font-weight', '600')
      .style('letter-spacing', '0.08em').style('text-transform', 'uppercase');

    svg.append('g').selectAll('line').data(data.links).join('line')
      .attr('x1', d => d.s.x).attr('y1', d => d.s.y)
      .attr('x2', d => d.t.x).attr('y2', d => d.t.y)
      .attr('stroke', isSys ? PALETTE.blue : PALETTE.accent)
      .attr('stroke-width', d => 0.6 + d.w * 0.4)
      .attr('opacity', 0.5);

    svg.append('g').selectAll('circle').data(data.nodes).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r', isSys ? 7 : 8)
      .attr('fill', isSys ? PALETTE.blue : PALETTE.accent)
      .attr('stroke', PALETTE.bg).attr('stroke-width', 2);
  }

  function render(key) {
    draw(orgSvg, layouts[key], false);
    draw(sysSvg, layouts[key], true);
  }

  document.querySelectorAll('#viz-conway .btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#viz-conway .btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      render(b.dataset.org);
    });
  });

  render('siloed');
})();

// ============================================================
// VIZ 17: BIG-O
// ============================================================
(function() {
  const W = 800, H = 420;
  const svg = d3.select('#bo-graph');
  const slider = document.getElementById('bo-n');
  const nv = document.getElementById('bo-n-v');
  const logBtn = document.getElementById('bo-log');

  const margin = { top: 30, right: 180, bottom: 50, left: 60 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const NMAX = 40;
  const funcs = [
    { key: 'const', label: 'O(1)', fn: n => 1, color: PALETTE.green, dash: '' },
    { key: 'log', label: 'O(log n)', fn: n => Math.log2(Math.max(1, n)), color: PALETTE.blue, dash: '' },
    { key: 'lin', label: 'O(n)', fn: n => n, color: PALETTE.gold, dash: '' },
    { key: 'nlogn', label: 'O(n log n)', fn: n => n * Math.log2(Math.max(1, n)), color: PALETTE.purple, dash: '' },
    { key: 'sq', label: 'O(n²)', fn: n => n * n, color: PALETTE.accent, dash: '' },
    { key: 'exp', label: 'O(2ⁿ)', fn: n => Math.pow(2, n), color: '#6b1f08', dash: '' }
  ];

  let useLog = false;

  let x, y;
  function buildScales() {
    x = d3.scaleLinear().domain([1, NMAX]).range([0, cw]);
    const max = d3.max(funcs, f => f.fn(NMAX));
    y = useLog
      ? d3.scaleLog().domain([1, max]).range([ch, 0]).clamp(true)
      : d3.scaleLinear().domain([0, Math.min(max, 1600)]).range([ch, 0]).clamp(true);
  }

  const axisX = g.append('g').attr('transform', `translate(0,${ch})`);
  const axisY = g.append('g');

  g.append('text').text('Input size (n)')
    .attr('x', cw / 2).attr('y', ch + 38)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.inkSoft)
    .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');
  const yLabel = g.append('text').text('Work')
    .attr('transform', `rotate(-90)`).attr('x', -ch / 2).attr('y', -44)
    .attr('text-anchor', 'middle').attr('fill', PALETTE.inkSoft)
    .style('font-family', 'Inter').style('font-size', '12px').style('font-weight', '600');

  const lineGen = d3.line().x(d => x(d.n)).y(d => y(Math.max(0.0001, d.v))).curve(d3.curveMonotoneX);

  const paths = funcs.map(f => g.append('path').attr('fill', 'none').attr('stroke', f.color).attr('stroke-width', 2.5));

  const legend = svg.append('g').attr('transform', `translate(${W - margin.right + 18},${margin.top + 8})`);
  funcs.forEach((f, i) => {
    const row = legend.append('g').attr('transform', `translate(0,${i * 28})`);
    row.append('line').attr('x1', 0).attr('x2', 22).attr('y1', 0).attr('y2', 0)
      .attr('stroke', f.color).attr('stroke-width', 2.5);
    row.append('text').text(f.label).attr('x', 30).attr('y', 4)
      .attr('fill', PALETTE.ink).style('font-family', 'Inter').style('font-size', '13px').style('font-weight', '600');
    f.valEl = row.append('text').text('').attr('x', 30).attr('y', 20)
      .attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px').style('font-variant-numeric', 'tabular-nums');
  });

  const nLine = g.append('line').attr('stroke', PALETTE.ink).attr('stroke-width', 1).attr('stroke-dasharray', '3,3');

  function fmt(v) {
    if (v < 100) return v.toFixed(1).replace(/\.0$/, '');
    if (v < 100000) return Math.round(v).toLocaleString();
    if (v < 1e9) return (v / 1000).toFixed(1) + 'K';
    if (v < 1e12) return (v / 1e9).toFixed(1) + 'B';
    return v.toExponential(1);
  }

  function render() {
    const curN = +slider.value;
    nv.textContent = curN;
    buildScales();

    axisX.transition().duration(250).call(d3.axisBottom(x).ticks(8).tickSize(-ch).tickPadding(8))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
      .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px'));

    axisY.transition().duration(250).call(useLog
      ? d3.axisLeft(y).ticks(6, '.0s').tickSize(-cw).tickPadding(8)
      : d3.axisLeft(y).ticks(5).tickSize(-cw).tickPadding(8))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', PALETTE.rule))
      .call(g => g.selectAll('text').attr('fill', PALETTE.muted).style('font-family', 'Inter').style('font-size', '11px'));

    funcs.forEach((f, i) => {
      const data = d3.range(1, NMAX + 0.5, 0.5).map(n => ({ n, v: f.fn(n) }));
      paths[i].attr('d', lineGen(data));
      f.valEl.text('= ' + fmt(f.fn(curN)));
    });

    nLine.attr('x1', x(curN)).attr('x2', x(curN)).attr('y1', 0).attr('y2', ch);
    yLabel.text(useLog ? 'Work (log scale)' : 'Work');
  }

  slider.addEventListener('input', render);
  logBtn.addEventListener('click', () => { useLog = !useLog; logBtn.classList.toggle('active'); render(); });
  render();
})();

// ============================================================
// VIZ 18: BOIDS
// ============================================================
(function() {
  const W = 800, H = 380;
  const svg = d3.select('#b-graph');
  const sepS = document.getElementById('b-sep');
  const aliS = document.getElementById('b-ali');
  const cohS = document.getElementById('b-coh');
  const zeroBtn = document.getElementById('b-zero');
  const defBtn = document.getElementById('b-default');

  const N = 90;
  const boids = d3.range(N).map(() => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2
  }));

  const boidsLayer = svg.append('g');

  function step() {
    const sep = +sepS.value / 100;
    const ali = +aliS.value / 100;
    const coh = +cohS.value / 100;

    const visualR = 60;
    const sepR = 18;
    const maxSpeed = 2.4;
    const maxForce = 0.05;

    for (let i = 0; i < N; i++) {
      const b = boids[i];
      let ax = 0, ay = 0;

      let sepX = 0, sepY = 0, sepN = 0;
      let aliX = 0, aliY = 0, aliN = 0;
      let cohX = 0, cohY = 0, cohN = 0;

      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const o = boids[j];
        const dx = o.x - b.x, dy = o.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > visualR * visualR) continue;
        const d = Math.sqrt(d2) || 0.001;

        if (d < sepR) {
          sepX -= dx / d; sepY -= dy / d; sepN++;
        }
        aliX += o.vx; aliY += o.vy; aliN++;
        cohX += o.x; cohY += o.y; cohN++;
      }

      if (sepN > 0) { sepX /= sepN; sepY /= sepN; }
      if (aliN > 0) { aliX = aliX / aliN - b.vx; aliY = aliY / aliN - b.vy; }
      if (cohN > 0) { cohX = (cohX / cohN) - b.x; cohY = (cohY / cohN) - b.y; }

      function limit(x, y, max) {
        const m = Math.sqrt(x * x + y * y);
        if (m > max) return [x / m * max, y / m * max];
        return [x, y];
      }
      [sepX, sepY] = limit(sepX, sepY, maxForce * 3);
      [aliX, aliY] = limit(aliX, aliY, maxForce);
      [cohX, cohY] = limit(cohX * 0.01, cohY * 0.01, maxForce);

      ax = sepX * sep + aliX * ali + cohX * coh;
      ay = sepY * sep + aliY * ali + cohY * coh;

      b.vx += ax; b.vy += ay;
      const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (sp > maxSpeed) { b.vx = b.vx / sp * maxSpeed; b.vy = b.vy / sp * maxSpeed; }
      b.vx += (Math.random() - 0.5) * 0.04;
      b.vy += (Math.random() - 0.5) * 0.04;

      b.x += b.vx; b.y += b.vy;

      if (b.x < 0) b.x += W; if (b.x > W) b.x -= W;
      if (b.y < 0) b.y += H; if (b.y > H) b.y -= H;
    }

    boidsLayer.selectAll('path').data(boids).join('path')
      .attr('d', d => {
        const a = Math.atan2(d.vy, d.vx);
        const s = 5;
        const x1 = d.x + Math.cos(a) * s * 1.6;
        const y1 = d.y + Math.sin(a) * s * 1.6;
        const x2 = d.x + Math.cos(a + 2.4) * s;
        const y2 = d.y + Math.sin(a + 2.4) * s;
        const x3 = d.x + Math.cos(a - 2.4) * s;
        const y3 = d.y + Math.sin(a - 2.4) * s;
        return `M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`;
      })
      .attr('fill', PALETTE.accent)
      .attr('opacity', 0.78);

    requestAnimationFrame(step);
  }

  zeroBtn.addEventListener('click', () => { sepS.value = 0; aliS.value = 0; cohS.value = 0; });
  defBtn.addEventListener('click', () => { sepS.value = 120; aliS.value = 100; cohS.value = 60; });

  step();
})();

}); // end DOMContentLoaded
</script>
