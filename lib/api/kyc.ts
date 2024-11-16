import ky from "ky";

export enum KycStatus {
  NOT_STARTED = "not_started",
  APPROVED = "approved",
  REJECTED = "rejected",
  PENDING = "pending",
  INCOMPLETE = "incomplete",
  AWAITING_UBO = "awaiting_ubo",
  MANUAL_REVIEW = "manual_review",
  UNDER_REVIEW = "under_review",
}

export enum TosStatus {
  PENDING = "pending",
  APPROVED = "approved",
}

export interface KycLinkResponse {
  id: string;
  email: string;
  type: "business";
  kycLink: string;
  tosLink: string;
  kycStatus: KycStatus;
  tosStatus: TosStatus;
  createdAt: string; // ISO 8601 date string
  customerId?: string;
}

/**
 * @dev get a new kyc link
 * @returns {Promise<KycLinkResponse>} the kyc link response from server
 */
export const getNewKYCLink = async ({
  data: { fullName, address, city, postalCode, country },
  token,
}: {
  token: string;
  data: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}): Promise<KycLinkResponse> =>
  ky
    .post(`${process.env.EXPO_PUBLIC_BASE_API}/v1/kyc`, {
      json: {
        fullName: fullName,
        address,
        city,
        postalCode: postalCode,
        country,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<KycLinkResponse>();

/**
 * @dev get a kyc link, used to check status
 * @returns {Promise<KycLinkResponse>} the kyc link response from server
 */
export const getKYCLink = async ({
  token,
}: {
  token: string;
}): Promise<KycLinkResponse> =>
  ky
    .get(`${process.env.EXPO_PUBLIC_BASE_API}/v1/kyc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<KycLinkResponse>();
