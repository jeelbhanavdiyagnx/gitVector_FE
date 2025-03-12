import { NavItem } from '@/types';
import { count } from 'console';
import { title } from 'process';
export type RefreshOptions = {
  _id: number;
  name: string;
};
export const refreshOptions: RefreshOptions[] = [
  {
    _id: 0,
    name: 'off'
  },
  {
    _id: 1,
    name: '1 minute'
  },
  {
    _id: 5,
    name: '5 minutes'
  },
  {
    _id: 10,
    name: '10 minutes'
  }
];

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    label: 'profile'
  },
  {
    title: 'Commits',
    href: '/commits',
    label: 'commits'
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: 'profile',
    label: 'profile'
  },

  {
    title: 'User Management',
    href: '/user-management'
  },
  {
    title: 'Repository Management',
    href: '/repo-management'
  },
  {
    title: 'Organization management',
    href: '/org-management'
  },
  {
    title: 'Billing and Subscription',
    href: '/profile/billing'
  }
];
export const DashboardNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    label: 'profile'
  },
  {
    title: 'Commits',
    href: '/commits',
    label: 'commits'
  },
  {
    title: 'Notifications',
    href: '/notifications',
    label: 'notifications'
  }
];

export const promptsData: string[] = [
  'Describe your ideal weekend getaway.',
  'Write a short story about a lost key that unlocks something unexpected.',
  "Imagine you're a superhero for a day—what powers do you have, and how do you use them?",
  'Create a recipe for a dish that represents your personality.',
  'Write a letter to your future self, 10 years from now.',
  'Describe a day in the life of your favorite fictional character.',
  'If you could travel to any era in history, where would you go and why?',
  "Write a dialogue between two people who have just met but feel like they've known each other forever.",
  "Imagine you're an inventor—what's your latest creation, and how does it change the world?",
  "Describe a place you've never been to but would love to visit.",
  'Write a poem about the changing seasons.',
  'Create a list of five things that always make you smile.',
  'Describe a moment when you felt completely at peace.',
  'Write a short story where the main character has a strange obsession.',
  "Imagine you're the protagonist in a video game—what's your mission, and who are your allies?",
  'Describe your dream home in detail.',
  'Write about a time when you had to make a difficult decision.',
  "Imagine you're a detective—what's your current case, and what clues have you found?",
  'Create a fictional town—what are its quirks, and who lives there?',
  'Write about the first memory that comes to mind when you think of your childhood.'
];

export const favoritePrompts: NavItem[] = [
  {
    title: 'Prompt 1',
    href: '/newpage',
    icon: 'chevronRight',
    label: 'product'
  },
  {
    title: 'Prompt 2',
    href: '/prompt2',
    icon: 'chevronRight',
    label: 'prompts'
  },
  {
    title: 'Prompt 3',
    href: '/prompt3',
    icon: 'chevronRight',
    label: 'editor'
  },
  {
    title: 'Product feature prompt',
    href: '/product',
    icon: 'chevronRight',
    label: 'product'
  }
];

export const profileSidebar: NavItem[] = [
  {
    title: 'Profile',
    href: '/profile'
  },
  {
    title: 'Organization management',
    href: '/org-management'
  },
  {
    title: 'Repository Management',
    href: '/repo-management'
  },
  {
    title: 'User Management',
    href: '/user-management'
  },
  {
    title: 'Billing and Subscription',
    href: '/profile/billing'
  }
];

export const faqItems = [
  {
    id: 'item-1',
    question: 'What is Prompt Canvas?',
    answer: `
      Prompt Canvas is a no-code tool designed to help users create high-quality, precise AI prompts for various applications such as content creation, customer service, marketing, design, and more. It offers customizable templates and variables that allow users to tailor their prompts without needing any coding skills.
    `
  },
  {
    id: 'item-2',
    question: 'Do I need coding skills to use Prompt Canvas?',
    answer: `
      No, Prompt Canvas is completely no-code. You don’t need any programming or technical knowledge to generate powerful prompts. Simply choose a template, fill in the required variables, and you’re ready to go.
    `
  },
  {
    id: 'item-3',
    question: 'What are variables and how do they work?',
    answer: `
      Variables are placeholders within prompt templates (e.g., {product name}, {desired tone}) that allow you to customize the prompt for your specific needs. You can easily fill in these variables to make the prompt fit your use case, making the process faster and more flexible. You can read more about the variables here.
    `
  },
  {
    id: 'item-4',
    question: 'What industries or use cases is Prompt Canvas suitable for?',
    answer: `
      Prompt Canvas is ideal for a wide range of industries, including:

      - Content creation and copywriting
      - Marketing and social media
      - Design (for generating AI-based design inputs)
      - Customer service (for chatbot prompts)
      - Educational purposes
      - Technical writing or documentation
      - E-commerce product descriptions
    `
  },
  {
    id: 'item-5',
    question: 'Can I customize the templates provided?',
    answer: `
      Yes! All templates are fully customizable. You can add or modify variables to suit your specific needs, giving you full control over the final output.
    `
  },
  {
    id: 'item-6',
    question: 'Can I preview the output before generating the final result?',
    answer: `
      Yes, Prompt Canvas offers real-time preview functionality so you can see how your prompt will perform before finalizing it. This ensures that you get the most accurate and relevant output.
    `
  },
  {
    id: 'item-7',
    question: 'Can Prompt Canvas help me improve my existing prompts?',
    answer: `
      Yes, Prompt Canvas offers AI-assisted prompt refinement. Our system will suggest improvements to help you optimize your prompt for better performance and relevance.
    `
  },
  {
    id: 'item-8',
    question: 'How secure is my data on Prompt Canvas?',
    answer: `
      We take security seriously. All your data and prompts are encrypted and stored securely, ensuring that your information remains private and protected.
    `
  },
  {
    id: 'item-9',
    question: 'How does pricing work?',
    answer: `
      We offer a variety of pricing plans to suit different usage limits, so you can choose the one that fits your needs. You can read more about pricing and credits here.
    `
  }
];

