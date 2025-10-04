import React, { useState, useEffect, useMemo } from "react";


const EXAM_DEFAULT_DURATION = 60 * 60; // 60 minutes

// shuffle helper
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------------- Topics ----------------
const TOPIC_1 = {
  topicId: "topic-1",
  topicName: "Responsible AI Principles",
  questions: [
    {
      id: "t1-q1",
      question:
        "Which Microsoft ethical AI principle is aimed at ensuring AI systems treat all people equally?",
      options: [
        { key: "A", text: "Privacy and Security" },
        { key: "B", text: "Fairness" },
        { key: "C", text: "Reliability and Safety" },
        { key: "D", text: "Inclusiveness" }
      ],
      answer: "B"
    },
    {
      id: "t1-q2",
      question: "What can be done during AI development to minimize bias?",
      options: [
        { key: "A", text: "Collect massive amounts of data for training." },
        { key: "B", text: "Focus on accuracy of the data." },
        { key: "C", text: "Use diverse data, fairness metrics, and human oversight." },
        { key: "D", text: "Improve on the computational efficiency and speed." }
      ],
      answer: "C"
    },
    {
      id: "t1-q3",
      question:
        "Why is it important to ensure the security of the code used in Generative AI (Gen AI) tools?",
      options: [
        { key: "A", text: "Ensuring code security prevents unauthorized access and potential data breaches." },
        { key: "B", text: "Ensuring code security enables the AI system to handle larger datasets effectively." },
        { key: "C", text: "Ensuring code security maintains the integrity of the AI system." },
        { key: "D", text: "Ensuring code security supports the development of more advanced AI features." }
      ],
      answer: "A"
    },
    {
      id: "t1-q4",
      question:
        "A social media manager wants to use AI to filter content. How can they promote transparency in the platform’s AI operations?",
      options: [
        { key: "A", text: "By providing clear explanations about the types of content the AI is designed to filter and how it arrives at its conclusion." },
        { key: "B", text: "By relying on a well-regarded AI development company." },
        { key: "C", text: "By regularly updating the AI filtering algorithm." },
        { key: "D", text: "By focusing on user satisfaction with the content filtering." }
      ],
      answer: "A"
    }
  ]
};

