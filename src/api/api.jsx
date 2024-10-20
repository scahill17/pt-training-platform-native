const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.u_Tlz90goXHbi8Zn_zPvrZbugXL02U_6odPUwp1xSyQ';

/**
 * Helper function to handle API requests centrally.
 * @param {string} endpoint - API endpoint to hit.
 * @param {string} method - HTTP method, defaults to 'GET'.
 * @param {Object|null} body - Optional body for POST/PUT requests.
 * @returns {Promise<Object>} - Returns the parsed response or throws an error.
 */
const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${JWT_TOKEN}`,
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        console.log(`Sending ${method} request to ${API_URL}${endpoint} with body:`, body); // Log request details
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const responseBody = await response.text();

        // Log the entire response body for debugging purposes
        console.log(`Response from ${method} request to ${endpoint}:`, responseBody);

        if (!response.ok) {
            console.error(`Error response from ${method} request to ${endpoint}:`, responseBody); // Log error response body
            throw new Error(`Error API Call Failed: ${response.status}: ${response.statusText}`);
        }

        return responseBody ? JSON.parse(responseBody) : {}; // Parse JSON if present
    } catch (error) {
        console.error(`Error in ${method} request to ${endpoint}:`, error); // Log full error object
        // Throw the error upwards for handling in calling function
        throw error;
    }
};


// ------------ SIGNUP/SIGNIN ---------------- //
export const addAthlete = async (newAthlete) => {
    try {
        // Create user first
        await apiRequest('users', 'POST', {
            name: newAthlete.name,
            email: newAthlete.email,
            role: 'client',
        });

        // Retrieve the newly created user by email
        const userFetchResponse = await apiRequest(`users?email=eq.${newAthlete.email}`, 'GET');
        const userId = userFetchResponse[0]?.id;

        if (!userId) throw new Error('User ID could not be retrieved');

        // Create athlete linked to the user
        return await apiRequest('athletes', 'POST', {
            user_id: JSON.stringify(userId),
            age: newAthlete.age,
            fitness_goals: newAthlete.fitness_goals,
            medical_conditions: newAthlete.medical_conditions,
        });
    } catch (error) {
        console.error('Error adding athlete:', error);
        throw error;
    }
};

export async function checkUserEmail(email) {
    try {
        const response = await apiRequest(`users?email=eq.${email}`, 'GET');
        if (response.length > 0) {
            return response[0]; // Return the user object if email exists
        } else {
            return null; // Email not found
        }
    } catch (error) {
        console.error('Error checking email:', error);
        return null;
    }
}


// ------------ USER PROFILE ---------------- //
export const fetchUserProfile = async (userId) => {
    try {
        console.log("user id: ", userId);
        const response = await apiRequest(`athlete_details?user_id=eq.${userId}`);
        console.log("response: ", response);
        return response;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
    }
};

export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await apiRequest(`users?id=eq.${userId}`, 'PATCH', userData);
        return response;
    } catch (error) {
        console.error("Failed to update user profile:", error);
        throw error;
    }
};

export const updateAthleteProfile = async (userId, athleteData) => {
    try {
        const response = await apiRequest(`athletes?user_id=eq.${userId}`, 'PATCH', athleteData);
        return response;
    } catch (error) {
        console.error("Failed to update athlete profile:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem("loggedInUser"); // Use AsyncStorage for React Native
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};