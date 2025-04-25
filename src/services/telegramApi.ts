
interface TelegramApiParams {
  [key: string]: string | number | boolean | undefined;
}

export type ApiResponse = {
  status: number;
  ok?: boolean;
  result?: any;
  description?: string;
  error?: string;
  timestamp: number;
};

export async function callTelegramApi(
  token: string,
  method: string,
  params: TelegramApiParams
): Promise<ApiResponse> {
  // Validate token format first
  if (!token || !token.match(/^\d+:[A-Za-z0-9_-]+$/)) {
    return {
      status: 400,
      error: "Invalid bot token format",
      timestamp: Date.now(),
    };
  }

  // Remove undefined values from params
  const cleanParams: TelegramApiParams = {};
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== "") {
      cleanParams[key] = params[key];
    }
  });

  const url = `https://api.telegram.org/bot${token}/${method}`;

  try {
    // Start timestamp for measuring request duration
    const startTime = Date.now();
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: Object.keys(cleanParams).length > 0 ? JSON.stringify(cleanParams) : undefined,
    });

    const data = await response.json();
    
    // Return the response with status code and timestamp
    return {
      status: response.status,
      ...data,
      timestamp: startTime,
    };
  } catch (error) {
    console.error("API call error:", error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: Date.now(),
    };
  }
}

export function validateBotToken(token: string): boolean {
  return !!token.match(/^\d+:[A-Za-z0-9_-]+$/);
}

// Test the bot token by calling getMe
export async function testBotToken(token: string): Promise<boolean> {
  try {
    const response = await callTelegramApi(token, "getMe", {});
    return response.ok === true;
  } catch (error) {
    return false;
  }
}
