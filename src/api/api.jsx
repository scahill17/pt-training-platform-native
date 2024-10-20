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

// ------------ COMMON ---------------- //
export const fetchAthleteId = async (userId) => {
    try {
        const response = await apiRequest(`athletes?user_id=eq.${userId}`, 'GET');
        if (response.length === 0) {
            throw new Error(`No athlete found for user_id: ${userId}`);
        }
        return response[0].id; // Assuming the 'id' is the athlete ID
    } catch (error) {
        console.error('Error fetching athlete ID:', error);
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
        await AsyncStorage.removeItem("loggedInUser");
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};


// ------------ TRAINING SCREEN ---------------- //
// Fetches workout sessions for a specific athlete
export const fetchWorkoutSessions = async (athleteId) => apiRequest(`workout_sessions?athlete_id=eq.${athleteId}`, 'GET');

// Deletes a workout session
export const deleteWorkoutSession = async (athleteId, date) => {
    try {
        await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'DELETE');
        console.log(`Workout session for athlete ${athleteId} on ${date} deleted.`);
    } catch (error) {
        console.error('Error deleting workout session:', error);
        throw error;
    }
};

// Fetches full workout session details including exercises and sets
export const fetchWorkoutSessionDetails = async (athleteId, date) => {
    try {
        const sessionResponse = await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'GET');
        if (!sessionResponse || sessionResponse.length === 0) throw new Error('Workout session not found');

        const sessionId = sessionResponse[0].id;

        const detailsResponse = await apiRequest(`workout_details?workout_session_id=eq.${sessionId}`, 'GET');

        const exercises = await Promise.all(detailsResponse.map(async (detail) => {
            const exerciseResponse = await apiRequest(`exercises?id=eq.${detail.exercise_id}`, 'GET');
            const setsResponse = await apiRequest(`workout_sets?workout_detail_id=eq.${detail.id}`, 'GET');

            return {
                name: exerciseResponse[0].name,
                instructions: detail.instructions,
                sets: setsResponse.length,
                reps: setsResponse.map(set => set.reps),
                weight: setsResponse.map(set => set.weight),
            };
        }));

        return { id: sessionId, exercises };
    } catch (error) {
        console.error('Error fetching workout session details:', error);
        throw error;
    }
};

// Fetches available exercises
export const fetchExercises = async () => apiRequest('exercises', 'GET');

// Fetch the exercise ID by name
export const fetchExerciseId = async (exerciseName) => {
    try {
      const exerciseFetch = await apiRequest(`exercises?name=eq.${exerciseName}`, 'GET');
      const exerciseId = exerciseFetch[0]?.id;
      console.log("exercise name: ", exerciseName);
      console.log("exercise id: ", exerciseId);
      if (!exerciseId) throw new Error(`Exercise ID not found for ${exerciseName}`);
      return exerciseId; // Return the exercise ID
    } catch (error) {
      console.error('Error fetching exercise ID:', error);
      throw error;
    }
  };

// Adds a new exercise
export const addNewExercise = async (exerciseName) => apiRequest('exercises', 'POST', { name: exerciseName });

// Create a workout session
export const saveWorkoutSession = async (athleteId, date) => {
    try {
      // Ensure athleteId is an integer and date is a string
      const requestBody = {
        athlete_id: athleteId,  // athleteId should be an integer
        date: date              // date should be a string
      };
  
      // Create workout session
      const response = await apiRequest('workout_sessions', 'POST', requestBody);
      
      // Fetch session ID by athlete_id and date
      const sessionFetch = await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'GET');
      const sessionId = sessionFetch[0]?.id;
  
      if (!sessionId) throw new Error('Session ID not found after session creation.');
      return sessionId; // Return the session ID
    } catch (error) {
      console.error('Error creating workout session:', error);
      throw error;
    }
  };  
  
  // Save workout details and sets
  export const saveWorkoutDetails = async (exerciseData) => {
    try {
      const { workout_session_id, exercise_id, instructions, sets, reps, weight } = exerciseData;
  
      // Insert workout details
      const workoutDetailsResponse = await apiRequest('workout_details', 'POST', {
        workout_session_id,
        exercise_id,
        instructions
      });
  
      // Fetch workout detail ID after creation
      const workoutDetailFetch = await apiRequest(`workout_details?workout_session_id=eq.${workout_session_id}&exercise_id=eq.${exercise_id}`, 'GET');
      const workoutDetailId = workoutDetailFetch[0]?.id;
  
      if (!workoutDetailId) throw new Error('Workout Detail ID not found');
  
      // Insert sets for each exercise
      for (let i = 0; i < sets; i++) {
        await apiRequest('workout_sets', 'POST', {
          workout_detail_id: workoutDetailId,
          set_number: i + 1,
          reps: reps[i],
          weight: weight[i],
        });
      }
    } catch (error) {
      console.error('Error saving workout details and sets:', error);
      throw error;
    }
  };
  
  // Add this API function to your API calls file
export const fetchWorkoutSessionId = async (athleteID, date) => {
    try {
      const response = await apiRequest(`workout_sessions?athlete_id=eq.${athleteID}&date=eq.${date}`, 'GET');
      if (response && response.length > 0) {
        return response[0].id; // Assuming the ID is in the first element of the response array
      } else {
        throw new Error('Workout session not found.');
      }
    } catch (error) {
      console.error('Error fetching workout session ID:', error);
      throw error;
    }
  };
  