export const cardData = [
  {
    header: 'Quality of code',
    info: 'This tile indicates the overall quality of your code',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Complexity',
    info: 'This tile measures how complex and difficult your code is to maintain.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Performance Considerations',
    info: 'This tile assesses how well your code is optimized for performance.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Code Readability',
    info: 'This tile reflects how easy your code is to read and understand.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Code Structure',
    info: 'This tile measures the organization and structure of your codebase.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Best Practices',
    info: 'This tile assesses your adherence to coding best practices and guidelines.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Security Practices',
    info: 'This tile checks your code for adherence to security best practices.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Testing',
    info: 'This tile shows the coverage and quality of your unit and integration tests.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Documentation',
    info: 'This tile indicates how well-documented your code is for others to understand.',
    content: '5/10',
    footer: '+20.1% from last month'
  },
  {
    header: 'Problem-Solving Skills',
    info: 'This tile reflects your ability to solve coding problems efficiently.',
    content: '5/10',
    footer: '+20.1% from last month'
  }
];

export const newNotifications = [
  {
    message:
      'Low Code Quality Alert: Your code quality score was 4/10 last week. Issues include code duplication and inconsistent variable names. Consider refactoring to improve readability. Click here to read more.',
    timing: '3 hours ago'
  },
  {
    message:
      'Security Practices Warning: Your security score dropped to 3/10. Please review your recent commits for potential vulnerabilities and implement stronger security measures. Click here to read more.',
    timing: 'Yesterday'
  }
];
export const oldNotifications = [
  {
    message:
      'Great Job! Your code complexity score improved to 8/10 last week. Keep up the good work by maintaining modular and simple code structures. Click here to read more.',
    timing: '3 days ago'
  },
  {
    message:
      'Invitation Accepted: Bisma777 has accepted your invitation and joined Git Analysis. They now have access to their performance metrics. Click here to read more.',
    timing: '6 days ago'
  },
  {
    message:
      'Code Readability Success: Your readability score reached 9/10! Consistent naming and clear comments are making your code more accessible to the team. Click here to read more.',
    timing: '9 days ago'
  },
  {
    message:
      'Code Readability Success: Your readability score reached 9/10! Consistent naming and clear comments are making your code more accessible to the team. Click here to read more.',
    timing: '1 week ago'
  },
  {
    message:
      'Invitation Accepted: Amandeep has accepted your invitation and joined Git Analysis. They now have access to their performance metrics. Click here to read more.',
    timing: '1 week ago'
  }
];

