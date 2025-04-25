
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
      },
      {
        name: "disable_web_page_preview",
        type: "boolean",
        required: false,
        description: "Disables link previews for links in this message",
        placeholder: "false"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      },
      {
        name: "reply_to_message_id",
        type: "number",
        required: false,
        description: "If the message is a reply, ID of the original message",
        placeholder: "12345"
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
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Messages"
  },
  {
    name: "copyMessage",
    title: "Copy Message",
    description: "Use this method to copy messages of any kind.",
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
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "New caption for media",
        placeholder: "New caption"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the new caption",
        placeholder: "HTML"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
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
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the caption",
        placeholder: "HTML"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
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
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the caption",
        placeholder: "HTML"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of the audio in seconds",
        placeholder: "60"
      },
      {
        name: "performer",
        type: "string",
        required: false,
        description: "Performer of the audio",
        placeholder: "Artist Name"
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Title of the audio",
        placeholder: "Song Title"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Media"
  },
  {
    name: "sendDocument",
    title: "Send Document",
    description: "Use this method to send general files.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "document",
        type: "string",
        required: true,
        description: "File to send (file_id or URL)",
        placeholder: "https://example.com/document.pdf"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Document caption",
        placeholder: "Important document"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the caption",
        placeholder: "HTML"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Media"
  },
  {
    name: "sendVideo",
    title: "Send Video",
    description: "Use this method to send videos.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "video",
        type: "string",
        required: true,
        description: "Video to send (file_id or URL)",
        placeholder: "https://example.com/video.mp4"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Video caption",
        placeholder: "Check out this video"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the caption",
        placeholder: "HTML"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of the video in seconds",
        placeholder: "30"
      },
      {
        name: "width",
        type: "number",
        required: false,
        description: "Video width",
        placeholder: "1280"
      },
      {
        name: "height",
        type: "number",
        required: false,
        description: "Video height",
        placeholder: "720"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Media"
  },
  {
    name: "sendVoice",
    title: "Send Voice",
    description: "Use this method to send audio files as voice messages.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "voice",
        type: "string",
        required: true,
        description: "Audio file to send (file_id or URL)",
        placeholder: "https://example.com/voice.ogg"
      },
      {
        name: "caption",
        type: "string",
        required: false,
        description: "Voice message caption",
        placeholder: "Voice message"
      },
      {
        name: "parse_mode",
        type: "string",
        required: false,
        description: "Mode for parsing entities in the caption",
        placeholder: "HTML"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "Duration of the voice message in seconds",
        placeholder: "10"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Media"
  },
  {
    name: "sendLocation",
    title: "Send Location",
    description: "Use this method to send point on the map.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "latitude",
        type: "number",
        required: true,
        description: "Latitude of the location",
        placeholder: "40.7128"
      },
      {
        name: "longitude",
        type: "number",
        required: true,
        description: "Longitude of the location",
        placeholder: "-74.0060"
      },
      {
        name: "live_period",
        type: "number",
        required: false,
        description: "Period in seconds for which the location will be updated",
        placeholder: "60"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Messages"
  },
  {
    name: "sendVenue",
    title: "Send Venue",
    description: "Use this method to send information about a venue.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "latitude",
        type: "number",
        required: true,
        description: "Latitude of the venue",
        placeholder: "40.7128"
      },
      {
        name: "longitude",
        type: "number",
        required: true,
        description: "Longitude of the venue",
        placeholder: "-74.0060"
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Name of the venue",
        placeholder: "Empire State Building"
      },
      {
        name: "address",
        type: "string",
        required: true,
        description: "Address of the venue",
        placeholder: "350 Fifth Avenue, New York, NY 10118"
      },
      {
        name: "foursquare_id",
        type: "string",
        required: false,
        description: "Foursquare identifier of the venue",
        placeholder: "4bf58dd8d48988d1ed931735"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Messages"
  },
  {
    name: "sendContact",
    title: "Send Contact",
    description: "Use this method to send phone contacts.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "phone_number",
        type: "string",
        required: true,
        description: "Contact's phone number",
        placeholder: "+1234567890"
      },
      {
        name: "first_name",
        type: "string",
        required: true,
        description: "Contact's first name",
        placeholder: "John"
      },
      {
        name: "last_name",
        type: "string",
        required: false,
        description: "Contact's last name",
        placeholder: "Doe"
      },
      {
        name: "vcard",
        type: "string",
        required: false,
        description: "Additional data about the contact in the form of a vCard",
        placeholder: "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL;TYPE=CELL:+1234567890\nEND:VCARD"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Messages"
  },
  {
    name: "sendPoll",
    title: "Send Poll",
    description: "Use this method to send a native poll.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "question",
        type: "string",
        required: true,
        description: "Poll question, 1-300 characters",
        placeholder: "What's your favorite color?"
      },
      {
        name: "options",
        type: "string",
        required: true,
        description: "List of answer options, 2-10 items (comma separated)",
        placeholder: "Red,Green,Blue"
      },
      {
        name: "is_anonymous",
        type: "boolean",
        required: false,
        description: "True if the poll needs to be anonymous",
        placeholder: "true"
      },
      {
        name: "type",
        type: "string",
        required: false,
        description: "Poll type, 'quiz' or 'regular'",
        placeholder: "regular"
      },
      {
        name: "allows_multiple_answers",
        type: "boolean",
        required: false,
        description: "True if the poll allows multiple answers",
        placeholder: "false"
      },
      {
        name: "correct_option_id",
        type: "number",
        required: false,
        description: "0-based identifier of the correct answer option (for quizzes)",
        placeholder: "0"
      },
      {
        name: "disable_notification",
        type: "boolean",
        required: false,
        description: "Sends the message silently",
        placeholder: "false"
      }
    ],
    category: "Messages"
  },
  {
    name: "sendChatAction",
    title: "Send Chat Action",
    description: "Use this method when you need to tell the user that something is happening on the bot's side.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "123456789"
      },
      {
        name: "action",
        type: "string",
        required: true,
        description: "Type of action to broadcast (typing, upload_photo, record_video, upload_video, record_voice, upload_voice, upload_document, choose_sticker, find_location, record_video_note, upload_video_note)",
        placeholder: "typing"
      }
    ],
    category: "Chat"
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
    name: "getFile",
    title: "Get File",
    description: "Use this method to get basic info about a file and prepare it for downloading.",
    parameters: [
      {
        name: "file_id",
        type: "string",
        required: true,
        description: "File identifier to get info about",
        placeholder: "BQADAgADq4cXAAECCQdc4YMXnY1k6QI"
      }
    ],
    category: "Files"
  },
  {
    name: "kickChatMember",
    title: "Kick Chat Member",
    description: "Use this method to kick a user from a group, supergroup or channel.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "123456789"
      },
      {
        name: "until_date",
        type: "number",
        required: false,
        description: "Date when the user will be unbanned (unix time)",
        placeholder: "1622505600"
      }
    ],
    category: "Admin"
  },
  {
    name: "unbanChatMember",
    title: "Unban Chat Member",
    description: "Use this method to unban a previously kicked user in a supergroup or channel.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "123456789"
      }
    ],
    category: "Admin"
  },
  {
    name: "restrictChatMember",
    title: "Restrict Chat Member",
    description: "Use this method to restrict a user in a supergroup.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "123456789"
      },
      {
        name: "permissions",
        type: "string",
        required: true,
        description: "JSON-serialized object for new user permissions",
        placeholder: '{"can_send_messages": true, "can_send_media_messages": true}'
      },
      {
        name: "until_date",
        type: "number",
        required: false,
        description: "Date when restrictions will be lifted (unix time)",
        placeholder: "1622505600"
      }
    ],
    category: "Admin"
  },
  {
    name: "promoteChatMember",
    title: "Promote Chat Member",
    description: "Use this method to promote or demote a user in a supergroup or channel.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "123456789"
      },
      {
        name: "is_anonymous",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator's presence in the chat is hidden",
        placeholder: "false"
      },
      {
        name: "can_change_info",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can change chat title, photo and other settings",
        placeholder: "false"
      },
      {
        name: "can_post_messages",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can create channel posts",
        placeholder: "false"
      },
      {
        name: "can_edit_messages",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can edit messages of other users",
        placeholder: "false"
      },
      {
        name: "can_delete_messages",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can delete messages of other users",
        placeholder: "false"
      },
      {
        name: "can_invite_users",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can invite new users to the chat",
        placeholder: "false"
      },
      {
        name: "can_restrict_members",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can restrict, ban or unban chat members",
        placeholder: "false"
      },
      {
        name: "can_pin_messages",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can pin messages",
        placeholder: "false"
      },
      {
        name: "can_promote_members",
        type: "boolean",
        required: false,
        description: "Pass True if the administrator can add new administrators",
        placeholder: "false"
      }
    ],
    category: "Admin"
  },
  {
    name: "setChatPermissions",
    title: "Set Chat Permissions",
    description: "Use this method to set default chat permissions for all members.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "permissions",
        type: "string",
        required: true,
        description: "JSON-serialized object for new default chat permissions",
        placeholder: '{"can_send_messages": true, "can_send_media_messages": true}'
      }
    ],
    category: "Admin"
  },
  {
    name: "getChatAdministrators",
    title: "Get Chat Administrators",
    description: "Use this method to get a list of administrators in a chat.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      }
    ],
    category: "Chat"
  },
  {
    name: "getChatMemberCount",
    title: "Get Chat Member Count",
    description: "Use this method to get the number of members in a chat.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      }
    ],
    category: "Chat"
  },
  {
    name: "getChatMember",
    title: "Get Chat Member",
    description: "Use this method to get information about a member of a chat.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "user_id",
        type: "number",
        required: true,
        description: "Unique identifier of the target user",
        placeholder: "123456789"
      }
    ],
    category: "Chat"
  },
  {
    name: "setChatStickerSet",
    title: "Set Chat Sticker Set",
    description: "Use this method to set a new group sticker set for a supergroup.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      },
      {
        name: "sticker_set_name",
        type: "string",
        required: true,
        description: "Name of the sticker set to be set as the group sticker set",
        placeholder: "animals"
      }
    ],
    category: "Chat"
  },
  {
    name: "deleteChatStickerSet",
    title: "Delete Chat Sticker Set",
    description: "Use this method to delete a group sticker set from a supergroup.",
    parameters: [
      {
        name: "chat_id",
        type: "string",
        required: true,
        description: "Unique identifier for the target chat",
        placeholder: "-100123456789"
      }
    ],
    category: "Chat"
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
        name: "certificate",
        type: "string",
        required: false,
        description: "Public key certificate (for self-signed certificates)",
        placeholder: "-----BEGIN CERTIFICATE-----..."
      },
      {
        name: "max_connections",
        type: "number",
        required: false,
        description: "Maximum allowed number of simultaneous HTTPS connections to the webhook",
        placeholder: "40"
      },
      {
        name: "allowed_updates",
        type: "string",
        required: false,
        description: "JSON-serialized list of the update types you want your bot to receive",
        placeholder: '["message", "edited_channel_post", "callback_query"]'
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
  },
  {
    name: "answerCallbackQuery",
    title: "Answer Callback Query",
    description: "Use this method to send answers to callback queries sent from inline keyboards.",
    parameters: [
      {
        name: "callback_query_id",
        type: "string",
        required: true,
        description: "Unique identifier for the query to be answered",
        placeholder: "1234567890"
      },
      {
        name: "text",
        type: "string",
        required: false,
        description: "Text of the notification (0-200 characters)",
        placeholder: "Thanks for the feedback!"
      },
      {
        name: "show_alert",
        type: "boolean",
        required: false,
        description: "If true, an alert will be shown by the client instead of a notification",
        placeholder: "false"
      },
      {
        name: "url",
        type: "string",
        required: false,
        description: "URL that will be opened by the user's client",
        placeholder: "https://example.com"
      },
      {
        name: "cache_time",
        type: "number",
        required: false,
        description: "The maximum amount of time in seconds the result can be cached",
        placeholder: "300"
      }
    ],
    category: "Inline"
  },
  {
    name: "answerInlineQuery",
    title: "Answer Inline Query",
    description: "Use this method to send answers to an inline query.",
    parameters: [
      {
        name: "inline_query_id",
        type: "string",
        required: true,
        description: "Unique identifier for the answered query",
        placeholder: "1234567890"
      },
      {
        name: "results",
        type: "string",
        required: true,
        description: "JSON-serialized array of results for the inline query",
        placeholder: '[{"type": "article", "id": "1", "title": "Title", "input_message_content": {"message_text": "Text"}}]'
      },
      {
        name: "cache_time",
        type: "number",
        required: false,
        description: "The maximum amount of time the result can be cached, in seconds",
        placeholder: "300"
      },
      {
        name: "is_personal",
        type: "boolean",
        required: false,
        description: "Pass True if results may be cached on the server side only for the user that sent the query",
        placeholder: "false"
      },
      {
        name: "next_offset",
        type: "string",
        required: false,
        description: "Pass the offset that a client should send in the next query with the same text",
        placeholder: "2"
      },
      {
        name: "switch_pm_text",
        type: "string",
        required: false,
        description: "If passed, clients will display a button with this text that switches the user to a private chat with the bot",
        placeholder: "Start bot"
      },
      {
        name: "switch_pm_parameter",
        type: "string",
        required: false,
        description: "Deep-linking parameter for the /start message sent to the bot when user presses the switch button",
        placeholder: "start_payload"
      }
    ],
    category: "Inline"
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
