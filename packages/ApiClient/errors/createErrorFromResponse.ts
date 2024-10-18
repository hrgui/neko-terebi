export class ResponseError extends Error {
  status?: number;
  data?: string;
  json?: object;
  scriptError?: Error;

  constructor(message: string) {
    super(message);
    this.name = "ResponseError";
  }
}

export async function createErrorFromResponse(response: Response) {
  const error = new ResponseError(`HTTP error: ${response.status} ${response.statusText}`);
  error.status = response.status;

  // Try to parse the response as JSON if possible
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      error.json = await response.json();
    } else {
      error.data = await response.text();
    }
  } catch (e) {
    error.scriptError = e as Error;
    error.data = `Failed to parse response body: ${e}`;
  }

  return error;
}