export const NotificationEnabledData = [
  {
    header: 'Quality of code',
    info: 'Receive notification when quality of code drops below 5'
  },
  {
    header: 'Security Practices',
    info: 'Receive notification when security practices score drops below 5'
  },
  {
    header: 'Code Complexity',
    info: 'Receive notification when code complexity drops below 5'
  },
  {
    header: 'Code Structure',
    info: 'Receive notification when code structure drops below 5'
  },
  {
    header: 'Code Readability',
    info: 'Receive notification when code readability drops below 5'
  },
  {
    header: 'Testing coverage and quality drops',
    info: 'Receive notification when testing coverage and quality drops below 5'
  },
  {
    header: 'Best Practices',
    info: 'Receive notification when best practices scores drops below 5'
  },
  {
    header: 'Documentation quality',
    info: 'Receive notification when documentation quality drops below 5'
  },
  {
    header: 'Performance Considerations',
    info: 'Receive notification when performance Considerations drops below 5'
  },
  {
    header: 'Problem-Solving Skills',
    info: 'Receive notification when problem-solving skills drops below 5'
  }
];
export const repoData = [
  {
    optionTitle: 'GitAnalysis',
    gitOptions: [
      {
        id: 'git1',
        name: 'APIs'
      },
      {
        id: 'git2',
        name: 'FrontEnd_GitAnalysis'
      },
      {
        id: 'git3',
        name: 'BackEnd_GitAnalysis'
      },
      {
        id: 'git4',
        name: 'BackEnd_GitAnalysis23'
      },
      {
        id: 'git5',
        name: 'FrontEnd_GitAnalysis'
      },
      {
        id: 'git6',
        name: 'BackEnd_GitAnalysis'
      },
      {
        id: 'git7',
        name: 'BackEnd_GitAnalysis23'
      },
      {
        id: 'git8',
        name: 'FrontEnd_GitAnalysis'
      },
      {
        id: 'git9',
        name: 'FrontEnd_GitAnalysisAPIs'
      }
      // "BackEnd_GitAnalysis",
      // "BackEnd_GitAnalysis23",
      // "FrontEnd_GitAnalysis",
      // "BackEnd_GitAnalysis",
      // "BackEnd_GitAnalysis23",
      // "FrontEnd_GitAnalysis",
      // "FrontEnd_GitAnalysisAPIs"
    ]
  },
  {
    optionTitle: 'SuperReach',
    gitOptions: [
      {
        id: 'super1',
        name: 'APIs'
      },
      {
        id: 'super2',
        name: 'FrontEnd_SuperReach'
      },
      {
        id: 'super3',
        name: 'BackEnd_SuperReach'
      },
      {
        id: 'super4',
        name: 'BackEnd_SuperReach23'
      },
      {
        id: 'super5',
        name: 'FrontEnd_SuperReach'
      },
      {
        id: 'super6',
        name: 'BackEnd_SuperReach'
      },
      {
        id: 'super7',
        name: 'BackEnd_SuperReach23'
      },
      {
        id: 'super8',
        name: 'FrontEnd_SuperReach'
      },
      {
        id: 'super9',
        name: 'FrontEnd_SuperReachAPIs'
      }
      // "APIs",
      // "FrontEnd_SuperReach",
      // "BackEnd_SuperReach",
      // "BackEnd_SuperReach23",
      // "FrontEnd_SuperReach",
      // "BackEnd_SuperReach",
      // "BackEnd_SuperReach23",
      // "FrontEnd_SuperReach",
      // "FrontEnd_SuperReachAPIs"
    ]
  },
  {
    optionTitle: 'PromptMaker',
    gitOptions: [
      {
        id: 'Prompt1',
        name: 'APIs'
      },
      {
        id: 'Prompt2',
        name: 'FrontEnd_PromptMaker'
      },
      {
        id: 'Prompt3',
        name: 'BackEnd_PromptMaker'
      },
      {
        id: 'Prompt4',
        name: 'BackEnd_PromptMaker23'
      },
      {
        id: 'Prompt5',
        name: 'FrontEnd_PromptMaker'
      },
      {
        id: 'Prompt6',
        name: 'BackEnd_PromptMaker'
      },
      {
        id: 'Prompt7',
        name: 'BackEnd_PromptMaker23'
      },
      {
        id: 'Prompt8',
        name: 'FrontEnd_PromptMaker'
      },
      {
        id: 'Prompt9',
        name: 'FrontEnd_PromptMakerAPIs'
      }
      // "APIs",
      // "FrontEnd_PromptMaker",
      // "BackEnd_PromptMaker",
      // "BackEnd_PromptMaker23",
      // "FrontEnd_PromptMaker",
      // "BackEnd_PromptMaker",
      // "BackEnd_PromptMaker23",
      // "FrontEnd_PromptMaker",
      // "FrontEnd_PromptMakerAPIs"
    ]
  },
  {
    optionTitle: 'HostPlan',
    gitOptions: [
      {
        id: 'Host1',
        name: 'APIs'
      },
      {
        id: 'Host2',
        name: 'FrontEnd_HostPlan'
      },
      {
        id: 'Host3',
        name: 'BackEnd_HostPlan'
      },
      {
        id: 'Host4',
        name: 'BackEnd_HostPlan23'
      },
      {
        id: 'Host5',
        name: 'FrontEnd_HostPlan'
      },
      {
        id: 'Host6',
        name: 'BackEnd_HostPlan'
      },
      {
        id: 'Host7',
        name: 'BackEnd_HostPlan23'
      },
      {
        id: 'Host8',
        name: 'FrontEnd_HostPlan'
      },
      {
        id: 'Host9',
        name: 'FrontEnd_HostPlanAPIs'
      }
      // "APIs",
      // "FrontEnd_HostPlan",
      // "BackEnd_HostPlan",
      // "BackEnd_HostPlan23",
      // "FrontEnd_HostPlan",
      // "BackEnd_HostPlan",
      // "BackEnd_HostPlan23",
      // "FrontEnd_HostPlan",
      // "FrontEnd_HostPlanAPIs"
    ]
  }
];
export const userInviteData = [
  {
    title: '1. Select repertoires you want to analyses',
    options: [
      {
        optionTitle: 'GitAnalysis',
        gitOptions: [
          'APIs',
          'FrontEnd_GitAnalysis',
          'BackEnd_GitAnalysis',
          'BackEnd_GitAnalysis23',
          'FrontEnd_GitAnalysis',
          'BackEnd_GitAnalysis',
          'BackEnd_GitAnalysis23',
          'FrontEnd_GitAnalysis',
          'FrontEnd_GitAnalysisAPIs'
        ]
      },
      {
        optionTitle: 'SuperReach',
        gitOptions: [
          'APIs',
          'FrontEnd_SuperReach',
          'BackEnd_SuperReach',
          'BackEnd_SuperReach23',
          'FrontEnd_SuperReach',
          'BackEnd_SuperReach',
          'BackEnd_SuperReach23',
          'FrontEnd_SuperReach',
          'FrontEnd_SuperReachAPIs'
        ]
      },
      {
        optionTitle: 'PromptMaker',
        gitOptions: [
          'APIs',
          'FrontEnd_PromptMaker',
          'BackEnd_PromptMaker',
          'BackEnd_PromptMaker23',
          'FrontEnd_PromptMaker',
          'BackEnd_PromptMaker',
          'BackEnd_PromptMaker23',
          'FrontEnd_PromptMaker',
          'FrontEnd_PromptMakerAPIs'
        ]
      },
      {
        optionTitle: 'HostPlan',
        gitOptions: [
          'APIs',
          'FrontEnd_HostPlan',
          'BackEnd_HostPlan',
          'BackEnd_HostPlan23',
          'FrontEnd_HostPlan',
          'BackEnd_HostPlan',
          'BackEnd_HostPlan23',
          'FrontEnd_HostPlan',
          'FrontEnd_HostPlanAPIs'
        ]
      }
    ]
  },
  {
    title: '2. Select users you want to invite',
    options: [
      {
        optionTitle: 'GitAnalysis',
        gitOptions: [
          'APIs',
          'FrontEnd_GitAnalysis',
          'BackEnd_GitAnalysis',
          'BackEnd_GitAnalysis23',
          'FrontEnd_GitAnalysis',
          'BackEnd_GitAnalysis',
          'BackEnd_GitAnalysis23',
          'FrontEnd_GitAnalysis',
          'FrontEnd_GitAnalysisAPIs'
        ]
      },
      {
        optionTitle: 'SuperReach',
        gitOptions: [
          'APIs',
          'FrontEnd_SuperReach',
          'BackEnd_SuperReach',
          'BackEnd_SuperReach23',
          'FrontEnd_SuperReach',
          'BackEnd_SuperReach',
          'BackEnd_SuperReach23',
          'FrontEnd_SuperReach',
          'FrontEnd_SuperReachAPIs'
        ]
      },
      {
        optionTitle: 'PromptMaker',
        gitOptions: [
          'APIs',
          'FrontEnd_PromptMaker',
          'BackEnd_PromptMaker',
          'BackEnd_PromptMaker23',
          'FrontEnd_PromptMaker',
          'BackEnd_PromptMaker',
          'BackEnd_PromptMaker23',
          'FrontEnd_PromptMaker',
          'FrontEnd_PromptMakerAPIs'
        ]
      },
      {
        optionTitle: 'HostPlan',
        gitOptions: [
          'APIs',
          'FrontEnd_HostPlan',
          'BackEnd_HostPlan',
          'BackEnd_HostPlan23',
          'FrontEnd_HostPlan',
          'BackEnd_HostPlan',
          'BackEnd_HostPlan23',
          'FrontEnd_HostPlan',
          'FrontEnd_HostPlanAPIs'
        ]
      }
    ]
  }
];