const TOPIC_2 = {
  topicId: "topic-2",
  topicName: "GitHub Copilot Plans and Features",
  questions: [
    {
      id: "t2-q1",
      question: "What is the primary role of the ‘/optimize’ slash command in Visual Studio?",
      options: [
        { key: "A", text: "Translates code into a more performant language." },
        { key: "B", text: "Automatically formats the code according to the selected style guide." },
        { key: "C", text: "Summarizes your documentation into more maintainable and readable formats." },
        { key: "D", text: "Enhances the performance of the selected code by analyzing its runtime complexity." }
      ],
      answer: "D"
    },
    {
      id: "t2-q2",
      question: "Which GitHub Copilot plan could an Azure DevOps organization use without requiring a GitHub Enterprise license?",
      options: [
        { key: "A", text: "GitHub Copilot Enterprise" },
        { key: "B", text: "GitHub Copilot for Azure DevOps" },
        { key: "C", text: "Copilot Teams" },
        { key: "D", text: "GitHub Copilot Individual" }
      ],
      answer: "B"
    },
    {
      id: "t2-q3",
      question: "Which of the following steps correctly demonstrates how to establish an organization-wide policy for GitHub Copilot Business to restrict its use to certain repositories?",
      options: [
        { key: "A", text: "Create a copilot.policy file in each repository" },
        { key: "B", text: "Create a copilot.policy in the .github repository" },
        { key: "C", text: "Configure the policies in the organization settings" },
        { key: "D", text: "Apply policies through the GitHub Actions configuration" }
      ],
      answer: "C"
    },
    {
      id: "t2-q4",
      question: "What type of information can you retrieve through GitHub Copilot Business Subscriptions via REST API? (Choose two.)",
      options: [
        { key: "A", text: "View code suggestions for a specific user" },
        { key: "B", text: "List all GitHub Copilot seat assignments for an organization" },
        { key: "C", text: "Get a summary of GitHub Copilot usage for organization members" },
        { key: "D", text: "List of all unsubscribed GitHub Copilot members within an organization" }
      ],
      answer: ["B", "C"]
    },
    {
      id: "t2-q5",
      question: "What is the best way to share feedback about GitHub Copilot Chat when using it on GitHub Mobile?",
      options: [
        { key: "A", text: "The feedback section on the GitHub website." },
        { key: "B", text: "By tweeting at GitHub’s official X (Twitter) account." },
        { key: "C", text: "Use the emojis in the Copilot Chat interface." },
        { key: "D", text: "The Settings menu in the GitHub Mobile app." }
      ],
      answer: "C"
    },
    {
      id: "t2-q6",
      question: "What specific function does the ‘/fix’ slash command perform?",
      options: [
        { key: "A", text: "Proposes changes for detected issues, suggesting corrections for syntax errors and programming mistakes." },
        { key: "B", text: "Converts pseudocode into executable code, optimizing for readability and maintainability." },
        { key: "C", text: "Generates new code snippets based on language syntax and best practices." },
        { key: "D", text: "Initiates a code review with static analysis tools for security and logic errors." }
      ],
      answer: "A"
    },
    {
      id: "t2-q7",
      question: "Which GitHub Copilot pricing plans exclude your Copilot data from default training? (Choose two.)",
      options: [
        { key: "A", text: "GitHub Copilot Codespace" },
        { key: "B", text: "GitHub Copilot Business" },
        { key: "C", text: "GitHub Copilot Individual" },
        { key: "D", text: "GitHub Copilot Enterprise" }
      ],
      answer: ["B", "D"]
    },
    {
      id: "t2-q8",
      question: "When using an IDE with a supported GitHub Copilot plug-in, which Chat features can be accessed? (Choose two.)",
      options: [
        { key: "A", text: "Explain code and suggest improvements" },
        { key: "B", text: "Find out about releases and commits" },
        { key: "C", text: "Generate unit tests" },
        { key: "D", text: "Plan coding tasks" }
      ],
      answer: ["A", "C"]
    },
    {
      id: "t2-q9",
      question: "Which Copilot Enterprise features are available in all commercially supported IDEs?",
      options: [
        { key: "A", text: "Knowledge bases" },
        { key: "B", text: "Chat" },
        { key: "C", text: "Inline suggestions" },
        { key: "D", text: "Pull request summaries" }
      ],
      answer: ["B", "C"]
    },
    {
      id: "t2-q10",
      question: "What two options navigate to configure duplicate detection? (Choose two.)",
      options: [
        { key: "A", text: "Organization settings → Copilot → Policies" },
        { key: "B", text: "Enterprise settings → Copilot → Policies" },
        { key: "C", text: "Repository settings → Copilot → Policies" },
        { key: "D", text: "User settings → Copilot → Policies" }
      ],
      answer: ["A", "B"]
    },
    {
      id: "t2-q11",
      question: "What insights can the GitHub Copilot usage metrics API provide? (Choose two.)",
      options: [
        { key: "A", text: "Detailed reports on code quality improvements made by GitHub Copilot" },
        { key: "B", text: "Track the number of code suggestions accepted and used in the organization" },
        { key: "C", text: "Feedback on coding style and standards compliance" },
        { key: "D", text: "Copilot Chat specific suggestions acceptance metrics" },
        { key: "E", text: "Refactor code to improve productivity" }
      ],
      answer: ["B", "D"]
    },
    {
      id: "t2-q12",
      question: "How do you generate code suggestions with GitHub Copilot in the CLI?",
      options: [
        { key: "A", text: "Describe the project’s architecture → Use the copilot generate command → Accept the suggestion." },
        { key: "B", text: "Type out the code snippet → Use the copilot refine command → Review the suggestion." },
        { key: "C", text: "Write code comments → Press the suggestion shortcut → Select the best suggestion." },
        { key: "D", text: "Use ‘gh copilot suggest’ → Write the command you want → Select the best suggestion." }
      ],
      answer: "D"
    },
    {
      id: "t2-q13",
      question: "Which of the following are true about code suggestions? (Choose two.)",
      options: [
        { key: "A", text: "Code suggestions are limited to single-line suggestions" },
        { key: "B", text: "Code suggestions are guaranteed secure" },
        { key: "C", text: "Code suggestions always compile without modifications" },
        { key: "D", text: "You can use keyboard shortcuts to accept the next word in a suggestion" },
        { key: "E", text: "Alternative code suggestions can be shown in a new tab" }
      ],
      answer: ["D", "E"]
    },
    {
      id: "t2-q14",
      question: "What reasons could explain why code suggestions are not working in your editor? (Choose three.)",
      options: [
        { key: "A", text: "No active internet connection" },
        { key: "B", text: "Programming language not supported" },
        { key: "C", text: "Working in files included in your .gitignore" },
        { key: "D", text: "No valid GitHub Copilot license" },
        { key: "E", text: "Content exclusion is active and blocking Copilot" }
      ],
      answer: ["A", "B", "D"]
    },
    {
      id: "t2-q15",
      question: "How can the insights gained from the metrics API improve the development process? (Choose two.)",
      options: [
        { key: "A", text: "Real-time debugging statistics" },
        { key: "B", text: "Automated project documentation" },
        { key: "C", text: "Analysis of Copilot’s suggestions vs. manual coding" },
        { key: "D", text: "Insights on coding languages where Copilot is most helpful" }
      ],
      answer: ["C", "D"]
    },
    {
      id: "t2-q16",
      question: "How can users provide feedback about GitHub Copilot Chat in their IDE?",
      options: [
        { key: "A", text: "Email the support team directly." },
        { key: "B", text: "Use the “Share Feedback” button in the Copilot Chat panel." },
        { key: "C", text: "Fill out a feedback form on GitHub." },
        { key: "D", text: "Post on the GitHub forums." }
      ],
      answer: "B"
    },
    {
      id: "t2-q17",
      question: "GitHub Copilot in the CLI can configure which settings? (Choose two.)",
      options: [
        { key: "A", text: "Usage analytics" },
        { key: "B", text: "The default editor" },
        { key: "C", text: "The default execution confirmation" },
        { key: "D", text: "GitHub CLI subcommands" }
      ],
      answer: ["A", "C"]
    },
    {
      id: "t2-q18",
      question: "What types of content can GitHub Copilot Knowledge Base answer questions about? (Choose three.)",
      options: [
        { key: "A", text: "Compiled binaries" },
        { key: "B", text: "Code snippets" },
        { key: "C", text: "Design patterns" },
        { key: "D", text: "Screenshots" },
        { key: "E", text: "Documentation" }
      ],
      answer: ["B", "C", "E"]
    },
    {
      id: "t2-q19",
      question: "If you are working on open source projects, GitHub Copilot Individual can be paid:",
      options: [
        { key: "A", text: "Through an invoice or a credit card" },
        { key: "B", text: "Through an Azure Subscription" },
        { key: "C", text: "Based on the payment method in your user profile" },
        { key: "D", text: "N/A - Copilot Individual is free for open source projects" }
      ],
      answer: "A"
    },
    {
      id: "t2-q20",
      question: "What is the primary purpose of organization audit logs in GitHub Copilot Business?",
      options: [
        { key: "A", text: "To track the number of lines of code suggested" },
        { key: "B", text: "To assign software licenses" },
        { key: "C", text: "To monitor code conflicts across repositories" },
        { key: "D", text: "To monitor administrator activities and actions" }
      ],
      answer: "D"
    }
  ]
};
const TOPIC_3 ={
  topicId: "topic-3",
  topicName: "How GitHub Copilot Works and Handles Data",
  questions: [
    {
      id: "t3-q1",
      question: "What is a likely effect of GitHub Copilot being trained on commonly used code patterns?",
      options: [
        { key: "A", text: "Suggest completely novel projects, while reducing time on a project." },
        { key: "B", text: "Suggest innovative coding solutions that are not yet popular." },
        { key: "C", text: "Suggest homogeneous solutions if provided a diverse data set." },
        { key: "D", text: "Suggest code snippets that reflect the most common practices in the training data." }
      ],
      answer: "D"
    },
    {
      id: "t3-q2",
      question: "How does GitHub Copilot typically handle code suggestions that involve deprecated features or syntax?",
      options: [
        { key: "A", text: "Always filters out deprecated elements" },
        { key: "B", text: "May suggest deprecated syntax if present in its training data" },
        { key: "C", text: "Rejects all prompts with deprecated features" },
        { key: "D", text: "Automatically updates deprecated features to the latest version" }
      ],
      answer: "B"
    },
    {
      id: "t3-q3",
      question: "Identify the steps involved in the life cycle of a GitHub Copilot code suggestion (Choose two.)",
      options: [
        { key: "A", text: "Processing telemetry data" },
        { key: "B", text: "Generate suggestions" },
        { key: "C", text: "Retraining the model" },
        { key: "D", text: "Storing user data" },
        { key: "E", text: "Capturing the user’s context" }
      ],
      answer: ["B", "E"]
    },

    {
      id: "t3-q4",
      question: "What role does the pre-processing of user input play in the data flow of GitHub Copilot Chat?",
      options: [
        { key: "A", text: "It formats the output response before presenting it to the user." },
        { key: "B", text: "It filters out irrelevant information from the user’s input prompt." },
        { key: "C", text: "It enriches the input prompt with additional context before passing it to the language model." },
        { key: "D", text: "It directly generates a response based on the user’s input prompt." }
      ],
      answer: "C"
    },
    {
      id: "t3-q5",
      question: "What are the additional checks that need to pass before the GitHub Copilot responses are submitted to the user? (Choose two.)",
      options: [
        { key: "A", text: "Code quality" },
        { key: "B", text: "Compatibility with user-specific settings" },
        { key: "C", text: "Performance benchmarking" },
        { key: "D", text: "Suggestions matching public code (optional based on settings)" }
      ],
      answer: ["A", "D"]
    },
    {
      id: "t3-q6",
      question: "What are the potential limitations of GitHub Copilot Chat? (Choose two.)",
      options: [
        { key: "A", text: "Ability to handle complex code structures" },
        { key: "B", text: "Limited training data" },
        { key: "C", text: "Extensive support for all programming languages" },
        { key: "D", text: "No biases in code suggestions" }
      ],
      answer: ["A", "B"]
    },
    {
      id: "t3-q7",
      question: "What is the impact of the “Fill-In-the-Middle” (FIM) technique on GitHub Copilot’s code suggestions?",
      options: [
        { key: "A", text: "Improves suggestions by considering both the prefix and suffix of the code, filling in the middle part more accurately." },
        { key: "B", text: "Restricts Copilot to use only external databases for generating code suggestions." },
        { key: "C", text: "Allows Copilot to generate suggestions based only on the prefix of the code." },
        { key: "D", text: "Ignores both the prefix and suffix of the code, focusing only on user comments for context." }
      ],
      answer: "A"
    },
    {
      id: "t3-q8",
      question: "Which of the following statements correctly describes how GitHub Copilot Individual uses prompt data? (Choose two.)",
      options: [
        { key: "A", text: "Real-time user input helps generate context-aware code suggestions." },
        { key: "B", text: "Prompt data is used internally by GitHub for improving the search engine." },
        { key: "C", text: "Prompt data is used to train machine learning models for better code suggestions." },
        { key: "D", text: "Prompt data is stored unencrypted for faster processing." }
      ],
      answer: ["A", "C"]
    },
    {
      id: "t3-q9",
      question: "What is used by GitHub Copilot in the IDE to determine the prompt context?",
      options: [
        { key: "A", text: "Information from the IDE like open tabs, cursor location, selected code." },
        { key: "B", text: "All the code visible in the current IDE." },
        { key: "C", text: "All the code in the current repository and any git submodules." },
        { key: "D", text: "The open tabs in the IDE and the current folder of the terminal." }
      ],
      answer: "A"
    },
    {
      id: "t3-q10",
      question: "Which of the following does GitHub Copilot’s LLM derive context from when producing a response?",
      options: [
        { key: "A", text: "Version control system integrated with the IDE" },
        { key: "B", text: "Syntax highlighting scheme of the code in the IDE" },
        { key: "C", text: "Frequency of commits to the repository" },
        { key: "D", text: "Neighboring or related files within a project" }
      ],
      answer: "D"
    },
    {
      id: "t3-q11",
      question: "What is a benefit of using custom models in GitHub Copilot?",
      options: [
        { key: "A", text: "Responses use the organization’s LLM engine" },
        { key: "B", text: "Responses are faster to produce and appear sooner" },
        { key: "C", text: "Responses are guaranteed to be correct" },
        { key: "D", text: "Responses use practices and patterns in your repositories" }
      ],
      answer: "D"
    },
    {
      id: "t3-q12",
      question: "How does GitHub Copilot identify matching code and ensure that public code is appropriately handled or blocked? (Choose two.)",
      options: [
        { key: "A", text: "Implementing safeguards to detect and avoid suggesting verbatim snippets from public code" },
        { key: "B", text: "Filtering out suggestions that match code from public repositories" },
        { key: "C", text: "Using machine learning models trained only on private repositories" },
        { key: "D", text: "Reviewing and storing user-specific private repository data for future suggestions" }
      ],
      answer: ["A", "B"]
    },
    {
      id: "t3-q13",
      question: "How does GitHub Copilot utilize chat history to enhance its code completion capabilities?",
      options: [
        { key: "A", text: "By sharing chat history with third-party services to improve integration and functionality." },
        { key: "B", text: "By analyzing past chat interactions to identify common programming patterns and errors." },
        { key: "C", text: "By logging chat history to monitor user activity and ensure compliance with coding standards." },
        { key: "D", text: "By using chat history to offer personalized code snippets based on previous prompts." }
      ],
      answer: "D"
    },
    {
      id: "t3-q14",
      question: "What is the main purpose of the duplication detection filter in GitHub Copilot?",
      options: [
        { key: "A", text: "To compare user-generated code against a private repository for potential matches." },
        { key: "B", text: "To encourage the user to follow coding best practices preventing code duplication." },
        { key: "C", text: "To allow administrators to control which suggestions are visible to developers based on custom criteria." },
        { key: "D", text: "To detect and block suggestions that match public code snippets on GitHub if they contain about 150 characters." }
      ],
      answer: "D"
    }
  ]
};
const TOPIC_4 ={
  topicId: "topic-4",
  topicName: "Prompt Crafting and Prompt Engineering",
  questions: [
    {
      id: "t4-q1",
      question: "When crafting prompts for GitHub Copilot, what is a recommended strategy to enhance the relevance of the generated code?",
      options: [
        { key: "A", text: "Keep the prompt as short as possible, using single words or brief phrases." },
        { key: "B", text: "Provide examples of expected input and output within the prompt." },
        { key: "C", text: "Avoid mentioning the programming language to allow for more flexible suggestions." },
        { key: "D", text: "Write the prompt in natural language without any programming language." }
      ],
      answer: "B"
    },
    {
      id: "t4-q2",
      question: "What is zero-shot prompting?",
      options: [
        { key: "A", text: "Giving GitHub Copilot examples of the algorithm and outcome you want to use" },
        { key: "B", text: "Only giving GitHub Copilot a question as a prompt and no examples" },
        { key: "C", text: "Giving GitHub Copilot examples of the problem you want to solve" },
        { key: "D", text: "Giving as little context to GitHub Copilot as possible" },
        { key: "E", text: "Telling GitHub Copilot it needs to show only the correct answer" }
      ],
      answer: "B"
    },
    {
      id: "t4-q3",
      question: "What are the different ways to give context to GitHub Copilot to get more precise responses? (Choose two.)",
      options: [
        { key: "A", text: "Engage with chat participants such as @workspace to incorporate collaborative context into the responses." },
        { key: "B", text: "Access developer’s previous projects and code repositories to understand their coding style without explicit permission." },
        { key: "C", text: "Utilize to interpret developer’s thoughts and intentions without any code or comments." },
        { key: "D", text: "Utilize chat variables like #file and #editors to anchor the conversation within the specific context of the files or editors in use." }
      ],
      answer: ["A", "D"]
    },
    {
      id: "t4-q4",
      question: "Select a strategy to increase the performance of GitHub Copilot Chat.",
      options: [
        { key: "A", text: "Use a single GitHub Copilot Chat query to find resolutions for the collection of technical requirements" },
        { key: "B", text: "Optimize the usage of memory-intensive operations within generated code" },
        { key: "C", text: "Apply prompt engineering techniques to be more specific" },
        { key: "D", text: "Limit the number of concurrent users accessing GitHub Copilot Chat" }
      ],
      answer: "C"
    },
    {
      id: "t4-q5",
      question: "What is few-shot prompting?",
      options: [
        { key: "A", text: "Telling GitHub Copilot to try multiple times to answer the prompt" },
        { key: "B", text: "Telling GitHub Copilot to iterate several times on the answer before returning it to you" },
        { key: "C", text: "Telling GitHub Copilot from which sources it should base the response on" },
        { key: "D", text: "Telling GitHub Copilot about the mechanism you want it to use and how to incorporate that into the response" }
      ],
      answer: "D"
    }
  ]
};
const TOPIC_5 ={
  topicId: "topic-5",
  topicName: "Developer Use Cases for AI",
  questions: [
    {
      id: "t5-q1",
      question: "In what ways can GitHub Copilot support a developer during the code refactoring process? (Choose two.)",
      options: [
        { key: "A", text: "By providing suggestions for improving code readability and maintainability based on best practices." },
        { key: "B", text: "By offering code transformation examples that enhance performance and reduce complexity." },
        { key: "C", text: "By independently ensuring compliance with regulatory standards across industries." },
        { key: "D", text: "By autonomously refactoring entire codebases to the latest programming language." }
      ],
      answer: ["A", "B"]
    },
    {
      id: "t5-q2",
      question: "What is one of the recommended practices when using GitHub Copilot Chat to enhance code quality?",
      options: [
        { key: "A", text: "Rely solely on Copilot’s suggestions without reviewing them." },
        { key: "B", text: "Regularly review and refactor the code suggested by Copilot." },
        { key: "C", text: "Disable Copilot’s inline suggestions." },
        { key: "D", text: "Avoid using Copilot for complex tasks." }
      ],
      answer: "B"
    },
    {
      id: "t5-q3",
      question: "In what ways can GitHub Copilot contribute to the design phase of the Software Development Life Cycle (SDLC)?",
      options: [
        { key: "A", text: "GitHub Copilot can generate user interface (UI) prototypes without prompting." },
        { key: "B", text: "GitHub Copilot can suggest design patterns and best practices relevant to the project." },
        { key: "C", text: "GitHub Copilot can independently create a complete software design." },
        { key: "D", text: "GitHub Copilot can manage design team collaboration and version control." }
      ],
      answer: "B"
    },
    {
      id: "t5-q4",
      question: "Are there any limitations to consider when using GitHub Copilot for code refactoring?",
      options: [
        { key: "A", text: "GitHub Copilot may not always produce optimized or best-practice code for refactoring." },
        { key: "B", text: "GitHub Copilot always produces bug-free code during refactoring." },
        { key: "C", text: "GitHub Copilot understands the context of your entire project and refactors code accordingly." },
        { key: "D", text: "GitHub Copilot can only be used with a limited set of programming languages." }
      ],
      answer: "A"
    },
    {
      id: "t5-q5",
      question: "How does GitHub Copilot assist developers in minimizing context switching?",
      options: [
        { key: "A", text: "GitHub Copilot can predict and prevent bugs before they occur." },
        { key: "B", text: "GitHub Copilot allows developers to stay in their IDE." },
        { key: "C", text: "GitHub Copilot can completely replace the need for human collaboration." },
        { key: "D", text: "GitHub Copilot can automatically handle project management tasks." }
      ],
      answer: "B"
    },
    {
      id: "t5-q6",
      question: "What are the potential limitations of GitHub Copilot in maintaining existing codebases?",
      options: [
        { key: "A", text: "GitHub Copilot’s suggestions are always aware of the entire codebase." },
        { key: "B", text: "GitHub Copilot can refactor and optimize the entire codebase up to 10,000 lines of code." },
        { key: "C", text: "GitHub Copilot can independently manage and resolve all merge conflicts in version control." },
        { key: "D", text: "GitHub Copilot might not fully understand the context and dependencies within a large codebase." }
      ],
      answer: "D"
    },
    {
      id: "t5-q7",
      question: "How can GitHub Copilot aid developers in writing documentation for their code?",
      options: [
        { key: "A", text: "GitHub Copilot can suggest summaries or descriptions based on the code’s functionality." },
        { key: "B", text: "GitHub Copilot can only generate content in markdown format." },
        { key: "C", text: "GitHub Copilot can automatically generate complete and detailed documentation." },
        { key: "D", text: "GitHub Copilot cannot assist in writing documentation or comments." }
      ],
      answer: "A"
    },
    {
      id: "t5-q8",
      question: "How does GitHub Copilot assist developers in reducing the amount of manual boilerplate code they write?",
      options: [
        { key: "A", text: "By refactoring the entire codebase to eliminate boilerplate code without developer input." },
        { key: "B", text: "By suggesting code snippets that can be reused across different parts of the project." },
        { key: "C", text: "By engaging in real-time collaboration with multiple developers to write boilerplate code." },
        { key: "D", text: "By predicting future coding requirements and pre-emptively generating boilerplate code" }
      ],
      answer: "B"
    },
    {
      id: "t5-q9",
      question: "Which scenarios can GitHub Copilot Chat be used to increase productivity? (Choose two.)",
      options: [
        { key: "A", text: "Create a documentation file for the newly created code base." },
        { key: "B", text: "Fast tracking of release management activities to move code to production main branch." },
        { key: "C", text: "A project plan for the team needs to be generated using a project management software." },
        { key: "D", text: "A developer is added to a new project and would like to understand the current software code." }
      ],
      answer: ["A", "D"]
    },
    {
      id: "t5-q10",
      question: "How does GitHub Copilot Chat help to fix security issues in your codebase?",
      options: [
        { key: "A", text: "By automatically refactoring the entire codebase to remove vulnerabilities." },
        { key: "B", text: "By annotating the given suggestions with known vulnerability patterns." },
        { key: "C", text: "By enforcing strict coding standards that prevent the introduction of vulnerabilities." },
        { key: "D", text: "By providing detailed reports on the security vulnerabilities present in the codebase." }
      ],
      answer: "B"
    }
  ]
}

