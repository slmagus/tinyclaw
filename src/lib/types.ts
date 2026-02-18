export interface AgentConfig {
    name: string;
    provider: string;       // 'anthropic', 'openai', 'opencode', or 'openrouter'
    model: string;           // e.g. 'sonnet', 'opus', 'gpt-5.3-codex', 'minimax/minimax-m2'
    working_directory: string;
}

export interface TeamConfig {
    name: string;
    agents: string[];
    leader_agent: string;
}

export interface ChainStep {
    agentId: string;
    response: string;
}

export interface Settings {
    workspace?: {
        path?: string;
        name?: string;
    };
    channels?: {
        enabled?: string[];
        discord?: { bot_token?: string };
        telegram?: { bot_token?: string };
        whatsapp?: {};
    };
    models?: {
        provider?: string; // 'anthropic', 'openai', 'opencode', or 'openrouter'
        anthropic?: {
            model?: string;
        };
        openai?: {
            model?: string;
        };
        opencode?: {
            model?: string;
        };
        openrouter?: {
            model?: string;
        };
    };
    agents?: Record<string, AgentConfig>;
    teams?: Record<string, TeamConfig>;
    monitoring?: {
        heartbeat_interval?: number;
    };
}

export interface MessageData {
    channel: string;
    sender: string;
    senderId?: string;
    message: string;
    timestamp: number;
    messageId: string;
    agent?: string; // optional: pre-routed agent id from channel client
    files?: string[];
    // Internal message fields (agent-to-agent)
    conversationId?: string; // links to parent conversation
    fromAgent?: string;      // which agent sent this internal message
}

export interface Conversation {
    id: string;
    channel: string;
    sender: string;
    originalMessage: string;
    messageId: string;
    pending: number;
    responses: ChainStep[];
    files: Set<string>;
    totalMessages: number;
    maxMessages: number;
    teamContext: { teamId: string; team: TeamConfig };
    startTime: number;
    // Track how many mentions each agent sent out (for inbox draining)
    outgoingMentions: Map<string, number>;
}

export interface ResponseData {
    channel: string;
    sender: string;
    message: string;
    originalMessage: string;
    timestamp: number;
    messageId: string;
    agent?: string; // which agent handled this
    files?: string[];
}

export interface QueueFile {
    name: string;
    path: string;
    time: number;
}

// Model name mapping
export const CLAUDE_MODEL_IDS: Record<string, string> = {
    'sonnet': 'claude-sonnet-4-5',
    'opus': 'claude-opus-4-6',
    'claude-sonnet-4-5': 'claude-sonnet-4-5',
    'claude-opus-4-6': 'claude-opus-4-6'
};

export const CODEX_MODEL_IDS: Record<string, string> = {
    'gpt-5.2': 'gpt-5.2',
    'gpt-5.3-codex': 'gpt-5.3-codex',
};

// OpenCode model IDs in provider/model format (passed via --model / -m flag).
// Falls back to the raw model string from settings if no mapping is found.
export const OPENCODE_MODEL_IDS: Record<string, string> = {
    'opencode/claude-opus-4-6': 'opencode/claude-opus-4-6',
    'opencode/claude-sonnet-4-5': 'opencode/claude-sonnet-4-5',
    'opencode/gemini-3-flash': 'opencode/gemini-3-flash',
    'opencode/gemini-3-pro': 'opencode/gemini-3-pro',
    'opencode/glm-5': 'opencode/glm-5',
    'opencode/kimi-k2.5': 'opencode/kimi-k2.5',
    'opencode/kimi-k2.5-free': 'opencode/kimi-k2.5-free',
    'opencode/minimax-m2.5': 'opencode/minimax-m2.5',
    'opencode/minimax-m2.5-free': 'opencode/minimax-m2.5-free',
    'anthropic/claude-opus-4-6': 'anthropic/claude-opus-4-6',
    'anthropic/claude-sonnet-4-5': 'anthropic/claude-sonnet-4-5',
    'openai/gpt-5.2': 'openai/gpt-5.2',
    'openai/gpt-5.3-codex': 'openai/gpt-5.3-codex',
    'openai/gpt-5.3-codex-spark': 'openai/gpt-5.3-codex-spark',
    // Shorthand aliases
    'sonnet': 'opencode/claude-sonnet-4-5',
    'opus': 'opencode/claude-opus-4-6',
};

// OpenRouter model IDs — passed directly to OpenRouter API.
// Model names follow the provider/model format used by OpenRouter.
export const OPENROUTER_MODEL_IDS: Record<string, string> = {
    'minimax/minimax-m2': 'minimax/minimax-m2',
    'anthropic/claude-sonnet-4-5': 'anthropic/claude-sonnet-4-5',
    'anthropic/claude-opus-4-6': 'anthropic/claude-opus-4-6',
    'openai/gpt-5.2': 'openai/gpt-5.2',
    'google/gemini-3-pro': 'google/gemini-3-pro',
    'google/gemini-3-flash': 'google/gemini-3-flash',
    'meta-llama/llama-4-maverick': 'meta-llama/llama-4-maverick',
    'deepseek/deepseek-r3': 'deepseek/deepseek-r3',
    // Shorthand aliases
    'sonnet': 'anthropic/claude-sonnet-4-5',
    'opus': 'anthropic/claude-opus-4-6',
};