export const alertData = [
  {
    createdAt: '2025-01-24T09:36:59.744Z',
    message: 'Code Quality in gitOpsAPI dropped to 4/10 last week.',
    type: 'commit'
  },
  {
    createdAt: '2025-01-24T09:45:00.000Z',
    message:
      'Testing metrics in githubAnalytics-UI fell below 5/10. Consider adding test cases for better coverage.',
    type: 'commit'
  },
  {
    createdAt: '2025-01-23T10:25:00.000Z',
    message:
      'No commits have been made in apiv2 in the past 30 days. Check for progress updates.',
    type: 'pull'
  },
  {
    createdAt: '2025-01-23T10:35:00.000Z',
    message: 'Code Quality in gitOpsAPI dropped to 4/10 last week.',
    type: 'commit'
  },
  {
    createdAt: '2025-01-23T10:45:00.000Z',
    message:
      'No commits have been made in githubAnalytics-UI in the past 30 days. Check for progress updates.',
    type: 'pull'
  },
  {
    createdAt: '2025-01-23T11:00:00.000Z',
    message: 'Code Quality in apiv2 dropped to 4/10 last week.',
    type: 'commit'
  },
  {
    createdAt: '2025-01-23T11:10:00.000Z',
    message:
      'No commits have been made in gitOpsAPI in the past 30 days. Check for progress updates.',
    type: 'pull'
  },
  {
    createdAt: '2025-01-23T11:20:00.000Z',
    message: 'Code Quality in githubAnalytics-UI dropped to 4/10 last week.',
    type: 'commit'
  }
];

export const recentActivityData = [
  {
    type: 'commit',
    createdAt: '2024-11-05T10:30:59.744Z',
    message: 'askdhruv committed in gitOpsAPI.'
  },
  {
    type: 'pull',
    createdAt: '2024-11-15T14:25:00.000Z',
    message: 'bisma777 created a pull request in githubAnalytics-UI.'
  },
  {
    type: 'merge',
    createdAt: '2024-11-20T11:15:45.123Z',
    message: 'askvarun merged changes into apiv2.'
  },
  {
    type: 'commit',
    createdAt: '2024-11-25T18:45:30.789Z',
    message: 'amandeepKaur33 committed in taskTracker.'
  },
  {
    type: 'pull',
    createdAt: '2024-12-01T07:30:15.456Z',
    message: 'askdhruv created a pull request in analyticsAPI.'
  },
  {
    type: 'merge',
    createdAt: '2024-12-10T20:10:05.987Z',
    message: 'bisma777 merged changes into coreModule.'
  },
  {
    type: 'commit',
    createdAt: '2024-12-20T09:25:49.001Z',
    message: 'askvarun committed in dataPipeline.'
  },
  {
    type: 'pull',
    createdAt: '2025-01-05T22:40:55.654Z',
    message: 'amandeepKaur33 created a pull request in billingService.'
  },
  {
    type: 'merge',
    createdAt: '2025-01-10T13:10:35.432Z',
    message: 'askdhruv merged changes into userInterface.'
  },
  {
    type: 'commit',
    createdAt: '2025-01-15T08:05:25.876Z',
    message: 'bisma777 committed in devOpsToolkit.'
  }
];

export const mostActiveDashboardCardsData = {
  title: 'Most Active',
  list: [
    {
      itemKey: 'Most active user',
      item: 'askvarun',
      desc: 'Last commit on prompt_maker at 11:11 12/12/12',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Most active repo',
      item: 'git_vectorapi',
      desc: '20 commits in last 24 hours',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Most active repo',
      item: 'git_vectorapi',
      desc: '20 commits in last 24 hours',
      info: 'Based on commits made in the last 15 days'
    }
  ]
};
export const qualityDashboardCardsData = {
  title: 'Quality Test',
  list: [
    {
      itemKey: 'Most active user',
      item: 'askvarun',
      desc: 'Last commit on prompt_maker at 11:11 12/12/12',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Most active repo',
      item: 'git_vectorapi',
      desc: '20 commits in last 24 hours',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Most active repo',
      item: 'git_vectorapi',
      desc: '20 commits in last 24 hours',
      info: 'Based on commits made in the last 15 days'
    }
  ]
};

