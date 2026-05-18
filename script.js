// =============================================================
//  script.js — Renders content.js into the page.
//  You do NOT need to edit this file to update your website.
// =============================================================

(function () {
  const c = window.siteContent;
  if (!c) {
    console.error("content.js did not load. Make sure content.js is included before script.js in your HTML.");
    return;
  }

  // ----- Shared: brand + nav highlight + footer -----
  renderShared(c);

  // ----- Page-specific render based on <body data-page="..."> -----
  const page = document.body.getAttribute("data-page");
  if (page === "about")       renderAbout(c.about);
  if (page === "portfolio")   renderPortfolio(c.portfolio);
  if (page === "experience")  { renderExperience(c.experience); renderCredentials(c.experience); renderToolbox(c.experience); }
  if (page === "ai")          renderAi(c.aiExploration);

  // ===========================================================
  function renderShared(c) {
    setText(".js-brand", c.siteName);
    setText(".js-tagline", c.tagline);

    // Highlight the active nav link based on current page
    const page = document.body.getAttribute("data-page");
    document.querySelectorAll(".nav a").forEach(a => {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });

    // Footer
    const f = c.footer || {};
    setText(".js-footer-copy", `© ${new Date().getFullYear()} ${f.copyrightLine || c.siteName}`);
    const links = document.querySelector(".js-footer-links");
    if (links) {
      links.innerHTML = "";
      if (f.contactEmail) links.appendChild(linkEl(`mailto:${f.contactEmail}`, f.contactEmail));
      if (f.linkedin)     links.appendChild(linkEl(f.linkedin, "LinkedIn"));
    }
  }

  // ===========================================================
  function renderAbout(a) {
    if (!a) return;
    setText(".js-about-headline", a.headline);
    setText(".js-about-subheadline", a.subheadline);

    // Quote block — optionally bolds the "highlight" phrase if found in text
    const quoteWrap = document.querySelector(".js-about-quote");
    if (quoteWrap) {
      if (a.quote && a.quote.text) {
        quoteWrap.innerHTML = "";
        const q = document.createElement("blockquote");
        q.className = "about-quote";
        const inner = document.createElement("p");
        const text = a.quote.text;
        const hl = (a.quote.highlight || "").trim();
        if (hl && text.toLowerCase().includes(hl.toLowerCase())) {
          const idx = text.toLowerCase().indexOf(hl.toLowerCase());
          const before = text.slice(0, idx);
          const match = text.slice(idx, idx + hl.length);
          const after = text.slice(idx + hl.length);
          inner.appendChild(document.createTextNode(before));
          const strong = document.createElement("strong");
          strong.textContent = match;
          inner.appendChild(strong);
          inner.appendChild(document.createTextNode(after));
        } else {
          inner.textContent = text;
        }
        q.appendChild(inner);
        quoteWrap.appendChild(q);
      } else {
        quoteWrap.remove();
      }
    }

    // Bio — convert double newlines into paragraphs
    const bioEl = document.querySelector(".js-about-bio");
    if (bioEl && a.bio) {
      bioEl.innerHTML = "";
      a.bio.split(/\n\n+/).forEach(para => {
        const p = document.createElement("p");
        p.textContent = para;
        bioEl.appendChild(p);
      });
    } else if (bioEl && !a.bio) {
      bioEl.remove();
    }

    // Photo
    const photoWrap = document.querySelector(".js-about-photo-wrap");
    const grid = document.querySelector(".hero-grid");
    if (a.photo && photoWrap) {
      photoWrap.innerHTML = "";
      const img = document.createElement("img");
      img.src = a.photo;
      img.alt = a.photoAlt || "";
      img.className = "hero-photo";
      photoWrap.appendChild(img);
      if (grid) grid.classList.add("has-photo");
    } else if (photoWrap) {
      photoWrap.remove();
    }

    // Socials
    const socials = document.querySelector(".js-about-socials");
    if (socials && Array.isArray(a.socials)) {
      socials.innerHTML = "";
      a.socials.forEach((s, i) => {
        const a2 = linkEl(s.url, s.label);
        a2.className = i === 0 ? "btn" : "btn secondary";
        socials.appendChild(a2);
      });
    }

    // Highlight pills
    const pills = document.querySelector(".js-about-highlights");
    if (pills) {
      if (Array.isArray(a.highlights) && a.highlights.length) {
        pills.innerHTML = "";
        a.highlights.forEach(h => {
          const span = document.createElement("span");
          span.className = "pill";
          span.textContent = h;
          pills.appendChild(span);
        });
      } else {
        pills.remove();
      }
    }
  }

  // ===========================================================
  function renderPortfolio(p) {
    if (!p) return;
    setText(".js-portfolio-intro", p.intro);

    const grid = document.querySelector(".js-portfolio-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!p.projects || !p.projects.length) {
      grid.appendChild(emptyHint("No projects yet — add one in content.js under portfolio → projects."));
      return;
    }

    p.projects.forEach(proj => {
      const card = document.createElement("article");
      card.className = "project-card";

      if (proj.image) {
        const img = document.createElement("img");
        img.src = proj.image;
        img.alt = proj.title || "";
        img.className = "card-image";
        card.appendChild(img);
      }

      const body = document.createElement("div");
      body.className = "card-body";

      const h = document.createElement("h3");
      h.textContent = proj.title || "";
      body.appendChild(h);

      if (proj.summary) {
        const para = document.createElement("p");
        para.textContent = proj.summary;
        body.appendChild(para);
      }

      if (Array.isArray(proj.tags) && proj.tags.length) {
        const pills = document.createElement("div");
        pills.className = "pills";
        proj.tags.forEach(t => {
          const span = document.createElement("span");
          span.className = "pill";
          span.textContent = t;
          pills.appendChild(span);
        });
        body.appendChild(pills);
      }

      if (proj.link) {
        const foot = document.createElement("div");
        foot.className = "card-footer";
        const a = linkEl(proj.link, proj.linkLabel || "View project");
        a.className = "btn";
        foot.appendChild(a);
        body.appendChild(foot);
      }

      card.appendChild(body);
      grid.appendChild(card);
    });

    initCarousel(grid, p.projects.length);
  }

  // ===========================================================
  function initCarousel(grid, count) {
    if (!grid || count < 2) return;

    var GAP      = 24;
    var viewport = document.querySelector(".carousel-viewport");
    var prevBtn  = document.querySelector(".carousel-prev");
    var nextBtn  = document.querySelector(".carousel-next");
    var dotsWrap = document.querySelector(".js-carousel-dots");
    var current  = 0;
    var timer;

    // How many cards are visible given current viewport width
    function getVisible() {
      var vw = viewport ? viewport.offsetWidth : window.innerWidth;
      var card = grid.children[0];
      if (!card) return 1;
      // each card is roughly (vw - gaps) / N; derive N from card's rendered width
      var cardW = card.offsetWidth;
      return Math.max(1, Math.round((vw + GAP) / (cardW + GAP)));
    }

    // Maximum valid scroll position (so we never show blank space)
    function getMax() {
      return Math.max(0, count - getVisible());
    }

    // Pixel distance of one step (one card width + one gap)
    function getStep() {
      var card = grid.children[0];
      return card ? (card.offsetWidth + GAP) : 0;
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      var max = getMax();
      for (var i = 0; i <= max; i++) {
        (function (idx) {
          var dot = document.createElement("button");
          dot.className = "carousel-dot" + (idx === current ? " active" : "");
          dot.setAttribute("aria-label", "Go to position " + (idx + 1));
          dot.addEventListener("click", function () { stopAuto(); goTo(idx); startAuto(); });
          dotsWrap.appendChild(dot);
        })(i);
      }
    }

    function goTo(idx) {
      var max = getMax();
      // Wrap around for infinite feel
      if (idx > max) idx = 0;
      if (idx < 0)   idx = max;
      current = idx;
      grid.style.transform = "translateX(-" + (current * getStep()) + "px)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll(".carousel-dot").forEach(function (d, i) {
          d.classList.toggle("active", i === current);
        });
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (prevBtn) prevBtn.addEventListener("click", function () { stopAuto(); prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stopAuto(); next(); startAuto(); });

    if (viewport) {
      viewport.addEventListener("mouseenter", stopAuto);
      viewport.addEventListener("mouseleave", startAuto);
    }

    // Recalculate on resize (dots may change if breakpoint shifts)
    window.addEventListener("resize", function () {
      buildDots();
      goTo(Math.min(current, getMax()));
    });

    function startAuto() { timer = setInterval(next, 4000); }
    function stopAuto()  { clearInterval(timer); }

    buildDots();
    goTo(0);
    startAuto();
  }

  // ===========================================================
  function renderExperience(e) {
    if (!e) return;

    const list = document.querySelector(".js-experience-list");
    if (list) {
      list.innerHTML = "";
      (e.roles || []).forEach(role => {
        const card = document.createElement("article");
        card.className = "exp-card";

        // Top row: date left, tags right
        const top = document.createElement("div");
        top.className = "exp-card-top";

        const dates = document.createElement("span");
        dates.className = "role-dates";
        dates.textContent = role.dates || "";
        top.appendChild(dates);

        if (Array.isArray(role.tags) && role.tags.length) {
          const tags = document.createElement("span");
          tags.className = "role-tags";
          tags.textContent = role.tags.join(" · ");
          top.appendChild(tags);
        }

        card.appendChild(top);

        // Large company name
        if (role.company) {
          const co = document.createElement("span");
          co.className = "role-company";
          co.textContent = role.company;
          card.appendChild(co);
        }

        // Italic role title
        const title = document.createElement("p");
        title.className = "role-title";
        title.textContent = role.title || "";
        card.appendChild(title);

        // Numbered bullets
        if (Array.isArray(role.bullets) && role.bullets.length) {
          const ul = document.createElement("ul");
          role.bullets.forEach(b => {
            const li = document.createElement("li");
            li.textContent = b;
            ul.appendChild(li);
          });
          card.appendChild(ul);
        }

        list.appendChild(card);
      });
    }

    // Education
    const eduWrap = document.querySelector(".js-experience-education");
    if (eduWrap) {
      eduWrap.innerHTML = "";
      if (Array.isArray(e.education) && e.education.length) {
        const h = document.createElement("h2");
        h.textContent = "Education";
        eduWrap.appendChild(h);
        e.education.forEach(ed => {
          const card = document.createElement("div");
          card.className = "edu-card";

          const t = document.createElement("p");
          t.className = "edu-title";
          t.textContent = ed.qualification || "";
          card.appendChild(t);

          const meta = document.createElement("p");
          meta.className = "edu-meta";
          const parts = [];
          if (ed.institution) parts.push(ed.institution);
          if (ed.dates) parts.push(ed.dates);
          meta.textContent = parts.join(" · ");
          card.appendChild(meta);

          if (ed.details) {
            const d = document.createElement("p");
            d.className = "edu-details";
            d.textContent = ed.details;
            card.appendChild(d);
          }

          eduWrap.appendChild(card);
        });
      }
    }
  }

  // ===========================================================
  function renderAi(ai) {
    if (!ai) return;
    setText(".js-ai-intro", ai.intro);
    const list = document.querySelector(".js-ai-list");
    if (!list) return;
    list.innerHTML = "";

    if (!ai.entries || !ai.entries.length) {
      list.appendChild(emptyHint("No AI Exploration entries yet — add one in content.js under aiExploration → entries."));
      return;
    }

    ai.entries.forEach(entry => {
      const card = document.createElement("article");
      card.className = "ai-card" + (entry.image ? " has-image" : "");

      if (entry.image) {
        const img = document.createElement("img");
        img.src = entry.image;
        img.alt = entry.title || "";
        img.className = "ai-image";
        card.appendChild(img);
      }

      const body = document.createElement("div");
      body.className = "ai-body";

      const h = document.createElement("h3");
      h.textContent = entry.title || "";
      body.appendChild(h);

      if (entry.date) {
        const d = document.createElement("p");
        d.className = "ai-date";
        d.textContent = entry.date;
        body.appendChild(d);
      }

      if (entry.body) {
        const p = document.createElement("p");
        p.textContent = entry.body;
        body.appendChild(p);
      }

      if (entry.link) {
        const a = linkEl(entry.link, entry.linkLabel || "Read more");
        a.className = "btn";
        body.appendChild(a);
      }

      card.appendChild(body);
      list.appendChild(card);
    });
  }

  // ===========================================================
  function renderCredentials(e) {
    if (!e) return;
    const wrap = document.querySelector(".js-experience-credentials");
    if (!wrap) return;
    wrap.innerHTML = "";

    const creds = e.credentials || [];
    if (!creds.length) return;

    // Section header row
    const header = document.createElement("div");
    header.className = "creds-header";

    const label = document.createElement("span");
    label.className = "creds-label";
    label.textContent = "02.5 / Credentials on file";
    header.appendChild(label);

    const count = document.createElement("span");
    count.className = "creds-count";
    count.textContent = `${creds.length} of ${creds.length}`;
    header.appendChild(count);

    wrap.appendChild(header);

    // Ticket grid
    const grid = document.createElement("div");
    grid.className = "creds-grid";

    creds.forEach((cred, idx) => {
      const ticket = document.createElement("div");
      ticket.className = "cred-ticket" + (idx % 2 !== 0 ? " stub-accent" : "");

      // Left stub — large abbreviation
      const stub = document.createElement("div");
      stub.className = "cred-stub";
      const stubLabel = document.createElement("span");
      stubLabel.className = "cred-stub-label";
      stubLabel.textContent = "Credential";
      stub.appendChild(stubLabel);
      const abbr = document.createElement("span");
      abbr.className = "cred-abbr";
      abbr.textContent = cred.abbr || "";
      stub.appendChild(abbr);
      ticket.appendChild(stub);

      // Perforated divider
      const perf = document.createElement("div");
      perf.className = "cred-perf";
      ticket.appendChild(perf);

      // Right body
      const body = document.createElement("div");
      body.className = "cred-body";

      const issuer = document.createElement("p");
      issuer.className = "cred-issuer";
      issuer.textContent = (cred.issuer || "").toUpperCase();
      body.appendChild(issuer);

      const name = document.createElement("h3");
      name.className = "cred-name";
      name.textContent = cred.name || "";
      body.appendChild(name);

      const meta = document.createElement("div");
      meta.className = "cred-meta";

      const issuedBlock = document.createElement("div");
      issuedBlock.className = "cred-meta-block";
      issuedBlock.innerHTML = `<span class="cred-meta-label">Issued</span><span class="cred-meta-value">${cred.issued || ""}</span>`;
      meta.appendChild(issuedBlock);

      const validBlock = document.createElement("div");
      validBlock.className = "cred-meta-block";
      validBlock.innerHTML = `<span class="cred-meta-label">Valid Thru</span><span class="cred-meta-value">${cred.validThru || ""}</span>`;
      meta.appendChild(validBlock);

      body.appendChild(meta);

      if (cred.note) {
        const note = document.createElement("p");
        note.className = "cred-note";
        note.textContent = cred.note;
        body.appendChild(note);
      }

      const footer = document.createElement("div");
      footer.className = "cred-footer";

      const num = document.createElement("span");
      num.className = "cred-number";
      num.textContent = cred.number || "";
      footer.appendChild(num);

      const stamp = cred.url
        ? document.createElement("a")
        : document.createElement("span");
      stamp.className = "cred-stamp" + (cred.url ? " cred-stamp--link" : "");
      stamp.textContent = cred.url ? "↗ Verify" : "✓ Valid";
      if (cred.url) {
        stamp.href = cred.url;
        stamp.target = "_blank";
        stamp.rel = "noopener noreferrer";
        stamp.title = "View credential on Credly";
      }
      footer.appendChild(stamp);

      body.appendChild(footer);
      ticket.appendChild(body);
      grid.appendChild(ticket);
    });

    wrap.appendChild(grid);
  }

  // ===========================================================
  function renderToolbox(e) {
    if (!e) return;
    const wrap = document.querySelector(".js-experience-toolbox");
    if (!wrap) return;
    wrap.innerHTML = "";

    const cards = e.toolbox || [];
    if (!cards.length) return;

    // Section header
    const header = document.createElement("div");
    header.className = "toolbox-header";

    const label = document.createElement("span");
    label.className = "toolbox-label";
    label.textContent = "03 / Toolbox";
    header.appendChild(label);
    wrap.appendChild(header);

    const heading = document.createElement("h2");
    heading.className = "toolbox-heading";
    heading.innerHTML = "How I <em>operate.</em>";
    wrap.appendChild(heading);

    // Card grid
    const grid = document.createElement("div");
    grid.className = "toolbox-grid";

    cards.forEach(card => {
      const el = document.createElement("div");
      el.className = "toolbox-card toolbox-card--" + (card.variant || "white");

      const titleRow = document.createElement("div");
      titleRow.className = "toolbox-card-top";

      const title = document.createElement("h3");
      title.className = "toolbox-card-title";
      title.textContent = card.title || "";
      titleRow.appendChild(title);

      const num = document.createElement("span");
      num.className = "toolbox-card-num";
      num.textContent = card.number || "";
      titleRow.appendChild(num);

      el.appendChild(titleRow);

      const ul = document.createElement("ul");
      (card.items || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      el.appendChild(ul);

      grid.appendChild(el);
    });

    wrap.appendChild(grid);
  }

  // ----- helpers -----
  function setText(sel, value) {
    const el = document.querySelector(sel);
    if (el && value != null) el.textContent = value;
  }
  function linkEl(href, label) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label || href;
    return a;
  }
  function emptyHint(text) {
    const div = document.createElement("div");
    div.className = "empty-hint";
    div.textContent = text;
    return div;
  }
})();
