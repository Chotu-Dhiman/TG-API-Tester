export const API_CATEGORIES = [
  "Basic",
  "Messages",
  "Chat Management",
  "Media",
  "Admin",
  "Members",
  "Advanced",
  "Webhooks",
  "Games",
  "Payments",
  "Stickers"
];

interface ApiMethod {
  name: string;
  title: string;
  category: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    placeholder?: string;
  }[];
}

export const getMethodsByCategory = (category: string): ApiMethod[] => {
  return API_METHODS.filter(method => method.category === category);
};

export const getMethodByName = (name: string): ApiMethod | undefined => {
  return API_METHODS.find(method => method.name === name);
};

const API_METHODS: ApiMethod[] = [
  {
    name: "getMe",
    title: "Get Bot Info",
    category: "Basic",
    description: "A simple method to test your bot's authentication token.",
    parameters: []
  },
  {
    name: "sendMessage",
    title: "Send Message",
    category: "Messages",
    description: "Use this method to send text messages.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "text",
        type: "string",
        required: true,
        description: "Text of the message to be sent, 1-4096 characters after entities parsing",
        placeholder: "Enter your message"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the message text",
        placeholder: "MarkdownV2 or HTML"
      },
      {
        name: "disable_web_page_preview",
        type: "boolean",
        required: false,
        description: "Disables link previews for links in this message"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "forwardMessage",
    title: "Forward Message",
    category: "Messages",
    description: "Use this method to forward messages of any kind.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "from_chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the chat where the original message was sent",
        placeholder: "Enter original chat ID"
      },
      {
        name: "message_id",
        type: "number",
        required: true,
        description: "Message identifier in the chat specified in from_chat_id",
        placeholder: "Enter message ID"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendPhoto",
    title: "Send Photo",
    category: "Media",
    description: "Use this method to send photos.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "photo",
        type: "string",
        required: true,
        description: "Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get a photo from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing",
        placeholder: "Enter caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the photo caption",
        placeholder: "MarkdownV2 or HTML"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendAudio",
    title: "Send Audio",
    category: "Media",
    description: "Use this method to send audio files, if you want Telegram clients to display them in the music player.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "audio",
        type: "string",
        required: true,
        description: "Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get an audio file from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Audio caption, 0-1024 characters after entities parsing",
        placeholder: "Enter caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the audio caption",
        placeholder: "MarkdownV2 or HTML"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of the audio in seconds",
        placeholder: "Enter duration in seconds"
      },
      {
        name: "performer",
        type: "string",
        required: false,
        description: "Performer",
        placeholder: "Enter performer"
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Track name",
        placeholder: "Enter track name"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendDocument",
    title: "Send Document",
    category: "Media",
    description: "Use this method to send general files.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "document",
        type: "string",
        required: true,
        description: "File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get a file from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Document caption, 0-1024 characters after entities parsing",
        placeholder: "Enter caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the document caption",
        placeholder: "MarkdownV2 or HTML"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendVideo",
    title: "Send Video",
    category: "Media",
    description: "Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as document).",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "video",
        type: "string",
        required: true,
        description: "Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get a video from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of sent video in seconds",
        placeholder: "Enter duration in seconds"
      },
      {
        name: "width",
        type: "number",
        required: false,
        description: "Video width",
        placeholder: "Enter video width"
      },
      {
        name: "height",
        type: "number",
        required: false,
        description: "Video height",
        placeholder: "Enter video height"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Video caption, 0-1024 characters after entities parsing",
        placeholder: "Enter caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the video caption",
        placeholder: "MarkdownV2 or HTML"
      },
      {
        name: "supports_streaming",
        type: "boolean",
        required: false,
        description: "Pass True, if the uploaded video is suitable for streaming"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendAnimation",
    title: "Send Animation",
    category: "Media",
    description: "Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "animation",
        type: "string",
        required: true,
        description: "Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get an animation from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of sent animation in seconds",
        placeholder: "Enter duration in seconds"
      },
      {
        name: "width",
        type: "number",
        required: false,
        description: "Animation width",
        placeholder: "Enter animation width"
      },
      {
        name: "height",
        type: "number",
        required: false,
        description: "Animation height",
        placeholder: "Enter animation height"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Animation caption, 0-1024 characters after entities parsing",
        placeholder: "Enter caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the animation caption",
        placeholder: "MarkdownV2 or HTML"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendVoice",
    title: "Send Voice",
    category: "Media",
    description: "Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "voice",
        type: "string",
        required: true,
        description: "Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get a file from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Voice message caption, 0-1024 characters after entities parsing",
        placeholder: "Enter caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the voice message caption",
        placeholder: "MarkdownV2 or HTML"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of the voice message in seconds",
        placeholder: "Enter duration in seconds"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendVideoNote",
    title: "Send Video Note",
    category: "Media",
    description: "As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "video_note",
        type: "string",
        required: true,
        description: "Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended), or pass an HTTP URL for Telegram to get a video note from the Internet.",
        placeholder: "Enter file_id or URL"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of sent video in seconds",
        placeholder: "Enter duration in seconds"
      },
      {
        name: "length",
        type: "number",
        required: false,
        description: "Video width and height",
        placeholder: "Enter video width/height"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },
  {
    name: "sendMediaGroup",
    title: "Send Media Group",
    category: "Media",
    description: "Use this method to send a group of photos, videos, documents or audios as an album.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat or username of the target channel",
        placeholder: "Enter chat ID"
      },
      {
        name: "media",
        type: "string",
        required: true,
        description: "A JSON-serialized array describing messages to be sent, must include 2-10 items",
        placeholder: "Enter media array in JSON format"
      },
       {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently. Users will receive a notification with no sound."
      }
    ]
  },

  // Advanced Chat Management Methods
  {
    name: "banChatMember",
    title: "Ban Chat Member",
    category: "Members",
    description: "Ban a user from a group, supergroup or channel",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "Enter user ID"
      },
      {
        name: "until_date",
        type: "number",
        required: false,
        description: "Date when the user will be unbanned (Unix time)",
        placeholder: "Unix timestamp (optional)"
      }
    ]
  },
  {
    name: "unbanChatMember",
    title: "Unban Chat Member",
    category: "Members",
    description: "Unban a previously banned user in a group, supergroup or channel",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "Enter user ID"
      }
    ]
  },
  {
    name: "restrictChatMember",
    title: "Restrict Chat Member",
    category: "Members",
    description: "Restrict a user in a supergroup",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "Enter user ID"
      },
      {
        name: "permissions",
        type: "string",
        required: true,
        description: "JSON object for new user permissions",
        placeholder: '{"can_send_messages": false}'
      }
    ]
  },
  {
    name: "getChatMember",
    title: "Get Chat Member",
    category: "Members",
    description: "Get information about a member of a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "Enter user ID"
      }
    ]
  },
  {
    name: "getChatAdministrators",
    title: "Get Chat Administrators",
    category: "Admin",
    description: "Get a list of administrators in a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      }
    ]
  },
  {
    name: "deleteMessage",
    title: "Delete Message",
    category: "Messages",
    description: "Delete a message",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "message_id",
        type: "number",
        required: true,
        description: "Identifier of the message to delete",
        placeholder: "Enter message ID"
      }
    ]
  },
  {
    name: "getChatMembersCount",
    title: "Get Chat Members Count",
    category: "Members",
    description: "Get the number of members in a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      }
    ]
  },
  {
    name: "setChatTitle",
    title: "Set Chat Title",
    category: "Chat Management",
    description: "Change the title of a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "New chat title, 1-255 characters",
        placeholder: "Enter new chat title"
      }
    ]
  },
  {
    name: "setChatDescription",
    title: "Set Chat Description",
    category: "Chat Management",
    description: "Change the description of a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "description",
        type: "string",
        required: true,
        description: "New chat description, 0-255 characters",
        placeholder: "Enter new description"
      }
    ]
  },
  {
    name: "kickChatMember",
    title: "Kick Chat Member",
    category: "Admin",
    description: "Kick a user from a group or a supergroup",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target group",
        placeholder: "Enter chat ID"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "Enter user ID"
      }
    ]
  },
  {
    name: "removeAllMembers",
    title: "Remove All Members",
    category: "Admin",
    description: "Remove all members from a group (requires admin rights)",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target group",
        placeholder: "Enter chat ID"
      }
    ]
  },
  {
    name: "pinChatMessage",
    title: "Pin Chat Message",
    category: "Chat Management",
    description: "Pin a message in a group, supergroup, or channel",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "message_id",
        type: "number",
        required: true,
        description: "Identifier of a message to pin",
        placeholder: "Enter message ID"
      }
    ]
  },
  {
    name: "exportChatInviteLink",
    title: "Export Chat Invite Link",
    category: "Chat Management",
    description: "Generate a new invite link for a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      }
    ]
  },
  {
    name: "setChatPhoto",
    title: "Set Chat Photo",
    category: "Chat Management",
    description: "Set a new profile photo for the chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "photo",
        type: "string",
        required: true,
        description: "New chat photo (file_id or URL)",
        placeholder: "Enter photo file_id or URL"
      }
    ]
  },
  {
    name: "sendPoll",
    title: "Send Poll",
    category: "Messages",
    description: "Send a native poll to a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "question",
        type: "string",
        required: true,
        description: "Poll question, 1-300 characters",
        placeholder: "Enter poll question"
      },
      {
        name: "options",
        type: "string",
        required: true,
        description: "List of answer options, 2-10 items (JSON array)",
        placeholder: '["Option 1", "Option 2"]'
      }
    ]
  },
  {
    name: "sendLocation",
    title: "Send Location",
    category: "Messages",
    description: "Send point on the map",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "latitude",
        type: "number",
        required: true,
        description: "Latitude of the location",
        placeholder: "Enter latitude"
      },
      {
        name: "longitude",
        type: "number",
        required: true,
        description: "Longitude of the location",
        placeholder: "Enter longitude"
      }
    ]
  },
  {
    name: "sendVenue",
    title: "Send Venue",
    category: "Messages",
    description: "Send information about a venue",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "latitude",
        type: "number",
        required: true,
        description: "Latitude of the venue",
        placeholder: "Enter latitude"
      },
      {
        name: "longitude",
        type: "number",
        required: true,
        description: "Longitude of the venue",
        placeholder: "Enter longitude"
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Name of the venue",
        placeholder: "Enter venue name"
      },
      {
        name: "address",
        type: "string",
        required: true,
        description: "Address of the venue",
        placeholder: "Enter venue address"
      }
    ]
  },
  {
    name: "sendContact",
    title: "Send Contact",
    category: "Messages",
    description: "Send phone contacts",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "phone_number",
        type: "string",
        required: true,
        description: "Contact's phone number",
        placeholder: "Enter phone number"
      },
      {
        name: "first_name",
        type: "string",
        required: true,
        description: "Contact's first name",
        placeholder: "Enter first name"
      },
      {
        name: "last_name",
        type: "string",
        required: false,
        description: "Contact's last name",
        placeholder: "Enter last name"
      }
    ]
  },
  {
    name: "sendDice",
    title: "Send Dice",
    category: "Messages",
    description: "Send a dice message",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "emoji",
        type: "string",
        required: false,
        description: "Emoji on which the dice throw animation is based",
        placeholder: "🎲, 🎯, 🏀, ⚽, 🎳, or 🎰"
      }
    ]
  },
  {
    name: "createChatInviteLink",
    title: "Create Chat Invite Link",
    category: "Chat Management",
    description: "Create an additional invite link for a chat",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "Enter chat ID"
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "Invite link name",
        placeholder: "Enter link name"
      },
      {
        name: "expire_date",
        type: "number",
        required: false,
        description: "Point in time when the link will expire",
        placeholder: "Unix timestamp"
      },
      {
        name: "member_limit",
        type: "number",
        required: false,
        description: "Maximum number of users that can be members",
        placeholder: "Enter member limit"
      }
    ]
  },

  // Webhook Methods
  {
    name: "setWebhook",
    title: "Set Webhook",
    category: "Webhooks",
    description: "Specify a URL to receive incoming updates via webhook.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "HTTPS URL to send updates to",
        placeholder: "Enter webhook URL (https://)"
      },
      {
        name: "certificate",
        type: "string",
        required: false,
        description: "Public key certificate",
        placeholder: "Upload public key certificate"
      },
      {
        name: "max_connections",
        type: "number",
        required: false,
        description: "Maximum allowed number of simultaneous HTTPS connections",
        placeholder: "Enter max connections (1-100)"
      },
      {
        name: "allowed_updates",
        type: "string",
        required: false,
        description: "List of update types to receive",
        placeholder: '["message", "edited_channel_post", "callback_query"]'
      }
    ]
  },
  {
    name: "deleteWebhook",
    title: "Delete Webhook",
    category: "Webhooks",
    description: "Remove webhook integration.",
    parameters: [
      {
        name: "drop_pending_updates",
        type: "boolean",
        required: false,
        description: "Pass True to drop all pending updates"
      }
    ]
  },
  {
    name: "getWebhookInfo",
    title: "Get Webhook Info",
    category: "Webhooks",
    description: "Get current webhook status.",
    parameters: []
  },

  // Advanced API Methods
  {
    name: "answerCallbackQuery",
    title: "Answer Callback Query",
    category: "Advanced",
    description: "Send answers to callback queries from inline keyboards.",
    parameters: [
      {
        name: "callback_query_id",
        type: "string",
        required: true,
        description: "Unique identifier for the query to be answered",
        placeholder: "Enter callback query ID"
      },
      {
        name: "text",
        type: "string",
        required: false,
        description: "Text of the notification (0-200 characters)",
        placeholder: "Enter notification text"
      },
      {
        name: "show_alert",
        type: "boolean",
        required: false,
        description: "Show as alert instead of notification"
      }
    ]
  },
  {
    name: "setChatMenuButton",
    title: "Set Chat Menu Button",
    category: "Advanced",
    description: "Change bot's menu button in private chats.",
    parameters: [
      {
        name: "menu_button",
        type: "string",
        required: true,
        description: "JSON object for the bot's new menu button",
        placeholder: '{"type": "default"}'
      }
    ]
  },
  {
    name: "getChatMenuButton",
    title: "Get Chat Menu Button",
    category: "Advanced",
    description: "Get information about the menu button set for private chats with the bot.",
    parameters: []
  }
];