export const performanceCardData = {
  title: 'Performance',
  list: [
    {
      itemKey: 'Avg. user performance',
      item: '7/10',
      desc: 'Avg. score across all repos',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Highest scorer',
      item: 'askvarun',
      desc: 'Average score below 3',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Lowest scorer',
      item: 'askvarun',
      desc: 'Average score below 3',
      info: 'Based on commits made in the last 15 days'
    }
  ]
};
export const qualityCardData = {
  title: 'Quality',
  list: [
    {
      itemKey: 'Avg. user performance',
      item: '7/10',
      desc: 'Avg. score across all repos',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Highest scorer',
      item: 'askvarun',
      desc: 'Average score below 3',
      info: 'Based on commits made in the last 15 days'
    },
    {
      itemKey: 'Lowest scorer',
      item: 'askvarun',
      desc: 'Average score below 3',
      info: 'Based on commits made in the last 15 days'
    }
  ]
};
// export  const dashboardCardsData = [
//   {

//     title: 'Performance',
//     list: [
//       {
//         itemKey: 'Avg. user performance',
//         item: '7/10',
//         desc: 'Avg. score across all repos',
//         info: 'Based on commits made in the last 15 days'
//       },
//       {
//         itemKey: 'Highest scorer',
//         item: 'askvarun',
//         desc: 'Average score below 3',
//         info: 'Based on commits made in the last 15 days'
//       },
//       {
//         itemKey: 'Lowest scorer',
//         item: 'askvarun',
//         desc: 'Average score below 3',
//         info: 'Based on commits made in the last 15 days'
//       }
//     ]
//   },
//   {
//     title: 'Quality',
//     list: [
//       {
//         itemKey: 'Avg. user performance',
//         item: '7/10',
//         desc: 'Avg. score across all repos',
//         info: 'Based on commits made in the last 15 days'
//       },
//       {
//         itemKey: 'Highest scorer',
//         item: 'askvarun',
//         desc: 'Average score below 3',
//         info: 'Based on commits made in the last 15 days'
//       },
//       {
//         itemKey: 'Lowest scorer',
//         item: 'askvarun',
//         desc: 'Average score below 3',
//         info: 'cute shinchan'
//       }
//     ]
//   }
// ];

export const repoOverviewData = [
  {
    itemKey: 'Overall repo score',
    item: '6/10',
    desc: 'Click here to view all review commits',
    info: 'Total number of repos connected'
  },
  {
    itemKey: 'Active users',
    item: '13/16',
    desc: '13 users committed to repos in the last week',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Code quality',
    item: '7/10',
    desc: 'Avg. code quality score across all commits',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Code performance',
    item: '6.5/10',
    desc: 'Avg. code performance over the last 15 days',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Maintainability',
    item: '8/10',
    desc: 'Avg. code maintainability over the last 15 days',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Consistency',
    item: '8/10',
    desc: 'Avg. code consistency over the last 15 days',
    info: 'Based on commits made in the last 15 days'
  }
];

export const orgOverviewData = [
  {
    itemKey: 'Connected repos',
    item: '6',
    desc: 'Click here to view all repos',
    info: 'Total number of repos connected'
  },
  {
    itemKey: 'Active users',
    item: '13/16',
    desc: '13 users committed to repos in the last week',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Avg. code quality',
    item: '7/10',
    desc: 'Avg. score across all repos',
    info: 'Based on commits made in the last 15 days'
  }
];

export const userPerformanceData = [
  {
    itemKey: 'Overview summary',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Total number of repos connected'
  },
  {
    itemKey: 'Code quality',
    item: '7.5/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Functionality',
    item: '6/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Performance',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Security',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Maintainability',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Compatibility',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Adherence to standards',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Error handling',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Error handling',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Business logic',
    item: '9/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Change impact analysis',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Code smells',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Compliance and legal',
    item: '6/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Innovation and improvements',
    item: '9/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Cultural and team dynamics',
    item: '9/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Overview summary',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Total number of repos connected'
  },
  {
    itemKey: 'Code quality',
    item: '7.5/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Functionality',
    item: '6/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Performance',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Security',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Maintainability',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Compatibility',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Adherence to standards',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Error handling',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Error handling',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Business logic',
    item: '9/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Change impact analysis',
    item: '8/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Code smells',
    item: '7/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Compliance and legal',
    item: '6/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Innovation and improvements',
    item: '9/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Compliance and legal',
    item: '6/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  },
  {
    itemKey: 'Innovation and improvements',
    item: '9/10',
    desc: 'Average repo score',
    info: 'Based on commits made in the last 15 days'
  }
];

export const repoRecentActivityData = [
  {
    day: 'Today',
    list: [
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'Bisma pushed 3 commits to GNXGroup/githubAnalytics-UI'
    ]
  },
  {
    day: 'Yesterday',
    list: [
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI'
    ]
  },
  {
    day: 'Past week',
    list: [
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits',
      'New pull request created by askvarun in GNXGroup/githubAnalytics-UI',
      'Repository GNXGroup/githubAnalytics-UI has 15 new commits'
    ]
  }
];

export const usersLearningNeedsData = {
  needTitle: 'Learning needs:',
  desc: "Based on your recent performance and GitVector's analysis, we've identified key areas where you can enhance your skills and make a greater impact.",
  content: [
    'Focus on Error Recovery Techniques: Your error-handling score indicates a need to practice implementing fallback mechanisms and creating detailed logs for smoother debugging.',
    'Enhance Modularization Skills: The maintainability metric suggests working on breaking large functions into smaller, reusable components for cleaner code structure.',
    'Improve Commit Practices: Commit message quality analysis reveals that more descriptive and precise commit messages would make your work easier to track and understand.',
    'Strengthen Code Scalability: Performance metrics highlight areas to optimize code to handle larger workloads and improve runtime efficiency.',
    'Adopt Stronger Security Practices: Security scores suggest reviewing common vulnerabilities, such as dependency risks and input validation weaknesses, in your projects.',
    'Boost Business Logic Alignment: Business logic analysis shows potential gaps in translating project requirements into effective and scalable solutions.'
  ]
};

export const weeklySummaryData = [
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message:
      'Top Commit: Refactored API calls for better error handling - Boosted Code Quality to 8/10'
  },
  {
    type: 'Feature/Enhancement',
    createdAt: '2025-01-24T00:00:00.000Z',
    message:
      'Improved Metric: Collaboration—Scored 9/10 for well-documented and shared code.'
  },
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Functionality: 4/10—logic inconsistencies in input validation.'
  },
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Commit Granularity: 5/10—split changes into smaller commits.'
  },
  {
    type: 'Refactor',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Accessibility: 4/10—improve ARIA labels and keyboard navigation.'
  },
  {
    type: 'Feature/Enhancement',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Test for edge cases in Functionality.'
  },
  {
    type: 'Feature/Enhancement',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Refine commit practices for better tracking.'
  },
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Test for edge cases in Functionality.'
  },
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Refine commit practices for better tracking.'
  },
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Test for edge cases in Functionality.'
  },
  {
    type: 'businessLogic Alert',
    createdAt: '2025-01-24T00:00:00.000Z',
    message: 'Refine commit practices for better tracking.'
  }
];