const TOPIC_6 = {
    // Topic 6 - Testing with GitHub Copilot
  topicId: "topic-6",
  topicName: "Testing with GitHub Copilot",
  questions: [
    {
      id: "t6-q1",
      question: "What caution should developers exercise when using GitHub Copilot for assistance with mathematical computations?",
      options: [
        { key: "A", text: "GitHub Copilot’s capability to optimize complex mathematical algorithms beyond manual coding." },
        { key: "B", text: "GitHub Copilot’s ability to execute and verify mathematical results in real-time." },
        { key: "C", text: "GitHub Copilot’s automatic update of outdated mathematical formulas to modern standards." },
        { key: "D", text: "GitHub Copilot’s reliance on pattern-based responses without verifying computation accuracy." }
      ],
      answer: "D"
    },
    {
      id: "t6-q2",
      question: "When using GitHub Copilot Chat to generate boilerplate code for various test types, how can you guide the AI to follow the testing standards of your company?",
      options: [
        { key: "A", text: "By using a specific slash command in the prompt." },
        { key: "B", text: "By using a specific command in the terminal." },
        { key: "C", text: "By using a specific setting in GitHub Copilot’s configuration." },
        { key: "D", text: "By using specific prompt examples in your chat request." }
      ],
      answer: "D"
    },
    {
      id: "t6-q3",
      question: "When using GitHub Copilot to identify missing tests in your codebase, which of the following is the most important factor to consider?",
      options: [
        { key: "A", text: "Having a high test coverage percentage in the codebase." },
        { key: "B", text: "Using well-known coding practices in your repository." },
        { key: "C", text: "Ensuring that the correct context is available to GitHub Copilot." },
        { key: "D", text: "Close all the tabs in your IDE that do not have tests in them." }
      ],
      answer: "C"
    },
    {
      id: "t6-q4",
      question: "How can GitHub Copilot assist in maintaining consistency across your tests?",
      options: [
        { key: "A", text: "By providing documentation references based on industry best practices." },
        { key: "B", text: "By automatically fixing all tests in the code based on the context." },
        { key: "C", text: "By identifying a pattern in the way you write tests and suggesting similar patterns for future tests." },
        { key: "D", text: "By writing the implementation code for the function based on context" }
      ],
      answer: "C"
    },
    {
      id: "t6-q5",
      question: "When using GitHub Copilot Chat to generate unit tests, which slash command would you use?",
      options: [
        { key: "A", text: "/create-tests" },
        { key: "B", text: "/generate-tests" },
        { key: "C", text: "/tests Most Voted" },
        { key: "D", text: "/init-tests" }
      ],
      answer: "B"
    }
  ]
};
const TOPIC_7 = {

// Topic 7 - Privacy fundamentals and content exclusions
  topicId: "topic-7",
  topicName: "Privacy Fundamentals and Context Exclusions",
  questions: [
    {
      id: "t7-q1",
      question: "Where can you validate if GitHub Copilot is not returning suggestions because of content exclusions?",
      options: [
        { key: "A", text: "The GitHub Copilot errors panel in your IDE" },
        { key: "B", text: "The GitHub Copilot logs on GitHub.com under your user settings" },
        { key: "C", text: "The code suggestions window will display a warning message" },
        { key: "D", text: "The GitHub Copilot icon in the status bar of the editor will display a message" }
      ],
      answer: "D"
    },
    {
      id: "t7-q2",
      question: "When can GitHub Copilot still use content that was excluded using content exclusion?",
      options: [
        { key: "A", text: "When the user prompts with @workspace." },
        { key: "B", text: "When the repository level settings allow overrides by the user." },
        { key: "C", text: "If the content exclusion was configured at the enterprise level, and is overwritten at the organization level." },
        { key: "D", text: "If the contents of an excluded file are referenced in code that is not excluded, for example function calls." }
      ],
      answer: "D"
    },
    {
      id: "t7-q3",
      question: "What GitHub Copilot configuration needs to be enabled to protect against IP infringements?",
      options: [
        { key: "A", text: "Blocking license check configuration" },
        { key: "B", text: "Blocking public code matches" },
        { key: "C", text: "Allowing license check configuration" },
        { key: "D", text: "Allowing public code matches" }
      ],
      answer: "B"
    },
    {
      id: "t7-q4",
      question: "What is a limitation of content exclusions?",
      options: [
        { key: "A", text: "Content exclusions can be worked around as it is only available for Git repositories." },
        { key: "B", text: "Repository administrators and organization owners cannot manage content exclusion settings." },
        { key: "C", text: "Content exclusions are only available in the GitHub Copilot Individual plan." },
        { key: "D", text: "Content exclusions can only be configured by an enterprise administrator." }
      ],
      answer: "A"
    },
    {
      id: "t7-q5",
      question: "What content can be configured to be excluded with content exclusions? (Choose three.)",
      options: [
        { key: "A", text: "Gists" },
        { key: "B", text: "Repositories" },
        { key: "C", text: "Files" },
        { key: "D", text: "Lines in files" },
        { key: "E", text: "Folders" }
      ],
      answer: ["B", "C", "E"]
    },
    {
      id: "t7-q6",
      question: "A team is using GitHub Copilot Individual in their daily development activities. They need to exclude specific files from being used to inform code completion suggestions. How can they achieve this?",
      options: [
        { key: "A", text: "Upgrade to Copilot Business" },
        { key: "B", text: "Add a .gitignore file to the repo" },
        { key: "C", text: "Have an organization owner configure content exclusions" },
        { key: "D", text: "Have a repo administrator configure content exclusions" },
        { key: "E", text: "Use the #file Chat variable to exclude the files" }
      ],
      answer: "A"
    },
    {
      id: "t7-q7",
      question: "What do you check when GitHub Copilot content exclusions are not working? (Choose two.)",
      options: [
        { key: "A", text: "If GitHub Copilot can connect to the server selected in your user settings." },
        { key: "B", text: "If the user is in an organization that has content exclusions configured." },
        { key: "C", text: "If the content exclusion settings changed in the last 30 minutes or before that." },
        { key: "D", text: "If the user is part of the content exclusion team that limits the use of content exclusions." }
      ],
      answer: ["B", "C"]
    }
  ]
};

  



