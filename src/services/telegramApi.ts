interface TelegramApiParams {
  [key: string]: string | number | boolean | object | undefined;
}

export type ApiResponse = {
  status: number;
  ok?: boolean;
  result?: any;
  description?: string;
  error?: string;
  timestamp: number;
  requestDuration?: number;
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

  // Remove undefined values from params and handle complex params
  const cleanParams: TelegramApiParams = {};
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== "") {
      // Handle JSON string parameters
      if (typeof params[key] === 'string') {
        const strValue = params[key] as string;
        if (
          (strValue.startsWith('{') && strValue.endsWith('}')) || 
          (strValue.startsWith('[') && strValue.endsWith(']'))
        ) {
          try {
            cleanParams[key] = JSON.parse(strValue);
          } catch (e) {
            cleanParams[key] = params[key];
          }
        } else {
          cleanParams[key] = params[key];
        }
      } else {
        cleanParams[key] = params[key];
      }
    }
  });

  const url = `https://api.telegram.org/bot${token}/${method}`;
  
  console.log(`Calling ${method} with params:`, cleanParams);

  try {
    // Start timestamp for measuring request duration
    const startTime = Date.now();
    
    // Check if we need to upload files (not implemented in this version)
    const hasFiles = false; // Placeholder for future file upload support
    
    let response;
    if (!hasFiles) {
      // Use JSON for non-file requests
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: Object.keys(cleanParams).length > 0 ? JSON.stringify(cleanParams) : undefined,
      });
    } else {
      // This would be the place to implement file uploads in the future
      throw new Error("File uploads not yet supported");
    }

    const data = await response.json();
    const endTime = Date.now();
    const requestDuration = endTime - startTime;
    
    // Make sure to capture and return the complete response
    console.log("API Response:", data);
    
    // Return the response with status code, timestamp, and duration
    return {
      status: response.status,
      ...data,
      timestamp: startTime,
      requestDuration,
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

// Helper function to format parameters for webhook methods
export function formatWebhookParams(params: TelegramApiParams): TelegramApiParams {
  const formattedParams = {...params};
  
  // Handle allowed_updates array
  if (typeof formattedParams.allowed_updates === 'string') {
    try {
      formattedParams.allowed_updates = JSON.parse(formattedParams.allowed_updates as string);
    } catch (e) {
      // If parsing fails, keep as string
    }
  }
  
  return formattedParams;
}