export const dashboardCardsData = {
  overallRepoScore: 9,
  inactiveUsers: 12,
  codeQuality: 24,
  connectedRepos: 9,
  Consistency: 9,
  activeUsers: 12,
  codePerformance: 12,
  maintainability: 12,
  totalUsers: 24,
  Compatibility: 9,
  Functionality: 12,
  Security: 24,
  'Adherence to standards': 9,
  'Overview summary': 9,
  'Error handling': 12,
  'Business logic': 12,
  'Change impact analysis': 12,
  avgCodePerformance: 24,
  adherenceStandards: 9,
  security: 12,
  compatibility: 24,
  mostActiveUser: {
    user: {
      login: 'jeelbhanavdiyagnx'
    },
    lastCommit: {
      repo: 'sr-workers',
      date: '2025-01-06T12:20:07.000Z',
      message: '#86c1g356q Provide email content for the reply email notes.'
    }
  },
  mostActiveRepo: {
    repo: {
      name: 'apiv2'
    },
    lastCommit: {
      repo: 'apiv2',
      date: '2025-01-06T11:11:21.000Z',
      message: '#86c1g356q not getting proper reply in note'
    }
  },
  averageCodeQuality: 6.336018711018711,
  highestAvgUser: {
    user: {
      login: 'vipul19238'
    }
  },
  lowestAvgUser: {
    user: {
      login: 'aakashchhoker'
    }
  },
  overallAvgPerformance: 5.62323284823285,
  avgUserPerformance: 2.784428948028371
};

export const dashboardPerformanceCardDescData = [
  {
    title: 'avgUserPerformance',
    desc: 'Avg. score across all repos'
  },
  {
    title: 'highestAvgUser',
    desc: 'Average score above 8'
  },
  {
    title: 'lowestAvgUser',
    desc: 'Average score below 3'
  }
];

export const matricTypes = [
  {
    key: 'overviewSummary',
    value: 'Overview Summary'
  },
  {
    key: 'codeQuality',
    value: 'Code Quality'
  },
  {
    key: 'functionality',
    value: 'Functionality'
  },
  {
    key: 'performance',
    value: 'Performance'
  },
  {
    key: 'security',
    value: 'Security'
  },
  {
    key: 'maintainability',
    value: 'Maintainability'
  },
  {
    key: 'adherenceToStandards',
    value: 'Adherence to Standards'
  },
  {
    key: 'errorHandling',
    value: 'Error Handling'
  },
  {
    key: 'changeImpactAnalysis',
    value: 'Change Impact Analysis'
  },
  {
    key: 'codeSmells',
    value: 'Code Smells'
  },
  {
    key: 'innovationAndImprovements',
    value: 'Innovation and Improvements'
  },
  {
    key: 'userExperience',
    value: 'User Experience'
  },
  {
    key: 'commitMessageQuality',
    value: 'Commit Message Quality'
  },
  {
    key: 'commitGranularity',
    value: 'Commit Granularity'
  },
  {
    key: 'commentQuality',
    value: 'Comment Quality'
  }
]

export const sortType = [
  { value: 'Highest score', key: 'desc' },
  { value: 'Lowest score', key: 'asc' }
];

export const sortOrder = [
  { value: 'Highest score', key: 'desc' },
  { value: 'Lowest score', key: 'asc' }
];

export const activityType = [
  { value: 'Commited', key: 'commit' },
  { value: 'Merge pull request', key: 'merge' },
  { value: 'Pull request', key: 'pull' }
];

