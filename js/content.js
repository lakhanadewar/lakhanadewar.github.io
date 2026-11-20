/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PORTFOLIO CONTENT — Lakhan Adewar
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every page on the site is generated from this one file.
 * Template: mj-folio (https://github.com/ursmaheshj/mj-folio)
 *
 * Image paths are relative to the site root.
 * Font Awesome icons: https://fontawesome.com/icons
 * ═══════════════════════════════════════════════════════════════════════════
 */

window.PORTFOLIO_DATA = {
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * PROFILE
   * ─────────────────────────────────────────────────────────────────────────
   */
  "profile": {
    "name": "Lakhan Adewar",
    "role": "QA Automation Engineer",
    "affiliation": "ISTQB® CTFL · M.Tech",

    "photoUrl": "images/profile.jpg",

    "address": [
      "London, UK"
    ],

    "social": [
      { "label": "GitHub",   "url": "https://github.com/lakhanadewar",        "icon": "fa-brands fa-github" },
      { "label": "LinkedIn", "url": "https://www.linkedin.com/in/lakhana/",   "icon": "fa-brands fa-linkedin-in" },
      { "label": "Email",    "url": "mailto:lakhanadewar@gmail.com",          "icon": "fa-solid fa-envelope" }
    ],

    // Set to "https://YOUR-USERNAME.medium.com/feed" to pull in Medium posts, or null to disable
    "mediumFeedUrl": null,

    "about": "I'm a QA automation engineer based in London with more than four years of testing web, mobile and API products. Most of that time was at Prodapt, where I built and ran regression automation for telecom and mobile money products, including M-Pesa for Vodafone and Safaricom. In 2026 I joined Certa.ai as a QA engineer, and I'm now the sole developer and tester on agriengg.tech. I write automation in Java, TypeScript and Python, so I can fit in with whatever stack a team already uses. Playwright, Selenium, Appium, REST Assured, PyTest and Cucumber are my everyday tools. What I care about most is fast, trustworthy feedback: suites that run in parallel in CI on every change, and defect reports a developer can reproduce first time. Lately I've been putting GenAI to work in testing, turning manual cases into Playwright scripts with Claude and Playwright MCP, drafting edge cases and bug reports, and driving mobile apps through Appium and Maestro MCP.",

    "signaturePoints": [
      "Regression suites that run in parallel in CI. I cut regression runtime by 87% at Certa.ai and M-Pesa regression time by 85.6% at Prodapt.",
      "One joined-up test strategy across UI, API, mobile and database, with production defect leakage held under 1%.",
      "Practical AI in testing, shared with the whole team. My Claude and Playwright MCP workflow made test scripting 10× faster and was rolled out to a 10-person team."
    ]
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * NAVIGATION
   * ─────────────────────────────────────────────────────────────────────────
   */
  "navigation": [
    { "label": "About",        "href": "index.html",        "faIcon": "fa-solid fa-user" },
    { "label": "Blog",         "href": "blog.html",         "faIcon": "fa-solid fa-pen-nib" },
    { "label": "Projects",     "href": "projects.html",     "faIcon": "fa-solid fa-code" },
    { "label": "Certificates", "href": "certificates.html", "faIcon": "fa-solid fa-award" },
    { "label": "CV",           "href": "cv.html",           "faIcon": "fa-solid fa-file-lines" },
    { "label": "Contact",      "href": "contact.html",      "faIcon": "fa-solid fa-envelope" }
  ],

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CV PAGE
   * ─────────────────────────────────────────────────────────────────────────
   */
  "cv": {
    "summary": "ISTQB-certified QA automation engineer with an M.Tech (Level 7) and more than four years of web, mobile and API test automation. I've built frameworks with Playwright, Selenium, Appium, REST Assured and PyTest across Java, TypeScript and Python, and run them in parallel through GitHub Actions and Jenkins. I cut regression runtime by 87% at Certa.ai, automated 90% of regression at Prodapt, and built GenAI QA tools with Claude and Playwright MCP that save around three hours of manual work a week. Prodapt recognised this work with Star of the Quarter and nine Spotlight Awards.",

    // Spoken languages (empty list hides the section)
    "languages": [],

    "achievements": [
      {
        "title": "Star of the Quarter",
        "issuer": "Prodapt Solutions",
        "date": "2025",
        "description": "For owning automation, applying AI to testing and catching corner-case bugs that boosted testing efficiency."
      },
      {
        "title": "Spotlight Award (9×)",
        "issuer": "Prodapt Solutions",
        "date": "2024 – 2025",
        "description": "Won nine times, for leading Brightspeed automation UAT, delivering high-pressure client demos and finding critical defects."
      },
      {
        "title": "Distinguished Mentor of the Month",
        "issuer": "Prodapt Solutions",
        "date": "2025",
        "description": "For reviewing automation processes and sharing framework expertise, setting a benchmark for knowledge sharing."
      },
      {
        "title": "Lifelong Learner Award",
        "issuer": "Prodapt Solutions",
        "date": "2025",
        "description": "For introducing GenAI test automation to reduce manual testing effort."
      }
    ]
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * SKILLS (CV page pills)
   * ─────────────────────────────────────────────────────────────────────────
   */
  "skills": [
    "Java",
    "TypeScript",
    "Python",
    "SQL",
    "Playwright",
    "Selenium WebDriver",
    "Appium",
    "Cucumber / BDD",
    "TestNG",
    "PyTest",
    "Robot Framework",
    "REST Assured",
    "Postman",
    "JMeter",
    "BrowserStack",
    "Maestro",
    "GitHub Actions",
    "Jenkins",
    "Docker & Selenium Grid",
    "Maven",
    "Allure",
    "Jira & Zephyr",
    "Claude Code & MCP",
    "Page Object Model",
    "API Testing",
    "Mobile Testing",
    "Cross-Browser Testing",
    "Performance Testing",
    "Test Strategy & Planning",
    "Defect Analysis & Reporting",
    "Agile / Scrum"
  ],

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * EXPERIENCE & EDUCATION (CV page)
   * ─────────────────────────────────────────────────────────────────────────
   */
  "experience": [
    {
      "type": "work",
      "period": "Aug 2026 – Present",
      "role": "Sole Developer & Tester",
      "company": "agriengg.tech",
      "summary": "Building and testing a farm-tools web app on my own, which means owning quality from the first test case to the release.",
      "highlights": [
        "Own the full QA cycle across UI, functional and API testing.",
        "Automated the mobile test suites with Maestro MCP and Claude."
      ]
    },
    {
      "type": "work",
      "period": "Jan 2026 – Aug 2026",
      "role": "QA Engineer",
      "company": "Certa.ai",
      "summary": "End-to-end QA on the product, from test planning and in-sprint validation through regression, sanity and UAT, across UI, API and database flows.",
      "highlights": [
        "Cut regression execution time by 87% by building a modular automation framework with the Page Object Model, sharded and run in parallel through GitHub Actions.",
        "Designed functional and regression tests with boundary value analysis, equivalence partitioning, decision tables and state transition, holding production defect leakage under 1% and managing the full defect lifecycle in Jira.",
        "Built API tests that validate status codes, JSON schemas and payloads, backed by SQL checks on the database for data integrity.",
        "Turned manual test cases into automated scripts with Claude Projects and Playwright MCP, making scripting 10× faster, and rolled the workflow out to a 10-person team.",
        "Built reusable GenAI utilities that analyse Postman API collections and generate reports, cutting analysis time by 96% and speeding up defect resolution.",
        "Maintained a 200+ case automation suite with HTML and Allure reports."
      ]
    },
    {
      "type": "work",
      "period": "Feb 2023 – Jan 2026",
      "role": "Senior Software Engineer (Test Automation)",
      "company": "Prodapt Solutions",
      "summary": "Test automation for telecom and mobile money clients, covering web, mobile, API and performance testing across Agile sprints.",
      "highlights": [
        "Automated 90% of regression tests by architecting a Java, Selenium, TestNG and BDD Cucumber-Gherkin framework, running parallel cross-browser suites on a Docker Selenium Grid.",
        "Cut M-Pesa regression and sanity testing time by 85.6% for Vodafone and Safaricom, running Appium suites in parallel on BrowserStack device farms with reports in AWS S3 and GitLab.",
        "Cut test-case drafting time by 75% by pioneering GenAI-assisted testing with Claude, ChatGPT, Gemini and MCPs for scenarios, edge cases and bug reports, and coached the team on automation best practice.",
        "Introduced API testing with REST Assured and JMeter performance testing, with Jenkins CI builds for every release.",
        "Kept defect rejection below 5% by standardising bug reports with clear reproduction steps, and used Zephyr for test management and traceability.",
        "Led Brightspeed automation UAT and delivered client demos under pressure."
      ]
    },
    {
      "type": "work",
      "period": "Feb 2019 – Jul 2019",
      "role": "Research Associate",
      "company": "AICRP Engineering and Technology",
      "summary": "Testing on an ICAR-funded hardware and software prototype, working with a five-person team of developers, QA and the project lead.",
      "highlights": [
        "Wrote and ran 50 integration test cases validating sensor outputs and hardware-software responses, tracking coverage and logging defects in Jira.",
        "Drove root cause analysis with the team to resolve defects."
      ]
    },
    {
      "type": "education",
      "period": "2016 – 2018",
      "role": "Master of Technology (M.Tech)",
      "company": "Post Graduate Institute",
      "summary": "CGPA 8.9/10",
      "highlights": [
        "Analysed temperature, humidity and soil-moisture time-series data in Python to confirm that every automated action in a sensor-driven greenhouse system fired correctly."
      ]
    },
    {
      "type": "education",
      "period": "2012 – 2016",
      "role": "Bachelor of Technology (B.Tech)",
      "company": "Dr. Panjabrao Deshmukh Krishi Vidyapeeth",
      "summary": "CGPA 7.9/10",
      "highlights": [
        "Compiled and validated 20 years of manual rainfall records for a drought-prone region, and found a shift towards shorter, more intense rainfall rather than lower totals."
      ]
    }
  ],

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * PROJECTS (most important first)
   * ─────────────────────────────────────────────────────────────────────────
   */
  "projects": [
    {
      "title": "Hybrid BDD Test Automation Framework",
      "year": "2026",
      "summary": "One set of Gherkin scenarios that tests a full-stack web app from three angles: its REST API, desktop Chrome and mobile Chrome. Built for a real farm-tools app with weather, news, irrigation planning, fuel prices and accounts.",
      "impact": "Around 200 scenarios across API, desktop and mobile web, type-checked and dry-run on every push.",
      "stack": ["TypeScript", "Playwright", "Cucumber.js", "Node.js", "Allure", "GitHub Actions"],
      "details": [
        "Page Object Model for the UI and a thin typed HTTP layer on Playwright's APIRequestContext for the API.",
        "Every scenario is tagged with a register ID, a priority (P0 to P3) and a category, so any slice can run from the command line or a GitHub Actions form.",
        "Network interception with page.route stubs outages, error codes and slow providers, and request tracking proves when a page did or didn't call the server.",
        "Login scenarios sign up a fresh account once per run, so no shared credentials are needed. A local Supabase stub stands in for the auth provider.",
        "Goes beyond functional checks: CORS rules, security headers, accessibility markers and responsive layout.",
        "Allure reports plus an Excel test register with an execution summary, coverage matrix, defect log and Jira traceability."
      ],
      "links": [
        { "label": "GitHub", "url": "https://github.com/lakhanadewar/hybrid-bdd-test-automation-framework" }
      ]
    },
    {
      "title": "TestKart Selenium Framework",
      "year": "2026",
      "summary": "A Java UI automation framework for TestKart, a small e-commerce app, covering sign-up, login, sessions, catalogue, cart, coupons, checkout, mock payments and order history.",
      "impact": "71 test cases, run as 213 parallel cross-browser runs on Chrome, Firefox and Edge.",
      "stack": ["Java", "Selenium", "TestNG", "Maven", "Apache POI", "Docker", "Jenkins"],
      "details": [
        "Page Object Model with a BasePage that waits for every element, so there's no Thread.sleep() anywhere.",
        "Thread-safe DriverManager runs one WebDriver per thread, locally or on a Selenium Grid in Docker Compose.",
        "Smoke, regression and full-cycle TestNG suites, with negative and boundary cases driven from Excel through Apache POI.",
        "Extent HTML reports with screenshots on failure, and a Jenkins pipeline for CI.",
        "Comes with a written test plan, a scenario list and a deliberately failing test that documents a real coupon defect."
      ],
      "links": [
        { "label": "GitHub", "url": "https://github.com/lakhanadewar/Web-UI-Test-Automation-Framework" }
      ]
    },
    {
      "title": "Appium Cross-Platform Mobile Framework",
      "year": "2026",
      "summary": "Mobile automation in Java and TestNG that runs the same tests on a local emulator or on real devices in BrowserStack, and can also be driven conversationally through Appium MCP.",
      "stack": ["Java", "Appium", "TestNG", "Maven", "BrowserStack", "Appium MCP"],
      "details": [
        "A DriverFactory returns an AppiumDriver for Android (UiAutomator2) or iOS (XCUITest), locally or on BrowserStack, switched by one flag.",
        "Device, app and environment settings live in config.properties, with -D overrides for any single run.",
        "Credentials come from environment variables, and BrowserStack runs report status, video and logs.",
        "Includes Appium MCP device presets for driving the app from Claude."
      ],
      "links": [
        { "label": "GitHub", "url": "https://github.com/lakhanadewar/mobile-automation-appium" }
      ]
    },
    {
      "title": "Appium PyTest Mobile Framework",
      "year": "2026",
      "summary": "A Python companion to the Java mobile framework, built on PyTest with a single driver factory for Android and iOS.",
      "stack": ["Python", "Appium", "PyTest"],
      "details": [
        "A --platform option picks an Android (UiAutomator2) or iOS (XCUITest) session.",
        "PyTest fixtures handle session set-up and tear-down, quitting the driver even when a test fails.",
        "Settings live in config.ini, with reusable wait, tap and scroll helpers."
      ],
      "links": [
        { "label": "GitHub", "url": "https://github.com/lakhanadewar/appium-python-pytest-framework" }
      ]
    }
  ],

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * BLOGS
   * ─────────────────────────────────────────────────────────────────────────
   */
  "blogs": [
    {
      "title": "Creating and Connecting a Git Repository",
      "platform": "Personal",
      "date": "Sep 2023",
      "excerpt": "A step-by-step guide to creating a local Git repository, connecting it to GitHub or GitLab, and the everyday commands for committing, pushing, pulling and branching.",
      "url": "posts/git-repository-setup.html"
    }
  ],

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CERTIFICATES
   * ─────────────────────────────────────────────────────────────────────────
   */
  "certificates": [
    {
      "title": "ISTQB® Certified Tester Foundation Level (CTFL v4.0)",
      "issuer": "GASQ",
      "date": "Jun 2026",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/istqb.svg",
      "credentialId": null,
      "keywords": ["Testing", "ISTQB"]
    },
    {
      "title": "Selenium: Structure, Scale, Run and Optimise Automated Tests",
      "issuer": "LinkedIn Learning",
      "date": "Mar 2026",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/linkedin-learning.svg",
      "credentialId": null,
      "keywords": ["Automation", "Selenium"]
    },
    {
      "title": "Master Test Automation with Playwright",
      "issuer": "LinkedIn Learning",
      "date": "Dec 2025",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/linkedin-learning.svg",
      "credentialId": null,
      "keywords": ["Automation", "Playwright"]
    },
    {
      "title": "Model Context Protocol (MCP): Hands-On with Agentic AI",
      "issuer": "LinkedIn Learning",
      "date": "Oct 2025",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/linkedin-learning.svg",
      "credentialId": null,
      "keywords": ["AI"]
    },
    {
      "title": "Python Automation and Testing",
      "issuer": "LinkedIn Learning",
      "date": "Oct 2025",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/linkedin-learning.svg",
      "credentialId": null,
      "keywords": ["Automation", "Python"]
    },
    {
      "title": "REST Assured: API Test Automation for Beginners",
      "issuer": "Udemy",
      "date": "Oct 2025",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/udemy.svg",
      "credentialId": null,
      "keywords": ["API", "Automation"]
    },
    {
      "title": "Jenkins: Beginner to Pro, CI/CD Pipelines and Automation",
      "issuer": "Udemy",
      "date": "Oct 2025",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/udemy.svg",
      "credentialId": null,
      "keywords": ["CI/CD"]
    },
    {
      "title": "Artificial Intelligence and Cloud Computing Fundamentals",
      "issuer": "IBM SkillsBuild",
      "date": "Jul 2025",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/ibm.svg",
      "credentialId": null,
      "keywords": ["AI", "Cloud"]
    },
    {
      "title": "Micro-Certification: Automated Test Framework",
      "issuer": "ServiceNow",
      "date": "Jul 2024",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/servicenow.svg",
      "credentialId": null,
      "keywords": ["Automation"]
    },
    {
      "title": "Apache JMeter Intro",
      "issuer": "The Apache Software Foundation",
      "date": "Oct 2023",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/apache.svg",
      "credentialId": null,
      "keywords": ["Performance"]
    },
    {
      "title": "JIRA Test Management using Zephyr for Testers",
      "issuer": "Udemy",
      "date": "Sep 2023",
      "credentialUrl": "https://www.linkedin.com/in/lakhana/details/certifications/",
      "imageUrl": "images/certificates/udemy.svg",
      "credentialId": null,
      "keywords": ["Testing", "Test Management"]
    }
  ],

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONTACT
   * ─────────────────────────────────────────────────────────────────────────
   */
  "contact": {
    "copy": "I'm open to QA automation and test engineering roles in London or remote, and I'm always happy to talk about test frameworks, CI pipelines or using AI in testing. The quickest way to reach me is email or LinkedIn.",
    "resumeUrl": "Lakhan_Adewar_CV.pdf",
    "links": [
      { "label": "Email",    "faIcon": "fa-solid fa-envelope",     "value": "lakhanadewar@gmail.com",   "url": "mailto:lakhanadewar@gmail.com" },
      { "label": "LinkedIn", "faIcon": "fa-brands fa-linkedin-in", "value": "linkedin.com/in/lakhana",  "url": "https://www.linkedin.com/in/lakhana/" },
      { "label": "GitHub",   "faIcon": "fa-brands fa-github",      "value": "github.com/lakhanadewar",  "url": "https://github.com/lakhanadewar" },
      { "label": "Writing",  "faIcon": "fa-solid fa-pen-nib",      "value": "Read my articles",         "url": "blog.html" }
    ]
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * INTERACTIVE FEATURES (all off by default; visitors opt in)
   * ─────────────────────────────────────────────────────────────────────────
   */
  "interactiveFeatures": {
    "cardTilt": {
      "id": "cardTilt",
      "label": "3D Card Tilt",
      "description": "Cards tilt and follow your mouse with 3D depth effect",
      "defaultEnabled": false,
      "icon": "fa-solid fa-cube"
    },
    "cursorTrail": {
      "id": "cursorTrail",
      "label": "Cursor Trail",
      "description": "Elegant particles follow your cursor movement",
      "defaultEnabled": false,
      "icon": "fa-solid fa-wand-magic-sparkles"
    },
    "readingProgress": {
      "id": "readingProgress",
      "label": "Reading Progress Bar",
      "description": "Shows scroll progress at the top of pages",
      "defaultEnabled": false,
      "icon": "fa-solid fa-chart-simple"
    },
    "soundEffects": {
      "id": "soundEffects",
      "label": "Sound Effects",
      "description": "Subtle audio feedback on interactions",
      "defaultEnabled": false,
      "icon": "fa-solid fa-volume-high"
    }
  }
};
