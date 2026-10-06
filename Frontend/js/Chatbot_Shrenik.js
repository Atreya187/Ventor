const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");
const messages = document.getElementById("chatbot-messages");

const faqEntries = [
  {
    question: "What is Ventor?",
    answer: "Ventor is a startup model planning platform that helps entrepreneurs evaluate e-commerce business models, make financial estimates, and generate a structured startup report.",
    keywords: ["ventor", "website", "platform", "startup planner", "what do you do"]
  },
  {
    question: "How does the business model recommendation work?",
    answer: "The assessment uses details such as your goals, investment, revenue strategy, inventory, target customers, suppliers, marketing, and operations to recommend a suitable e-commerce model. Open the assessment from the Services page and complete the form.",
    keywords: ["recommendation", "recommend", "choose a model", "choose model", "pick a model", "select a model", "right model", "business model", "assessment", "which model", "suggest"]
  },
  {
    question: "What business models does Ventor cover?",
    answer: "Ventor covers subscription, affiliate marketing, dropshipping, business-to-customer (B2C), business-to-business (B2B), and marketplace models.",
    keywords: ["business models", "model types", "ecommerce models", "subscription", "affiliate", "dropshipping", "marketplace", "b2c", "b2b"]
  },
  {
    question: "What is a subscription business model?",
    answer: "In a subscription model, customers pay recurring fees on a regular schedule to keep receiving a product or service. Examples include monthly memberships and subscription boxes.",
    keywords: ["subscription", "recurring", "monthly payment", "recurring revenue"]
  },
  {
    question: "What is dropshipping?",
    answer: "Dropshipping is an e-commerce model where the seller lists products but a supplier stores and ships orders directly to customers. The store owner does not have to hold the inventory.",
    keywords: ["dropshipping", "drop shipping", "supplier ships", "no inventory"]
  },
  {
    question: "What is affiliate marketing?",
    answer: "Affiliate marketing is a model where you promote another business's products and earn a commission when referrals lead to sales.",
    keywords: ["affiliate", "referral", "commission", "promote products"]
  },
  {
    question: "What is the difference between B2C and B2B?",
    answer: "B2C (business-to-customer) sells products or services to individual consumers. B2B (business-to-business) sells to other businesses, often through bulk orders or contracts.",
    keywords: ["b2c", "b2b", "business to customer", "business to consumer", "business to business", "target customers"]
  },
  {
    question: "What is a marketplace model?",
    answer: "A marketplace connects multiple sellers with customers on one platform. The platform can earn revenue through seller commissions or fees.",
    keywords: ["marketplace", "multiple sellers", "seller commission", "platform model"]
  },
  {
    question: "Do I need technical or business experience?",
    answer: "No. Ventor is designed to be beginner-friendly and does not require prior business or technical experience.",
    keywords: ["technical knowledge", "technical experience", "business experience", "beginner", "easy to use", "how to use"]
  },
  {
    question: "Is Ventor free?",
    answer: "The assessment and basic business model recommendations are free to use.",
    keywords: ["free", "pricing", "price", "charges", "cost to use", "paid"]
  },
  {
    question: "How accurate are the recommendations?",
    answer: "Recommendations are based on the information you provide and structured, theoretical business analysis. Use them as strategic guidance, not as a guarantee of business success.",
    keywords: ["accurate", "accuracy", "reliable", "guarantee", "recommendation quality"]
  },
  {
    question: "Can I retake the assessment?",
    answer: "Yes. You can complete the assessment again with updated information whenever your business strategy changes.",
    keywords: ["retake", "again", "redo", "update my assessment", "strategy changes"]
  },
  {
    question: "Can I generate or download a startup report?",
    answer: "Yes. Complete the startup assessment to generate a report with your recommended model and strategic analysis. The report can be previewed online and downloaded as a PDF.",
    keywords: ["report", "download", "pdf", "generate", "startup analysis", "print"]
  },
  {
    question: "What does the profit calculator do?",
    answer: "The Profit Calculator estimates profit and selling price from product cost and profit margin. Profit = cost × margin ÷ 100; selling price = cost + profit. Enter the values on the Profit Calculator page.",
    keywords: ["profit calculator", "profit margin", "selling price", "product cost", "revenue"]
  },
  {
    question: "What does the traffic calculator do?",
    answer: "The Traffic Calculator estimates daily revenue and visitors needed for a revenue goal over a chosen number of days. Its estimate assumes a 2% conversion rate and an average order value of ₹1,000.",
    keywords: ["traffic calculator", "visitors", "website traffic", "conversion rate", "revenue goal", "orders"]
  },
  {
    question: "What does the break-even calculator do?",
    answer: "The Break-Even Calculator estimates how many months it takes to recover an initial investment: initial investment ÷ monthly profit, rounded up to a whole month. Monthly profit must be greater than zero.",
    keywords: ["break even", "break-even", "investment recovery", "recover investment", "months"]
  },
  {
    question: "What does the ROI calculator do?",
    answer: "The ROI Calculator estimates return on investment as profit ÷ investment × 100, shown as a percentage.",
    keywords: ["roi", "return on investment", "investment return", "profitability"]
  },
  {
    question: "What are CAC and LTV?",
    answer: "CAC is customer acquisition cost: marketing cost ÷ customers acquired. LTV is customer lifetime value: average purchase value × purchase frequency per year × customer lifespan in years. The calculator compares the two; a higher LTV than CAC is a positive sign.",
    keywords: ["cac", "ltv", "customer acquisition cost", "lifetime value", "customer lifetime value", "ltv vs cac"]
  },
  {
    question: "How can I contact Ventor?",
    answer: "You can contact the team by email at ventor@company.com or by phone at +91 91555 123456.",
    keywords: ["contact", "email", "phone", "support", "help team"]
  }
];