const QUESTIONS = [TOPIC_1, TOPIC_2, TOPIC_3, TOPIC_4, TOPIC_5, TOPIC_6, TOPIC_7];

// ---------------- Helpers ----------------
function flattenQuestions(topics) {
  const arr = [];
  for (const t of topics) {
    for (const q of t.questions) {
      arr.push({
        ...q,
        topicId: t.topicId,
        topicName: t.topicName,
        // normalize fields expected by the UI
        text: q.question,
        choices: q.options
      });
    }
  }
  return arr;
}

export default function App() {
  const flat = useMemo(() => flattenQuestions(QUESTIONS), []);

  // Settings & state
  const [examStarted, setExamStarted] = useState(false);
  const [duration, setDuration] = useState(EXAM_DEFAULT_DURATION); // seconds
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("ghas_exam_time");
    return saved ? parseInt(saved, 10) : EXAM_DEFAULT_DURATION;
  });

  // Quiz state
  const [order, setOrder] = useState(() => shuffle(flat));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // single => "A", multi => ["A","C"]
  const [finished, setFinished] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const current = order[currentIndex];

  // Load saved state on mount (if any)
  useEffect(() => {
    const saved = localStorage.getItem("github copilot_exam_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setAnswers(parsed.answers || {});
          setOrder(parsed.order || shuffle(flat));
          setCurrentIndex(parsed.currentIndex || 0);
          setFinished(parsed.finished || false);
          setShowCorrect(parsed.showCorrect || false);
          setExamStarted(parsed.started || false);
          if (parsed.duration) setDuration(parsed.duration);
        }
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    const savedTime = localStorage.getItem("github copilot_exam_time");
    if (savedTime) setTimeLeft(parseInt(savedTime, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flat]);

  // Persist state whenever it changes
  useEffect(() => {
    const data = {
      answers,
      order,
      currentIndex,
      finished,
      showCorrect,
      started: examStarted,
      duration
    };
    try {
      localStorage.setItem("ghas_exam_state", JSON.stringify(data));
      localStorage.setItem("ghas_exam_time", timeLeft.toString());
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [answers, order, currentIndex, finished, showCorrect, examStarted, timeLeft, duration]);

  // Timer countdown
  useEffect(() => {
    if (!examStarted || finished) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, finished]);

  // Helper: determine if question expects multiple answers
  function isMultiAnswer(q) {
    if (!q || !q.answer) return false;
    return q.answer.length > 1;
  }

  // Toggle choice selection
  function toggleChoice(qId, key, multi) {
    setAnswers((s) => {
      const prev = s[qId];
      if (multi) {
        const arr = Array.isArray(prev) ? [...prev] : [];
        if (arr.includes(key)) return { ...s, [qId]: arr.filter((x) => x !== key) };
        return { ...s, [qId]: [...arr, key] };
      } else {
        return { ...s, [qId]: key };
      }
    });
  }

  // Navigation
  function goNext() {
    if (currentIndex < order.length - 1) setCurrentIndex((i) => i + 1);
    else setFinished(true);
  }
  function goPrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  // Start exam from settings
  function startExam() {
    setTimeLeft(duration);
    setExamStarted(true);
    setAnswers({});
    setOrder(shuffle(flat));
    setCurrentIndex(0);
    setFinished(false);
    setShowCorrect(false);
    // clear saved state/time
    localStorage.removeItem("github copilot_exam_state");
    localStorage.removeItem("github copilot_exam_time");
  }

  // Restart to settings (clears progress)
  function restart() {
    setExamStarted(false);
    setAnswers({});
    setOrder(shuffle(flat));
    setCurrentIndex(0);
    setFinished(false);
    setShowCorrect(false);
    setTimeLeft(EXAM_DEFAULT_DURATION);
    localStorage.removeItem("github copilot_exam_state");
    localStorage.removeItem("github copilot_exam_time");
  }

  // Format time mm:ss
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  // Results calculation (per-topic)
  const results = useMemo(() => {
    const perTopic = {};
    for (const t of QUESTIONS) {
      perTopic[t.topicId] = { name: t.topicName, total: t.questions.length, correct: 0 };
    }
    let correctCount = 0;
    for (const q of flat) {
      const given = answers[q.id];
      const correct = q.answer;
      const normalize = (s) => {
        if (!s) return "";
        if (Array.isArray(s)) return s.slice().sort().join("");
        return s.toString().split("").sort().join("");
      };
      if (normalize(given) === normalize(correct)) {
        correctCount++;
        perTopic[q.topicId].correct++;
      }
    }
    const total = flat.length;
    const percent = total ? Math.round((correctCount / total) * 10000) / 100 : 0;
    const perTopicPercent = Object.entries(perTopic).map(([id, v]) => ({
      topicId: id,
      topicName: v.name,
      percent: Math.round((v.correct / v.total) * 10000) / 100,
      correct: v.correct,
      total: v.total
    }));
    return { total, correctCount, percent, perTopicPercent };
  }, [answers, flat]);

  const pass = results.percent >= 75;

  // Show settings screen if exam not started (and no saved started state)
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-4">GITHUB COPILOT Practice Exam — Settings</h1>
          <p className="mb-4 text-sm text-gray-600">Choose exam duration and start. Your progress will be saved automatically.</p>
          <label className="block mb-2 text-sm font-medium">Select duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            className="w-full p-2 border rounded mb-4"
          >
            <option value={30 * 60}>30 minutes</option>
            <option value={60 * 60}>60 minutes</option>
            <option value={90 * 60}>90 minutes</option>
          </select>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Total Questions</div>
              <div className="font-medium">{flat.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Pass Mark</div>
              <div className="font-medium">75%</div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={startExam} className="px-4 py-2 bg-sky-600 text-white rounded">Start Exam</button>
          </div>
        </div>
      </div>
    );
  }

  // Main exam UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-6">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">GITHUB COPILOT Practice Exam</h1>
            <div className="text-sm text-gray-500">Pass mark: <strong>75%</strong></div>
          </div>
          <div className="text-sm text-gray-600">
            <div>⏱ {formatTime(timeLeft)}</div>
          </div>
        </header>

        {!finished ? (
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-500">Topic</div>
              <div className="text-lg font-medium">{current?.topicName}</div>
            </div>

            <div className="p-4 border rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">Question {currentIndex + 1} of {order.length}</div>
                  <div className="mt-2 text-lg font-semibold">{current?.text}</div>
                </div>
                <div className="text-right text-sm text-gray-400">Topic: {current?.topicId}</div>
              </div>

              <div className="mt-4 grid gap-3">
                {current?.choices.map((c) => {
                  const multi = isMultiAnswer(current);
                  const selected = answers[current.id];
                  const checked = multi ? (Array.isArray(selected) && selected.includes(c.key)) : (selected === c.key);
                  return (
                    <label key={c.key} className={`w-full flex items-center gap-3 p-3 rounded-lg border ${checked ? "border-sky-500 bg-sky-50" : "border-gray-100 hover:border-gray-200"} cursor-pointer`}>
                      <input
                        type={multi ? "checkbox" : "radio"}
                        name={current.id}
                        value={c.key}
                        checked={checked}
                        onChange={() => toggleChoice(current.id, c.key, multi)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{c.key}. {c.text}</div>
                      </div>
                    </label>
                  );
                })}
              </div>

            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={goPrev} disabled={currentIndex === 0} className="px-4 py-2 rounded-lg border disabled:opacity-40">Previous</button>
                <button onClick={goNext} className="px-4 py-2 rounded-lg bg-sky-600 text-white">{currentIndex === order.length - 1 ? 'Finish' : 'Next'}</button>
              </div>

              <div className="text-sm text-gray-600">Answered: <strong>{Object.keys(answers).length}</strong> / {order.length}</div>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500" style={{ width: `${(Object.keys(answers).length / order.length) * 100}%` }} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={`p-6 rounded-xl ${pass ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-lg font-semibold ${pass ? 'text-green-800' : 'text-red-800'}`}>{pass ? 'Congratulations — You Passed!' : 'Result — You Did Not Pass'}</div>
                  <div className="text-sm text-gray-600 mt-1">Total score: <strong>{results.percent}%</strong> — {results.correctCount} of {results.total} correct</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Pass mark</div>
                  <div className="text-2xl font-bold">75%</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Score by topic</div>
                  <div>
                    <button onClick={() => setShowCorrect((v) => !v)} className="px-3 py-1 border rounded text-sm">{showCorrect ? "Hide Correct Answers" : "Show Correct Answers"}</button>
                  </div>
                </div>
                <div className="grid gap-3">
                  {results.perTopicPercent.map((t) => (
                    <div key={t.topicId} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t.topicName}</div>
                        <div className="text-sm text-gray-500">{t.correct} / {t.total} correct</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{t.percent}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-500 mb-2">Detailed results</div>
                <div className="space-y-3 max-h-96 overflow-y-auto p-2">
                  {flat.map((q, idx) => {
                    const given = answers[q.id];
                    const correct = q.answer;
                    const normalize = (s) => {
                      if (!s) return "";
                      if (Array.isArray(s)) return s.slice().sort().join("");
                      return s.toString().split("").sort().join("");
                    };
                    const correctFlag = normalize(given) === normalize(correct);
                    const givenDisplay = Array.isArray(given) ? (given.length ? given.slice().sort().join(", ") : "—") : (given ?? "—");
                    return (
                      <div key={q.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm text-gray-500">Q{idx + 1} — {q.topicName}</div>
                            <div className="font-medium">{q.text}</div>
                            <div className="mt-2 text-sm">Your answer: <strong>{givenDisplay}</strong> {correctFlag ? <span className="ml-2 text-sm text-green-600">(Correct)</span> : (given ? <span className="ml-2 text-sm text-red-600">(Wrong)</span> : <span className="ml-2 text-sm text-gray-500">(Unanswered)</span>)}</div>
                            {showCorrect && <div className="text-sm mt-1">Correct answer: <strong>{Array.isArray(correct) ? correct.join(", ") : correct.split("").join(", ")}</strong></div>}
                          </div>
                          <div className="text-sm text-gray-500">{correctFlag ? <span className="text-green-600 font-semibold">✓</span> : <span className="text-red-600 font-semibold">✕</span>}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button onClick={restart} className="px-4 py-2 rounded-lg border">Restart (Settings)</button>
                <button onClick={() => { setFinished(false); setCurrentIndex(0); }} className="px-4 py-2 rounded-lg bg-sky-600 text-white">Review Answers</button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
