export const API_CATEGORIES = [
  "Basic",
  "Messages",
  "Chat Management",
  "Media",
  "Admin",
  "Members",
  "Advanced",
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
  }
];