const stopWords = new Set([
  "a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in",
  "is", "it", "me", "my", "of", "on", "or", "the", "to", "what", "when",
  "where", "which", "who", "why", "with", "you", "your"
]);

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function singularize(word) {
  return word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;
}

function getFaqReply(question) {
  const queryWords = normalizeText(question);
  const queryTerms = new Set(
    queryWords
      .filter((word) => !stopWords.has(word))
      .map(singularize)
  );

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of faqEntries) {
    let keywordScore = 0;
    const matchedKeywords = new Set();

    for (const keyword of entry.keywords) {
      const keywordWords = normalizeText(keyword).map(singularize);
      const keywordTerms = [...new Set(keywordWords.filter((word) => !stopWords.has(word)))];
      const phraseMatches = keywordWords.length > 1 &&
        queryWords.join(" ").includes(keywordWords.join(" "));
      const termMatches = keywordTerms.length > 0 &&
        keywordTerms.every((word) => queryTerms.has(word));

      if (phraseMatches || termMatches) {
        const key = keywordWords.join(" ");
        if (!matchedKeywords.has(key)) {
          matchedKeywords.add(key);
          keywordScore += keywordWords.length > 1 ? 3 : 2.5;
        }
      }
    }

    const questionTerms = normalizeText(entry.question)
      .filter((word) => !stopWords.has(word))
      .map(singularize);
    const questionOverlap = questionTerms.filter((word) => queryTerms.has(word)).length;
    const score = keywordScore + Math.min(questionOverlap * 0.25, 1);

    if (score > bestScore) {
      bestMatch = entry;
      bestScore = score;
    }
  }

  if (bestMatch && bestScore >= 2.5) {
    return bestMatch.answer;
  }

  return "I can help with Ventor's business model assessment, e-commerce models, startup reports, and calculators (profit, traffic, break-even, ROI, and LTV vs CAC). Try including a specific keyword, such as “report”, “dropshipping”, or “ROI”.";
}

function appendMessage(className, text) {
  const message = document.createElement("div");
  message.className = className;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user-message", text);
  input.value = "";

  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;

  await new Promise((resolve) => setTimeout(resolve, 250));
  typingDiv.remove();
  appendMessage("bot-message", getFaqReply(text));
}

if (input && sendBtn && messages) {
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });
}

function toggleChatbot() {
  const chatbot = document.getElementById("chatbot-window");
  if (!chatbot) return;

  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
}