export const orgOverviewCardsData = [
  {
    key: 'connectedRepos',
    description: 'Repos connected in this organization',
    tooltip: 'Number of repos connected from the selected organization'
  },
  {
    key: 'repoAnalysed',
    description: 'Repositories analyzed based on commits made in the selected period',
    tooltip: 'Repositories analyzed based on commit made for the selected period'
  },
  {
    key: 'activeUsersData',
    description:
      'users were active based on commit made in the selected period',
    tooltip:
      'Number of active users based on commits made in the selected period'
  },
  {
    key: 'averageCodeQuality',
    description: 'Average code quality of commits made in the selected period',
    tooltip: 'Average code quality based on commit made for the selected period'
  },
  {
    key: 'closedPullRequests',
    description:
      'users were active based on commit made in the selected period',
    tooltip:
      'Number of active users based on commits made in the selected period'
  },
  {
    key: 'mergePullRequest',
    description: 'Average code quality of commits made in the selected period',
    tooltip: 'Average code quality based on commit made for the selected period'
  }
];
export const repoOverviewCardsData = [
  {
    key: 'overallRepoScore',
    description: 'Average score of all analysis parameters for the selected period',
    tooltip: 'Average score of all analysis parameters for the selected period'
  },
  {
    key: 'activeUsersData',
    description: 'No. of active users during in the selected period',
    tooltip: 'No. of active users during in the selected period'
  },
  {
    key: 'codeQuality',
    description: 'Average code quality score for the selected period',
    tooltip: 'Average code quality score for the selected period'
  },
  {
    key: 'codePerformance',
    description: 'Average code performance for the selected period',
    tooltip: 'Average code performance for the selected period',
  },
  {
    key: 'maintainability',
    description: 'Average Maintainability score for the selected period',
    tooltip: 'Average Maintainability score for the selected period',
  },
  {
    key: 'consistency',
    description: 'Average Consistency score for the selected period',
    tooltip: 'Average Consistency score for the selected period',
  }
];
export const orgCardData = [
  {
    key: 'topAlertType',
    description:
      'Shows which type of alert appeared the most in the selected period',
    tooltip:
      'Shows which type of alert appeared the most in the selected period'
  },
  {
    key: 'topCommitType',
    description:
      'Shows which type of commit was made the most in the selected period',
    tooltip:
      'Shows which type of commit was made the most in the selected period'
  },
  {
    key: 'linesChanged',
    description:
      'Displays the total number of lines of code added, or deleted in the selected period',
    tooltip:
      'Displays the total number of lines of code added, or deleted in the selected period'
  },
  {
    key: 'mostActiveDay',
    description: 'Most number of commit made for the selected period',
    tooltip: 'Most number of commit made for the selected period'
  },
  {
    key: 'mostActiveUser',
    description: 'Based on number of commits activity in selected period',
    tooltip: 'Based on number of commits made for the selected period'
  },
  {
    key: 'mostActiveRepo',
    description: 'Based on number of commits activity in selected period',
    tooltip: 'Based on number of commits made in selected period '
  },
  {
    key: 'highestAvgUser',
    title: 'Highest avg score',
    description: 'Based on number of commits made for the selected period',
    tooltip: 'Based on the avg commit score for the selected period'
  },
  {
    key: 'lowestAvgUser',
    title: 'Lowest avg score',
    description: 'Based on the avg commit score for the selected period',
    tooltip: 'Based on the avg commit score for the selected period'
  },
  {
    key: 'avgUserPerformance',
    title: 'Avg user score',
    description: 'Average score for all users for the selected period',
    tooltip: 'Average score for all users for the selected period'
  },
  {
    key: 'mostActiveDay',
    description: 'Most number of commit made for the selected period',
    tooltip: 'Most number of commit made for the selected period'
  }
];

export const repoUserPerformanceCardData = [
  {
    key: 'overviewSummary',
    tooltip:
      'Provides a high-level score summarizing the overall performance of the repository'
  },
  {
    key: 'codeQuality',
    tooltip:
      'Measures adherence to coding standards, best practices, and code cleanliness'
  },
  {
    key: 'functionality',
    tooltip:
      'Checks if the code effectively delivers the intended feature or functionality'
  },
  {
    key: 'commitMessageQuality',
    tooltip: 'Analyzes the clarity and usefulness of commit messages'
  },
  {
    key: 'commitGranularity',
    tooltip:
      'Checks if the commits are broken down into logical and manageable chunks'
  },
  {
    key: 'commentQuality',
    tooltip: 'Measures the quality and usefulness of comments added to the code'
  },
  {
    key: 'performance',
    tooltip:
      'Assesses the efficiency of the code in terms of speed and resource utilization'
  },
  {
    key: 'security',
    tooltip:
      'Evaluates the code for vulnerabilities, security best practices, and safe handling of data'
  },
  {
    key: 'maintainability',
    tooltip: 'Analyzes how easy it is to maintain and update the code over time'
  },
  {
    key: 'adherenceToStandards',
    tooltip:
      'Ensures compliance with industry, language, or organizational coding standards'
  },
  {
    key: 'errorHandling',
    tooltip:
      'Measures the robustness of the error-handling mechanisms implemented in the code'
  },
  {
    key: 'dependencies',
    tooltip:
      'Assesses the use of third-party libraries and their impact on the project'
  },
  {
    key: 'businessLogic',
    tooltip:
      'Evaluates the implementation of core business rules and processes within the code'
  },
  {
    key: 'changeImpactAnalysis',
    tooltip:
      'Analyzes the potential impact of code changes on other parts of the system'
  },
  {
    key: 'codeSmells',
    tooltip:
      'Identifies patterns in the code that may indicate deeper structural problems'
  },
  {
    key: 'complianceAndLegal',
    tooltip:
      'Checks for adherence to licensing requirements, regulatory standards, and compliance guidelines'
  },
  {
    key: 'innovationAndImprovements',
    tooltip:
      'Measures the developer’s ability to introduce innovative solutions and improvements to the code'
  },
  {
    key: 'culturalAndTeamDynamics',
    tooltip:
      'Analyzes collaboration patterns and how the developer interacts with the team'
  },
  {
    key: 'integrationWithTools',
    tooltip:
      'Evaluates the use of CI/CD pipelines, automated testing, and other tools for development efficiency'
  },
  {
    key: 'feedbackAndIteration',
    tooltip:
      'Checks how the developer responds to feedback and iterates on their work'
  },
  {
    key: 'customizabilityAndPersonalization',
    tooltip:
      'Measures the level of customization or personalization added to the solution to meet specific needs'
  },
  {
    key: 'userExperience',
    tooltip:
      'Evaluates the impact of the developer’s work on the overall user experience'
  },
  {
    key: 'contextAwareness',
    tooltip:
      'Checks if the developer considered the broader context of the project while making code changes'
  },
  {
    key: 'historicalAnalysis',
    tooltip:
      'Analyzes trends in the developer’s performance and improvements over time'
  },
  {
    key: 'collaborationFeatures',
    tooltip:
      'Evaluates the developer’s contributions to collaborative activities like pull requests, code reviews, and discussions'
  },
  {
    key: 'automatedFixes',
    tooltip: 'Measures the use of automation for fixing common issues and bugs'
  },
  {
    key: 'realTimeFeedback',
    tooltip:
      'Analyzes how quickly the developer acts on feedback provided during the code review process'
  },
  {
    key: 'learningResources',
    tooltip:
      'Checks if the developer utilizes resources to learn and improve their skills'
  },
  {
    key: 'performanceMetrics',
    tooltip: 'Analyzes the performance impact of code changes on the system'
  },
  {
    key: 'accessibilityConsiderations',
    tooltip:
      'Checks if the code adheres to accessibility standards for a broader user base'
  },
  {
    key: 'ethicalConsiderations',
    tooltip:
      'Evaluates if the code aligns with ethical standards, such as privacy and data protection'
  },
  {
    key: 'scalability',
    tooltip:
      'Measures how well the code is designed to handle growth in users, data, or functionality'
  },
  {
    key: 'compatibility',
    tooltip:
      'Checks how well the code integrates with different systems, tools, and environments'
  }
];

