/* quotes.js — a random quote in the hero, and a button for another one.
   The same nineteen quotes are written out in quotes.html, so the page still
   reads without JavaScript; this file only chooses one for the top. */
(function () {
  'use strict';

  var QUOTES = [
    {
      text: 'Simplicity is prerequisite for reliability.',
      author: 'Edsger W. Dijkstra',
      source: 'How Do We Tell Truths That Might Hurt? (1975)'
    },
    {
      text: 'There are two ways of constructing a software design: one way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.',
      author: 'C. A. R. Hoare',
      source: 'Turing Award lecture (1980)'
    },
    {
      text: 'We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil.',
      author: 'Donald Knuth',
      source: 'Structured Programming with go to Statements (1974)'
    },
    {
      text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
      author: 'Harold Abelson and Gerald Jay Sussman',
      source: 'Structure and Interpretation of Computer Programs (1985)'
    },
    {
      text: 'Talk is cheap. Show me the code.',
      author: 'Linus Torvalds',
      source: 'Linux kernel mailing list (2000)'
    },
    {
      text: 'Given enough eyeballs, all bugs are shallow.',
      author: 'Eric S. Raymond',
      source: 'The Cathedral and the Bazaar (1999)'
    },
    {
      text: 'The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it.',
      author: 'Mark Weiser',
      source: 'The Computer for the 21st Century (1991)'
    },
    {
      text: 'The web is more a social creation than a technical one.',
      author: 'Tim Berners-Lee',
      source: 'Weaving the Web (1999)'
    },
    {
      text: 'The medium is the message.',
      author: 'Marshall McLuhan',
      source: 'Understanding Media (1964)'
    },
    {
      text: 'We shape our tools and thereafter our tools shape us.',
      author: 'John M. Culkin',
      source: 'A Schoolman\u2019s Guide to Marshall McLuhan (1967)'
    },
    {
      text: 'Any sufficiently advanced technology is indistinguishable from magic.',
      author: 'Arthur C. Clarke',
      source: 'Hazards of Prophecy (1973)'
    },
    {
      text: 'The best way to predict the future is to invent it.',
      author: 'Alan Kay',
      source: 'Xerox PARC (1971)'
    },
    {
      text: 'The best way out is always through.',
      author: 'Robert Frost',
      source: 'A Servant to Servants (1914)'
    },
    {
      text: 'It is not down on any map; true places never are.',
      author: 'Herman Melville',
      source: 'Moby-Dick (1851)'
    },
    {
      text: 'Not all those who wander are lost.',
      author: 'J. R. R. Tolkien',
      source: 'The Fellowship of the Ring (1954)'
    },
    {
      text: 'I have always imagined that Paradise will be a kind of library.',
      author: 'Jorge Luis Borges',
      source: 'Poem of the Gifts (1960)'
    },
    {
      text: 'The unexamined life is not worth living.',
      author: 'Socrates',
      source: 'in Plato\u2019s Apology'
    },
    {
      text: 'Design is not just what it looks like and feels like. Design is how it works.',
      author: 'Steve Jobs',
      source: 'The New York Times (2003)'
    },
    {
      text: 'Stay hungry, stay foolish.',
      author: 'Whole Earth Catalog (1974)',
      source: 'quoted by Steve Jobs at Stanford (2005)'
    }
  ];

  var quoteEl = document.getElementById('hero-quote');
  var authorEl = document.getElementById('hero-author');
  var sourceEl = document.getElementById('hero-source');
  var button = document.getElementById('quote-next');

  if (!quoteEl || !authorEl || !sourceEl || !button) {
    return;
  }

  var current = -1;

  function show(index) {
    current = index;
    var quote = QUOTES[index];
    quoteEl.textContent = quote.text;
    authorEl.textContent = quote.author;
    sourceEl.textContent = quote.source;
  }

  function pick() {
    if (QUOTES.length < 2) {
      show(0);
      return;
    }

    var next = current;
    while (next === current) {
      next = Math.floor(Math.random() * QUOTES.length);
    }
    show(next);
  }

  button.addEventListener('click', pick);

  show(Math.floor(Math.random() * QUOTES.length));
})();
