
const connectDB = require("./config/db");
const ScoringRule = require("./models/ScoringRule");
const ModelInsight = require("./models/ModelInsight");

const scoringRules = [
  {
    question: "revenue_strategy",
    option: "Recurring monthly payments",
    scores: { subscription: 3, affiliate: 0, b2c: 1, marketplace: 0, dropshipping: 0, b2b: 0 }
  },
  {
    question: "revenue_strategy",
    option: "Commission from referrals",
    scores: { subscription: 0, affiliate: 3, b2c: 0, marketplace: 0, dropshipping: 0, b2b: 0 }
  },
  {
    question: "revenue_strategy",
    option: "One-time product sales",
    scores: { subscription: 0, affiliate: 0, b2c: 3, marketplace: 0, dropshipping: 1, b2b: 1 }
  },
  {
    question: "revenue_strategy",
    option: "Commission from sellers",
    scores: { subscription: 0, affiliate: 0, b2c: 0, marketplace: 3, dropshipping: 0, b2b: 1 }
  },
  {
    question: "revenue_strategy",
    option: "Bulk orders from businesses",
    scores: { subscription: 0, affiliate: 0, b2c: 0, marketplace: 0, dropshipping: 0, b2b: 3 }
  },
  {
    question: "product_ownership",
    option: "Yes",
    scores: { subscription: 1, affiliate: 0, b2c: 2, marketplace: 0, dropshipping: 1, b2b: 0 }
  },
  {
    question: "inventory_management",
    option: "Yes",
    scores: { subscription: 1, affiliate: 0, b2c: 2, marketplace: 1, dropshipping: 0, b2b: 1 }
  },
  {
    question: "target_customer",
    option: "Individual consumers",
    scores: { subscription: 2, affiliate: 1, b2c: 3, marketplace: 0, dropshipping: 1, b2b: 0 }
  },
  {
    question: "target_customer",
    option: "Businesses",
    scores: { subscription: 0, affiliate: 0, b2c: 0, marketplace: 1, dropshipping: 0, b2b: 3 }
  },
  {
    question: "target_customer",
    option: "Both",
    scores: { subscription: 1, affiliate: 1, b2c: 2, marketplace: 2, dropshipping: 1, b2b: 1 }
  },
  {
    question: "supplier_dependence",
    option: "Yes",
    scores: { subscription: 0, affiliate: 0, b2c: 0, marketplace: 1, dropshipping: 3, b2b: 0 }
  },
  {
    question: "platform_strategy",
    option: "Yes",
    scores: { subscription: 0, affiliate: 0, b2c: 0, marketplace: 3, dropshipping: 0, b2b: 1 }
  },
  {
    question: "customer_relationship",
    option: "Yes",
    scores: { subscription: 3, affiliate: 0, b2c: 1, marketplace: 0, dropshipping: 0, b2b: 1 }
  },
  {
    question: "operations_complexity",
    option: "Very simple",
    scores: { subscription: 0, affiliate: 3, b2c: 1, marketplace: 1, dropshipping: 2, b2b: 0 }
  },
  {
    question: "marketing_strategy",
    option: "Brand building",
    scores: { subscription: 1, affiliate: 0, b2c: 3, marketplace: 1, dropshipping: 0, b2b: 0 }
  },
  {
    question: "delivery_type",
    option: "Supplier ships directly",
    scores: { subscription: 0, affiliate: 0, b2c: 0, marketplace: 1, dropshipping: 3, b2b: 0 }
  },
  {
    question: "scalability",
    option: "More customers",
    scores: { subscription: 2, affiliate: 1, b2c: 3, marketplace: 1, dropshipping: 1, b2b: 0 }
  }
];

const modelInsights = [
  {
    model_name: "Subscription",
    advantages: ["Predictable recurring revenue", "Strong customer retention"],
    risks: ["Requires sustained content or service value", "High customer support expectations"],
    cautions: ["Avoid low retention pricing", "Monitor churn closely"],
    recommendations: ["Focus on onboarding", "Invest in customer experience"]
  },
  {
    model_name: "Affiliate",
    advantages: ["Low upfront inventory cost", "Easy to launch quickly"],
    risks: ["Commission dependency", "Low customer control"],
    cautions: ["Choose reliable partners", "Track referral quality"],
    recommendations: ["Build strong affiliate relationships", "Optimize conversion funnels"]
  },
  {
    model_name: "B2C",
    advantages: ["Direct customer relationships", "Brand-building opportunities"],
    risks: ["High marketing costs", "Intense consumer competition"],
    cautions: ["Differentiate clearly", "Manage customer service"],
    recommendations: ["Invest in digital marketing", "Focus on product quality"]
  },
  {
    model_name: "Marketplace",
    advantages: ["Scales with more buyers and sellers", "Low inventory risk"],
    risks: ["Needs two-sided liquidity", "Platform trust and governance"],
    cautions: ["Onboard vendors carefully", "Maintain user trust"],
    recommendations: ["Build strong seller onboarding", "Invest in search and discovery"]
  },
  {
    model_name: "Dropshipping",
    advantages: ["Low upfront inventory costs", "Quick to start"],
    risks: ["Supplier reliability issues", "Lower margins"],
    cautions: ["Vet suppliers carefully", "Monitor shipping quality"],
    recommendations: ["Choose trusted suppliers", "Optimize product selection"]
  },
  {
    model_name: "B2B",
    advantages: ["Higher average order values", "Long-term contracts"],
    risks: ["Longer sales cycles", "Complex customer requirements"],
    cautions: ["Build strong sales relationships", "Ensure product fit"],
    recommendations: ["Target niche business segments", "Prioritize customer success"]
  }
];

async function seed() {
  try {
    await connectDB();
    console.log("Seeding database...");

    await ScoringRule.deleteMany({});
    await ModelInsight.deleteMany({});

    await ScoringRule.insertMany(scoringRules);
    await ModelInsight.insertMany(modelInsights);

    console.log("Seed complete: scoring rules and model insights inserted.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();