export const userAccessLevelData = [
  {
    level: 'Admin',
    info: 'Can manage and analyze users, repos. org and billing'
  },
  {
    level: 'Manager',
    info: 'Can manage and analyze users, repos and org'
  },
  {
    level: 'User',
    info: 'Can analyze self made code contributions'
  }
];
export const classificationTypes = [
  'Enhancement',
  'Feature/Enhancement',
  'Performance Improvement',
  'Refactor',
  'Design System/Theme',
  'Merge',
  'Trivial/Minor',
  'Revert',
  'Data Migration',
  'Bugfix/Enhancement',
  'Build/CI/CD',
  'Chore',
  'Documentation',
  'Infrastructure',
  'Configuration',
  'UI/UX',
  'Environment Configuration',
  'Hotfix',
  'Dependency Update',
  'Bugfix'
];

export const sort = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const organizationOverview = {
  mergePullRequest: {
    count: 13,
    description: 'ghghgh'
  },
  closedPullRequests: {
    count: 8,
    description: 'ghghgh'
  }
};

//Repository dashboard
// Dashboard overview card
export const repoOverviewAllowedKeys = [
  'overallRepoScore',
  'activeUsersData',
  'codeQuality',
  'codePerformance',
  'maintainability',
  'consistency'
];
export const repoUserPerformanceKeys = [
  'overviewSummary',
  'codeQuality',
  'functionality',
  'performance',
  'security',
  'maintainability',
  'adherenceToStandards',
  'errorHandling',
  'dependencies',
  'businessLogic',
  'changeImpactAnalysis',
  'codeSmells',
  'complianceAndLegal',
  'innovationAndImprovements',
  'culturalAndTeamDynamics',
  'integrationWithTools',
  'feedbackAndIteration',
  'customizabilityAndPersonalization',
  'userExperience',
  'contextAwareness',
  'historicalAnalysis',
  'collaborationFeatures',
  'automatedFixes',
  'realTimeFeedback',
  'learningResources',
  'performanceMetrics',
  'accessibilityConsiderations',
  'ethicalConsiderations',
  'scalability',
  'commitMessageQuality',
  'commitGranularity',
  'commentQuality'
];
export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const allowedKeysData = {
  orgOveriew: [
    'connectedRepos',
    'repoAnalysed',
    'activeUsersData',
  ],
  mostActive: ['mostActiveUser', 'mostActiveRepo', 'mostActiveDay'],
  orgPerformance: ['avgUserPerformance', 'highestAvgUser', 'lowestAvgUser'],
  insightsAndTrends: ['topCommitType', 'topAlertType', 'linesChanged'],
  repoOverview: [
    'overallRepoScore',
    'activeUsersData',
    'codeQuality',
    'codePerformance',
    'maintainability',
    'commitAnalyzed'
  ],
  repoRadialCardList :[
    'overallRepoScore',
    'activeUsersData',
    'codeQuality',
    'codePerformance',
    'maintainability',
  ],
  repoUserPerformance: [
    'overviewSummary',
    'codeQuality',
    'functionality',
    'performance',
    'security',
    'maintainability',
    'adherenceToStandards',
    'errorHandling',
    'dependencies',
    'businessLogic',
    'changeImpactAnalysis',
    'codeSmells',
    'complianceAndLegal',
    'innovationAndImprovements',
    'culturalAndTeamDynamics',
    'integrationWithTools',
    'feedbackAndIteration',
    'customizabilityAndPersonalization',
    'userExperience',
    'contextAwareness',
    'historicalAnalysis',
    'collaborationFeatures',
    'automatedFixes',
    'realTimeFeedback',
    'learningResources',
    'performanceMetrics',
    'accessibilityConsiderations',
    'ethicalConsiderations',
    'scalability',
    'commitMessageQuality',
    'commitGranularity',
    'commentQuality'
  ]
};
export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: 'Mobile',
    color: '#60a8fb'
  }
}

export const activityTypeData = [
  { value: 'Commited', key: 'commit' },
  { value: 'Merge pull request', key: 'merge' },
  { value: 'Pull request', key: 'pull' }
]
