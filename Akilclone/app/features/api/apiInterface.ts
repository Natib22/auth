interface JobData {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: string;
    startDate: string;
    endDate: string;
    deadline: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    orgID: string;
    datePosted: string;
    status: string;
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: string | null;
    perksAndBenefits: string | null;
    createdAt: string;
    updatedAt: string;
    orgPrimaryPhone: string;
    orgEmail: string;
    average_rating: number;
    total_reviews: number;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: JobData[];
}

interface ApiResponseById {
    success: boolean;
    message: string;
    data: JobData;
}


interface LoginApiResponse {
    success: boolean;
    message: string;
    data: UserData;
    errors: any; // You can define a more specific type if you know the structure of errors
    count: number;
}

interface UserData {
    id: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
    profilePicUrl: string;
    role: string;
    profileComplete: boolean;
    profileStatus: string;
}

interface BookmarkData {
    success: boolean;
    message: string;
    data: BookmarkItem[];
    errors: any; // Adjust the type if you know the structure of errors
    count: number;
}

interface BookmarkItem {
    eventID: string;
    title: string;
    opType: string;
    orgName: string;
    datePosted: string; // Consider using Date type if you prefer
    dateBookmarked: string; // Consider using Date type if you prefer
    logoUrl: string;
    location: string;
}


export default ApiResponse

export type { JobData , ApiResponse, LoginApiResponse, UserData , ApiResponseById , BookmarkData }