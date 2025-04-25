
export interface ApiMethod {
  name: string;
  title: string;
  description: string;
  parameters: ApiParameter[];
  category: string;
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  placeholder?: string;
}

export const API_METHODS: ApiMethod[] = [
  {
    name: "getMe",
    title: "Get Me",
    description: "A simple method for testing your bot's authentication token.",
    parameters: [],
    category: "Basic"
  },
  {
    name: "getUpdates",
    title: "Get Updates",
    description: "Use this method to receive incoming updates using long polling.",
    parameters: [
      {
        name: "offset",
        type: "number",
        required: false,
        description: "Identifier of the first update to be returned",
        placeholder: "0"
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Limits the number of updates to be retrieved",
        placeholder: "100"
      },
      {
        name: "timeout",
        type: "number",
        required: false,
        description: "Timeout in seconds for long polling",
        placeholder: "0"
      }
    ],
    category: "Updates"
  },
  {
    name: "sendMessage",
    title: "Send Message",
    description: "Use this method to send text messages.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "text",
        type: "string",
        required: true,
        description: "Text of the message to be sent",
        placeholder: "Hello, world!"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the message text",
        placeholder: "HTML"
      }
    ],
    category: "Messages"
  },
  {
    name: "forwardMessage",
    title: "Forward Message",
    description: "Use this method to forward messages of any kind.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "from_chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the chat where the original message was sent",
        placeholder: "123456789"
      },
      {
        name: "message_id",
        type: "number",
        required: true,
        description: "Message identifier in the chat specified in from_chat_id",
        placeholder: "123"
      }
    ],
    category: "Messages"
  },
  {
    name: "sendPhoto",
    title: "Send Photo",
    description: "Use this method to send photos.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "photo",
        type: "string",
        required: true,
        description: "Photo to send (file_id or URL)",
        placeholder: "https://example.com/image.jpg"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Photo caption",
        placeholder: "A beautiful picture"
      }
    ],
    category: "Media"
  },
  {
    name: "sendAudio",
    title: "Send Audio",
    description: "Use this method to send audio files.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "audio",
        type: "string",
        required: true,
        description: "Audio file to send (file_id or URL)",
        placeholder: "https://example.com/audio.mp3"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Audio caption",
        placeholder: "My new song"
      }
    ],
    category: "Media"
  },
  {
    name: "getUserProfilePhotos",
    title: "Get User Profile Photos",
    description: "Use this method to get a list of profile pictures for a user.",
    parameters: [
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "123456789"
      },
      {
        name: "offset",
        type: "number",
        required: false,
        description: "Sequential number of the first photo to be returned",
        placeholder: "0"
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Limits the number of photos to be retrieved",
        placeholder: "100"
      }
    ],
    category: "Users"
  },
  {
    name: "setWebhook",
    title: "Set Webhook",
    description: "Use this method to specify a URL and receive incoming updates via an outgoing webhook.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "HTTPS URL to send updates to",
        placeholder: "https://example.com/webhook"
      },
      {
        name: "max_connections",
        type: "number",
        required: false,
        description: "Maximum allowed number of simultaneous HTTPS connections to the webhook",
        placeholder: "40"
      }
    ],
    category: "Webhook"
  },
  {
    name: "deleteWebhook",
    title: "Delete Webhook",
    description: "Use this method to remove webhook integration.",
    parameters: [
      {
        name: "drop_pending_updates",
        type: "boolean",
        required: false,
        description: "Pass True to drop all pending updates",
        placeholder: "false"
      }
    ],
    category: "Webhook"
  },
  {
    name: "getWebhookInfo",
    title: "Get Webhook Info",
    description: "Use this method to get current webhook status.",
    parameters: [],
    category: "Webhook"
  }
];

export const API_CATEGORIES = Array.from(
  new Set(API_METHODS.map(method => method.category))
);

export function getMethodByName(name: string): ApiMethod | undefined {
  return API_METHODS.find(method => method.name === name);
}

export function getMethodsByCategory(category: string): ApiMethod[] {
  return API_METHODS.filter(method => method.category === category);
}
