import axios from 'axios';

const baseURL = 'https://auth-portal-2com.onrender.com/trpc';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface UserData {
  registrationNumber: string;
  password: string;
  name: string;
  facultyName: string;
  semester: string;
  emailId: string;
  department: string;
  UG_OR_PG: string;
  mobile_number: number;
  Gender: string;
  DOB: string;
  Specialization: string;
  SRMIST_Mail_ID: string;
  alternate_number: number;
  Section: string;
  placementIssue?: string;
}

interface AdminData {
  registrationNumber: string;
  password: string;
  role: string;
}

interface Credentials {
  registrationNumber: string;
  password: string;
}


interface PlacementIssueData {
  registrationNumber: string;
  issue: string;
}

export const registerUser = async (userData: UserData) => {
  const response = await api.post('/registerUser', userData);
  return response.data;
};

export const loginUser = async (credentials: Credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const registerAdmin = async (adminData: AdminData) => {
  const response = await api.post('/registerAdmin', adminData);
  return response.data;
};

export const loginAdmin = async (credentials: Credentials) => {
  const response = await api.post('/adminLogin', credentials);
  return response.data;
};

export const readPlacementIssues = async (token: string) => {
  try {
    const response = await axios.get(`${baseURL}/readPlacementIssues`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; 
    } else {
      console.log('Unexpected response structure:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching placement issues:', error);
    throw error;
  }
};


export const commentOnIssue = async (token: string, { issueId, registrationNumber, comment }: { issueId: string, registrationNumber: string, comment: string }) => {
  try {
    const response = await axios.post(`${baseURL}/commentOnIssue`, {
      issueId,            
      registrationNumber,  
      comment
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
  }
};

// Updated resolveIssue to use both issueId and registrationNumber
export const resolveIssue = async (token: string, { issueId, registrationNumber }: { issueId: string, registrationNumber: string }) => {
  try {
    const response = await axios.post(`${baseURL}/resolveIssue`, {
      issueId,             // Use issueId for the issue
      registrationNumber   // Include registrationNumber
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
  }
};

export const postPlacementIssue = async (token: string, issueData: PlacementIssueData) => {
  const response = await api.post('/postPlacementIssue', issueData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const readUserProfile = async (token: string, registrationNumber: string) => {
  const response = await api.get('/getUserDetails', {
    params: {
      input: JSON.stringify({
        registrationNumber,
      }),
    },
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  return response.data;
};                                                                                                                  
