import { DemoServiceData } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Full payload — exactly as supplied by the backend for the published
// "Webchat" service page (Communication & Engagement category). Sole design
// reference dataset for /demo-ui and /demo-ui-2.
// ─────────────────────────────────────────────────────────────────────────────
export const webchatServiceData: DemoServiceData = {
    _id: "",
    name: "Webchat",
    slug: "webchat",
    description:
        "Live chat and AI-powered chatbot solutions that help training companies engage visitors, qualify leads, provide instant support, and convert conversations into customers.",
    serviceCategory: {
        name: "Communication & Engagement",
        slug: "communication-engagement",
    },
    servicecard: {
        tagline: "Live Chat & AI Chatbot",
        title: "Webchat",
        slug: "webchat",
        icon: "",
        content:
            "Engage visitors in real time with live chat, AI-powered chatbots, automated responses, team inboxes, and multi-channel messaging.",
        ratings: "4.9",
        clients: "15K+",
        points: ["Real-Time Visitor Engagement", "24/7 AI Lead Qualification", "Faster Support & Conversions"],
    },
    banner: {
        h1: "Connect with Customers Instantly, 24/7",
        tagline: "Live Chat & AI Chatbot",
        description:
            "Engage visitors in real-time with live chat, AI-powered chatbots, and multi-channel messaging. Turn conversations into conversions.",
        media: {
            _id: "6a8d86a799dc95136392da8b",
            alt: "SkillDeck Webchat",
            url: "https://cloud-storage.skilldeck.net/fcaaf582-3eb8-4415-a31d-0e951575a9bd/public/uploads/bannerinage-3a3108ff-16a8-4569-a2a0-8bb60754bc4e.png",
            thumbnail: "https://cloud-storage.skilldeck.net/fcaaf582-3eb8-4415-a31d-0e951575a9bd/public/uploads/bannerinage-3a3108ff-16a8-4569-a2a0-8bb60754bc4e.png",
        },
        stats: [
            { icon: "MessageCircle,currentColor", value: "3M+ Conversations" },
            { icon: "Users,currentColor", value: "15K+ Active Teams" },
            { icon: "Timer,currentColor", value: "<30s Avg Response" },
        ],
        reviews: [{ count: "15K+", ratings: "4.9/5", icon: "Star,currentColor" }],
    },
    servicestats: [
        {
            icon: "MessageCircle,currentColor",
            value: "3M+",
            description: "Conversations",
            tagline: "Real-time conversations that keep visitors engaged.",
        },
        {
            icon: "Users,currentColor",
            value: "15K+",
            description: "Active Teams",
            tagline: "Teams using chat to engage and support customers.",
        },
        {
            icon: "Timer,currentColor",
            value: "<30s",
            description: "Average Response",
            tagline: "Faster responses help reduce missed opportunities.",
        },
        {
            icon: "TrendingUp,currentColor",
            value: "+35%",
            description: "Conversion Potential",
            tagline: "Real-time engagement designed to improve conversion.",
        },
    ],
    approach: {
        tagline: "Our Engagement Framework",
        title: "From First Message to Meaningful Conversion",
        description:
            "Create a connected conversation journey that engages visitors, qualifies opportunities, routes conversations, and helps your team close faster.",
        steps: [
            {
                title: "Engage Visitors",
                description: "Use a customizable webchat widget and proactive triggers to start conversations at the right moment.",
                icon: "MessageCircleMore,currentColor",
            },
            {
                title: "Understand Intent",
                description: "Use AI chatbots and qualification flows to understand questions, needs, and buying intent.",
                icon: "Brain,currentColor",
            },
            {
                title: "Route & Respond",
                description: "Automatically route conversations to the right team or agent and accelerate replies with canned responses.",
                icon: "GitBranch,currentColor",
            },
            {
                title: "Convert & Improve",
                description: "Book demos, sync leads with CRM, review analytics, and continuously improve the customer conversation journey.",
                icon: "ChartNoAxesCombined,currentColor",
            },
        ],
        kpis: {
            badge: "KPIs We Focus On",
            kpiCategory: [
                {
                    name: "Engagement KPIs",
                    content: [
                        { icon: "MessageCircle,currentColor", value: "Chat Volume" },
                        { icon: "Timer,currentColor", value: "Response Time" },
                        { icon: "Users,currentColor", value: "Active Conversations" },
                    ],
                },
                {
                    name: "Conversion & Support KPIs",
                    content: [
                        { icon: "TrendingUp,currentColor", value: "Conversion Rate" },
                        { icon: "CheckCircle,currentColor", value: "First Contact Resolution" },
                        { icon: "HeartHandshake,currentColor", value: "CSAT Score" },
                    ],
                },
            ],
        },
        tools: {
            badge: "Webchat Capabilities",
            description:
                "A connected set of chat, automation, routing, analytics, and CRM capabilities designed for modern customer engagement.",
            content: [
                { tagline: "Live Chat Widget" },
                { tagline: "AI Chatbot" },
                { tagline: "Team Inbox" },
                { tagline: "Analytics Dashboard" },
                { tagline: "Routing Rules" },
                { tagline: "CRM Integration" },
            ],
            cta: {
                title: "See WebChat in Action",
                descp: "Discover how SkillDeck webchat can transform customer engagement and support.",
            },
        },
    },
    whyservice: {
        tagline: "Every Conversation Is an Opportunity",
        title: "Turn Website Conversations Into Customer Relationships",
        description:
            "Customers expect fast answers. Webchat gives your team a direct, real-time channel while automation handles repetitive questions and captures opportunities even when your team is offline.",
        points: [
            {
                icon: "MessageCircle,currentColor",
                title: "Instant Engagement",
                description: "Connect with visitors while they are actively browsing your website.",
            },
            {
                icon: "Bot,currentColor",
                title: "24/7 Automation",
                description: "Let AI chatbots answer common questions, qualify leads, and collect messages around the clock.",
            },
            {
                icon: "UsersRound,currentColor",
                title: "Team Collaboration",
                description: "Give your team one shared place to manage customer conversations across channels.",
            },
        ],
    },
    benefits: {
        tagline: "Built for Better Conversations",
        title: "More Conversations. Faster Responses. Better Outcomes.",
        description: "Combine human support with automation to create a faster, more consistent customer experience.",
        points: [
            {
                icon: "MessageCircle,currentColor",
                title: "Real-Time Engagement",
                description: "Start conversations with visitors before interest turns into abandonment.",
            },
            {
                icon: "Bot,currentColor",
                title: "AI-Powered Support",
                description: "Automate FAQs, lead qualification, and common customer interactions.",
            },
            {
                icon: "Inbox,currentColor",
                title: "Unified Inbox",
                description: "Manage chat, email, and social conversations from one collaborative workspace.",
            },
            {
                icon: "Languages,currentColor",
                title: "Multi-Language Support",
                description: "Support customers in their preferred language with automatic translation.",
            },
            {
                icon: "BarChart3,currentColor",
                title: "Actionable Analytics",
                description: "Track response times, satisfaction, chat volume, and team performance.",
            },
        ],
    },
    addons: {
        tagline: "POWERFUL WEBCHAT ADD-ONS",
        title: "Extend Your Customer Engagement",
        description: "Add automation, CRM connectivity, proactive engagement, and support workflows to create a complete conversation system.",
        cards: [
            {
                icon: "Bot,currentColor",
                title: "AI Lead Qualification",
                description: "Qualify visitors automatically and identify conversations that need your sales team's attention.",
            },
            {
                icon: "CalendarCheck,currentColor",
                title: "Demo Booking",
                description: "Allow prospects to book demos directly inside a chat conversation.",
            },
            {
                icon: "Database,currentColor",
                title: "CRM Sync",
                description: "Sync leads and conversation context with CRM platforms such as Salesforce and HubSpot.",
            },
            {
                icon: "Zap,currentColor",
                title: "Proactive Chat Triggers",
                description: "Start targeted conversations based on visitor behavior and the right moment in the journey.",
            },
        ],
        cta: {
            title: "Boost Your Sales",
            descp: "Turn high-intent conversations into qualified opportunities with proactive webchat and automation.",
        },
        content: {
            title: "A Complete Conversation System for Modern Businesses",
            tagline: "Engage, Qualify, Support, Convert",
            description:
                "SkillDeck combines live chat, AI automation, team collaboration, routing, analytics, and CRM connectivity into one customer engagement experience.",
            points: [
                { icon: "MessageCircle,currentColor", point: "Real-Time Conversations" },
                { icon: "Bot,currentColor", point: "AI Lead Qualification" },
                { icon: "UsersRound,currentColor", point: "Shared Team Inbox" },
                { icon: "CalendarCheck,currentColor", point: "Demo Booking" },
                { icon: "ChartNoAxesCombined,currentColor", point: "Conversation Analytics" },
            ],
        },
        highlight: {
            title: "Make Every Website Visit Count",
            tagline: "Conversations That Move Customers Forward",
            description:
                "Use real-time engagement and automation to reduce response delays, capture intent, and create a smoother path from visitor to customer.",
            points: [
                {
                    icon: "Sparkles,currentColor",
                    value: "Smart Engagement",
                    descp: "Trigger relevant conversations when visitors are most likely to need help.",
                },
                {
                    icon: "Bot,currentColor",
                    value: "AI Assistance",
                    descp: "Handle repetitive questions and qualify leads automatically.",
                },
                {
                    icon: "TrendingUp,currentColor",
                    value: "Continuous Optimization",
                    descp: "Use conversation analytics to identify opportunities and improve customer experience.",
                },
            ],
            cta: "Start Connecting with Customers",
        },
    },
    strategy: {
        tagline: "Conversational Growth Strategy",
        title: "Turn Every Chat Into a Growth Opportunity",
        description:
            "Build a conversation strategy around visitor intent, response speed, automation, team workflows, and measurable conversion outcomes.",
        points: [
            {
                icon: "Target,currentColor",
                title: "Intent-Based Engagement",
                description: "Identify where and when visitors are most likely to need assistance.",
            },
            {
                icon: "Bot,currentColor",
                title: "Automation First",
                description: "Automate repetitive questions while keeping human agents available for complex conversations.",
            },
            {
                icon: "UsersRound,currentColor",
                title: "Team Efficiency",
                description: "Route conversations and collaborate through a shared team inbox.",
            },
            {
                icon: "BarChart3,currentColor",
                title: "Performance Optimization",
                description: "Use chat analytics and customer feedback to improve response quality and conversion.",
            },
        ],
        stats: [
            {
                icon: "TrendingUp,currentColor",
                value: "+35%",
                description: "Conversion potential from real-time engagement tools.",
                tagline: "Conversion",
            },
            {
                icon: "MessageCircle,currentColor",
                value: "3x",
                description: "More leads targeted through proactive sales engagement.",
                tagline: "More Leads",
            },
        ],
        cta: "Build Your Webchat Strategy",
        media: {
            _id: "",
            alt: "SkillDeck Webchat Platform",
            url: "",
            thumbnail: "",
        },
    },
    whyopt: {
        tagline: "Why Businesses Choose SkillDeck Webchat",
        title: "A Faster, Smarter Way to Engage Customers",
        description:
            "SkillDeck brings live chat, AI, automation, collaboration, and analytics together so teams can respond faster and create better customer experiences.",
        points: [
            {
                icon: "Zap,currentColor",
                title: "Fast Responses",
                description: "Designed around real-time conversations and faster support.",
            },
            {
                icon: "Bot,currentColor",
                title: "AI Ready",
                description: "Automate FAQs, lead qualification, and repetitive conversations 24/7.",
            },
            {
                icon: "UsersRound,currentColor",
                title: "Team Collaboration",
                description: "Bring conversations into a shared inbox with smart routing.",
            },
            {
                icon: "ChartNoAxesCombined,currentColor",
                title: "Measurable Performance",
                description: "Monitor response times, satisfaction, chat volume, and team performance.",
            },
        ],
        stats: [
            { icon: "MessageCircle,currentColor", value: "3M+", tagline: "Conversations" },
            { icon: "Users,currentColor", value: "15K+", tagline: "Active Teams" },
            { icon: "Timer,currentColor", value: "<30s", tagline: "Avg Response" },
            { icon: "TrendingUp,currentColor", value: "+35%", tagline: "Conversion" },
        ],
    },
    business: {
        tagline: "Built for Modern Customer Engagement",
        title: "One Webchat Experience Across Sales and Support",
        description:
            "Webchat can support both revenue and customer experience by connecting website visitors with sales and support teams in real time.",
        points: [
            {
                icon: "ShoppingCart,currentColor",
                title: "Sales Engagement",
                description: "Engage high-intent visitors, qualify leads, and help prospects move toward a purchase.",
            },
            {
                icon: "Headphones,currentColor",
                title: "Customer Support",
                description: "Resolve questions faster with shared inboxes, canned responses, and ticket workflows.",
            },
            {
                icon: "GraduationCap,currentColor",
                title: "Training & Education",
                description: "Help prospective learners get answers, qualify enquiries, and book demos or consultations.",
            },
            {
                icon: "Globe2,currentColor",
                title: "Multi-Channel Engagement",
                description: "Extend customer conversations across web, mobile, and social channels.",
            },
        ],
        stats: [
            { icon: "MessageCircle,currentColor", value: "3M+", tagline: "Conversations" },
            { icon: "Users,currentColor", value: "15K+", tagline: "Active Teams" },
            { icon: "Timer,currentColor", value: "<30s", description: "Average response" },
        ],
    },
    faqs: {
        tagline: "Webchat Questions Answered",
        title: "Everything You Need to Know Before You Start",
        description: "Common questions about setup, customization, mobile support, AI chatbots, analytics, and integrations.",
        accordions: [
            {
                title: "How quickly can I add the chat widget to my website?",
                description:
                    "Copy and paste a single line of code into your website to get started. The page states that setup can take less than 5 minutes, with plugins also available for WordPress, Shopify, and other popular platforms.",
            },
            {
                title: "Can I customize the chat widget appearance?",
                description:
                    "Yes. The widget can be customized with your colors, position, greeting messages, and logo so it can match your brand identity.",
            },
            {
                title: "Does Webchat work on mobile devices?",
                description:
                    "Yes. The webchat widget is designed to be responsive across devices, and the platform page also describes mobile apps for teams responding to chats on the go.",
            },
            {
                title: "Can AI chatbots handle common questions?",
                description: "Yes. AI-powered chatbots can handle FAQs, qualify leads, and route conversations to the right team members automatically.",
            },
            {
                title: "Can Webchat help generate leads?",
                description: "Yes. The sales-focused features include proactive chat triggers, AI-powered lead bots, demo booking, and CRM synchronization.",
            },
            {
                title: "Can I connect Webchat with my CRM?",
                description: "Yes. The page specifically mentions CRM synchronization and integrations with platforms such as Salesforce and HubSpot.",
            },
            {
                title: "What analytics are available?",
                description: "You can track response times, customer satisfaction scores, chat volume, agent performance, and related conversation metrics.",
            },
            {
                title: "Can Webchat support multiple languages?",
                description: "Yes. Multi-language support with automatic translation is listed as one of the platform capabilities.",
            },
        ],
    },
    bottomSection: {
        title: "Webchat Software for Faster Customer Engagement and Lead Conversion",
        value:
            "<p>Customers increasingly expect immediate answers when they visit a website. SkillDeck Webchat gives businesses a direct communication channel for engaging visitors in real time, answering questions, capturing leads, and improving customer support.</p><p>The platform combines live chat, AI-powered chatbots, automated responses, team inboxes, routing rules, analytics, multi-language support, and CRM connectivity. This allows businesses to create a connected conversation experience instead of managing customer enquiries across disconnected channels.</p><p>For sales teams, Webchat can help engage high-intent visitors, qualify leads automatically, book demos, and synchronize conversations with CRM systems. For support teams, it provides a shared workspace for managing conversations, using canned responses, converting chats into tickets, and accessing customer context.</p><p>A strong webchat strategy is not only about adding a chat bubble to a website. It is about choosing the right engagement triggers, defining useful automation flows, routing conversations to the right people, measuring response quality, and continuously improving the customer journey.</p><p>SkillDeck Webchat is designed to help businesses make every website visit more valuable by combining human conversations with automation and measurable performance insights.</p>",
    },
    internalSection: { title: "", value: "" },
    metaTitle: "Webchat & AI Chatbot for Customer Engagement | SkillDeck",
    metaDescription:
        "Engage website visitors 24/7 with SkillDeck Webchat, AI chatbots, live chat, automated responses, lead qualification, CRM sync, and team collaboration.",
};
