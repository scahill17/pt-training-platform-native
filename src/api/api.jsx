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

/**
 * Fetches athlete ID by user ID.
 * @param {number} userId - User ID to fetch athlete ID for.
 * @returns {Promise<number>} - Athlete ID.
 */
export const fetchAthleteId = async (userId) => {
  try {
    const response = await apiRequest(`athletes?user_id=eq.${userId}`, 'GET');
    if (response.length === 0) throw new Error(`No athlete found for user_id: ${userId}`);
    return response[0].id;
  } catch (error) {
    console.error('Error fetching athlete ID:', error);
    throw error;
  }
};

// ------------ SIGNUP/SIGNIN ---------------- //

/**
 * Adds a new athlete by creating a user and linking athlete data.
 * @param {Object} newAthlete - New athlete details.
 * @returns {Promise<Object>} - Athlete creation response.
 */
export const addAthlete = async (newAthlete) => {
  try {
    // Create user first
    await apiRequest('users', 'POST', { name: newAthlete.name, email: newAthlete.email, role: 'client' });

    // Retrieve the newly created user by email
    const userFetchResponse = await apiRequest(`users?email=eq.${newAthlete.email}`, 'GET');
    const userId = userFetchResponse[0]?.id;
    if (!userId) throw new Error('User ID could not be retrieved');

    // Create athlete linked to the user
    return await apiRequest('athletes', 'POST', {
      user_id: userId,
      age: newAthlete.age,
      fitness_goals: newAthlete.fitness_goals,
      medical_conditions: newAthlete.medical_conditions,
    });
  } catch (error) {
    console.error('Error adding athlete:', error);
    throw error;
  }
};

/**
 * Checks if a user email already exists in the system.
 * @param {string} email - Email to check.
 * @returns {Promise<Object|null>} - User object if email exists, null otherwise.
 */
export const checkUserEmail = async (email) => {
  try {
    const response = await apiRequest(`users?email=eq.${email}`, 'GET');
    return response.length > 0 ? response[0] : null; // Return the user object if email exists otherwise email not found
  } catch (error) {
    console.error('Error checking email:', error);
    return null;
  }
};

// ------------ USER PROFILE ---------------- //

/**
 * Fetches user profile based on user ID.
 * @param {number} userId - ID of the user.
 * @returns {Promise<Object>} - User profile data.
 */
