const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Helper function to remove auth token
const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};

// Generic fetch function with error handling
const fetchAPI = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// User API
export const userAPI = {
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const response = await fetchAPI('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  },

  login: async (email: string, password: string) => {
    const response = await fetchAPI('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  getCurrentUser: async () => {
    return await fetchAPI('/users/view_current_user');
  },

  logout: () => {
    removeAuthToken();
  },
};

// Document API
export const documentAPI = {
  upload: async (
    file: File,
    documentType: string,
    userId?: string,
    fanIdId?: string
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    if (userId) formData.append('userId', userId);
    if (fanIdId) formData.append('fanIdId', fanIdId);

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },

  getDocuments: async (fanId: string) => {
    return await fetchAPI(`/documents/${fanId}`);
  },

  getDocumentFile: (documentId: string): string => {
    return `${API_BASE_URL}/documents/file/${documentId}`;
  },

  delete: async (documentId: string) => {
    return await fetchAPI(`/documents/${documentId}`, {
      method: 'DELETE',
    });
  },
};

// Fan ID API
export const fanIdAPI = {
  apply: async (applicationData: {
    userId?: string;
    profile: string;
    personalInfo: {
      firstName: string;
      lastName: string;
      nationality: string;
      dateOfBirth: string;
      passportNumber: string;
    };
    documents: {
      passport?: string;
      classicVisa?: string;
      eVisa?: string;
      entryStampImage?: string;
      entryDate?: string;
      expiredCNIE?: string;
      passportOrReceipt?: string;
    };
  }) => {
    return await fetchAPI('/fanid/apply', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  validate: async (fanIdNumber: string) => {
    return await fetchAPI('/fanid/validate', {
      method: 'POST',
      body: JSON.stringify({ fanIdNumber }),
    });
  },

  get: async (fanIdId: string) => {
    return await fetchAPI(`/fanid/${fanIdId}`);
  },

  getUserFanIds: async (userId: string) => {
    return await fetchAPI(`/fanid/user/${userId}`);
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };

