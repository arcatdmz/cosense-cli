export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly body: string;

  constructor(params: {
    status: number;
    statusText: string;
    url: string;
    body: string;
  }) {
    super(
      `HTTP ${params.status} ${params.statusText}\n${params.url}\n${params.body.slice(0, 500)}`
    );
    this.name = 'HttpError';
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.body = params.body;
  }
}

interface RequestOptions {
  serviceAccount?: string;
}

export const requestJson = async (
  url: string,
  options?: RequestOptions
): Promise<unknown> => {
  const headers: Record<string, string> = {};
  if (options?.serviceAccount) {
    headers['x-service-account-access-key'] = options.serviceAccount;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new HttpError({
      status: res.status,
      statusText: res.statusText,
      url,
      body
    });
  }
  return res.json();
};