export const fetchUserProfile = async (userId) => {
  try {
    const response = await apiRequest(`athlete_details?user_id=eq.${userId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

/**
 * Updates user profile data.
 * @param {number} userId - User ID.
 * @param {Object} userData - Data to update.
 * @returns {Promise<Object>} - Update response.
 */
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await apiRequest(`users?id=eq.${userId}`, 'PATCH', userData);
    return response;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};

/**
 * Updates athlete profile data.
 * @param {number} userId - User ID.
 * @param {Object} athleteData - Data to update.
 * @returns {Promise<Object>} - Update response.
 */
export const updateAthleteProfile = async (userId, athleteData) => {
  try {
    const response = await apiRequest(`athletes?user_id=eq.${userId}`, 'PATCH', athleteData);
    return response;
  } catch (error) {
    console.error("Failed to update athlete profile:", error);
    throw error;
  }
};

// ------------ TRAINING SCREEN ---------------- //

/**
 * Fetches workout sessions for a specific athlete.
 * @param {number} athleteId - Athlete ID.
 * @returns {Promise<Array>} - List of workout sessions.
 */
export const fetchWorkoutSessions = async (athleteId) => {
  return apiRequest(`workout_sessions?athlete_id=eq.${athleteId}`, 'GET');
};

/**
 * Fetches current workout session details for an athlete at a specific date.
 * @param {number} athleteId - Athlete ID.
 * @param {string} date - Date for the session.
 * @returns {Promise<Object>} - Workout session details.
 */
export const fetchCurrentWorkoutSession = async (athleteId, date) => {
  try {
    const response = await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error fetching workout session:', error);
    throw error;
  }
};

/**
 * Deletes a specific workout session.
 * @param {number} athleteId - Athlete ID.
 * @param {string} date - Date of the session to delete.
 */
export const deleteWorkoutSession = async (athleteId, date) => {
  try {
    await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting workout session:', error);
    throw error;
  }
};

/**
 * Fetches detailed workout session information, including exercises, sets, reps, and weight.
 * @param {number} athleteId - Athlete ID.
 * @param {string} date - Date of the session.
 * @returns {Promise<Object>} - Detailed workout session information.
 */
export const fetchWorkoutSessionDetails = async (athleteId, date) => {
  try {
    const sessionResponse = await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'GET');

    // If no session is found, return null instead of throwing an error
    if (!sessionResponse || sessionResponse.length === 0) return null;

    const sessionId = sessionResponse[0].id;

    // Get details for workout session
    const detailsResponse = await apiRequest(`workout_details?workout_session_id=eq.${sessionId}`, 'GET');

    const exercises = await Promise.all(detailsResponse.map(async (detail) => {
      const exerciseResponse = await apiRequest(`exercises?id=eq.${detail.exercise_id}`, 'GET');
      const setsResponse = await apiRequest(`workout_sets?workout_detail_id=eq.${detail.id}`, 'GET');

      return {
        name: exerciseResponse[0].name,
        instructions: detail.instructions,
        sets: setsResponse.length,
        reps: setsResponse.map(set => String(set.reps)),
        weight: setsResponse.map(set => String(set.weight)),
      };
    }));

    return { id: sessionId, exercises };
  } catch (error) {
    console.error('Error fetching workout session details:', error);
    throw error;
  }
};

// ------------ WORKOUT MANAGEMENT ---------------- //

/**
 * Fetches all available exercises.
 * @returns {Promise<Array>} - List of exercises.
 */
export const fetchExercises = async () => {
  return apiRequest('exercises', 'GET');
};

/**
 * Adds a new exercise to the system.
 * @param {string} exerciseName - Name of the new exercise.
 * @returns {Promise<Object>} - New exercise creation response.
 */
export const addNewExercise = async (exerciseName) => {
  return apiRequest('exercises', 'POST', { name: exerciseName });
};

/**
 * Retrieves exercise ID based on exercise name.
 * @param {string} exerciseName - Name of the exercise.
 * @returns {Promise<number>} - ID of the exercise.
 */
export const fetchExerciseId = async (exerciseName) => {
  try {
    const exerciseFetch = await apiRequest(`exercises?name=eq.${exerciseName}`, 'GET');
    const exerciseId = exerciseFetch[0]?.id;
    if (!exerciseId) throw new Error(`Exercise ID not found for ${exerciseName}`);
    return exerciseId;
  } catch (error) {
    console.error('Error fetching exercise ID:', error);
    throw error;
  }
};

/**
 * Saves a workout session for an athlete.
 * @param {number} athleteId - Athlete ID.
 * @param {string} date - Date of the workout session.
 * @param {string} completed - Completion status, default 'N'.
 * @returns {Promise<number>} - ID of the created workout session.
 */
export const saveWorkoutSession = async (athleteId, date, completed = 'N') => {
  try {
    // Ensure athleteId is an integer and date is a string
    const requestBody = { athlete_id: athleteId, date, completed };
    // Create workout session
    await apiRequest('workout_sessions', 'POST', requestBody);
    // Fetch session ID by athlete_id and date
    const sessionFetch = await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'GET');
    const sessionId = sessionFetch[0]?.id;
    if (!sessionId) throw new Error('Session ID not found after session creation.');
    // Return the session ID
    return sessionId;
  } catch (error) {
    console.error('Error creating workout session:', error);
    throw error;
  }
};

/**
 * Saves workout details for a session.
 * @param {Object} exerciseData - Data for exercise, sets, reps, and weights.
 */
export const saveWorkoutDetails = async (exerciseData) => {
  try {
    const { workout_session_id, exercise_id, instructions, sets, reps, weight } = exerciseData;
    // Insert workout details
    await apiRequest('workout_details', 'POST', { workout_session_id, exercise_id, instructions });
    // Fetch workout detail Id after creation
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

/**
 * Fetches workout session ID for a specific athlete on a given date.
 * @param {number} athleteID - ID of the athlete.
 * @param {string} date - Date of the workout session.
 * @returns {Promise<number>} - ID of the workout session.
 */
export const fetchWorkoutSessionId = async (athleteID, date) => {
  try {
    const response = await apiRequest(`workout_sessions?athlete_id=eq.${athleteID}&date=eq.${date}`, 'GET');
    if (response && response.length > 0) {
      return response[0].id;
    } else {
      throw new Error('Workout session not found.');
    }
  } catch (error) {
    console.error('Error fetching workout session ID:', error);
    throw error;
  }
};

// ------------ ANALYTICS SCREEN ---------------- //

/**
 * Fetches detailed workout trends for an athlete for a certain time period.
 * @param {number} athleteId - Athlete ID.
 * @param {string} trendType - Type of trend to fetch (weekly or monthly).
 * @returns {Promise<Object>} - Workout trend data.
 */
export const fetchWorkoutTrends = async (athleteId, trendType) => {
  return apiRequest(`workout_trends?athlete_id=eq.${athleteId}&trend_type=eq.${trendType}`, 'GET');
};

/**
 * Fetches performance data for an athlete's specific exercise.
 * @param {number} athleteId - ID of the athlete.
 * @param {number} exerciseId - ID of the exercise.
 * @returns {Promise<Object>} - Performance data for the exercise.
 */
export const fetchExercisePerformance = async (athleteId, exerciseId) => {
  return apiRequest(`exercise_performance?athlete_id=eq.${athleteId}&exercise_id=eq.${exerciseId}`, 'GET');
};

/**
 * Updates exercise performance statistics for a specific athlete.
 * @param {number} athleteId - ID of the athlete.
 * @param {number} exerciseId - ID of the exercise.
 * @param {number} averageReps - Average reps per session.
 * @param {number} averageWeight - Average weight lifted per session.
 * @param {number} personalBestWeight - Highest weight lifted.
 * @param {number} personalBestReps - Highest reps achieved.
 */
export const updateExercisePerformance = async (
  athleteId,
  exerciseId,
  averageReps,
  averageWeight,
  personalBestWeight,
  personalBestReps
) => {
  try {
      // Fetch existing performance data
    const response = await apiRequest(`exercise_performance?athlete_id=eq.${athleteId}&exercise_id=eq.${exerciseId}`, 'GET');
    const existingData = response.length > 0 ? response[0] : null;

    // Calculate new total sessions count and averages
    const newTotalSessions = existingData ? existingData.total_sessions + 1 : 1;
    const updatedAverageReps = existingData
      ? Math.floor(((existingData.average_reps * existingData.total_sessions) + averageReps) / newTotalSessions)
      : Math.floor(averageReps);
    const updatedAverageWeight = existingData
      ? Math.floor(((existingData.average_weight * existingData.total_sessions) + averageWeight) / newTotalSessions) / updatedAverageReps
      : Math.floor(averageWeight / updatedAverageReps);

      // Determine updated personal bests
    const updatedPersonalBestWeight = existingData && existingData.personal_best_weight > personalBestWeight
    ? existingData.personal_best_weight
    : personalBestWeight;
  const updatedPersonalBestReps = existingData && existingData.personal_best_reps > personalBestReps
    ? existingData.personal_best_reps
    : personalBestReps;

      // Update or insert exercise performance data
      if (existingData) {
          await apiRequest(`exercise_performance?id=eq.${existingData.id}`, 'PATCH', {
              total_sessions: newTotalSessions,
              average_weight: updatedAverageWeight,
              average_reps: updatedAverageReps,
              personal_best_weight: updatedPersonalBestWeight,
              personal_best_reps: updatedPersonalBestReps,
          });
      } else {
          await apiRequest('exercise_performance', 'POST', {
              athlete_id: athleteId,
              exercise_id: exerciseId,
              total_sessions: newTotalSessions,
              average_weight: updatedAverageWeight,
              average_reps: updatedAverageReps,
              personal_best_weight: updatedPersonalBestWeight,
              personal_best_reps: updatedPersonalBestReps,
          });
      }
  } catch (error) {
      console.error('Error updating exercise performance:', error);
      throw error;
  }
};

/**
 * Updates workout trends after a completed session.
 * @param {number} athleteId - Athlete ID.
 * @param {string} trendType - Type of trend.
 * @param {string} trendPeriod - Period for trend data.
 * @param {number} totalWeight - Total weight lifted.
 * @param {number} totalReps - Total reps completed.
 */
export const updateWorkoutTrends = async (athleteId, trendType, trendPeriod, totalWeight, totalReps) => {
  try {
    // Get existing data for the trend in question.
    const response = await apiRequest(`workout_trends?athlete_id=eq.${athleteId}&trend_type=eq.${trendType}&trend_period=eq.${trendPeriod}`, 'GET');
    const existingData = response.length > 0 ? response[0] : null;

    // Update existing data points with the new data.
    const newTotalWorkouts = existingData ? existingData.total_workouts + 1 : 1;
    const newTotalWeight = existingData ? existingData.total_weight + totalWeight : totalWeight;
    const newAverageReps = existingData
      ? Math.floor(((existingData.average_reps * existingData.total_workouts) + totalReps) / newTotalWorkouts)
      : totalReps;
    const newAverageWeight = Math.floor((newTotalWeight / newTotalWorkouts) / newAverageReps);

    if (existingData) {
      // Update existing data with new trend results if it exists.
      await apiRequest(`workout_trends?id=eq.${existingData.id}`, 'PATCH', {
        total_weight: newTotalWeight,
        average_weight: newAverageWeight,
        average_reps: newAverageReps,
        total_workouts: newTotalWorkouts,
        last_updated: new Date().toISOString()
      });
    } else {
      // If there is no existing data, make a new entry into the database with current stats.
      await apiRequest('workout_trends', 'POST', {
        athlete_id: athleteId,
        trend_type: trendType,
        trend_period: trendPeriod,
        total_weight: newTotalWeight,
        average_weight: newAverageWeight,
        average_reps: newAverageReps,
        total_workouts: newTotalWorkouts,
        last_updated: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error updating workout trends:', error);
    throw error;
  }
};